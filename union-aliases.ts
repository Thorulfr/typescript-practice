// Creates a type alias so we don't have to type out 'number | string' everywhere else in our code
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-string';

// The pipe in between type assignments indicates a 'union,' i.e. whatever types we include (and we can have more than two) are acceptable values
function combine(
    input1: Combinable,
    input2: Combinable,
    // Use a literal type to not only define what *type* the value must be but also exactly which values of that type are even acceptable
    resultConversion: ConversionDescriptor
) {
    let result;
    // One downside of unions: TS can't tell what types you're including in the union, it just sees that a particular value can accept multiple types, so TS will give us an error telling us that you can't use the + operator because it doesn't know that we included a union of number and string -- just that we have a union. We have to add runtime checks like the following if we want to use unions like this:
    if (
        (typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number'
    ) {
        // The + prefix forces conversion to number type
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
    /* if (resultConversion === 'as-number') {
        // The + prefix forces conversion to number type
        return +result;
    } else {
        return result.toString();
    } */
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

// Third parameter, defined using literal type, tells us to take two number-strings but return them as a number
const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-string');
console.log(combinedNames);
