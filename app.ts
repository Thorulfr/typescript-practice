// The pipe in between type assignments indicates a 'union,' i.e. whatever types we include (and we can have more than two) are acceptable values
function combine(input1: number | string, input2: number | string) {
    let result;
    // One downside of unions: TS can't tell what types you're including in the union, it just sees that a particular value can accept multiple types, so TS will give us an error telling us that you can't use the + operator because it doesn't know that we included a union of number and string -- just that we have a union. We have to add runtime checks like the following if we want to use unions like this:
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);
