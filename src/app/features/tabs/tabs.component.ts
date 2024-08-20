import { Component } from '@angular/core';
import { WordlistComponent } from '../wordlist/wordlist.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { WordPairDialogComponent } from '../dialogs/word-pair-dialog/word-pair-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ImportDialogComponent } from '../dialogs/import-dialog/import-dialog.component';
import { WordPairService } from '../../core/services/word-pair/word-pair.service';
import { TestService } from '../../core/services/test/test.service';
import { TrainingService } from '../../core/services/training/training.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    WordlistComponent,
    MatTab,
    MatTabGroup,
    MatIcon,
    MatButtonModule,
    MatTooltip,
    MatFormField,
    CommonModule,
    MatInput,
    MatLabel,
    FormsModule,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  public duration = 5;
  public hits = 80;
  public numpairs = 20;

  constructor(
    public dialog: MatDialog,
    private wordPairService: WordPairService,
    private testService: TestService,
    private trainingService: TrainingService
  ) {}

  importOrOpenDialog(): void {
    if (this.wordPairService.wordPairs.length > 0) {
      const dialogRef = this.dialog.open(ImportDialogComponent, {
        width: '300px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('user wants to reimport');
          this.wordPairService.pushDemo();
        }
      });
    } else {
      console.log('no existng data just import');
      this.wordPairService.pushDemo();
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(WordPairDialogComponent, {
      width: '250px',
      data: {
        titel: 'Wortpaar erfassen',
        wordPair: {
          id: -1,
          text1: '',
          text2: '',
          correctness: 0,
        },
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.wordPairService.add(result);
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('removed all entires');
        this.wordPairService.removeAll();
      }
    });
  }

  openTrainingDialog(): void {
    this.trainingService.getNext();
  }

  openTestDialog(): void {
    this.testService.start(this.duration, this.hits, this.numpairs);
  }
}
