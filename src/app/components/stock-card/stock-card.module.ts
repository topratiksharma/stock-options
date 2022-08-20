import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from './stock-card.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StockCardComponent],
  imports: [CommonModule, MatSlideToggleModule, FormsModule],
  exports: [StockCardComponent],
})
export class StockCardModule {}