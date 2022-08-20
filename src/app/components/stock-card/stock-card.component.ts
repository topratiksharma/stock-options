import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sca-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
})
export class StockCardComponent implements OnInit {
  @Input() public stockDetails: any;

  @Output() public readonly enabled: EventEmitter<any> =
    new EventEmitter<any>();

  public stockOption = true;
  status: any;

  constructor() {}

  ngOnInit(): void {
    this.statusChange(true);
  }

  public statusChange(fromHtmlEvent?: boolean) {
    if (this.stockOption) {
      this.status = this.stockDetails.percent > 0 ? '#2ecc71' : '#e74c3c';
    } else {
      this.status = '#ecf0f1';
    }
    if (!fromHtmlEvent) {
      this.enabled.emit({
        enabled: this.stockOption,
        stock: this.stockDetails.symbol,
      });
    }
  }
}
