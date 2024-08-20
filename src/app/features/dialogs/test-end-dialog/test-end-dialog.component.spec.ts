import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEndDialogComponent } from './test-end-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: TestEndDialogComponent;
  let fixture: ComponentFixture<TestEndDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEndDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestEndDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
