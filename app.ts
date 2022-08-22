// Unknown accepts any type, but is different from the 'any' type in that if we set another variable, such as userName, we can't set userName to equal userInput, because there is a type mismatch.
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
// TS doesn't give us an error here, even though we have an unknown type, because it recognizes that we're adding in validation/type-checking.
if (typeof userInput === 'string') {
    userName = userInput;
}

// We get an error here if we leave userInput as an unknown type.
// userName = userInput;
