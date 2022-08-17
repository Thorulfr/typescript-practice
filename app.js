function add(n1, n2, showResult, phrase) {
    if (showResult) {
        var result_1 = phrase + n1 + n2;
        console.log(result_1, typeof result_1);
    }
    return n1 + n2;
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
var result = add(number1, number2, printResult, resultPhrase);
