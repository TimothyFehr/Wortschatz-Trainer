import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WordPair } from '../../core/models/word-pair';
import { WordPairService } from '../../core/services/word-pair/word-pair.service';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { WordPairDialogComponent } from '../dialogs/word-pair-dialog/word-pair-dialog.component';
import { MatIcon } from '@angular/material/icon';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-wordlist-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatIcon],
  templateUrl: './wordlist.component.html',
  styleUrl: './wordlist.component.css',
})
export class WordlistComponent implements AfterViewInit, OnInit, OnDestroy {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['id', 'text1', 'text2', 'actions'];
  private serviceSubscribe: Subscription | undefined;
  private wordPair: WordPair | undefined;
  public dataSource: MatTableDataSource<WordPair>;

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.wordPairService.getAll();
    this.serviceSubscribe = this.wordPairService.wordPairs$.subscribe(res => {
      console.log('data refreshed');
      this.dataSource.data = res;
    });
  }

  ngOnDestroy(): void {
    if (this.serviceSubscribe != null) this.serviceSubscribe.unsubscribe();
  }

  constructor(
    public dialog: MatDialog,
    private wordPairService: WordPairService
  ) {
    this.dataSource = new MatTableDataSource<WordPair>();

    this.dataSource.data = [
      { id: 1, text1: 'Hydrogen', text2: 'Wasserstoff', correctness: 0 },
      { id: 2, text1: 'Helium', text2: 'Heloium', correctness: 0 },
      { id: 3, text1: 'Dog', text2: 'Hund', correctness: 0 },
      { id: 4, text1: 'Fish', text2: 'Fisch', correctness: 0 },
      { id: 5, text1: 'Cat', text2: 'Katze', correctness: 0 },
      { id: 6, text1: 'river', text2: 'Fluss', correctness: 0 },
      { id: 7, text1: 'Keyboard', text2: 'Tastatur', correctness: 0 },
      { id: 8, text1: 'Plant', text2: 'Pflanze', correctness: 0 },
      { id: 9, text1: 'book', text2: 'Buch', correctness: 0 },
      { id: 10, text1: 'Weight', text2: 'Gewicht', correctness: 0 },
    ];
  }

  // @ts-expect-error
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  edit(data: WordPair) {
    const dialogRef = this.dialog.open(WordPairDialogComponent, {
      width: '400px',
      data: { titel: 'Wortpaar bearbeiten', wordPair: data },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.wordPairService.edit(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.wordPairService.remove(id);
      }
    });
  }
}
