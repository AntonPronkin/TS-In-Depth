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

type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};

function getAllBooks(): Book[] {
    const books: Book[] = [
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

function logFirstAvailable(books: readonly Book[]): void {
    console.log(`Number of books: ${books.length}`);

    const firstAvailableBook = books.find(book => book.available);
    if (firstAvailableBook) {
        console.log(`The first available book: ${firstAvailableBook.title}`);
    } else {
        console.log('There are no available books');
    }
}

logFirstAvailable(getAllBooks());

function getBookTitlesByCategory(category: Category): Array<string> {
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

const titles = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(titles);

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks() as Array<Book>;
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
    const libraries: Library[] = [
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
