import {Component, Directive, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
import {Stock} from './interfaces';
import {StocksService} from './stocks.service';
import {SnackbarService} from './snackbar.service';

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
  styles: [require('./portfolio.component.css')],
  template: require('./portfolio.component.html'),
  directives: [GreenRed]
})
export class PortfolioComponent implements OnInit {

  stocks: Stock[];
  loading: boolean;

  constructor(private _stocksService: StocksService, private _snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const timeout: number = window.setTimeout(() => this.loading = true, 500);

    this._stocksService.GetStocks().then(s => {
      this.loading = false;
      clearTimeout(timeout);
      this.stocks = s;
    }, (error) => {
        this.loading = false;
        clearTimeout(timeout);
        this._snackbarService.showSnackbar(error);
      }
    );
  };

  delete(i: number): void {
    this._stocksService.DeleteStock(i).then(s => this.stocks = s);
  }

}
