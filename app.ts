// Explicitly declaring specific object type with typed key/value pairs; not good practice but left as demonstration. Better to just let Typescript infer type
/* const person: {
    name: string;
    age: number;
} = { */
const person = {
    name: 'Benjamin',
    age: 33,
};

console.log(person.name);
