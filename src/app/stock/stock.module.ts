import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {StockRoutingModule} from './stock-routing.module';
import {LayoutComponent} from './layout.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StockRoutingModule
    ],
    declarations: [
        LayoutComponent
    ]
})
export class StockModule { }
