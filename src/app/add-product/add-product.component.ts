import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductServiceService } from "../_product-service/-product-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../product/product.model";
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent
{

  isAddOperation = true;
  productId: string|null = ""


  product: Product = new Product();

  constructor(private productService: ProductServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute)
  {  }

  ngOnInit(): void
  {
    // Retrieve productId from the URL
    this.productId = this.activatedRoute.snapshot.paramMap.get("productId");
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
    this.productService.addProduct(this.product).subscribe();
  }

  getProductById(id: any)
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

  updateProduct(id: any )
  {
    this.productService.updateProduct(id, this.product).subscribe(
      (response) => {
        console.log(response)
      },
      (error) =>{
        console.log(error)
      }
    )
  }

}
