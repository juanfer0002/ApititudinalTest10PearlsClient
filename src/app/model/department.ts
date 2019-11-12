import { Country } from './country';

export interface Department {
    id: number;
    countryDTO: Country;
    name: string;
}
