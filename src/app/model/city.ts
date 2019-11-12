import { Department } from './department';

export interface City {
    id: number;
    departmentDTO: Department;
    name: string;
}
