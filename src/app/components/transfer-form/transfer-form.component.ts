import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewTransaction } from '../../interfaces/new-transaction';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit, OnChanges {
  @Input() merchants: string[];
  @Input() balance: number;

  @Output() onCreate: EventEmitter<NewTransaction> = new EventEmitter<
    NewTransaction
  >();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fromAccount: [
        { value: `Free Checking(3692) - $${this.balance}`, disabled: true },
      ],
      toAccount: ['', Validators.required],
      amount: [
        '',
        [
          Validators.required,
          Validators.pattern('^(\\d{1,})(,\\d{1,2})*(\\.\\d{1,2})?$'),
        ],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.balance?.firstChange) {
      this.form.reset({
        fromAccount: `Free Checking(3692) - $${this.balance}`,
        toAccount: '',
        amount: '',
      });
    }
  }

  changeToAccount(e) {
    this.toAccount.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.form.valid) {
      this.onCreate.emit({
        toAccount: this.toAccount.value,
        amount: parseInt(this.amount.value, 10),
      });
    }
  }

  get toAccount(): FormControl {
    return this.form.get('toAccount') as FormControl;
  }

  get amount(): FormControl {
    return this.form.get('amount') as FormControl;
  }
}
