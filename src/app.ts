class Department {
    // private id: string;
    // private name: string;
    // public name: string; -> This is the opposite of the 'private' modifier; this is the default, however, so you don't need to explicitly set it
    // This protects the employees array from being modified from outside of the class -- only methods inside the class can modify it
    // private employees: string[] = [];

    // Protected is like private in that it protects properties, but it allows classes that extend this class to access/use the property
    protected employees: string[] = [];

    // Constructor is a method tied to this class/any instance of this class that is executed when a new object is instantiated
    constructor(private readonly id: string, public name: string) {
        // The parameters above are shorthand for adding properties without dually defining them up top and here
        // this.name = n;
        // this.id = id;
    }

    describe(this: Department) {
        console.log(`Department (${this.id}): ${this.name}`);
    }

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
}

const it = new ITDepartment('d1', ['Ben, Sterling']);
it.describe();
it.addEmployee('Max');
it.addEmployee('Manu');
it.printEmployeeInformation();

class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
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
    }

    printReports() {
        console.log(this.reports);
    }
}

const accounting = new AccountingDepartment('d2', []);
accounting.addReport('Something went wrong...');
accounting.addEmployee('Ben');
accounting.addEmployee('Manu');
accounting.printReports();
accounting.printEmployeeInformation();
