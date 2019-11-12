
import { Client } from './client';
import { Representative } from './representative';

export interface Visit {
    id: number;
    clientDTO: Client;
    date: Date;
    representativeDTO: Representative;
    net: number;
    total: number;
}


