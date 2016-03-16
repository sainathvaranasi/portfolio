import {Component, Output, Directive, ElementRef, AfterViewInit} from 'angular2/core';
import {QuoteService} from './quote.service';
import {Quote, QuoteSearch} from './interfaces';
import {StocksService} from './stocks.service';

@Directive({
  selector: '[mdlFocus]'
})
export class MdlFocus implements AfterViewInit {
    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        componentHandler.upgradeElement(this.elementRef.nativeElement.parentElement);
        this.elementRef.nativeElement.focus();
    }
}
@Component({
  selector: 'add-new-stock',
  styles: [require('./add-new-stock-component.css')],
  template: require('./add-new-stock-component.html'),
  directives: [MdlFocus]
})
export class AddNewStockComponent {
  stocks: any[];
  constructor(private _quoteService: QuoteService, private _stocksService: StocksService) { }

  selectItem(stock: QuoteSearch): void {
    this._quoteService.getPrices([stock.symbol])
     .subscribe(price => {
        this.stocks = [stock];
        this.stocks[0].price = price[stock.symbol].price;
     });
  }

  addItem(stock: Quote, value: number): void {
    this.stocks = [];
    this._stocksService.AddStock(stock, value);
  }

  submitQuery(query: string): void {
    this.stocks = [];

    this._quoteService.searchQuotes(query)
      .subscribe(data => this.stocks = data);
  }

}