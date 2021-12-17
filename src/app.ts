/* eslint-disable no-redeclare */

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// === Types Basics ===

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular
}

interface DamageLogger {
    (reason: string): void;
}

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
};

function getAllBooks(): readonly Book[] {
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

function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);

    const firstAvailableBook = books.find(book => book.available);
    if (firstAvailableBook) {
        console.log(`The first available book: ${firstAvailableBook.title}`);
    } else {
        console.log('There are no available books');
    }
}

logFirstAvailable(getAllBooks());

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
    return getAllBooks()
        .filter(book => book.category === category)
        .map(book => book.title);
}

function logBookTitles(titles: readonly string[]): void {
    console.log(`Number of titles: ${titles.length}`);

    for (const title of titles) {
        console.log(title);
    }
}

const titles = getBookTitlesByCategory();
logBookTitles(titles);

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    if (!Object.prototype.hasOwnProperty.call(books, index)) {
        throw new Error(`Index ${index} is out of range.`);
    }

    const book = books[index];
    return [book.title, book.author];
}

const bookInfo = getBookAuthorByIndex(2);

type Library = {
    lib: string;
    books: number;
    avgPagesPerBook: number;
};

function getAllLibraries() {
    const libraries: readonly Library[] = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    return libraries;
}

function calcTotalPages(libraries: readonly Library[]) {
    return libraries
        .map(library => getPages(library))
        .reduce((previous, current) => previous + current);
}

function getPages(library: Library): bigint {
    return BigInt(library.books) * BigInt(library.avgPagesPerBook);
}

function getBookByID(id: number): Book {
    return getAllBooks().find(book => book.id === id);
}

getBookByID(1);

function printBook(book: Book) {
    console.log(`${book.title} by ${book.author}`);
}

// === Function Type ===

function createCustomerID(name: string, id: number): string {
    return `${name}-${id}`;
}

const myID: string = createCustomerID('Ann', 10);
console.log(myID);

let idGenerator: (name: string, id: number) => string;

// Другие варианты задания фуникцонального типа:

// interface IdGenerator {
//     (name: string, id: number): string;
// }
// let idGenerator: IdGenerator;

// type IdGenerator = (name: string, id: number) => string;
// let idGenerator: IdGenerator;

// let idGenerator: typeof createCustomerID;

idGenerator = (name: string, id: number) => `${name}-${id}`;
idGenerator = createCustomerID;

const myNewId = idGenerator('Jack', 25);
console.log(myNewId);

function createCustomer(name: string, age?: number, city?: string) {
    console.log(`Name - ${name}`);

    if (age) {
        console.log(`Age - ${age}`);
    }

    if (city) {
        console.log(`City - ${city}`);
    }
}

createCustomer('Anton');
createCustomer('Anton', 24);
createCustomer('Anton', 24, 'Ryazan');

function checkoutBooks(customer: string, ...bookIDs: number[]) {
    console.log(`Customer - ${customer}`);

    return bookIDs
        .map(bookID => getBookByID(bookID))
        .filter(book => book.available)
        .map(book => book.title);
}

const myBooks = checkoutBooks('Ann', 1, 2, 4);
// const myBooks = checkoutBooks('Ann', ...[1, 2, 4]);

console.log(myBooks);

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...params: unknown[]): string[] {
    const predicate = getPredicateByParams(params);
    return getAllBooks()
        .filter(predicate)
        .map(book => book.title);
}

function getPredicateByParams(params: unknown[]): (book: Book) => boolean {
    if (typeof params[0] === 'string') {
        return book => book.author === params[0];
    }

    if (typeof params[0] === 'boolean') {
        return book => book.available === params[0];
    }

    return book => book.id === params[0] && book.available === params[1];
}

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);

function func(title: any) {
    if (typeof title !== 'string') {
        throw new TypeError('qw');
    }

    title.toLowerCase();
}


function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new TypeError('Value should have been a string');
    }
}

function bookTitleTransform(title: any): string | never {
    assertStringValue(title);

    return [...title].reverse().join();
}

bookTitleTransform('Hello');
bookTitleTransform(123);

// === Interfaces ===

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: reason => `Damaged: ${reason}`
};

printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: DamageLogger = reason => `Damaged: ${reason}`;
logDamage('Book was burned');

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

const favoriteAuthor: Author = {
    name: 'Anton',
    email: 'anton@test.com',
    numBooksPublished: 4
};

const favoriteLibrarian: Librarian = {
    name: 'Jack',
    email: 'jack@test.com',
    department: 'The Best Department',
    assistCustomer: customerName => console.log(`Librarian assisted to ${customerName}`)
};

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

console.log(offer.magazine);
console.log(offer.magazine?.getTitle?.());
console.log(offer.book?.getTitle?.());
console.log(offer.book?.authors?.[0]);

type BookProperties = keyof Book;

function getProperty(book: Book, property: BookProperties): any {
    const propertyValue = book[property];
    if (typeof property === 'function') {
        return (propertyValue as Function).name;
    }

    return propertyValue;
}

getProperty(myBook, 'title');
getProperty(myBook, 'markDamaged');
// getProperty(myBook, 'isbn');
