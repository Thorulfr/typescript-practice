/* // Decorators run when the class is defined, not when an instance is created
function Logger(constructor: Function) {
    // Decorators typically use uppercase names
    console.log('Logging...');
    console.log(constructor);
} */

// This is a factory decorator. Factory decorators return a decorator function, rather than being a decorator function themselves. This is useful because it allows us to pass in arguments to the decorator (which we do when we call the decorator with ())
function Logger(logString: string) {
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    // _ is a convention for unused parameters, telling TS that we don't need that parameter
    // return function (_: Function) {
    return function <T extends { new (...args: any[]): { name: string } }>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template...');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// @Logger // This is how you call a non-factory decorator
// When you add multiple decorators, they run in bottom-up order; however, the factory decorators run in top-down order (that is, the order they're created/defined in JS)
@Logger('Logging...')
@WithTemplate('<h1>My Person</h1>', 'app') // When you want to run a factory decorator, you need to call it with ()
class Person {
    name = 'Ben';

    constructor() {
        console.log('Constructing person...');
    }
}

const person = new Person();
console.log(person);

// ---

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

// On accessor and method decorators, you can return something that is used. For example, you can return a new descriptor, which will replace the original descriptor. For property decorators, you can't return anything, because the property is already defined.
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    // If you add a decorator to a property, the decorator receives two arguments: the target as the first and the property name as the second
    @Log
    title: string;
    private _price: number; // The underscore is a convention for private properties. It's not enforced by TS, but it's a convention that's used by many developers

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
const buttonEl = document.querySelector('button')!;
buttonEl.addEventListener('click', p.showMessage);

// ---

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive'] as examples of a list of validators
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ??
                []),
            'required',
        ],
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ??
                []),
            'positive',
        ],
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    // !! converts the value to a boolean value
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseFormEl = document.querySelector('form')!;
courseFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title')! as HTMLInputElement;
    const priceEl = document.getElementById('price')! as HTMLInputElement;

    const title = titleEl.value;
    // The + converts the string to a number
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }

    console.log(createdCourse);
});
