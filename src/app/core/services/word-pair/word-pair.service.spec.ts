import { TestBed } from '@angular/core/testing';

import { WordPairService } from './word-pair.service';

describe('WordPairServiceService', () => {
  let service: WordPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
