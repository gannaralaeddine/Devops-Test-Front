import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductServiceService } from "../_product-service/-product-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../product/product.model";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent
{

  isAddOperation = true;

  product: Product = new Product();

  constructor(private productService: ProductServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute)
  {  }

  ngOnInit(): void
  {

    // this.product = this.activatedRoute.snapshot.data["product"];
    //
    if ( this.product && this.product.idProduct != 0 )
    {
      this.isAddOperation = false;
    }

  }

  addProduct()
  {
    console.log(this.product)
    this.productService.addProduct(this.product).subscribe();
  }



}
