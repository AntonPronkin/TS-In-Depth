import { Library, Shelf } from './classes';
import { Category } from './enums';
import { bookTitleTransform, checkoutBooks, createCustomer, createCustomerID, getAllBooks, getBookAuthorByIndex, getBookByID, getBookTitlesByCategory, getProperty, getTitles, logBookTitles, logFirstAvailable, printBook, printRefBook, purge, showHello } from './functions';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';
import { BookRequiredFields, CreateCustomerFunctionType, PersonBook, UpdatedBook } from './types';


showHello('greeting', 'TypeScript');



// === Types Basics ===



logFirstAvailable(getAllBooks());

const titles = getBookTitlesByCategory();
logBookTitles(titles);


const bookInfo = getBookAuthorByIndex(2);


getBookByID(1);


// === Function Type ===


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


createCustomer('Anton');
createCustomer('Anton', 24);
createCustomer('Anton', 24, 'Ryazan');


const myBooks = checkoutBooks('Ann', 1, 2, 4);
// const myBooks = checkoutBooks('Ann', ...[1, 2, 4]);

console.log(myBooks);





const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);

bookTitleTransform('Hello');
// bookTitleTransform(123);

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

const logDamage: Logger = reason => `Damaged: ${reason}`;
logDamage('Book was burned');

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


getProperty(myBook, 'title');
getProperty(myBook, 'markDamaged');
// getProperty(myBook, 'isbn');


// === Classes ===

/*
const ref = new ReferenceItem(64, 'My title', 24);
ref.printItem();
ref.publisher = 'My publisher';

console.log(ref.publisher);

console.log(ref);
console.log(ref.getID());
*/

if (Math.random() > 0.5) {
    const { RefBook, UL, Reader } = await import('./classes');

    const refBook = new RefBook(2, 'My Encyclopedia', 1997, 2);
    refBook.printItem();
    refBook.printCitation();

    // printRefBook(refBook);

    const myLibrarian: Librarian = new UL.UniversityLibrarian();
    myLibrarian.name = 'Anton';
    myLibrarian.assistCustomer('NeAnton');

    // printRefBook(myLibrarian);

    const reader = new Reader();
    reader.take(myBook);
}

const personBook: PersonBook = {
    author: 'Anton',
    available: true,
    category: Category.Angular,
    email: 'my@email.com',
    id: 4,
    name: 'NeAnton',
    title: 'Title'
};

// const library: Library = new Library();
const library: Library = {
    id: 1,
    name: 'Main library',
    address: 'Moscow'
};


// === Generics ===

const inventory = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

/*
const inventoryPurge = purge(inventory);
console.log(inventoryPurge);

const numberPurge = purge([1, 2, 3, 4, 5]);
console.log(numberPurge);
*/

const bookShelf = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));

const firstBookFromShelf = bookShelf.getFirst();
console.log(firstBookFromShelf.title);


const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));

const firstMagazineFromShelf = magazineShelf.getFirst();
console.log(firstMagazineFromShelf);

magazineShelf.printTitles();

const foundMagazine = magazineShelf.find('Five Points');
console.log(foundMagazine);

const magazinePublisher = getProperty(magazines[0], 'publisher');
const numberString = getProperty<number, 'toString'>(123, 'toString');

const bookRequiredFields: BookRequiredFields = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: reason => `Damaged: ${reason}`
};

const updatedBook: UpdatedBook = {
    category: Category.CSS
};

const parameters: Parameters<CreateCustomerFunctionType> = ['name'];
createCustomer(...parameters);
