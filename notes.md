## Лекция 1 - Types

### Type "never"
Можно рассказать какие-нибудь живые примеры, чтобы было понятно, когда этот тип необходим.
Предположим, у нас установлена опция `strictNullChecks` = `true`.
В этом случае, следующий код не скопилируется:

```ts
function parseNumber(s: string): number {
    if (!s || !s.length) {
        logAndThrowError(new Error('Value must not be empty or null'));
    } else {
        return +s;
    }
}

function logAndThrowError(error: Error) {
    console.error(error); // Или более сложная логика логирования ошибок
    throw error;
}
```

Мы должны явно указать, что при попадании в первую первую ветку нам ничего не нужно возвращать:

```ts
function parseNumber(s: string): number {
    if (!s || !s.length) {
        logAndThrowError(new Error('Value must not be empty or null'));
    } else {
        return +s;
    }
}

function logAndThrowError(error: Error): never  {
    console.error(error); // Или более сложная логика логирования ошибок
    throw error;
}
```


### String Literal Type
Можно сказать, что с числами работает как и с String Literal Type.

###### Example 1

```ts
const number = 4;
```

Здесь `number` имеет тип 4, а не number.

###### Example 2

```ts
let number: 3 | 4 | 5;
number = 4;
```

Здесь `number` может иметь только значения 3, 4 или 5.

###### Example 3

```ts
enum Unit {
    celsius,
    fahrenheit,
    kelvin
}

function getAbsoluteZero(unit: Unit) {
    switch (unit) {
        case Unit.celsius:
            return -273.15;

        case Unit.fahrenheit:
            return -459.67;

        case Unit.kelvin:
            return 0;

        default:
            throw new Error('Invalid unit');
    }
}
```

Здесь функция `getAbsoluteZero` имеет тип `-273.15 | -459.67 | 0`

На самом деле, такое можно проделать с любыми литералами, с использованием const assertions, например:

```ts
let number = 3.14 as const;

number = 3.14159;  // error
number = getPi();  // ok

function getPi(): 3.14 {
    return 3.14;
}
```

переменная `number` будет иметь тип `3.14`, то есть значение можно переприсвоить, но оно должно быть 3.14.

На самом деле, такое можно делать даже с литерадами-объектами:

```ts
let mathConstants = {
    pi: 3.14,
    e: 2.72
} as const;

mathConstants = getConstants(); // ok

function getConstants(): { pi: 3.14; e: 2.72 } {
    return {
        pi: 3.14,
        e: 2.72
    };
}
```

### Type Definitions
Возможно, имеет смысл показать пару примеров, чтобы было понятно, что в себе содержат d.ts файлы.
Например, возмем код из нашей первой практики, скомпилированный в js:

```js
var Category;
(function (Category) {
    Category[Category["JavaScript"] = 0] = "JavaScript";
    Category[Category["CSS"] = 1] = "CSS";
    Category[Category["HTML"] = 2] = "HTML";
    Category[Category["TypeScript"] = 3] = "TypeScript";
    Category[Category["Angular"] = 4] = "Angular";
})(Category || (Category = {}));

function getAllBooks() {
    const books = [
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

function logFirstAvailable(books) {
    console.log(`Number of books: ${books.length}`);
    const firstAvailableBook = books.find(book => book.available);
    if (firstAvailableBook) {
        console.log(`The first available book: ${firstAvailableBook.title}`);
    }
    else {
        console.log('There are no available books');
    }
}
```

В этом случае, файл d.ts может выглядеть следующим образом

```ts
declare enum Category {
    JavaScript = 0,
    CSS = 1,
    HTML = 2,
    TypeScript = 3,
    Angular = 4
}

declare type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};

declare function getAllBooks(): readonly Book[];
declare function logFirstAvailable(books: readonly Book[]): void;
```

Можно просто сказать (но не останавливаться, потому что это мы еще не проходили), что type definitions можно делать практически для всего, чтобы получить возможности и преимущества типизации для legacy js, например:

```ts

// Простейший случай - просто interface или type
// Так как они не существуют в js, мы можем использовать их только для типизации в ts.

interface SomeInterface {
    property: string;
    method(): boolean;
}

type SomeType = number | SomeInterface;

// Явное описание через declare, так как эти объекты уже существуют в js, но мы для них задаем типы.

declare namespace SomeNamespace {
    function methodInNamespace(input: string): number;
    let variableInNamespace: boolean;
}

declare function someFunction(number: number): string;

declare class Greeter {
    constructor(input: SomeType);
    property: string;
    method(): void;
}

declare var globalVariable: number;
declare const globalConst: number;

declare enum SomeEnum {
    value1,
    value2
}
```


## Лекция 2 - Functions

### Overloaded functions

Можно добавить, что перегружаемые фуникции могут иметь разные типы возвращаемых значений, например

```ts
function sum(a: number, b: number): number;
function sum(a: string, b: string): string;
function sum(a: any, b: any): number | string {
    return a + b;
}
```


## Лекция 3 - Interfaces

### Defining an Interface
Возможно, имеет смысл дополнить, что интерфейс может определять не только свойства, но и методы, например

```ts
interface Book {
    id: number;
    title: string;
    author: string;
    pages?: number;                           // Optional Field
    markDamaged: (reason: string) => void;    // Function Types (Property)
    restore(reason: string): void;            // Function Types (Method)
    readonly pubDate: string;                 // Readonly Field
    [propName: string]: any;                  // Some extra properties
};
```

### Extending interfaces
Можно упомянуть, что повторное объявление интерфейса добавляет свойства (с альясами так нельзя):

```ts
interface User {
    name: string;
}

interface User {
    email: string;
}

const user: User = {
    name: 'User name',
    email: 'user@email.com'
};
```

### Optional Chaining
Можно рассказать, это можно удобно использовать в условиях, например:

```ts
function printAuthors(book: Book): void {
    if (book?.authors?.length) {
        book.authors.forEach(elem => console.log(elem));
    } else {
        console.log('There are no authors');
    }
}

// вместо

function printAuthors(book: Book): void {
    if (book && book.authors && book.authors.length) {
        book.authors.forEach(elem => console.log(elem));
    } else {
        console.log('There are no authors');
    }
}
```

Так же можно рассказать про Nullish Coalescing (объединение с null), так как их удобно использовать вместе:

```ts
const title = offer.book?.getTitle?.() ?? 'Default title';
```

UPD: Это было показано в 4 лекции. Здесь можно просто показать, но не останавливаться на этом.

### Keyof operator

Можно добавить какое-нибудь задание для того, чтобы сделать проекцию на какое-то свойство, например:
```ts
function getBookInfo(property: BookProperties): any[] {
    return getAllBooks().map(book => book[property]);
}

const titles: string[] = getBookInfo('title');
const ids: int[] = getBookInfo('id');
```


## Лекция 4 - Classes

## Constructors

Было сказано, что конструктор может быть только один. Можно добавить, что мы можем перегружать конструктор, как и методы, чтобы иметь возможность определить "несколько" конструкторов:

```ts
class User {
    private constructor();
    private constructor(name: string);
    private constructor(age: number);
    private constructor(name: string, age: number);
    private constructor(...values: any[]) {
    }
}
```

### Pretected Constructor

Было сказано, что если конструктор имеет модификатор доступа pretected, то нельзя создавать экземпляры этого класса. Можно сделать пометку, что создавать экземпляры можно, но изнутри класса (даже если конструктор имеет модификатор private).

```ts
class Singleton {
    #instance: Singleton;

    private constructor() {
    }

    public get instance() {
        if (!this.#instance) {
            this.#instance = new Singleton();
        }

        return this.#instance;
    }
}
```

### Abstract Classes

Можно так же сказать, что если наследник не хочет реализовывать абстрактные методы, то он тоже должен быть помечен как абстрактный, причем он может реализовать некоторые абстрактные методы, а так же добавить новые абстрактные методы.


### Interfaces for Class Types

Можно сказать, что интерфейсы не просто ограничивают доступные свойства/методы. Это ограничение дает нам "свободу". Мы можем не привязываться к конкретным классам и использовать лишь их интерфейсы. То есть мы можем сделать следующее, с учетом того, что `Cat` и `Airplane` не имеют каких-то общих предков:

```ts
interface Movable {
    move();
}

class Cat implements Movable {
    move() {
        console.log('Cat runs');
    }
}

class Airplane implements Movable {
    move() {
        console.log('Airplane flies');
    }
}

const cat = new Cat();
const airplane = new Airplane();

moveObject(cat);
moveObject(airplane);

function moveObject(movableObject: Movable) {
    movableObject.move(); // Не важно, коты или самолеты, главное, что они могут двигаться
}
```

На самом деле, это можно было проделать, даже если мы не напишем явно `implements Movable`, однако так мы явно даем знать, что класс обязан реализовать необходимые методы интерфейса.


## Лекция 5 - Modules

Ради интереса, можно посмотреть, во что преобразовываются модули для разных версий ECMAScript. Например, имеем следующий код:

```ts
function localFunction() {}
export function exportedFunction() {}

const localConst = 42;
export const exportedConst = 42;

class LocalClass {}
export class ExportedClass {}

export default exportedFunction;
```

Результат `tsc src/example.ts --target ES5`:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportedClass = exports.exportedConst = exports.exportedFunction = void 0;
function localFunction() {
}
function exportedFunction() {
}
exports.exportedFunction = exportedFunction;
var localConst = 42;
exports.exportedConst = 42;
var LocalClass = /** @class */ (function () {
    function LocalClass() {
    }
    return LocalClass;
}());
var ExportedClass = /** @class */ (function () {
    function ExportedClass() {
    }
    return ExportedClass;
}());
exports.ExportedClass = ExportedClass;
exports.default = exportedFunction;
```

Результат `tsc src/example.ts --target ES6`:

```ts
function localFunction() {
}
export function exportedFunction() {
}
const localConst = 42;
export const exportedConst = 42;
class LocalClass {
}
export class ExportedClass {
}
export default exportedFunction;
```