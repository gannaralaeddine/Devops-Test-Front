import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AllProductsComponent} from "./all-products/all-products.component";
import {AddProductComponent} from "./add-product/add-product.component";
import { StockComponentComponent } from './stock/stock.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'allProducts', component: AllProductsComponent },
  { path: 'allStocks', component: StockComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
