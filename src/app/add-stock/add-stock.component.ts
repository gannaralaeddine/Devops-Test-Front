import { Component, Inject, OnInit } from '@angular/core';
import { StockService } from '../stock-service/stock.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Stock } from '../stock/stock.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit
{
  valueLibelleStock = 'Clear me'
  valueQuantite = 'Clear me'
  valueQuantiteMin = 'Clear me'
  stockForm : FormGroup
  stock = new Stock()

  constructor(private stockService: StockService, formBuilder: FormBuilder, private matDialogRef: MatDialogRef<AddStockComponent>, @Inject(MAT_DIALOG_DATA) public data: any) 
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

  ngOnInit()
  {
    if (this.data)
    {
      this.stockForm.patchValue({
        libelleStock: this.data.libelleStock,
        quantite: this.data.qte,
        quantiteMin : this.data.qteMin
      })
    }

  }

  addOrUpdateStock()
  {
    if (this.data)
    {
      this.stock.libelleStock = this.stockForm.value.libelleStock
      this.stock.qte = this.stockForm.value.quantite
      this.stock.qteMin = this.stockForm.value.quantiteMin

      if (navigator.onLine)
      {
        this.stockService.updateStock(this.data.idStock,this.stock)
        console.log(this.stock)
        this.matDialogRef.close()
      }
      else 
      {
        alert("you're offline, please check your internet connection then retry")
      }  
    }
    else
    {
      this.stock.libelleStock = this.stockForm.value.libelleStock
      this.stock.qte = this.stockForm.value.quantite
      this.stock.qteMin = this.stockForm.value.quantiteMin

      if (navigator.onLine)
      {
        var res = this.stockService.addStock(this.stock)
        this.matDialogRef.close()
      }
      else 
      {
        alert("you're offline, please check your internet connection then retry")
      }
    }
    

  }
}
