import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPairDialogComponent } from './word-pair-dialog.component';

describe('WordPairDialogComponent', () => {
  let component: WordPairDialogComponent;
  let fixture: ComponentFixture<WordPairDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordPairDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordPairDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
