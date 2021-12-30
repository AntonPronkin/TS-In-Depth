import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';
import { Librarian } from '../interfaces';

@sealed('Value')
@logger
export class UniversityLibrarian implements Librarian {
    department: string;
    @format() name: string;
    email: string;

    @logMethod
    assistCustomer(@logParameter customerName: string): void {
        console.log(`${this.name} is assisting ${customerName}`);
    }

    @writable(true)
    assistFaculty(): void {
        console.log('Assisting faculty');
    }

    @writable(false)
    teachCommunity(): void {
        console.log('Teaching community');
    }
}
