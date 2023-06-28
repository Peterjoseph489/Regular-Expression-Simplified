// 1. Known Single secure_url
const string = "https://res.cloudinary.com/do2cowrhb/image/upload/v1687896991/hg1npoeuz4j8sqi1137e.jpg";
const regex = /\/([^/]+)\.jpg$/;
const match = string.match(regex);
const extractedValue = match ? match[1] : null;
console.log(extractedValue);

// In this code, the regular expression /\/([^/]+)\.jpg$/ is used to match any characters that are not a forward slash (/) before the ".jpg" extension at the end of the string. 
// The desired value is captured as a group. If a match is found, the extracted value "hg1npoeuz4j8sqi1137e" is assigned to the variable extractedValue, which is then printed to the console.





// 2. Unknown Single secure_url
const secureUrl = "https://res.cloudinary.com/demo/image/upload/v1626321537/public_id.jpg";
const regex1 = /\/v\d+\/([^/.]+)/;
const match2 = secureUrl.match(regex1);
const publicId = match2 ? match2[1] : null;
console.log(publicId);

// /: The forward slash at the beginning indicates the start of the regular expression pattern.
// '\/': The escaped forward slash (\/) matches a literal forward slash character in the string.
// 'v': Matches the letter "v" literally.
// '\d+': Matches one or more digits (0-9). The \d represents a digit character, and the + quantifier ensures that one or more digits are matched.
// '\/': Matches a forward slash character.
// '([^/.]+)': This part captures the public_id. Let's break it down further:
// '[^/.]': The [^/.] is a character set that matches any character except a forward slash or a period. The caret ^ inside the character set negates the matching to exclude those characters.
// '+': The + quantifier specifies that one or more of these characters should be matched.
// '( and )': The parentheses capture the matching characters as a group.
// '\/': Matches a trailing forward slash character.

// To summarize, the regular expression pattern searches for a specific pattern in the secure_url string, starting from the "/v" and ending before the next forward slash or period. The characters between /v and the next forward slash or period are captured as the public_id.
// If a match is found, the captured public_id value is assigned to the publicId variable. If no match is found, publicId will be null.





// 3. Unknown Multiple secure_url
const secureUrl1 = "https://res.cloudinary.com/demo/image/upload/v1626321537/public_id1.jpg, https://res.cloudinary.com/demo/image/upload/v1626321537/public_id2.jpg, https://res.cloudinary.com/demo/image/upload/v1626321537/public_id3.jpg";
const regex2 = /\/v\d+\/([^/.]+)/g;
const matches = secureUrl1.match(regex2);
const publicIds = matches ? matches.map(match => match.match(/\/v\d+\/([^/.]+)/)[1]) : [];
console.log(publicIds);

// Regular Expression: /\/v\d+\/([^/.]+)/g
//      '/': The forward slash at the beginning indicates the start of the regular expression pattern.
//      '\/': The escaped forward slash (\/) matches a literal forward slash character in the string.
//      'v': Matches the letter "v" literally.
//      '\d+': Matches one or more digits (0-9). The \d represents a digit character, and the + quantifier ensures that one or more digits are matched.
//      '\/': Matches a forward slash character.
//      '([^/.]+)': This part captures the public_id. Let's break it down further:
//      '[^/.]': The [^/.] is a character set that matches any character except a forward slash or a period. The caret ^ inside the character set negates the matching to exclude those characters.
//      '+': The + quantifier specifies that one or more of these characters should be matched.
//      '( and )': The parentheses capture the matching characters as a group.
//      '/g': The g flag stands for "global" and is used to find all matches in the string rather than stopping at the first match.

// .Map Method Used
//      The .map() method is an array method in JavaScript that executes a provided function once for each element in an array and returns a new array with the results.
//      In the code, matches.map(match => match.match(/\/v\d+\/([^/.]+)/)[1]) uses .map() to iterate over each match found in the matches array. The arrow function (match => match.match(/\/v\d+\/([^/.]+)/)[1]) is executed for each element in matches.
//      Within the arrow function, match.match(/\/v\d+\/([^/.]+)/) applies the regular expression /\/v\d+\/([^/.]+)/ to each individual match string. This extracts the public_id value from each match by capturing the part between /v and the next forward slash or period.
//      Finally, the extracted public_id values are collected into a new array due to .map()'s nature of returning a new array. The resulting array of public_id values is assigned to the publicIds variable.
//      Overall, the regular expression is used to match and capture the public_id values in the secureUrl string, and the .map() method is employed to extract these values from each match and store them in an array.








