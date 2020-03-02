import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-etape-2',
  templateUrl: './etape-2.component.html',
  styleUrls: ['etape-2.component.scss']
})
export class Etape2Component implements OnInit {
  message: string;

  constructor() {
    this.message = 'Etape2Component message';
  }

  ngOnInit(): void {}
}
