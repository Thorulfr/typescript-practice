// Simplified, an interface describes the structure of an object. It only exists in Typescript. Interfaces are essentially just used for type-checking. Whereas a class is an object factory that CAN be used to force types, you just use an interface to compare an object with the interface to ensure it matches all the required properties and methods.

// Interfaces can also define the structure of a function
interface AddFn {
    // Colon defines return type
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
};

interface Named {
    readonly name?: string;
    // ? tells TS this property is optional
    outputName?: string;
}

// Interfaces can extend other interfaces
interface Greetable extends Named {
    // For methods, we don't describe the method -- just the return type and types of arguments.
    greet(phrase: string): void;
}

// While you can only inherit one CLASS, you can implement MULTIPLE interfaces
class Person implements Greetable {
    name?: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name + '.');
    }
}

// We can use our interface as a type. By doing so, we can use the interface to type-check any objects with this interface as a type.
let user1: Greetable;

user1 = new Person('Benjamin', 33);
user1.greet('Hi there. My name is');
console.log(user1);
