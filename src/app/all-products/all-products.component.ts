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

  productUpdate = {
    productId: 0,
    codeProduct: "",
    labelProduct: "",
    price: 0,
    productImages: []
  };

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

  updateProduct(id: any)
  {
    console.log(id);

    this.router.navigate(["/add-product", { idProduct: id }]);
  }

  deleteProduct(id: any)
  {
    alert(id);
    this.productService.deleteProduct(id).subscribe(
      (response) =>{
        console.log(response);
        this.retrieveAllProducts();
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  edit(student: any)
  {
    this.productUpdate = student;
  }
}
