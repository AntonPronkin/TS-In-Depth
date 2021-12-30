import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
};

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer(customerName: string): void;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LibMgrCallback {
    (err: Error | null, titles: string[]): void;
}

interface Callback<T> {
    (err: Error | null, data: T): void;
}

export {
    Book,
    DamageLogger as Logger,
    Person,
    Author,
    Librarian,
    Magazine,
    ShelfItem,
    Callback,
    LibMgrCallback
};