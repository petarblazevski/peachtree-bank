import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;

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

  get query(): FormControl {
    return this.form.get('query') as FormControl;
  }
}
