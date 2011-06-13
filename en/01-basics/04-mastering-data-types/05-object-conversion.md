
# Conversion, toString and valueOf 

Objects in JavaScript can be converted to primitives in three contexts:
<ol>
<li>Numeric</li>
<li>String</li>
<li>Boolean</li>
</ol>

Understanding the way conversion works helps to evade possible pitfalls and write cleaner code.

=Cut


## String conversion   

String conversion happens when a <i>string representation</i> of an object is required.

For example, in `alert(obj)` does it to output `obj`:

[js run]
var obj = { name: 'John' }

alert(obj) // [object Object]
[/js]

The explicit conversion is also possible: `String(obj)`.


### The algorithm of Object to String conversion   
<ol>
<li>If `toString` method exists and returns a primitive, then return it.
<b>Execution normally stops here, because `toString` exists on all objects by default</b>.</li>
<li>If `valueOf` method exists and returns a primitive, then return it.</li>
<li>Otherwise, throw an exception.</li>
</ol>

Again, normally all objects have `toString`. Built-in objects have their own `toString` implementations:

[js run]
alert( {key: 'value'} ) // toString for Objects outputs: [object Object]
alert( [1,2] )          // toString for Arrays lists elements "1,2" 
alert( new Date )       // toString for Dates outputs the date as a string
[/js]


### Custom `toString`   

For our objects, we can implement a custom `toString`:

[js run]
var user = {

  firstName: 'John',

  *!*toString:*/!* function() {
    return 'User ' + this.firstName 
  }
}

alert( user )  // User John
[/js]
</dd>
</dl>


## Numeric conversion   

There is another conversion in JavaScript, not as wide known as `toString`, but internally it is called much more often.

Numeric conversion is performed in two main cases:
<ul>
<li>In functions which needs a number: for example `Math.sin(obj)`, `isNaN(obj)`, including arithmetic operators: `+obj`.</li>
<li>In comparisons, like `obj == 'John'`. 
The exceptions are the string equality `===`, because it doesn't do any type conversion, and also non-strict equality when both arguments are objects, not primitives: `obj1 == obj2`. It is true only if both arguments reference the same object.</li>
</ul>

The explicit conversion can also be done with `Number(obj)`.

The algorithm of numeric conversion:
<ol>
<li>If `valueOf` method exists and returns a primitive, then return it.</li>
<li>Otherwise, if `toString` method exists and returns a primitive, then return it.</li>
<li>Otherwise, throw an exception.</li>
</ol>

Among built-in objects, `Date` supports both numeric and string conversion:

[js run]
alert( new Date() ) // The date in human-readable form
alert( +new Date() ) // Microseconds till 1 Jan 1970
[/js]

But most objects do not have `valueOf`. It means that numeric conversion is handled by `toString`.


### Custom `valueOf` example   

The magic method `valueOf` can be customized, just like `toString`:

[js run]
var room = { 

  num: 777,

  valueOf: function() {
    return this.num
  }
}

alert( +room )  // 777
[/js]

If there is a custom `toString`, but no `valueOf`, the interpreter will use it for numeric conversion:

[js run]
var room = { 

  num: 777,

  *!*toString*/!*: function() {
    return this.num
  }
}

alert( room / 3 )  // 259
[/js]

[smart header="Numeric conversion and being a number"]
Numeric conversion does not mean, that a number is returned. It must return a primitive, but there is no limitation on its concrete type.

Because of that, a good way to convert an object to a string is the <i>binary addition</i>:
[js run]
var arr = [1,2,3]

alert( arr + '' ) 
// first tries arr.valueOf(), but arrays have no valueOf
// so arr.toString() is called and returns a list of elements: '1,2,3'
[/js]

For historical reasons, `new Date + ''` also returns a string representation of `Date` even though `new Date` has `valueOf`. That's an exception.

[/smart]
Other mathematical functions not only perform the numeric conversion, but enforce a number. For example, the <i>unary addition</i> `+arr` would give `NaN`:
[js run]
alert( +[1,2,3] ) // [1,2,3] -> '1,2,3' -> not a number
[/js]


## Conversion in equality/comparison tests   

Non-strict equality and comparisons use numeric context.

The equality converts an object only if it is compared against a primitive:

[js]
if (obj == true) { ... }
[/js]

<b>There will no be conversion in equity check for two objects: `obj1 == obj2` is true only if they refer to the same object.</b>

The comparison always converts to primitive:

[js run]
var a = { 
  valueOf: function() { return  1 }
}
var b  = { 
  valueOf: function() { return  0 }
}

alert( a > b )  // 1 > 0, true
[/js]

[task src="task/x-x.md"]


## Boolean context   

There is one more standard conversion in JavaScript, called `[[toBoolean]]` in the specification.

If happens in boolean context, like `if(obj)`, `while(obj)` etc.

Object may not implement such conversion on their own, there is no magic method. Instead, there is a hardcoded table of conversions:

<table>
<tr><th>Value</th><th>Converted to...</th></tr>
<tr><td>`true/false`</td><td>no conversion</td></tr>
<tr><td>`undefined`, `null`</td><td>`false`</td></tr>
<tr><td>`Number`</td><td>`0`, `NaN` become `false`, others - `true`.</td></tr>
<tr><td>`String`</td><td>`""` becomes `false`, any other - `true`</td></tr>
<tr><td>`Object`</td><td>`true`</td></tr>
</table>

[warn header='`"0"` is `true`']
Unlike many programming languages (for example PHP), `"0"` is `true` in JavaScript. 
[/warn]

In the example below, we have numeric conversion (equality does it):
[js run]
alert( [0] == 0 )  // true
alert( "\n0\n" == 0 ) // true
alert( "\n0\n" == false ) // true
[/js]

So one may guess that `[0]` and `"\n0\n"` are falsy, because they equal `0`.

But now let's see how the left part behaves in boolean context:

[js run]
if ([0]) alert(1)  // 1, if treats [0] as true
if ("\n0\n") alert(2) // 2, if treats "\n0\n" as true
[/js]

<b>It is possible that `a == b`, but in boolean context `a` is `true` and `b` is `false`.</b>

<div class="ponder"><div class="smart-head">A way to frighten Java programmers.</div>

To convert a value to boolean, you may use double-negation: `!!val` or direct call `Boolean(val)`.

Of course, we never use `new Boolean` for any purpose. Funny things happen if we do.

For example, let's try to get a boolean out of zero:
[js run]
alert( new Boolean(false) ) // false
[/js]

But...
[js run]
if ( new Boolean(false) ) {
  alert(true) // true
}
[/js]

That's because `new Boolean` is an object. The `alert` converts it to String, and it becomes `"false"`... Right. 

But `if` converts it to boolean primitive, and here any object is true... Wops!

Java programmers' eyes usually pop out when they see that. 
</div>

[task src="task/why.md"]
[task src="task/conversion-quiz.md"]


## Summary   

There are three conversions in JavaScript, which depend on the context:
<ol>
<li>String: output, uses  `toString`.</li>
<li>Numeric: maths, operators, uses `valueOf` -&gt; `toString`.</li>
<li>Boolean: converts according to the table.</li>
</ol>

That's different from most other programmer languages, But simple when you get it.

P.S. Actually, the conversion is a bit more sophisticated than described here. I've left out a good bit of complexity to concentrate on how it really works.

For a maximally precise conversion algorithms, refer to the specification: ECMA-262 5th ed., especially 11.8.5 (relational comparison), and 11.9.3 (equality comparison) and 9.1 (toPrimitive) and 9.3 (toNumber).

