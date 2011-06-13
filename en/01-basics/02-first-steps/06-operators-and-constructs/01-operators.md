
# Operators 

JavaScript has following basic operators...

=Cut


## Arithmetic operators   

<u>Basic arithmetic operators</u> are: `+, -, *, /, %`.

You can use them with variables and values like this:

[js run]
var i = 2;
i = (2+i) * 3 / i;
alert(i)
[/js]

Just to note. Integers division returns a float. In contrast to java, where `7/2 = 3` (integer division), JavaScript will give you a normal `3.5`.

<u>Modulo operator</u> `%` returns a remainder.

[js]
i = 5 % 2; // 1
i = 8 % 3; // 2
i = 6 % 3; // 0
[/js]


## String concatenation   

Operator `+` contatenates strings:
[js]
var a = "my" + "string" // mystring
[/js]

<b>If any of it's arguments is a string, then another operand is coerced into a string too.</b>

Unlike many other languages, there is no difference which argument is a string: the left one or the right one. In either case a non-string operand is  converted.

For example:

[js run]
alert( '1' + 2 ) // "12"
alert( 2 + '1' ) // "21"
[/js]


## Increment/decrement: `++, --`   

These operators increment or decrement a variable by one.

Unlike other arithmetic operators, they change a variable itself.

[js run]
var i = 3

i++      // increment to 4
alert(i) 

i--      // decrement to 3
alert(i)
[/js]

You can also put `++` and `--` before a variable (so-called <i>prefix form</i>):

[js]
i = 3;
++i; // now 4
--i; // back to 3 
[/js]

Besides changing the variable, these operators return a value. 

Which value is returned depends on the placement of `++(--)`. 

<dl>
<dt>Postfix form: `i++`</dt>
<dd>Returns a value and then increments:
[js run]
a = 2
alert(a++)  // 2
alert(a)    // 3
[/js]
</dd>
<dt>Prefix form: `++i`</dt>
<dd>Increments and then returns the value:
[js run]
a = 2;
alert(++a) // 3 
[/js]
</dd>
</dl>


## Bitwise operators   

Bitwise operators treat numbers as signed 32-bit integers. If you are not familiar with them, read the general stuff from wikipedia <a href="http://en.wikipedia.org/wiki/Bitwise_operation">Bitwise Operation</a> article. They are rarely used, so you can also skip the section.

Following bitwise operators are supported:
<ul>
<li>AND ( & )</li>
<li>OR ( | )</li>
<li>XOR ( ^ )</li>
<li>NOT ( ~ )</li>
<li>LEFT SHIFT ( &lt;&lt; )</li>
<li>RIGHT SHIFT ( &gt;&gt; )</li>
<li>ZERO-FILL RIGHT SHIFT ( &gt;&gt;&gt; )</li>
</ul>

Unlike C language, bitwise operations are not very fast in JavaScript: So they shouldn't be used low-level optimizations.

Most of them are rarely used. Especially, the exotic zero-fill right shift. If you are interested, read the <a href="https://developer.mozilla.org/en/JavaScript/Reference/Operators/Bitwise_Operators">manual</a>.

[#smart-int-ops]



### Smart integer operations   

There are several tricks with bitwise operations to make the code shorter and faster. 

That's because a single bitwise operation can give the same result as several ordinary numerical operations.

[smart header="Smart -(n+1)"]
The notable exception is bitwise NOT (~).

<b>Bitwise NOT on an integer `n` is same as `-(n+1)`.</b> 

That is a side effect of inversing every bit of a number.

For example:
[js]
alert( ~1 )  // -2
alert( ~-1 ) // 0
[/js]
[/smart]

[smart header="Smart rounding"]
Another use of binary operators is rounding. Because they treat numbers as integers, all of them cut off the decimal part.

For example, double bitwise NOT doesn't change the integer, but cuts off the decimal part:
[js run]
alert( ~~12.34 ) // 12
[/js]

Other bitwise operators can be used to do the same:
[js run]
alert( 12.9 ^ 0 )  // 12
alert( -13.5 << 0 ) // 13
[/js]

[/smart]

[smart header="Smart division by power of 2"]

Regular division by 2 may return a floating point number. But binary operation always returns integer. 

The right shift <code>a &gt;&gt; b</code> operator is actually same as <code>a/2<sup>b</sup></code>. 

See examples:
[js run]
alert( 5 >> 1 ) // integer division without a remainder: 5 / 2 = 2

alert( 21 >> 2 ) // 21 / 4 = 5

alert( 21 >> 3 ) // 21 / 8 = 2

alert( 21 >> 4 ) // 21 / 16 = 1
[/js]
[/smart]


## Logical (boolean) operators   

Like many other languages, JavaScript provides boolean evaluations.

The operators are: 
<ul>
<li>Logical AND ( && )</li>
<li>Logical OR ( || )</li>
<li>Logical NOT ( ! )</li>
</ul>

Unlike bitwise operators, logical AND, OR, NOT operate with boolean values.
[js run]
alert( true && false ) // false

alert( false || true ) // true

alert( !false ) // true
[/js]

In JavaScript, <b>logical operators can be applied to anything</b>. A non-boolean value is converted into boolean for the purposes of evaluation.

There is a short list of <i>falsy</i> values, which are 0, empty string '' and few special values such as `null` and `undefined`. All other values are `true`.

Logical evaluations are <a href="http://en.wikipedia.org/wiki/Short-circuit_evaluation">short-circuit</a>. In other words, they never evaluate more than needed. 

<b>The result is the value which evaluated last.</b>

For example, operator OR:

[js run]
// Left operand is true,
// OR stops and returns it immediately
alert(1 || 0)  // *!*1*/!*, the last evaluated value

// Left operand is false,
// the evaluation goes to the right operand 
alert(0 || 1)  //  *!*1*/!*, the last evaluated value
[/js]

What if both operands are falsy? 
[js run]
// Left operand is false,
// the evaluation goes to the right operand 
alert('' || null)  //  *!*null*/!*, the last evaluated value
[/js]

<blockqoute>
Logical OR is useful when you have multiple variables and need to get the first one which is true:

[js run]
var b = false
var n = 0
var s = "O-la-la"

var result = b || n || s 

alert(result) // "O-la-la" 
[/js]
</blockquote>

Operator AND is similar:

[js run]
// Left operand is true,
// AND needs to check the right operand also
alert(1 && 0)  // *!*0*/!*, the last evaluated value
alert(1 && 5)  // *!*5*/!*, the last evaluated value


// Left operand is false,
// AND stops immediately and returns it
alert(null && 5)  // *!*null*/!*, the last evaluated value
[/js]

As of NOT operator `"!"`, it converts its operand into boolean and negates it. The result is always a boolean value.

[js run]
alert( !true ) // false
alert( !0 )  // true
[/js]

<b>Double NOT is used to convert a value into boolean</b>:

[js run]
alert( !!"string" )  // true
alert( !!null ) // false
[/js]


## Assignment operators   

Most operators may be used as assignment.

The list is: <code>=, +=, -=, *=, /=, &gt;&gt;=, &lt;&lt;=, &gt;&gt;&gt;=, &=, |=, ^=</code>.

A usage pattern may look like:
[js]
i = 2;
i += 5; // 7
i *= 2; // 14
[/js]

Note, boolean operators can't be used like that. For example, `a ||= b` will give error, because there is no operator `"||="` (check the list above).

[smart header="Comma operator"]
There is an "advanced" JavaScript operator, named the `comma operator`.

The <i>comma operator</i> allows to list statements delimited by "," and returns the value of the last one.

The following syntax is a valid comma operator example:

[js run]
a = (5, 6)  

alert(a)
[/js]

Brackets are put for correct priority, because "," usually goes after assignment. So, the code without brackets would evaluate as `(a=5),6`.

There is no real need in comma operator, but it allows to put multiple statements in one line and made the code shorter. Like this:

[js]
for(var i=0, j=obj.length; i<j; i++ ) {
  // ...
}
[/js]

In the example above, `j=obj.length` is merged with the loop start to evade extra line. 
[/smart]

