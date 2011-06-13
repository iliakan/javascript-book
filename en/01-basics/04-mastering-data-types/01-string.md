
# String 

The String is by far one of the most used type in JavaScript.

There are programming languages that differ "chars" from "strings". But in JavaScript, there are only strings, no chars. That really makes life simpler.

Another feature is that internally all strings are unicode, no matter which encoding is used.

=Cut


## String creation   

String objects are usually created using string literals:

[js]
var text = "my value";
var anotherText = 'another string';
var str = "012345";
[/js]

There is <b>no difference between single and double quote</b> in JavaScript. 

String literals may contain special characters denoted by escape-sequences, a <i>newline symbol</i> and others.


### Special characters   

Here is a list of special characters and sequences:

<table>
<tr><th>Character</th><th>Description</th>
<tr><td>\b</td><td>Backspace</td></tr>
<tr><td>\f</td><td>Form feed</td></tr>
<tr><td>\n</td><td>New line</td></tr>
<tr><td>\r</td><td>Carriage return</td></tr>
<tr><td>\t</td><td>Tab</td></tr>
<tr><td>\u<I>NNNN</td><td>The Unicode character which code is given by the four hexadecimal digits <I>NNNN</I>. For example, \u00A9 is the Unicode sequence for the copyright symbol.</td></tr>
</table>

Note that <b>strings in JavaScript are Unicode internally</b>.

The newline symbol is by far the most popular:

[js run]
var multiLine = " first \n second \n third line "
alert(multiLine) // alerts 3 lines
[/js]


### Escaping, special chars   

An <i>escaping</i> is prepending a character by backslash '\'.

First, if <b>single quotes appear inside a single-quoted string, they need to be escaped</b>:

[js]
var str = '*!*I\'m*/!* the Valrus'
[/js]

In this particular case the double-quoted string could work also:
[js]
var str = "I'm the Valrus"  // no need escaping.
[/js]

The same applies to double quotes. Escaping is required for double quotes inside a double-quoted string:
[js]
var str = " double \" quote "
[/js]

<b>Backslash symbol '\' has to be escaped always</b>:
[js run]
var str = " '\\' "

alert(str) // '\'
[/js]


## Methods and properties   

There are many properties in JavaScript strings. Let's discuss the most important ones first.


### Length   

Every string has a length (a number of unicode symbols).

[js run]
var str = "My\n" // 3 characters. The third symbol is newline

alert(str.length)  // 3 
[/js]


### Accessing characters   

To access a single character, use `charAt` call. First character starts at `0`:

[js run]
var str = "catty"
alert( str.charAt(0) )  // "c"
[/js]

There is <b>no "character" type in JavaScript</b>, so `charAt` actually returns a substring containing exactly one symbol.

[smart]
In recent browsers (excluding IE&lt;8) you can also use index to access the character:

[js run]
var str = "I'm the modern browser!" 
alert(str[0])  // "I"
[/js]
[/smart]


### Manipulating strings   

A <b>string cannot be changed</b> in JavaScript. You can read a character, but you can't replace it.

The usual workaround is to change a string variable: create a new string and reassign it instead of the old one, like in the example below:

[js run]
var str = "string"

str = str.charAt(2) + str.charAt(3) + str.charAt(4) + str.charAt(5)

alert(str) // ring
[/js]

In this example `str.charAt(2), charAt(3)...` calls get characters on given positions and operator `"+"` performs concatination (joining) of them.


### Lowercasing / Uppercasing   

Methods `toLowerCase()` and `toUpperCase()` change the case of a whole string:

[js run]
alert( "Hey-ho!".toUpperCase() )
[/js]

The following code gets the first char and lowercases it.
[js]
alert( "Hey-ho!".charAt(0).toLowerCase() )
[/js]



[task src="task/uppercase-char.md"]



### Finding a substring   

To find a substring, there exists an <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/indexOf">indexOf</a> method. 

It returns the position of a first occurence of a substring or -1 if nothing found:

[js run]
var str = "Widget with id"

alert( str.indexOf("Widget") ) // 0
alert( str.indexOf("id") ) // 1
alert( str.indexOf("Lalala") ) // -1
[/js]

An optional second argument allows to search from an index.

For example, the first occurence of `"id"` is at index 1. So, let's find one more:

[js run]
var str = "Widget with id"

alert( str.indexOf("id", 2) ) // 12, search starts from char 2
[/js]


There is also a similar method <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/lastIndexOf">lastIndexOf</a> which searches backwards, from the end of the string.


[smart]
In the article [](#smart-int-ops), there was a bitwise NOT '~' operator: `~n` is same as `-(n+1)`.

This feature is used to check for -1, because `~-1 == 0`:
[js run]
alert( ~-1 ) // 0
[/js]

The check match becomes `~indexOf`:
[js run]
var str = "Widget"
if( ~str.indexOf("get") ) {
  alert('match!')
}
[/js]

Generally, abusing language features in a non-obvious way is a bad thing, because lowers readability.

But here, everything's all right. Just remember: `'~` reads as "not minus one", and `"if ~indexOf"` reads as `"if found"`.

[/smart]

[task src="task/checkspam.md"]



### Extracting a substring: `substr`, `substring`, `slice`.   

In JavaScript, there are 3 (!) methods to extract a portion of a substring, but with minor differences.

<dl>
<dt>`substring(start [, end])`
<dd>
Method `substring(start, end)` extracts a substring from `start` to, but not including position `end`. The count starts from 0.

[js run]
var str = "*!*s*/!*tringify"
alert(str.substring(0,1)) // "s"
[/js]

If `end` is omited, it goes till the end of string:

[js run]
var str = "st*!*ring*/!*ify"
alert(str.substring(2)) // ringify
[/js]
</dd>
<dt>`substr(start [, length])`</dt>
<dd>The first argument is same as in `substring`, but second argument is "how many characters to extract" instead of ending position.

[js run]
var str = "st*!*ring*/!*ify"
str = str.substr(2,4) // ring
alert(str)
[/js]

Again, the omitted second parameter means go till the end of string.</dd>
<dt>`slice(start [, end])`</dt>
<dd>Returns a portion of the string from position `start` to, but not including position `end`. That's same as `substring`.</dd>
</dl>

<b>The difference between `substring` and `slice` is how they treat negative and overflow values:</b>

<dl>
<dt>`substring(start, end)`</dt>
<dd>Negative values become zero. Too large value becomes string length:

[js run]
alert( "testme".substring(-2) )  // "testme", -2 becomes 0
[/js]

Also, if <code>start &gt; end</code>, the arguments are swapped:
 
[js run]
alert( "testme".substring(4, -1) )  // "test"
// -1 becomes 0 -> gives us substring(4, 0) 
// 4 > 0 so arguments are swapped -> gives us substring(0, 4) = "test"
[/js]

That arguments swapping is kind of counter-intuitive. But guess, the idea is to get a substring <i>between</code> two indices.
</dd>
<dt>`slice`</dt>
<dd>Negative values mean to go backwards from the tail:

[js run]
alert( "testme".slice(-2) )  // "me", from position last-2 to end
[/js]

[js run]
alert( "testme".slice(1, -1) )  // "estm", from 2nd to 2nd from tail.
[/js]

That's much more convenient than `substring`.
</dd>
</dl>

Negative indexes are also supported in `substr` by all browsers except IE.

[sum]
Conclusion. 

The method of choice is `slice(start, end)`. 

Or, alternatively, `substr(start, length)` with non-negative `start` (negative doesn't work in IE).
[/sum]



[task src="task/truncate.md"]


## Comparison   

Strings are compared lexicographicaly. For two strings inequality <code>s1 &gt; s2</code> is checked using simple algorithm:

<ol><li>Compare first chars: `a = s1.charAt(0)` with `b = s2.charAt(0)`. If they are equal then continue, else return &gt; or &lt;</li>
<li>Compare second character, etc</li>
</ol>

The standard defines that more precisely, although the point is clear (I hope): characters are compared one by one. This order we can see in a dictionary or a phonebook.

[js]
"Z" > "A" // true
"Bob" > "Bar" // true, because o > a
"aa" > "a"  // true, because an absence of a char always loses in comparison
[/js]

Check it out:

[js]
alert("a" > "Z") // true, cause lowercased letters go higher in browser characters list
[/js]


### Strings vs Numbers   

Note the difference in behavior between strings and numbers in comparisons:

[js run]
alert(2 > 14);  // false
alert("2" > "14"); // true, because "2" > "1" (first char matters)
[/js]

But note:
[js run]
alert(2 > "14"); // false
[/js]

That's because if any of the operands is not string, then both operands become numbers, and the comparison becomes correct.



## Summary   

Now you know:

<ul>
<li>How to write a string, with special symbols and quoting.</li>
<li>How to strings are compared.</li>
<li>How to extract a portion of string.</li>
</ul>

In addition to concatenation which is done by "+" operator, that's all we need in most of cases.

Later we'll discuss regular expression, that's important in JavaScript also.

To learn about other methods of String, you can browse <a href="https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/String">Mozilla manual</a>.

