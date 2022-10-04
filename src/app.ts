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
    return function (constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    };
}

// @Logger // This is how you call a non-factory decorator
@WithTemplate('<h1>My Person</h1>', 'app') // When you want to run a factory decorator, you need to call it with ()
class Person {
    name = 'Ben';

    constructor() {
        console.log('Constructing person...');
    }
}

const person = new Person();
console.log(person);
