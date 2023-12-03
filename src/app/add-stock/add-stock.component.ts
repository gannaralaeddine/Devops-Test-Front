import { Component } from '@angular/core';
import { StockService } from '../stock-service/stock.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Stock } from '../stock/stock.model';
import { StockComponentComponent } from '../stock/stock.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent 
{
  valueLibelleStock = 'Clear me'
  valueQuantite = 'Clear me'
  valueQuantiteMin = 'Clear me'
  stockForm : FormGroup
  stock = new Stock()

  constructor(private stockService: StockService, formBuilder: FormBuilder, private matDialogRef: MatDialogRef<AddStockComponent>) 
  {
    this.valueLibelleStock = ''
    this.valueQuantite = ''
    this.valueQuantiteMin = ''
    this.stockForm = formBuilder.group({
      libelleStock: undefined,
      quantite: undefined,
      quantiteMin: undefined
    })
  }

  addStock()
  {
    this.stock.libelleStock = this.stockForm.value.libelleStock
    this.stock.qte = this.stockForm.value.quantite
    this.stock.qteMin = this.stockForm.value.quantiteMin

    if (navigator.onLine)
    {
      var res = this.stockService.addStock(this.stock)
      
      console.log(res)
      this.matDialogRef.close()
      
    }
    else 
    {
      alert("you're offline, please check your internet connection then retry")
    }

  }
}
