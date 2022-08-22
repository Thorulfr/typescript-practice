function add(n1: number, n2: number) {
    return n1 + n2;
}

// Special return type 'void' because we're not actually returning anything -- we're just console logging something. TS therefore adds a 'void' return type because the function doesn't return anything (well, technically it does, but it returns 'undefined' -- so, same as 'void' in essence).
// Again, we should let TS infer the function's return type; ': void' is just to illustrate how you can specify a return type.
function printResult(num: number): void {
    console.log('Result: ' + num);
}

printResult(add(5, 12));

// let combineValues: Function; -> This tells TS that combineValues should store a function, but it could be ANY function -- so if we set it to be printResult, for example, we'd run into an error because printResult doesn't take two arguments like we're adding in the console.log below.

// This line tells us that combineValues contains a function with NO parameters and then returns a number.
// let combineValues: () => number;

// This now tells us that combineValues should accept any functions with two parameters, each of which should be a number, and returns a number.
let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = 5; -> If we don't specify a type for combineValues, Ts infers "any" -- so we could set combineValues to 5 and TS wouldn't throw any errors, but we'd hit one in runtime telling us that combineValues is not a function.

console.log(combineValues(8, 8));
