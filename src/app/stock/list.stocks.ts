import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {StockService} from "../_services/stock.service";

@Component({ templateUrl: 'list.stocks.html' })
export class ListStocks implements OnInit {
    stocks: any[];
    loading = false;

    constructor(private stockService: StockService) {}

    ngOnInit() {
        this.stockService.getAll()
            .pipe(first())
            .subscribe(stocks => this.stocks = stocks);
    }

    deleteAccount(id: string) {
      if (confirm('Você realmente deseja excluir o usuário?')) {
        const stock = this.stocks.find(x => x.id === id);
        stock.isDeleting = true;
        this.stockService.delete(id)
          .pipe(first())
          .subscribe(() => {
            this.stocks = this.stocks.filter(x => x.id !== id)
          });
      }
    }
}
