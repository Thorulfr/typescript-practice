// const userName = 'Ben';
// let age = 33;

// This is how to assign a default argument whilst assigning types to parameters
/* const add = (a: number, b: number = 1) => a + b;

console.log(add(2, 5));

const printOutput: (a: number | string) => void = (output) =>
    console.log(output);

const button = document.querySelector('button');

if (button) {
    button.addEventListener('click', (event) => console.log(event));
}

printOutput(add(5)); */

const hobbies = ['Guitar', 'Cooking', 'Concerts'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);
console.log(activeHobbies);

const person = { firstName: 'Ben', age: 33 };
// Creates a new object with the key-value pairs from the original object, rather than copying the pointer to the object
const copiedPerson = { ...person };
console.log(person, copiedPerson);

// This rest parameter merges all incoming parameters/values into an array
const add = (...numbers: number[]) => {
    return numbers.reduce((currentResult, currentValue) => {
        return currentResult + currentValue;
    }, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

const [hobby1, ...remainingHobbies] = hobbies;
console.log(hobby1, remainingHobbies);

const { firstName: userName, age } = person;

console.log(userName, age);
