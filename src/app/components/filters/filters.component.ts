import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  SortDirection,
  SortOptions,
  SortType,
} from '../../interfaces/sort-options';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() onFilter: EventEmitter<{
    query: string;
    sortOptions: SortOptions;
  }> = new EventEmitter<{ query: string; sortOptions: SortOptions }>();

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

    this.query.valueChanges.subscribe((value) =>
      this.onFilter.emit({
        query: value,
        sortOptions: this.sortOptions,
      })
    );
  }

  clearQuery() {
    this.query.setValue('');
  }

  sortBy(type: SortType) {
    if (this.sortOptions.type !== type) {
      this.sortOptions = {
        ...this.sortOptions,
        type,
        direction: this._sortDirection[1],
      };
    } else {
      let nextDirectionIndex =
        this._sortDirection.indexOf(this.sortOptions.direction) + 1;
      if (nextDirectionIndex >= this._sortDirection.length) {
        nextDirectionIndex = 0;
      }

      this.sortOptions = {
        ...this.sortOptions,
        direction: this._sortDirection[nextDirectionIndex],
      };
      if (!this._sortDirection[nextDirectionIndex]) {
        this.sortOptions = {
          ...this.sortOptions,
          type,
        };
      }
    }

    this.onFilter.emit({
      query: this.query.value,
      sortOptions: this.sortOptions,
    });
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
