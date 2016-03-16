import {Component, Directive, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
import {Stock} from './interfaces';
import {StocksService} from './stocks.service';

@Directive({
    selector: '[greenRed]'
})
export class GreenRed implements AfterViewInit {
    constructor(private _el: ElementRef) {}

    ngAfterViewInit(): void {
      this._el.nativeElement.style.color = this._el.nativeElement.textContent.substr(0, 1) === '-' ? 'red' : 'green';
    }
}
@Component({
  selector: 'portfolio',
  styles: [`
    .mdl-grid {
      margin-top: 20px;
    }`
  ],
  template: require('./portfolio.component.html'),
  directives: [GreenRed]
})
export class PortfolioComponent implements OnInit {

  stocks: Stock[];

  constructor(private _stocksService: StocksService) {}

  ngOnInit(): void {
    this._stocksService.GetStocks().then(s => this.stocks = s);
  };

  delete(i: number): void {
    this._stocksService.DeleteStock(i).then(s => this.stocks = s);
  }

}
