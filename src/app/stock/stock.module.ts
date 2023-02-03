import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {StockRoutingModule} from './stock-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from "../admin/accounts/list.component";
import {ListStocks} from "./list.stocks";
import {AddEditComponent} from "./add-edit.component";
import { TextMaskModule } from 'angular2-text-mask';
import { NgxCurrencyModule } from "ngx-currency";



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StockRoutingModule,
        TextMaskModule,
        NgxCurrencyModule
    ],
    declarations: [
        LayoutComponent,
        ListStocks,
        AddEditComponent
    ]
})
export class StockModule { }
