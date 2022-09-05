// Simplified, an interface describes the structure of an object. It only exists in Typescript. Interfaces are essentially just used for type-checking. Whereas a class is an object factory that CAN be used to force types, you just use an interface to compare an object with the interface to ensure it matches all the required properties and methods.
interface Person {
    name: string;
    age: number;
    // For methods, we don't describe the method -- just the return type and types of arguments.
    greet(phrase: string): void;
}

// We can use our interface as a type. By doing so, we can use the interface to type-check any objects with this interface as a type.
let user1: Person;

user1 = {
    name: 'Ben',
    age: 33,
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name + '.');
    },
};

user1.greet('Hi there. My name is');
