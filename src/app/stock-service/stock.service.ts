import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Stock } from '../stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService 
{
  API_STOCK = "https://devopstest-devopstest.koyeb.app/devops/stock";
  
  constructor(private httpClient: HttpClient) {}

  public addStock(stock: Stock): number
  {
    this.httpClient.post<object>(this.API_STOCK + "/add-stock", stock,{observe: 'response'}).subscribe(response => {
      return response.status
    },
    error=>{
      console.log(error)
    });
    return 0
  }

  public getAllStocks()
  {
    return this.httpClient.get(this.API_STOCK + "/retrieve-all-stocks");
  }

  public deleteStock(id: Number)
  {
    return this.httpClient.delete(this.API_STOCK + "/delete-stock/" + id);
  }

  public updateStock(id: undefined, stock: undefined)
  {
    return this.httpClient.put(this.API_STOCK + "/update-stock/"+ id, stock);
  }

  public getStockById(id: undefined)
  {
    return this.httpClient.get<Stock>(this.API_STOCK + "/retrieve-stock/" + id);
  }
}
