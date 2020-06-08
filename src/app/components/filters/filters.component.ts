import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type SortDirection = 'asc' | 'desc' | '';
type SortType = 'transactionDate' | 'merchant' | 'amount' | '';
interface SortOptions {
  type: SortType;
  direction: SortDirection;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSort: EventEmitter<SortOptions> = new EventEmitter<SortOptions>();

  form: FormGroup;

  sortOptions: SortOptions = {
    type: 'transactionDate',
    direction: '',
  };

  private _sortDirection: SortDirection[] = ['', 'asc', 'desc'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      query: [''],
    });

    this.query.valueChanges.subscribe((value) => this.onSearch.emit(value));
  }

  clearQuery() {
    this.query.setValue('');
  }

  sortBy(type: SortType) {
    if (this.sortOptions.type !== type) {
      this.sortOptions.type = type;
      this.sortOptions.direction = this._sortDirection[1];
    } else {
      let nextDirectionIndex =
        this._sortDirection.indexOf(this.sortOptions.direction) + 1;
      if (nextDirectionIndex >= this._sortDirection.length) {
        nextDirectionIndex = 0;
      }

      this.sortOptions.direction = this._sortDirection[nextDirectionIndex];
      if (!this._sortDirection[nextDirectionIndex])
        this.sortOptions.type = type;
    }

    this.onSort.emit(this.sortOptions);
  }

  showArrow(type, direction) {
    return (
      this.sortOptions.type === type && this.sortOptions.direction === direction
    );
  }

  get query(): FormControl {
    return this.form.get('query') as FormControl;
  }
}
