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
