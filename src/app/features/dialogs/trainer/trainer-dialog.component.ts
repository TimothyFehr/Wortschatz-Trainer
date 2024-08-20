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
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
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
    CommonModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './trainer-dialog.component.html',
  styleUrl: './trainer-dialog.component.css',
})
export class TrainerDialogComponent {
  public randomField;
  public checked = false;
  constructor(
    public dialogRef: MatDialogRef<TrainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      correct: number;
      total: number;
      testWordPair: TestWordPair;
    }
  ) {
    this.randomField = this.randomIntFromInterval();
  }

  onClick(): void {
    this.checked = true;
  }

  randomIntFromInterval() {
    // min and max included
    return Math.floor(Math.random() * (2 - 1 + 1) + 1);
  }

  updateErrorMessage() {}
}
