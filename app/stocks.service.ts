import {Injectable} from 'angular2/core';
import {Stock, StockPrices} from './interfaces'
import {QuoteService} from './quote.service';

@Injectable()
export class StocksService {
  stocks: Stock[];
  stockPrices: StockPrices;

  constructor(private _quoteService:QuoteService) {
    this.stocks = JSON.parse(localStorage["portfolio"]||"[]");
    this.stockPrices={}
  }
  
  DeleteStock(i) {
    this.stocks.splice(i,1);
    this.SaveToLocalStorage();
    return this.GetStocks();
  }
  
  GetStocks():Promise<Stock[]> {
    return new Promise((resolve, reject)=> {
      var required = this.stocks.filter(d=>!this.stockPrices[d.Symbol]).map(d=>d.Symbol)
      this._quoteService.getPrices(required).subscribe(d=>
      {
        Object.assign(this.stockPrices,d)
      },
      ()=>console.log("Error"),
      ()=> resolve(this.stocks.map(s=>(
          { Symbol: s.Symbol,
            Name:s.Name,
            Quantity:s.Quantity,
            Price:this.stockPrices[s.Symbol].price,
            Change:this.stockPrices[s.Symbol].change
          }
         )
        ))
)      
    });
   
  }

  AddStock({stock, quantity}) {
    this.stocks.push(<Stock>{Symbol:stock.symbol ,Name:stock.name, Quantity:quantity});
    this.SaveToLocalStorage();
  }

  SaveToLocalStorage(){
    localStorage["portfolio"] = JSON.stringify(this.stocks);
  }  
}