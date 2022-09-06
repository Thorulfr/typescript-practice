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

console.log(employeeOne);

type Combinable = string | number;
type Numeric = number | boolean;

// Creating an intersection of the two types above causes TS to find anywhere the two types intersect; here, it's the 'number' type, so if you hover over Universal, you'll see it's of type 'number.'
type Universal = Combinable & Numeric;
