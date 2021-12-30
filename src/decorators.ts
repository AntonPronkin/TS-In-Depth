export function sealed(value: string) {
    return function (constructor: Function): void {
        console.log(`Sealing the constructor ${value}`);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log('Creating new instance');
        console.log(constructor.name);

        this.age = 30;
    };

    // newConstructor.prototype = Object.create(constructor.prototype);
    Object.setPrototypeOf(newConstructor.prototype, constructor.prototype);

    newConstructor.prototype.printLibrarian = function () {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log(`Decorator: writable, methodName = ${methodName}, isWritable = ${isWritable}`);
        console.log(target);

        descriptor.writable = isWritable;
        return descriptor;
    };
}

export function timeout(milliseconds: number = 0) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (!confirm(`Are you going to call ${methodName} in ${milliseconds} millisecond(s)?`)) {
                return;
            }

            setTimeout(() => {
                originalMethod.apply(this, args);
            }, milliseconds);
        };

        return descriptor;
    };
}

export function logParameter(target: any, methodName: string, index: number): void {
    const key = `${methodName}_decor_params_indexes`;

    target[key] ??= [];
    target[key].push(index);
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: unknown[]): any {
        const key = `${methodName}_decor_params_indexes`;

        const indexes = target[key];
        if (Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

export function format(pref: string = 'Mr./Mrs') {
    return function (target: any, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref} ${value}`);
    };
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

export function positiveInteger(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet = descriptor.set;

    descriptor.set = function (value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Value must be positive integer');
        }

        originalSet.call(this, value);
    };

    return descriptor;
}
