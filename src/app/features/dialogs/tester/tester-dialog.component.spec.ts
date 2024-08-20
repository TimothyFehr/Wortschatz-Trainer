import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterDialogComponent } from './tester-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: TesterDialogComponent;
  let fixture: ComponentFixture<TesterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesterDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TesterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
