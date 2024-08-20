import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDialogComponent } from './trainer-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: TrainerDialogComponent;
  let fixture: ComponentFixture<TrainerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
