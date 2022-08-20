import { Component, OnInit } from '@angular/core';
import { StockWsService } from 'src/app/core/stock-ws.service';
import { STOCKS } from './constant';

@Component({
  selector: 'sca-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  public stocks = STOCKS;
  public formattedStockDetails: any = [];

  constructor(private stockService: StockWsService) {}

  public ngOnInit(): void {
    this.stockService.subscribe(this.stocks).subscribe((resp) => {
      this.onStockSubscriptionSuccess(resp);
    });
  }

  public onStockSubscriptionSuccess(stockResponse: any) {
    this.formattedStockDetails = [];
    stockResponse.forEach((st: any) => {
      this.formattedStockDetails.push(this.formatResponse(st));
    });
    this.formattedStockDetails;
  }

  private formatResponse(stock: any) {
    const keys = Object.keys(stock['Time Series (15min)']);
    const lastKey = keys[keys.length - 1];
    const firstKey = keys[0];
    const lastRecord = stock['Time Series (15min)'][lastKey];
    const yesterdayPrice = stock['Time Series (15min)'][firstKey]['4. close'];
    const trade = lastRecord['4. close'] - yesterdayPrice;
    const percent = ((trade * 100) / yesterdayPrice).toFixed(2);

    const stock2 = {
      symbol: stock['Meta Data']['2. Symbol'],
      lastTradeTime: stock['Meta Data']['3. Last Refreshed'],
      currentPrice: parseFloat(lastRecord['4. close']).toFixed(2),
      volume: lastRecord['5. volume'],
      yesterdayPrice,
      trade,
      percent,
    };
    return stock2;
  }

  public stockListupdate(cardDetails: any) {
    if (cardDetails.enabled) {
      this.stockService.add(cardDetails.stock);
    } else {
      this.stockService.remove(cardDetails.stock);
    }
  }
}
