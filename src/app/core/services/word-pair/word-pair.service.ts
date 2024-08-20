import { Injectable } from '@angular/core';
import { WordPair } from '../../models/word-pair';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordPairService {
  wordPairs$: BehaviorSubject<WordPair[]>;
  wordPairs: WordPair[] = [];

  demoWordPairs: WordPair[] = [
    { id: 1, text1: 'hydrogen', text2: 'Wasserstoff', correctness: 0 },
    { id: 2, text1: 'helium', text2: 'Heloium', correctness: 0 },
    { id: 3, text1: 'dog', text2: 'Hund', correctness: 0 },
    { id: 4, text1: 'fish', text2: 'Fisch', correctness: 0 },
    { id: 5, text1: 'cat', text2: 'Katze', correctness: 0 },
    { id: 6, text1: 'river', text2: 'Fluss', correctness: 0 },
    { id: 7, text1: 'keyboard', text2: 'Tastatur', correctness: 0 },
    { id: 8, text1: 'plant', text2: 'Pflanze', correctness: 0 },
    { id: 9, text1: 'book', text2: 'Buch', correctness: 0 },
    { id: 10, text1: 'weight', text2: 'Gewicht', correctness: 0 },
  ];

  constructor(private localStorageService: LocalStorageService) {
    // @ts-ignore
    this.wordPairs$ = new BehaviorSubject([]);
    this.wordPairs = this.localStorageService.getItem('local_vocables');
  }

  getAll() {
    if (this.wordPairs == null || this.wordPairs.length == 0) {
      this.wordPairs = this.localStorageService.getItem('local_vocables');
    }
    this.wordPairs$.next(this.wordPairs);
  }

  add(wordPair: WordPair) {
    if ((wordPair.id = -1)) {
      let id = Math.max(...this.wordPairs.map(item => item.id));
      wordPair.id = id++;
    }

    this.wordPairs.push(wordPair);
    this.localStorageService.setItem('local_vocables', this.wordPairs);
    this.wordPairs$.next(this.wordPairs);
  }

  pushDemo() {
    this.wordPairs = this.demoWordPairs;
    this.localStorageService.setItem('local_vocables', this.wordPairs);
    this.wordPairs = this.localStorageService.getItem('local_vocables');
    this.wordPairs$.next(this.wordPairs);
  }

  edit(wordPair: WordPair) {
    const findElem = this.wordPairs.find(p => p.id == wordPair.id);
    // @ts-expect-error
    findElem.id = wordPair.id;
    // @ts-expect-error
    findElem.text1 = wordPair.text1;
    // @ts-expect-error
    findElem.text2 = wordPair.text2;

    this.localStorageService.setItem('local_vocables', this.wordPairs);

    this.wordPairs$.next(this.wordPairs);
  }

  addProficency(id: number) {
    const findElem = this.wordPairs.find(p => p.id == id);
    // @ts-ignore
    findElem.correctness = findElem.correctness + 1;

    this.localStorageService.setItem('local_vocables', this.wordPairs);

    this.wordPairs$.next(this.wordPairs);
  }

  removeProficency(id: number) {
    const findElem = this.wordPairs.find(p => p.id == id);
    // @ts-ignore
    findElem.correctness = findElem.correctness - 1;

    // @ts-ignore
    if (findElem.correctness < 0) {
      // @ts-ignore
      findElem.correctness = 0;
    }

    this.localStorageService.setItem('local_vocables', this.wordPairs);

    this.wordPairs$.next(this.wordPairs);
  }

  remove(id: number) {
    this.wordPairs = this.wordPairs.filter(p => {
      return p.id != id;
    });

    this.localStorageService.setItem('local_vocables', this.wordPairs);

    this.wordPairs$.next(this.wordPairs);
  }

  removeAll() {
    this.wordPairs = [];
    this.localStorageService.removeItem('local_vocables');
    this.wordPairs$.next(this.wordPairs);
  }

  getRandomPair() {
    let randomPair =
      this.wordPairs[Math.floor(Math.random() * this.wordPairs.length)];

    //add bias if correctness is high
    if (randomPair.correctness > 10)
      randomPair =
        this.wordPairs[Math.floor(Math.random() * this.wordPairs.length)];
    console.log(randomPair);
    return randomPair;
  }
}
