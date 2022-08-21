// Explicitly declaring specific object type with typed key/value pairs; not good practice but left as demonstration. Better to just let Typescript infer type
/* const person: {
    name: string;
    age: number;
} = { */
/* const person: {
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
}; */

// Enum creates a custom type (Role here) that assigns numbers to each of these labels, so 0 = ADMIN, 1 = READ_ONLY, etc.
enum Role {
    ADMIN,
    // ADMIN = 5, -> This assigns the starting number to 5, so READ_ONLY will be 6, etc.
    // ADMIN = 'ADMIN', -> We're not just limited to numbers, we can also use strings or even mix strings and numbers
    READ_ONLY,
    // READ_ONLY = 100, -> We can assign individual numbers to each label if we want
    AUTHOR,
}

const person = {
    name: 'Benjamin',
    age: 33,
    hobbies: ['Guitar', 'Cooking', 'Languages', 'Music'],
    // The below code assigns the role to '0'; enums allow us to use human-friendly language in our code
    role: Role.ADMIN,
};

// This works, even though it seems like it shouldn't -- .push() on a tuple is not enforced by TS
// person.role.push('admin');
// These, however, do not work -- because it doesn't match the tuple definition we set above
// person.role[1] = 10;
// person.role = [0, 'admin', 'user']

let favoriteActivities: string[];
// let favoriteActivities: any; -> Tells Typescript anything can go in here and not to infer a type
// let favoriteActivities: any[]; -> Tells TS we at least want this to be an array, even if anything can go inside it
favoriteActivities = ['Playing guitar'];

console.log(person.name);

// Because we only put strings in the hobbies array, Typescript correctly infers that it's exclusively an array containing strings, i.e. string[]
for (const hobby of person.hobbies) {
    // Because Typescript knows that the array will ONLY contain strings, we suddenly gain access to Javascript string methods/properties, e.g., using "toUpperCase()"
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); -- this produces an error, because .map() isn't a property of strings -- only arrays -- and since TS correctly inferred that 'hobby' will exclusively refer to strings, we can't use .map()
}
if (person.role === Role.ADMIN) {
    console.log(person.name + ' is an admin');
}
