import { Librarian } from '../interfaces';

export class UniversityLibrarian implements Librarian {
    department: string;
    name: string;
    email: string;

    assistCustomer(customerName: string): void {
        console.log(`${this.name} is assisting ${customerName}`);
    }
}
