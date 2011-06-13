
# Comparison operators, if..else 

The `if..else` construct checks for a condition and executes different code whenever it is true or false.

=Cut

Most well-known comparison operators are:
<ul>
<li>==</li>
<li>&gt;, &lt;, &gt;=, &lt;=</li>
</ul>

The `if` operator checks it and executes the code if the condition is correct, or in other words, <i>true</i>:
[js]
if (price > 100) {
  alert('Expensive!')
}
[/js]

The `else` block is executed when the condition is wrong or, in other words, <i>false</i>:

[js]
if (price > 100) {
  alert('Expensive!')
} else {
  alert('Give me 2!')
}
[/js]

It is also possible to specify additional conditions using `else if`:

[js]
var access  // the access level of the user based on his userId

if (userId > 1) {
  access = "visitor";
} else if (userId == 1) {
  access = "superuser";
} else if (userId == 0) {
  access = "all-powered-genie";
} 
[/js]

[task src="task/if-sign-check.md"]


## Logical conditions   

Conditions can be combined by operators && (AND), || (OR) or negated by !(NOT).

Check if `x` is more than 1 <b>AND</b> less than 5:
[js]
var x = 3

if (x>=1 && x<=5) {
  alert('The number is between 1 and 5')
}
[/js]

Check if `x` is less than 10 <b>OR</b> more than 20:
[js]
var x = 3

if (x<10 || x>20) {
  alert('The number is outside of 10..20 interval')
}
[/js]

Conditions can be grouped in brackets and negated by <b>NOT</b>:
[js]
var x = 15

if ( !(x<10 || x>20) ) {
  alert('The number is *inside* 10..20')
}
[/js]

[task src="task/if-login-simple.md"]
[task src="task/if-login-advanced.md"]


## Boolean conversions   

Traditionally, it is possible to put a value into `if`. In this case, it gets converted into boolean.

[js run]
var x = 1

if (x) {
  alert('true')
}
[/js]


## String comparison   

String are compared in <i>lexicographic order</i>, also known as a phone-book order:
[js run]
// true, because "Anna" would go after "Abba" in a phone book. 
alert( "Anna" > "Abba" )  // true
[/js]

<ol>
<li>The first character of the left string is compared against the first character of the right string.</li>
<li>If it is greater or less in alphabet order, then it becomes the result.</li>
<li>If they are equal, then go on to the next character.</li>
</ol>

No-character is less than any character. That's, again, like in the phone-book:

[js run]
// Pope would go after Pop 
alert( "Pope" > "Pop" )  // true
[/js]

For strings, the <b>comparison is case-sensivite</b>.

For example:
[js run]
alert('abba' > 'Zend') // true
[/js]

That's because <b>a lowercased letter is always greater than an uppercased</b>. 



## Comparison of different types   

Comparison can be done for values of different types. <b>To perform the comparison, the interpreter converts values to numbers.</b>

Here are the examples:

[js]
alert("01" < 2)   // true, "01" converts to 1
alert(1 == true)  // true, because true converts to 1
[/js]

[warn]
Watch out when comparing numbers which you got as strings:
[js run]
alert( "2" > "14" ) // true
[/js]

That's because of lexicographical order. Convert the values explicitly to make sure you are dealing with numbers.
[/warn]


## Strict equality   

Sometimes we need to differ between `0` and `false`. How to check that?
[js run]
alert(0 == false) // true, because false becomes 0
[/js]

For such occasions, there are strict equality and inequality operators: `===` and `!==`.

They do not convert type, so values of different types are always inequal.

[js run]
alert(0 === false) // false, because different types
[/js]



## Special values   

Special values are inclined to <i>really</i> weird behavior in comparisons.

Here is a couple of examples.

[smart header="Crazy?"]

Come on, check it out:

[js run]
alert(null > 0); // false
alert(null == 0); // false
[/js]

And now tadaaaam:

[js run]
alert(null >= 0); // true 8-()
[/js]

How can it be? It's not greater, not equal, but <code>&gt;=</code> returns true.

Hint. Processing of `null` is hardcoded. See ECMA-262 standard for the details. Hope you'll never get into this pitfall.
[/smart]


[smart header="Uncomparable"]

`Undefined` and `NaN` values can't be compared with a number.

[js run]
alert(undefined > 0); // false
alert(undefined  == 0); // false
alert(undefined  < 0); // false
[/js]

Use strict comparisons `===` to check against `undefined`. 

But even a strict comparison fails with `NaN`, use  `isNaN()` function to check it.
[/smart]

Why does it behave like that? The short answer is: "because that's written in the standard". A longer one is "JavaScript was created in 10 days. What you'd await?".



## Ternary operator `"?"`   

A regular use-case is when a variable gets a value depending on a condition:
[js]
if (cash > 100) {
  me = "Rich"
} else {
  me = "Poor"
}
[/js]

The <i>ternary operator</i> comes in as a handy shortcut. The syntax is:
`result = condition ? value_if_true : value_if_false`.

It evaluates the `condition` and returns the `value_if_true` value if it is correct or `value_if_false` otherwise.

The `if` can be rewritten as:
[js]
me = (cash > 100) ? 'Rich' : 'Poor'
[/js]

Brackets around <code>cash &gt; 100</code> can be safely removed, because operator "?" has lower priority. But they are usually kept for readability.

The following statements are equal:
[js run]
rich = (money > 10) ? true : false
// same as
rich = money > 10
[/js]

Another example, getting the absolute value of `x`:
[js]
abs = (x > 0) ? x : -x
[/js]

