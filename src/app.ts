/* // Decorators run when the class is defined, not when an instance is created
function Logger(constructor: Function) {
    // Decorators typically use uppercase names
    console.log('Logging...');
    console.log(constructor);
} */

// This is a factory decorator
function Logger(logString: string) {
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

// @Logger // This is how you call a non-factory decorator
@Logger('Logging person...') // When you want to run a factory decorator, you need to call it with ()
class Person {
    name = 'Ben';

    constructor() {
        console.log('Constructing person...');
    }
}

const person = new Person();
console.log(person);
