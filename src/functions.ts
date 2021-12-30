/* eslint-disable no-redeclare */
import RefBook from './classes/encyclopedia';
import { Category } from './enums';
import { Book, Callback, LibMgrCallback } from './interfaces';
import { BookOrUndefined, BookProperties, Library } from './types';

export function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

export function getAllBooks(): readonly Book[] {
    const books: readonly Book[] = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript
        },
        {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            available: true,
            category: Category.CSS
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript
        }
    ];

    return books;
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);

    const firstAvailableBook = books.find(book => book.available);
    if (firstAvailableBook) {
        console.log(`The first available book: ${firstAvailableBook.title}`);
    } else {
        console.log('There are no available books');
    }
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
    return getAllBooks()
        .filter(book => book.category === category)
        .map(book => book.title);
}

export function logBookTitles(titles: readonly string[]): void {
    console.log(`Number of titles: ${titles.length}`);

    for (const title of titles) {
        console.log(title);
    }
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    if (!Object.prototype.hasOwnProperty.call(books, index)) {
        throw new Error(`Index ${index} is out of range.`);
    }

    const book = books[index];
    return [book.title, book.author];
}

export function getAllLibraries() {
    const libraries: readonly Library[] = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    return libraries;
}

export function calcTotalPages(libraries: readonly Library[]) {
    return libraries
        .map(library => getPages(library))
        .reduce((previous, current) => previous + current);
}

export function getPages(library: Library): bigint {
    return BigInt(library.books) * BigInt(library.avgPagesPerBook);
}

export function getBookByID(id: number): BookOrUndefined {
    return getAllBooks().find(book => book.id === id);
}

export function printBook(book: Book) {
    console.log(`${book.title} by ${book.author}`);
}

export function createCustomerID(name: string, id: number): string {
    return `${name}-${id}`;
}

export function createCustomer(name: string, age?: number, city?: string) {
    console.log(`Name - ${name}`);

    if (age) {
        console.log(`Age - ${age}`);
    }

    if (city) {
        console.log(`City - ${city}`);
    }
}

export function checkoutBooks(customer: string, ...bookIDs: number[]) {
    console.log(`Customer - ${customer}`);

    return bookIDs
        .map(bookID => getBookByID(bookID))
        .filter(book => book.available)
        .map(book => book.title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...params: unknown[]): string[] {
    const predicate = getPredicateByParams(params);
    return getAllBooks()
        .filter(predicate)
        .map(book => book.title);
}

export function getPredicateByParams(params: unknown[]): (book: Book) => boolean {
    if (typeof params[0] === 'string') {
        return book => book.author === params[0];
    }

    if (typeof params[0] === 'boolean') {
        return book => book.available === params[0];
    }

    return book => book.id === params[0] && book.available === params[1];
}

export function func(title: any) {
    if (typeof title !== 'string') {
        throw new TypeError('qw');
    }

    title.toLowerCase();
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new TypeError('Value should have been a string');
    }
}

export function bookTitleTransform(title: any): string | never {
    assertStringValue(title);

    return [...title].reverse().join();
}

// export function getProperty(book: Book, property: BookProperties): any {
//     const propertyValue = book[property];
//     if (typeof property === 'function') {
//         return (propertyValue as Function).name;
//     }

//     return propertyValue;
// }

export function getProperty<TObject, TKey extends keyof TObject>(object: TObject, property: TKey): TObject[TKey] | string {
    const propertyValue = object[property];
    if (typeof property === 'function') {
        return (propertyValue as unknown as Function).name;
    }

    return propertyValue;
}

function assertRefBookInstance(condition: any): asserts condition {
    if (!(condition instanceof RefBook)) {
        throw new TypeError('It is not instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles?.length) {
                callback(null, titles);
            } else {
                throw new Error('No books found');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[]): void {
    if (err) {
        console.log(`Error: ${err.message}`);
    } else {
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles?.length) {
                resolve(titles);
            } else {
                reject('No books found');
            }
        }, 2000);
    });
}

export async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    console.log(`Books found: ${titles.length}`);
}
