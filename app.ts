function add(n1: number, n2: number) {
    return n1 + n2;
}

// Special return type 'void' because we're not actually returning anything -- we're just console logging something. TS therefore adds a 'void' return type because the function doesn't return anything (well, technically it does, but it returns 'undefined' -- so, same as 'void' in essence).
// Again, we should let TS infer the function's return type; ': void' is just to illustrate how you can specify a return type.
function printResult(num: number): void {
    console.log('Result: ' + num);
}

printResult(add(5, 12));
