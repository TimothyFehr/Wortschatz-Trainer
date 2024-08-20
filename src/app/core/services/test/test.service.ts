import { Injectable } from '@angular/core';
import { WordPairService } from '../word-pair/word-pair.service';
import { TestWordPair } from '../../models/test-word-pair';
import { MatDialog } from '@angular/material/dialog';
import { TesterDialogComponent } from '../../../features/dialogs/tester/tester-dialog.component';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TestEndDialogComponent } from '../../../features/dialogs/test-end-dialog/test-end-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  // @ts-expect-error
  private dialogRef;
  public total = 0;
  public correct = 0;

  private durationMin = 0;
  private showNumpairs = 0;
  private hitRatioGoal = 100;

  constructor(
    private wordPairService: WordPairService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}

  start(durationMin: number, hitRatioGoal: number, showNumpairs: number) {
    this.durationMin = durationMin;
    this.hitRatioGoal = hitRatioGoal;
    this.showNumpairs = showNumpairs;

    this.startTimer(durationMin * 60).then(() => {
      this.dialogRef.close();
      this.getFinalScorePage();
    });
    this.getNext();
  }

  getNext() {
    this.total = this.total + 1;
    this.dialogRef = this.dialog.open(TesterDialogComponent, {
      width: '300px',
      data: {
        titel: 'Vokabel Test',
        testWordPair: {
          guess: '',
          wordPair: this.wordPairService.getRandomPair(),
        },
      },
    });

    this.dialogRef.afterClosed().subscribe((result: TestWordPair) => {
      if (
        result != null &&
        result.wordPair != null &&
        (result.guess == result.wordPair?.text1 ||
          result.guess == result.wordPair?.text2)
      ) {
        console.log('answer was correct');
        this.correct = this.correct + 1;
        if (this.total >= this.showNumpairs) {
          this.getFinalScorePage();
        } else this.getNext();
      } else this.getFinalScorePage();
    });
  }

  getFinalScorePage() {
    const newScore = {
      date: Date.now(),
      total: this.total,
      durationMin: this.durationMin,
      hitRatio: (this.correct / this.total) * 100,
      hitRatioGoal: this.hitRatioGoal,
    };

    const dialogRef = this.dialog.open(TestEndDialogComponent, {
      width: '250px',
      data: {
        date: newScore.date,
        total: newScore.total,
        durationMin: newScore.durationMin,
        hitRatio: newScore.hitRatio,
        hitRatioGoal: this.hitRatioGoal,
        last: this.localStorageService.getItem('last_score'),
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

    this.localStorageService.setItem('last_score', newScore);
  }

  private startTimer(durationSec: number) {
    return new Promise(resolve => {
      console.log('simeout set' + durationSec * 1000);
      setTimeout(() => {
        resolve('time is up');
      }, durationSec * 1000);
    });
  }
}
