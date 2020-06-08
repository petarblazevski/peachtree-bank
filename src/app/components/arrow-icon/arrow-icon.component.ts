import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow-icon',
  templateUrl: './arrow-icon.component.html',
  styleUrls: ['./arrow-icon.component.scss'],
})
export class ArrowIconComponent implements OnInit {
  @Input() direction: 'up' | 'down' = 'up';

  constructor() {}

  ngOnInit(): void {}
}
