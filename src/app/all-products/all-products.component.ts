import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProductServiceService} from "../_product-service/-product-service.service";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent
{
  products : any;

  constructor(private productService: ProductServiceService, private router: Router )
  {
    this.retrieveAllProducts()
  }

  public retrieveAllProducts()
  {
    this.productService.getAllProducts()
      .subscribe(
        (response) => {
          this.products = response;
          console.log("Products list: " + response);
        },
        (error) => {
          console.log("error is: " + error);
        })
  }
}
