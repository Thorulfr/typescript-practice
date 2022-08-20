// Explicitly declaring specific object type with typed key/value pairs; not good practice but left as demonstration. Better to just let Typescript infer type
/* const person: {
    name: string;
    age: number;
} = { */
const person: {
    name: string;
    age: number;
    hobbies: string[];
    // This line defines role as a tuple, a very specific type of array
    role: [number, string];
} = {
    name: 'Benjamin',
    age: 33,
    hobbies: ['Guitar', 'Cooking', 'Languages', 'Music'],
    role: [1, 'Guitarist'],
};

// This works, even though it seems like it shouldn't -- .push() on a tuple is not enforced by TS
// person.role.push('admin');
// These, however, do not work -- because it doesn't match the tuple definition we set above
// person.role[1] = 10;
// person.role = [0, 'admin', 'user']

let favoriteActivities: string[];
favoriteActivities = ['Playing guitar'];

console.log(person.name);

// Because we only put strings in the hobbies array, Typescript correctly infers that it's exclusively an array containing strings, i.e. string[]
for (const hobby of person.hobbies) {
    // Because Typescript knows that the array will ONLY contain strings, we suddenly gain access to Javascript string methods/properties, e.g., using "toUpperCase()"
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); -- this produces an error, because .map() isn't a property of strings -- only arrays -- and since TS correctly inferred that 'hobby' will exclusively refer to strings, we can't use .map()
}
