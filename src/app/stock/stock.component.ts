import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStockComponent } from '../add-stock/add-stock.component';
import { StockService } from '../stock-service/stock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stock-component',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponentComponent implements OnInit 
{
  displayedColumns: string[] = ['libelleStock', 'quantite', 'quantiteMin', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 

  constructor(private dialog: MatDialog, private stockService: StockService, private det: ChangeDetectorRef) {}

  ngOnInit()
  {
    this.getAllStocks()
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  openAddStockForm()
  {
    var addStockDialog = this.dialog.open(AddStockComponent)
    addStockDialog.disableClose = true
    addStockDialog.afterClosed().subscribe(()=>{ 
      this.getAllStocks()
    })
  }

  getAllStocks()
  {
    this.stockService.getAllStocks().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res as any)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: (err) => console.error(err)
    })
  }

  deleteStock(id: number)
  {
    this.stockService.deleteStock(id).subscribe({
      next: () => this.getAllStocks(),
      error: (err) => console.error(`delete stock error is ${err}`)
    })
  }

  openUpdateStockForm(data: any)
  {
    var updateDialog = this.dialog.open(AddStockComponent,{
      data
    })
    updateDialog.disableClose = true
    updateDialog.afterClosed().subscribe(()=>{ 
      this.getAllStocks()
    })
  }
}
