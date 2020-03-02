import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-etape-1',
  templateUrl: './etape-1.component.html',
  styleUrls: ['etape-1.component.scss']
})
export class Etape1Component implements OnInit {
  message: string;

  constructor() {
    this.message = 'Etape1Component message';
  }

  ngOnInit(): void {}
}
