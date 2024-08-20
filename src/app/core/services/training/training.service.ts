import { Injectable } from '@angular/core';
import { WordPairService } from '../word-pair/word-pair.service';
import { TestWordPair } from '../../models/test-word-pair';
import { MatDialog } from '@angular/material/dialog';
import { TrainerDialogComponent } from '../../../features/dialogs/trainer/trainer-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  // @ts-expect-error
  private dialogRef;
  private total = 0;
  private correct = 0;

  constructor(
    private wordPairService: WordPairService,
    public dialog: MatDialog
  ) {}

  getNext() {
    console.log('correct' + this.correct + ' / ' + this.total);
    this.dialogRef = this.dialog.open(TrainerDialogComponent, {
      width: '300px',
      data: {
        titel: 'Vokabel Test',
        total: this.total,
        correct: this.correct,
        testWordPair: {
          guess: '',
          wordPair: this.wordPairService.getRandomPair(),
        },
      },
    });
    this.total = this.total + 1;

    this.dialogRef.afterClosed().subscribe((result: TestWordPair) => {
      if (
        result.guess == result.wordPair.text1 ||
        result.guess == result.wordPair.text2
      ) {
        console.log('answer was correct');
        this.correct = this.correct + 1;
        console.log('correct' + this.correct + ' / ' + this.total);
        this.wordPairService.addProficency(result.wordPair.id);
      } else this.wordPairService.removeProficency(result.wordPair.id);

      console.log('correctness' + this.correct + ' / ' + this.total);

      this.getNext();
    });
  }
}
