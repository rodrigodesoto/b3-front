import { Role } from './role';

export class Stock {
    id: string;
    stockCode: string;
    shortName: string;
    longName: string;
    currentPrice: number;
    qtd: number;
    vlBuy: number;
    vlTotal: number;
    dtBuy: Date;
    dtUpdate: Date;

    open: number;
    high: number;
    low: number;
    marketChange: number;
    var30d: number;
    var12m: number;
    vlYeld: number;
    prcYeld: number;
}
