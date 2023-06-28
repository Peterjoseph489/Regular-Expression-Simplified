// 1. Creating a regular expression
// A regular expression is a type of object. It can be either constructed with the RegExp constructor or written as a literal value by enclosing a pattern in forward slash (/) characters.

let re1 = new RegExp('abc');
let re2 = /abc/;

console.log(re2);

let eighteenPlus = /eighteen\+/
console.log(eighteenPlus)




// 2. Testing for Matches
// Regular expression objects have a number of methods. The simplest one is test. If you pass it a string, it will return a Boolean telling you whether the string contains a match of the pattern in the expression.

console.log(/abc/.test('abcde'));
console.log(/abc/.test('abxde'));




// 3. Sets of Characters
// Finding out whether a string contains abc could just as well be done with a call to indexOf. Regular expressions allow us to express more complicated patterns.
// Say we want to match any number. In a regular expression, putting a set of characters between square brackets makes that part of the expression match any of the characters between the brackets.
// Both of the following expressions match all strings that contain a digit:

console.log(/[0123456789]/.test('in 1992'))
console.log(/[0-9]/.test('in 1992'))

// A number of common character groups have their own built-in shortcuts. Digits are one of them: \d means the same thing as [0-9].
//      \d Any digit character
//      \w An alphanumeric character (“word character”)
//      \s Any whitespace character (space, tab, newline, and similar)
//      \D A character that is not a digit
//      \W A nonalphanumeric character
//      \S A nonwhitespace character
//      . Any character except for newline.

// So you could match a date and time format like 01-30-2003 15:20 with the following expression:

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));
// → true
console.log(dateTime.test("30-jan-2003 15:20"));
// → false


// To invert a set of characters—that is, to express that you want to match any character except the ones in the set—you can write a caret (^) character after the opening bracket.
let notBinary = /[^01]/;
console.log(notBinary.test('1100100010100110'));
console.log(notBinary.test('1100100010200110'));



// 4. Repeating Parts of a pattern
// We now know how to match a single digit. What if we want to match a whole number—a sequence of one or more digits?
// When you put a plus sign (+) after something in a regular expression, it indicates that the element may be repeated more than once. Thus, /\d+/ matches one or more digit characters.

console.log(/'\d+'/.test("'123'"))
console.log(/'\d+'/.test("''"))
// The star (*) has a similar meaning but also allows the pattern to match zero times
console.log(/'\d*'/.test("'123'"))
console.log(/'\d*'/.test("''"))

// A question mark makes a part of a pattern optional, meaning it may occur zero times or one time. In the following example, the u character is allowed to occur, but the pattern also matches when it is missing.
let neighbor = /neighbou?r/;
console.log(neighbor.test('neighbour'));
console.log(neighbor.test('neighbor'));

// To indicate that a pattern should occur a precise number of times, use braces. 
// Putting {4} after an element, for example, requires it to occur exactly four times. It is also possible to specify a range this way: {2,4} means the element must occur at least twice and at most four times.
// Here is another version of the date and time pattern that allows both single- and double-digit days, months, and hours. It is also slightly easier to decipher.

let dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}\:\d{2}/;
console.log(dateTime2.test('1-30-2003 9:45'));




// 5. Grouping subexpressions
// To use an operator like * or + on more than one element at a time, you have to use parentheses. A part of a regular expression that is enclosed in parentheses counts as a single element as far as the operators following it are concerned.
    
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true

// The first and second + characters apply only to the second o in boo and hoo, respectively. The third + applies to the whole group (hoo+), matching one or more sequences like that.
// The i at the end of the expression in the example makes this regular expression case insensitive, allowing it to match the uppercase B in the input string, even though the pattern is itself all lowercase.




// 6. Matches and Groups
// The test method is the absolute simplest way to match a regular expression. It tells you only whether it matched and nothing else. Regular expressions also have an exec (execute) method that will return null if no match was found and return an object with information about the match otherwise.
let match = /\d+/.exec('one two 100')
console.log(match);
console.log(match.index);

// String values have a match method that behaves similarly
console.log('one two 100'.match(/\d+/))

// When the regular expression contains subexpressions grouped with parentheses, the text that matched those groups will also show up in the array. The whole match is always the first element. The next element is the part matched by the first group (the one whose opening parenthesis comes first in the expression), then the second group, and so on.
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));

// When a group does not end up being matched at all (for example, when followed by a question mark), its position in the output array will hold undefined. Similarly, when a group is matched multiple times, only the last match ends up in the array.
console.log(/bad(ly)?/.exec('bad'));
console.log(/(\d)+/.exec('123'));




// 7. THE DATE CLASS
// JavaScript has a standard class for representing dates—or, rather, points in time. It is called Date. If you simply create a date object using new, you get the current date and time.

console.log(new Date());
// You can also create an object for a specific time.
console.log(new Date(2023, 11, 9))


// The getTime method on a date object returns this number. It is big, as you can imagine.
console.log(new Date(2013, 11, 19).getTime());
// If you give the Date constructor a single argument, that argument is treated as such a millisecond count. You can get the current millisecond count by creating a new Date object and calling getTime on it or by calling the Date.now function.
// Date objects provide methods such as getFullYear, getMonth, getDate, getHours, getMinutes, and getSeconds to extract their components.
// Besides getFullYear there’s also getYear, which gives you the year minus 1900 (98 or 119) and is mostly useless.
// Putting parentheses around the parts of the expression that we are interested in, we can now create a date object from a string.

function getDate(string) {
    let [_, month, day, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)





// 8. Word and string boundaries
// Unfortunately, getDate will also happily extract the nonsensical date 00-1-3000 from the string "100-1-30000". A match may happen anywhere in the string, so in this case, it’ll just start at the second character and end at the second-to-last character.
// If we want to enforce that the match must span the whole string, we can add the markers ^ and $. 
// The caret matches the start of the input string, whereas the dollar sign matches the end. 
// So, /^\d+$/ matches a string consisting entirely of one or more digits, 
// /^!/ matches any string that starts with an exclamation mark,  
//and /x^/ does not match any string (there cannot be an x before the start of the string).
// If, on the other hand, we just want to make sure the date starts and ends on a word boundary, we can use the marker \b. A word boundary can be the start or end of the string or any point in the string that has a word character (as in \w) on one side and a nonword character on the other.

console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false

// Note that a boundary marker doesn’t match an actual character. It just enforces that the regular expression matches only when a certain condition holds at the place where it appears in the pattern.






// 9. Choice Patterns
// Say we want to know whether a piece of text contains not only a number but a number followed by one of the words pig, cow, or chicken, or any of their plural forms.
// We could write three regular expressions and test them in turn, but there is a nicer way. The pipe character (|) denotes a choice between the pattern to its left and the pattern to its right. So I can say this:

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false

// Parentheses can be used to limit the part of the pattern that the pipe operator applies to, and you can put multiple such operators next to each other to express a choice between more than two alternatives.


// 10. The Mechanics of Matching
// 11. BackTracking
// 12. The Replace Method
// 13. Greed
// 14. Dynamically Creating RegExp Objects
// 15. The Search Method
// 16. The LastIndex Property
// 17. Looping Over Matches
// 18. Parsing an Ini File
// 19. International Characters


// SUMMARY
//      /abc/ A sequence of characters
//      /[abc]/ Any character from a set of characters
//      /[^abc]/ Any character not in a set of characters
//      /[0-9]/ Any character in a range of characters
//      /x+/ One or more occurrences of the pattern x
//      /x+?/ One or more occurrences, nongreedy
//      /x*/ Zero or more occurrences
//      /x?/ Zero or one occurrence
//      /x{2,4}/ Two to four occurrences
//      /(abc)/ A group
//      /a|b|c/ Any one of several patterns
//      /\d/ Any digit character
//      /\w/ An alphanumeric character (“word character”)
//      /\s/ Any whitespace character
//      /./ Any character except newlines
//      /\b/ A word boundary
//      /^/ Start of input
//      /$/ End of input


// A regular expression has a method test to test whether a given string matches it. It also has a method exec that, when a match is found, returns an array containing all matched groups. Such an array has an index property that indicates where the match started.
// Strings have a match method to match them against a regular expression and a search method to search for one, returning only the starting position of the match. Their replace method can replace matches of a pattern with a replacement string or function.
// Regular expressions can have options, which are written after the closing slash. The i option makes the match case insensitive. The g option makes the expression global, which, among other things, causes the replace method to replace all instances instead of just the first. They option makes it sticky, which means that it will not search ahead and skip part of the string when looking for a match. The u option turns on Unicode mode, which fixes a number of problems around the handling of characters that take up two code units.
// Regular expressions are a sharp tool with an awkward handle. They simplify some tasks tremendously but can quickly become unmanageable when applied to complex problems. Part of knowing how to use them is resisting the urge to try to shoehorn things that they cannot cleanly express into them.














