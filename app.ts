// Explicitly declaring specific object type with typed key/value pairs; not good practice but left as demonstration. Better to just let Typescript infer type
/* const person: {
    name: string;
    age: number;
} = { */
const person = {
    name: 'Benjamin',
    age: 33,
    hobbies: ['Guitar', 'Cooking', 'Languages', 'Music'],
};

let favoriteActivities: string[];
favoriteActivities = ['Playing guitar'];

console.log(person.name);

// Because we only put strings in the hobbies array, Typescript correctly infers that it's exclusively an array containing strings, i.e. string[]
for (const hobby of person.hobbies) {
    // Because Typescript knows that the array will ONLY contain strings, we suddenly gain access to Javascript string methods/properties, e.g., using "toUpperCase()"
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); -- this produces an error, because .map() isn't a property of strings -- only arrays -- and since TS correctly inferred that 'hobby' will exclusively refer to strings, we can't use .map()
}
