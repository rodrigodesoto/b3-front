import { Role } from './role';

export class Stock {
    id: string;
    stock: string;
    shortName: string;
    qtd: number;
    currentPrice?: string;
    vlrInvest?: number;
    vlrTotal?: number;
    dtAtual: Date;
}
