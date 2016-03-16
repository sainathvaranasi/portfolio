import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { PortfolioComponent } from './portfolio.component';
import { AddNewStockComponent } from './add-new-stock.component';
import { AboutComponent } from './about.component';
import {StocksService} from './stocks.service';

@Component({
  selector: 'portfolio-app',
  styles: [require('./app.component.css')],
  template: require('./app.component.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [StocksService]
})
@RouteConfig([
  { path: '/', name: 'Portfolio', component: PortfolioComponent, useAsDefault: true },
  { path: '/Add', name: 'Add', component: AddNewStockComponent},
  { path: '/About', name: 'About', component: AboutComponent}
])

export class AppComponent  {
  title: string = 'Portfolio';
}
