import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-page-acceuil',
  templateUrl: './page-acceuil.component.html',
  styleUrls: ['page-acceuil.component.scss']
})
export class PageAcceuilComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'PageAcceuilComponent message';
  }

  ngOnInit(): void {}
}
