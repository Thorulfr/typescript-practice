// Explicitly declaring specific object type with typed key/value pairs; not good practice but left as demonstration. Better to just let Typescript infer type
/* const person: {
    name: string;
    age: number;
} = { */
var person = {
    name: 'Benjamin',
    age: 33,
    hobbies: ['Guitar', 'Cooking', 'Languages', 'Music']
};
var favoriteActivities;
favoriteActivities = ['Playing guitar'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
