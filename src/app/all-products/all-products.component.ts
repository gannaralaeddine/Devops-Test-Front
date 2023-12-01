import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProductServiceService} from "../_product-service/-product-service.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductComponent} from "../add-product/add-product.component";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent
{
  products : any;

  constructor(private productService: ProductServiceService, private router: Router, private dialogRef: MatDialog )
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

  deleteProduct(id: number)
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


  openDialog(idProduct: number){
    var popup = this.dialogRef.open(AddProductComponent, {
      width: "30%",
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      data: { idProduct: idProduct }
    })
    popup.afterClosed().subscribe(item =>{
      this.retrieveAllProducts()
    })
  }
}
