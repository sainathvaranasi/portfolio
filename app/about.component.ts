import {Component} from 'angular2/core';

@Component({
  selector: 'about',
  directives: [],
  styleUrls :[],
  template: `
  <h2>Portfolio</h2>
  <h4>Built with</h4>
  <ul>
  <li><a href="https://angular.io/">Angular2</a></li>
  <li><a href="http://getmdl.io/">Material Design Lite</a></li>
  <li><a href="http://www.yahooapis.com/">Yahoo! Developer Network</a></li>
  </ul>
  `
})
export class AboutComponent  {

}
