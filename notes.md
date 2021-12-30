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


## Лекция 6 - Generics

Думаю, важно отметить, что дженерики доступны только в ts и недоступны в js, поэтому на них накладываются некоторые ограничения. Например, мы не можем сделать вот так:

```ts
function logType<T>() {
    console.log(typeof T);
}

// or

function logType<T>() {
    if (typeof T === 'number') {
        console.log('T is number');
    } else {
        console.log('T is not number');
    }
}
```

### Generic Functions

На слайде приводится пример

```ts
let someString1: string = logAndReturn<string>('Log this');
```

Хороший пример, который можно дополнить другим примером, чтобы показать отличия Generics от Union:

```ts
function logAndReturn(thing: number | string): number | string {
    console.log(thing);
    return thing;
}

function logAndReturnGeneric<T>(thing: T): T {
    console.log(thing);
    return thing;
}

const someString1 = logAndReturnGeneric<string>('Log this');  // typeof someString1 = string
const someNumber1 = logAndReturnGeneric<number>(42);          // typeof someString1 = number

const someString: string = logAndReturnGeneric<number>(42);   // Error

const someString2 = logAndReturn('Log this');                 // typeof someString2 = string | number
const someNumber2 = logAndReturn(42);                         // typeof somenumber2 = string | number
```

Или же во время практики, когда объясняется, почему `Shelf<T>` предпочтительнее Union. Так как
```ts
type ShelfType = string | number;

export default class Shelf {
    private items: ShelfType[] = [];

    public add(item: ShelfType): void {
        this.items.push(item);
    }

    public getFirst(): ShelfType {
        return this.items[0];
    }
}

export default class ShelfGeneric<T>  {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public getFirst(): T {
        return this.items[0];
    }
}

// ...

const shelf = new Shelf();
shelf.add(43);
shelf.add('string');                    // ok
const value = shelf.getFirst();         // typeof value = string | number


const shelfNumber = new ShelfGeneric<number>();
shelfNumber.add(43);
shelfNumber.add('string');             // error
const value = shelfNumber.getFirst();  // typeof value = number
```

### Utilities

Можно сказать, что большинство встроенных утилит представляют собой обычные альясы для типов, которые можно написать самостоятельно. VS Code покажет объявления для существующих утилит, например:

```ts
type Partial<T> = { [P in keyof T]?: T[P]; }
type Required<T> = { [P in keyof T]-?: T[P]; }
type Readonly<T> = { readonly [P in keyof T]: T[P]; }
type Record<K extends string | number | symbol, T> = { [P in K]: T; }
type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
type Exclude<T, U> = T extends U ? never : T
type Extract<T, U> = T extends U ? T : never
type NonNullable<T> = T extends null ? never : T
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```

### Practice
Task 07.03.
`1.а.` - можно дополнить, что необходимо возвратить первый найденный элемент на полке `с заданным наименованием`.
`6.` - можно уточнить, что `getProperty` находится в `functions.ts`, так как не сразу очевидно.