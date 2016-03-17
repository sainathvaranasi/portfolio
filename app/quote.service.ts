import {Injectable} from 'angular2/core';
import {Jsonp, Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import {Quote, QuoteSearch, StockPrices} from './interfaces';

@Injectable()
export class QuoteService {
  constructor(private _http: Http, private _jsonp: Jsonp) { }

  getPrices(symbols: String[]): Observable<StockPrices>  {

    if (symbols.length === 0) return Observable.empty();
    return this._http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22' + symbols.join('%22,%22') + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
          .map((response: Response) => [].concat(response.json().query.results.quote)
              .reduce((o, v: Quote) => Object.assign(o, {[v.Symbol]: {price: v.LastTradePriceOnly, change: v.Change}}), {}));
  }

  searchQuotes(query: string): Observable<QuoteSearch[]> {

    var search: URLSearchParams = new URLSearchParams();
    search.set('query', query);
    return this._jsonp.get('https://s.yimg.com/aq/autoc?region=US&lang=en-US&callback=JSONP_CALLBACK', {search})
          .map((response: Response) => response.json().ResultSet.Result);
  }

}