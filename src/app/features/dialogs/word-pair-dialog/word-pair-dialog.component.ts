import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { WordPair } from '../../../core/models/word-pair';

@Component({
  selector: 'app-word-pair-dialog-component',
  templateUrl: 'word-pair-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatInput,
    MatFormField,
    FormsModule,
  ],
  standalone: true,
})
export class WordPairDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WordPairDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      wordPair: WordPair;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
