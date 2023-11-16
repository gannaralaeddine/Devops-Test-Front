import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Product} from "../product/product.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {

  API_PRODUCT = "http://localhost:8089/devops/product";

  constructor(private httpClient: HttpClient) { }


  public addProduct(product: Product): Observable<Object>
  {
    return this.httpClient.post<object>(this.API_PRODUCT + "/add-product", product);
  }

  public getAllProducts()
  {
    return this.httpClient.get(this.API_PRODUCT + "/retrieve-all-products");
  }

  public DeleteProduct(id: any)
  {
    return this.httpClient.delete(this.API_PRODUCT + "/delete-product/" + id);
  }

  public updateProduct(id: any)
  {
    return this.httpClient.put(this.API_PRODUCT + "/update-product/", id);
  }

  public getProductById(id: any)
  {
    return this.httpClient.get<Product>(this.API_PRODUCT + "/retrieve-product/" + id);
  }
}
