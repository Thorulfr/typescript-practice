class Department {
    // private id: string;
    // private name: string;
    // public name: string; -> This is the opposite of the 'private' modifier; this is the default, however, so you don't need to explicitly set it
    // This protects the employees array from being modified from outside of the class -- only methods inside the class can modify it
    private employees: string[] = [];

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
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const accounting = new Department('d1', 'Accounting');

accounting.describe();
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.printEmployeeInformation();

/* const accountingCopy = {
    name: 'HR',
    describe: accounting.describe,
};

accountingCopy.describe();
 */
