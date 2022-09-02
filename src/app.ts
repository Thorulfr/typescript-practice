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
        console.log(this.employees.length + ' employees');
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

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

const accounting = new AccountingDepartment('d2', []);
accounting.addReport('Something went wrong...');
accounting.printReports();
