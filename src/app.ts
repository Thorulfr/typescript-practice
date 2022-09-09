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

function add(a: Combinable, b: Combinable) {
    // This is called a 'typeguard' because it allows us to utilize the flexibility of union types and still ensure that the code runs correctly at runtime.
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

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
