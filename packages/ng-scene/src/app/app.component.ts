import { Component, ViewChild } from '@angular/core';
import { EASE_IN_OUT } from '../ng-scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-scene';
  easing = EASE_IN_OUT;
  keyframes = {
    '0': {'border-width': '150px', opacity: 1, transform: 'scale(0)'},
    '1': {'border-width': '0px', opacity: '0.3', transform: 'scale(0.7)'},
  };
  time: string | number = 0;
  animate(e) {
  }
  update(e) {
    this.time = `${e.target.value}%`;
  }
}
