import {Component, Inject} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductServiceService } from "../_product-service/-product-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../product/product.model";
import { OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent
{

  isAddOperation = true;
 // productId: string|null = ""


  product: Product = new Product();
  productId: number
  // @ts-ignore
  constructor(private productService: ProductServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<AddProductComponent>)
  {
    this.productId = data.idProduct
  }

  ngOnInit(): void
  {
    // Retrieve productId from the URL
   // this.productId = this.activatedRoute.snapshot.paramMap.get("productId");
    // this.product = this.activatedRoute.snapshot.data["product"];


    if ( this.productId )
    {
      this.isAddOperation = false;
      this.getProductById(this.productId)
    }

  }

  addProduct()
  {
    console.log(this.product)
    this.productService.addProduct(this.product).subscribe(
      (response) => {
        console.log(response)

        this.ref.close()
      },
      (error) => {
        console.log(error)
      }
    );
  }

  getProductById(id: number)
  {
    this.productService.getProductById(id).subscribe(
      (response) => {
        this.product = response
        console.log(response)
      },
      (error) => {
        console.log("error is: " + error);
      }
    )
  }

  updateProduct(id: number )
  {
    this.productService.updateProduct(id, this.product).subscribe(
      (response) => {
        console.log(response)
        this.ref.close()
      },
      (error) =>{
        console.log(error)
      }
    )
  }

}
