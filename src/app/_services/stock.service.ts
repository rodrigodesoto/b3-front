import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Stock } from '@app/_models';

const baseUrl = `${environment.apiUrl}/stock`;

@Injectable({ providedIn: 'root' })
export class StockService {
    private stockSubject: BehaviorSubject<Stock>;
    public stock: Observable<Stock>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.stockSubject = new BehaviorSubject<Stock>(null);
        this.stock = this.stockSubject.asObservable();
    }

    public get stockValue(): Stock {
        return this.stockSubject.value;
    }

    register(stock: Stock) {
        return this.http.post(`${baseUrl}/register`, stock);
    }

    getAll() {
        return this.http.get<Stock[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Stock>(`${baseUrl}/${id}`);
    }

    create(params) {
        return this.http.post(baseUrl, params);
    }

    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((stock: any) => {
                // update the current account if it was updated
                if (stock.id === this.stockValue.id) {
                    // publish updated account to subscribers
                  stock = { ...this.stockValue, ...stock };
                    this.stockSubject.next(stock);
                }
                return stock;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }

}
