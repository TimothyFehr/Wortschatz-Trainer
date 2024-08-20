import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestWordPair } from '../../../core/models/test-word-pair';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './tester-dialog.component.html',
  styleUrl: './tester-dialog.component.css',
})
export class TesterDialogComponent {
  public randomField;

  constructor(
    public dialogRef: MatDialogRef<TesterDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      testWordPair: TestWordPair;
    }
  ) {
    this.randomField = this.randomIntFromInterval();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  randomIntFromInterval() {
    // min and max included
    return Math.floor(Math.random() * (2 - 1 + 1) + 1);
  }
}
