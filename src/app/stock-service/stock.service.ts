import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Stock } from '../stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService 
{
  #API_STOCK = "https://devopstest-devopstest.koyeb.app/devops/stock";
  API_STOCK = "http://localhost:8089/devops/stock"
  
  constructor(private httpClient: HttpClient) {}

  public addStock(stock: Stock)
  {
    this.httpClient.post<object>(this.API_STOCK + "/add-stock", stock,{observe: 'response'}).subscribe((res)=>{
      console.log(`addStock status: ${res.status}`)
    })
  }

  public getAllStocks()
  {
    return this.httpClient.get(this.API_STOCK + "/retrieve-all-stocks")
  }

  public deleteStock(id: Number)
  {
    return this.httpClient.delete(this.API_STOCK + "/delete-stock/" + id)
  }

  public updateStock(id: number, stock: Stock)
  {
    return this.httpClient.put(this.API_STOCK + "/update-stock/"+ id, stock,{observe: 'response'}).subscribe((res)=>{
      console.log(`updateStock status: ${res.status}`)
    })
  }

  public getStockById(id: number)
  {
    return this.httpClient.get<Stock>(this.API_STOCK + "/retrieve-stock/" + id)
  }
}
