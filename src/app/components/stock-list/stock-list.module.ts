import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list.component';
import { StockListRoutesModule } from './stock-list.routes';
import { StockCardModule } from '../stock-card/stock-card.module';

@NgModule({
  declarations: [StockListComponent],
  imports: [CommonModule, StockListRoutesModule, StockCardModule],
})
export class StockListModule {}
