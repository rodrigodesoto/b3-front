﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { StockService, AlertService } from '@app/_services';
import {NgxCurrencyModule} from "ngx-currency";

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private stockService: StockService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        console.log(this.isAddMode);
        this.form = this.formBuilder.group({
            stock: ['', Validators.required],
            shortName: ['', Validators.required],
            qtd: ['', Validators.required],
            currentPrice: ['', [Validators.required, Validators.minLength(1)]],
            vlrInvest: ['', [Validators.required, Validators.minLength(1)]],
            vlrTotal: ['', [Validators.required, Validators.minLength(1)]],
            dtAtual: [Date.now, Validators.required]
        });

        if (!this.isAddMode) {
            this.stockService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createStock();
        } else {
            this.updateStock();
        }
    }

    private createStock() {
        this.stockService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Ação inserida com sucesso!', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateStock() {
        this.stockService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Ação alterada com sucesso!', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

  codeMask = [/\D/,/\D/,/\D/,/\D/,/\d/]
  options = { prefix: '', thousands: '.', decimal: ',', inputMode: NgxCurrencyModule }
}
