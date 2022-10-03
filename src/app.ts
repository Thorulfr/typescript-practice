// Decorators run when the class is defined, not when an instance is created
function Logger(constructor: Function) {
    // Decorators typically use uppercase names
    console.log('Logging...');
    console.log(constructor);
}

@Logger
class Person {
    name = 'Ben';

    constructor() {
        console.log('Constructing person...');
    }
}

const person = new Person();
console.log(person);
