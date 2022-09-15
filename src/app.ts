type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const employeeOne: ElevatedEmployee = {
    name: 'Ben',
    privileges: ['create-server'],
    startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

// Creating an intersection of two union types above causes TS to find anywhere the two types intersect; here, it's the 'number' type, so if you hover over Universal, you'll see it's of type 'number.'
type Universal = Combinable & Numeric;

// Function overloads allows us to take the same function and essentially return a specific type based on the parameters we're given. So, below, we're saying if we call add() with two numbers, we always get back a number -- likewise for two strings, even though in the function declaration we're saying the parameters can either be numbers OR strings. This lets us work around TS not knowing what the return type will be because we're giving it multiple options for parameter types. This allows us to, for instance, use add() with two strings and be able to use methods reserved for strings (like split() below), which we wouldn't be able to do otherwise (because TS can't be sure that the result will be a string).
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
    // This is called a 'typeguard' because it allows us to utilize the flexibility of union types and still ensure that the code runs correctly at runtime.
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Ben', 'Holt');
result.split(' ');
console.log(result);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(employee: UnknownEmployee) {
    console.log('Name: ' + employee.name);
    // 'in' is JS code that allows us to check if 'privileges' is a property of 'employee.'
    if ('privileges' in employee) {
        console.log('Privileges: ' + employee.privileges);
    }
    if ('startDate' in employee) {
        console.log('Start: ' + employee.startDate);
    }
}

printEmployeeInformation(employeeOne);
printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount: number) {
        console.log('Loading cargo... ' + amount);
    }
}

type Vehicle = Car | Truck;

const vehicleOne = new Car();
const vehicleTwo = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // 'instanceof' is a vanilla JS operator that checks to see if an object is an instance of a particular class. We cannot, however, use this if we are using an INTERFACE (rather than a class) because interfaces are TS-specific and do not compile to anything in vanilla JS.
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(vehicleOne);
useVehicle(vehicleTwo);

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// const userInputEl = document.getElementById('user-input')!; --> The '!' tells TS that this won't be null
// This is typecasting -- we're telling TS that what this document.getElementById method is grabbing WILL be an HTMLInputElement.
// First option: const userInputEl = <HTMLInputElement>document.getElementById('user-input');
// Second option (and they're equivalent) -- this one is provided because React uses its own <> syntax, so we can't use that to typecast:
const userInputEl = document.getElementById('user-input') as HTMLInputElement;

// If we want to add a runtime type-check:
/* const userInputEl = document.getElementById('user-input');
if (userInputEl) {
    (userInputEl as HTMLInputElement).value = 'Hi there!';
} */
// This is just to show where you have to typecast if doing this sort of thing.

userInputEl.value = 'Hi there!';

// Index types
interface ErrorContainer {
    // {email: 'Not a valid email', username: 'Must start with a character'}
    // This is essentially saying: 'I don't know the property name or count. I just know that any property I add to an object based on ErrorContainer must have a property name that can be interpreted as a string AND the value of that property must be a string.
    [property: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    // 1: 'Not a valid email!' --> We could use one here because '1' CAN be interpreted as a string and, in fact, JS will do so.
    username: 'Must start with a capital character!',
    // Because we used the 'index' property, we could add as many properties to this object as we want, even though we don't explicitly define them in the interface, as long as those properties conform to the rules we set forth when creating the interface.
};
