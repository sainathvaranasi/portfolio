import {Component, Output, Directive, ElementRef, AfterViewInit} from 'angular2/core';
import {QuoteService} from './quote.service';
import {Quote, QuoteSearch} from './interfaces';
import {StocksService} from './stocks.service';

declare var componentHandler

@Directive({
  selector: '[mdlFocus]'
})
export class MdlFocus implements AfterViewInit {
    constructor(private elementRef: ElementRef) {}
    
    ngAfterViewInit() {
        componentHandler.upgradeElement(this.elementRef.nativeElement.parentElement);
        this.elementRef.nativeElement.focus();
    }
}
@Component({
  selector: 'add-new-stock',
  styles :[require('./add-new-stock-component.css')],
  template: require('./add-new-stock-component.html'),
	directives:[MdlFocus]
})
export class AddNewStockComponent {
  stocks: any[];
  constructor(private _quoteService:QuoteService, private _stocksService:StocksService) { }
  
  selectItem(stock:QuoteSearch) {
    this._quoteService.getPrices([stock.symbol])
     .subscribe(price=>{
        this.stocks=[stock];
        this.stocks[0].price = price[stock.symbol].price;
     })
  }

  addItem(stock:Quote, value) {
    console.log("")
    this.stocks = [];
    this._stocksService.AddStock({stock:stock, quantity:value});
  }

  submitQuery(query) {
    this.stocks = [];
    
    this._quoteService.searchQuotes(query)
    .subscribe(data=>this.stocks=data);
  }

}