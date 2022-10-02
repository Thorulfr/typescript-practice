/* const names: Array<string> = []; // This is the exact same as string[]
// names[0].split(' ');

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});

promise.then((data) => {
    data.split(' ');
});
 */

// By using a generic, here, we are not giving TS specific types in the definition; rather, we are saying that we will PROVIDE specific types in the parameters (TS just knows that there will be two types). That is to say, the types given in the function definition are not set in stone; rather, they are set dynamically when we CALL the function.
function merge<T extends object, U extends object>(objA: T, objB: U) {
    // The 'extends' keyword is how we add constraints to our generics -- by saying 'extends object,' we tell TS that we can accept any object as an argument but ONLY an object!
    return Object.assign(objA, objB);
}

// Here, we're telling TS that objA is an object with a name property and objB is an object with an age property, but we could put whatever we want because of the generic! We can even call this function multiple times with different objects with different properties and the function will work for all of them!
const mergedObj = merge(
    { name: 'Max', hobbies: ['Guitar', 'Food'] },
    { age: 33 }
);

const mergedObj2 = merge({ name: 'Ben' }, { age: 33 });

// We can also give concrete types when calling the function; this is redundant, however, because this is what TS does behind the scenes. This is just to illustrate what's going on.
const mergedObj3 = merge<{ name: string; hobbies: string[] }, { age: number }>(
    { name: 'Max', hobbies: ['Guitar', 'Food'] },
    { age: 33 }
);

// Here, TS doesn't give us any errors/grief when referencing the 'age' property because TS correctly understands that mergedObj was created by a function that HAS an age property.
console.log(mergedObj.age);

// Here, we're creating an interface that simply is used to ensure an object that has a length property that yields a number.
interface Lengthy {
    length: number;
}

// Here, we're simply getting more specific by using a tuple to say that countAndDescribe will return exactly two elements, where the first will be of type T and the second will be of type string.
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    // By using Lengthy as a constraint, we're just ensuring that whatever is passed in as an element has a length property -- and both strings and arrays have length properties.
    let descriptionText =
        element.length > 0
            ? element.length === 1
                ? 'Received 1 element'
                : `Received ${element.length} elements.`
            : 'Received no value.';
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe([]));

function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: 'Ben' }, 'name'));
