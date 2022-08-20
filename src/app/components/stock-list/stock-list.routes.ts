import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StockListComponent } from './stock-list.component';

const routes: Routes = [{ path: '', component: StockListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockListRoutesModule {}
