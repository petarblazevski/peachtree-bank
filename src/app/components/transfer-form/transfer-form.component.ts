import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  @Input() merchants: string[];
  form: FormGroup;
  balance = 5824.76;

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

  changeToAccount(e) {
    this.toAccount.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get toAccount(): FormControl {
    return this.form.get('toAccount') as FormControl;
  }
}
