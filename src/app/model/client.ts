import { City } from './city';

export interface Client {
    id: number;
    cityDTO: City;
    nit: string;
    name: string;
    address: string;
    phone: string;
    maximumAmount: number;
    assignedCredit: number;
}