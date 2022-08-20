import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, ObservableInput, of, Subject } from 'rxjs';
import { URL } from '../components/stock-list/constant';
import { data } from './data';

@Injectable({
  providedIn: 'root',
})
export class StockWsService {
  public timer: any;
  constructor(private httpClient: HttpClient) {}
  public stockList: string[] = [];
  public stockSubscription = new Subject();

  public getStock(symbol: string) {
    let headers = new HttpHeaders();

    let params = new HttpParams();

    params = params.appendAll({
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      outputsize: 'compact',
      datatype: 'json',
      interval: '15min',
      apikey: 'V36W3YMF7UE747FO',
    });

    const options = {
      headers,
      params,
    };
    return this.httpClient.get(URL, options);
  }

  public subscribe(stocks: string[]) {
    this.stockList = stocks;

    this.stockSubscriptionCall();

    this.timer = setInterval(() => {
      this.stockSubscriptionCall();
    }, 60000);
    return this.stockSubscription;
  }

  private stockSubscriptionCall() {
    const stockSubscriptions: ObservableInput<any>[] = [];
    this.stockList.forEach((stock) => {
      stockSubscriptions.push(this.getStock(stock));
    });
    forkJoin(stockSubscriptions).subscribe((response) => {
      this.stockSubscription.next(response);
    });
  }

  public add(stock: string) {
    this.stockList.push(stock);
  }

  public remove(stock: string) {
    this.stockList = this.stockList.filter((s) => s !== stock);
  }
}
