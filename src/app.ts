// If you have any abstract methods in a class, you also have to make the entire class abstract.
abstract class Department {
    // private id: string;
    // private name: string;
    // public name: string; -> This is the opposite of the 'private' modifier; this is the default, however, so you don't need to explicitly set it
    // This protects the employees array from being modified from outside of the class -- only methods inside the class can modify it
    // private employees: string[] = [];

    // Protected is like private in that it protects properties, but it allows classes that extend this class to access/use the property
    protected employees: string[] = [];

    // Constructor is a method tied to this class/any instance of this class that is executed when a new object is instantiated
    constructor(protected readonly id: string, public name: string) {
        // The parameters above are shorthand for adding properties without dually defining them up top and here
        // this.name = n;
        // this.id = id;
    }

    // Note: When you add static properties and/or methods, you can't access them outside of the class (meaning in non-static parts); you couldn't, for instance, in the constructor (using 'console.log(this.fiscalYear)'). You'd have to do 'console.log(Department.fiscalYear).'
    static fiscalYear = 2020;
    static createEmployee(name: string) {
        return { name: name };
    }

    // If we leave this method empty and prefix it with 'abstract,' it REQUIRES all classes that extend this class to have a method called describe -- but since we leave this empty, we have to define the describe() method in each inheriting class. Essentially, this says "Hey, you HAVE to have a method called describe() but you have to define it yourself," forcing developers to create unique methods that meet the needs of each inheriting class.
    // To create an abstract class, remove the curly brackets and add the return type the method should have.
    abstract describe(this: Department): void;
    // console.log(`Department (${this.id}): ${this.name}`);

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        this.employees.length === 1
            ? console.log(this.employees.length + ' employee')
            : console.log(this.employees.length + ' employees');
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        // You have to call super before you're able to use the 'this' keyword
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('IT Department ID: ' + this.id);
    }
}

// You call static methods directly on the class without having to instantiate that class -- similar to Math.floor(), etc.
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Ben, Sterling']);
it.describe();
it.addEmployee('Max');
it.addEmployee('Manu');
it.printEmployeeInformation();

class AccountingDepartment extends Department {
    private lastReport: string;

    // Getters allow us to make private information publicly readable (but not writeable). Private properties are not accessible using dot notation, but getters provide us an internal method to read and display information contained in private properties.
    get mostRecentReport() {
        if (this.lastReport) {
            // A getter method has to return something.
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    // Setters serve the same purpose as getters, just to write to properties (rather than read them). Setters have to have arguments.
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid report.');
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    describe() {
        console.log('Accounting Department ID: ' + this.id);
    }

    // We can override methods from the base class
    addEmployee(name: string) {
        if (name === 'Ben') {
            return;
        }
        // This throws an error if 'employees' is private. Private properties are really only accessible from inside the class in which they are defined, not inside classes that inherit from that original class. If we change private to 'protected,' like we did, this now works
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const accounting = new AccountingDepartment('d2', []);
// This is accessed like a normal property, NOT like a method
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);
accounting.mostRecentReport = 'Something went right!';
console.log(accounting.mostRecentReport);
accounting.addEmployee('Ben');
accounting.addEmployee('Manu');
accounting.printReports();
accounting.printEmployeeInformation();
accounting.describe();
