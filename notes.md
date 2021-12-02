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
