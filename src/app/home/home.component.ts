import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

console.log('`Home` component loaded asynchronously');

@Component({
  selector: 'home',
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class HomeComponent {
  localState;
  constructor(public route: ActivatedRoute) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
  }
}
