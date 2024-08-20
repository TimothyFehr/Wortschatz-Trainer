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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Score } from '../../../core/models/score';

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
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './test-end-dialog.component.html',
  styleUrl: './test-end-dialog.component.css',
})
export class TestEndDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TestEndDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: Date;
      total: number;
      durationMin: number;
      hitRatio: number;
      hitRatioGoal: number;
      latest: Score;
    }
  ) {}

  protected readonly Date = Date;
}
