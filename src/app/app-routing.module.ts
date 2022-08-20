import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stocks' },
  {
    path: 'stocks',
    loadChildren: () =>
      import('./components/stock-list/stock-list.module').then(
        (m) => m.StockListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
