
# Number, Math 

All numbers in JavaScript, both integer or floating-point are of type `Number`.

=Cut

Internally a number is represented by the floating-point format IEEE 754, also called "double precision". There are 8 bytes per number.

The maximal integer value is about <code>2<sup>53</sup></code>.


## Written forms   

In JavaScript, it is possible to write numbers using hexadimal or octal radix:
[js run]
alert( 0xFF ) // 255 in hexadimal form, starts with 0x
alert( 010 ) // 8 in octal form, starts with 0
[/js]

A so-called <i>scientific</i> form is also available, it consists of a number followed by "e" and quantity of zeroes.

For example, `1e3` is 1 with 3 zeroes, effectively 1000.

[js run]
// scientific form: 3 with 5 zeros
alert( 3e5 )  // 300000
[/js]

If the quantity of zeroes is negative, then the number is shifted past the decimal point.

[js run]
// shift 5 times past the decimal point.
alert( 3e-5 ) // 0.00003
[/js]


## Zero division, `Infinity`   

Imagine, you are to create a new language. People will call it "JavaScript" (or LiveScript.. whatever).

What should happen if someone divides by zero? 

Usually the answer is "Zero Division Error". At least, for most programming languages it is like that.

But JavaScript creators decided to go more mathematical way. In maths, when you divide by 0, you get <i>Infinity</i> (or `-Infinity`). 
Same in JavaScript:

[js run]
alert(1/0)  // Infinity
alert(-1/0) // -Intinify
[/js]

`Infinity` is a special numeric value in JavaScript and behaves just like it should. Infinity is larger than any other number. Adding anything to `Infinity` doesn't change it:

[js run]
alert(Infinity > 999999999999999999999999999);
alert(Infinity + 5 == Infinity);
[/js]

So there is no error, just infinity.


## `NaN`   

If a mathematical operation can't be performed, it returns a special pseudo-numerical value: `NaN` (Not-A-Number).

For example, division of zero by zero is not defined in mathematical sense, so it returns `NaN`.

[js run]
alert( 0 / 0 )  // NaN
[/js]

`NaN` has following properties:

<ul>
<li>`NaN` is <i>not equal to anything</i>, including itself.

The code below is silent:
[js run]
if (NaN == NaN) alert("== works"); // Neither of these
if (NaN === NaN) alert("=== works"); // will work
[/js]
</li>
<li>`NaN` can be checked only by `isNaN` - a special function which returns `true` for `NaN` and `false` for any other value.
[js run]
var n = 0/0

alert( isNaN(n) ) // true
[/js]
</li>
<li>`NaN` is sticky. Any math operation with `NaN` gives `NaN`.
[js run]
alert( NaN + 1 ) // NaN
[/js]
</li>
</ul>


[sum]Mathematical operations can't lead to an error or crash in JavaScript. 

At worst, `NaN` is returned.
[/sum]



## Conversion to a number   

<b>The strict conversion can be done by "+"</b>
[js run]
var s = "12.34" 
alert( +s )  // 12.34
[/js]

The string is parsed and if its format is numeric, then the number is returned.

Actually, all mathematical functions excepts binary plus `'+'` convert a string to number:

[js run]
var s = "12.34" 
alert( -"12.34" / "2" )  // -6.17
[/js]


<b>Parsing into a number ignores whitespaces at start and end.</b> For example:
[js run]
alert( +"  12")  // 12
alert( +" \n34  \n") // 34, newlines are whitespace symbols too
[/js]

If the value can't be converted to a number, the operation returns `NaN`:
[js run]
alert( +"12test" )  // NaN
[/js]

[sum]
`isNaN` converts it's argument into a number automatically. So it can be used to check whether a string represents a number:

[js run]
var x = "-11.5"
if (isNaN(x)) {
  alert("Not a number")    
} else {
  alert("Number")    // isNaN(x) = false means it's a number
}
[/js]

But please, be careful, because a string with whitespaces is converted to `0`:

[js run]
alert(isNaN(" \n\r\t  ")) // false, "..spaces.." is 0
[/js]

And, of course `isNaN` won't work for other types, because `false, null, undefined` are also converted to `0`.

Actually, the most reliable conversion check is either a regexp or `isNumeric` below:
[js]
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
[/js]
`isNumeric` correctly checks numericality for all input types.
[/sum]


[task src="task/sum.md"]



## Permissive conversion: `parseInt` and `parseFloat`   

In real-life, many values are not exactly numbers. Especially, those "10pt" or "-12px" used in CSS.

The "+" operator can't convert them into a number, because it checks the strict format. It will return `NaN`:
[js run]
alert( +"12px" ) // NaN
[/js]

That's where `parseInt` jumps in:
[js run]
var v = parseInt('12px')
alert(v)
[/js]

`parseInt` and its friend `parseFloat` convert the value character by character until they meet something impossible to convert. Then it stops and returns what could be converted.

[js run]
alert( parseFloat('12.3.4') ) // 12.3, 1st dot is fine, but not the 2nd 
[/js]

A minor pitfall with `parseInt` on some browsers is that ECMAScript specification allows it to guess the radix.

The older version of the specification treats a string starting with 0 in `parseInt` as octal:

[js run]
alert( parseInt('0xFF') ) // 255
alert( parseInt('010') )  // in some browsers 8, because 0 means octal 
[/js]

If you want be sure that "010" means 10, use the second optional argument to pass the radix:

[js run]
alert( parseInt('010', 10) )
[/js]

Note, `parseInt/parseFloat` returns `NaN` if conversion stops at first char:

[js run]
alert( parseInt('a123') )
[/js]


## Imprecise calculations   

The floating point format leads to loss of precision. Minor computational errors may occur.

Please, run the following:
[js run]
alert(0.1 + 0.2 == 0.3)
[/js]

Did you run it? If not, please do.

Ok, you did. So what's up? Maybe the browser is buggy? Change the browser, run it again.

Ok, well, now you can be sure: `0.1 + 0.2` is not `0.3`. Then what is it?

[js run]
alert(0.1 + 0.2)
[/js]

Now you see, there is a minor calculation error.

That's because internal floating-point format represents a number in binary form. But, just like 1/3 can't be represented in decimal form (it's 0.3333...),
0.1(=1/10) cannot be exactly represented as binary, and 0.2(=2/10) as well.

Their binary representations are cut at some point. Here you are:
[js run]
alert( 0.1.toFixed(20) )  // 0.10000000000000000555
[/js]

When you sum two inaccuracies, you get the minor calculation error.

Of course, that doesn't mean you can't sum numbers in JavaScript. In fact, you can.

Actually, there are two ways to sum 0.1 and 0.2:
<ol>
<li>Make them integers, sum and then divide back:
[js run]
alert( (0.1*10 + 0.2*10) / 10 ) // 0.3 
[/js]
 
It works, because 1 and 2 can be represented in binary form exactly. So, the sum is exact.
</li>
<li>Sum and then round to fixed precision as described in the next section. Rounding to 10-th decimal digit will chop off the calculation error.
[js run]
alert( +(0.1+0.2).toFixed(10) )
[/js]
</li>
</ol>

[smart header="Another funny example"]
Look, I'm a self-increasing number!
[js run]
alert(9999999999999999)
[/js]

The reason is, of course, precision loss. The number format cannot store that many digits exactly.
[/smart]

[task src="task/endless-chance.md"]



## Rounding   

One of most often operations with numbers is rounding. In JavaScript, there are 3 functions for basic rounding.

<dl>
<dt>`Math.floor`</dt>
<dd>Rounds down</dd>
<dt>`Math.ceil`</dt>
<dd>Rounds up</dd>
<dt>`Math.round`</dt>
<dd>Rounds to nearest</dd>
</dl>

[js run]
alert( Math.floor(3.1) )  // 3
alert( Math.ceil(3.1) )   // 4
alert( Math.round(3.1) )  // 3
[/js]

Note how `floor` and `ceil` work for negative numbers:

[js run]
alert( Math.floor(-3.1) )  // -4, rounds to nearest less than -3.1
alert( Math.ceil(-3.1) )   // -3, rounds to nearest greater than -3.1
[/js]

[smart header="Ultra-fast rounding with bitwise operators"]
Bitwise operators cut off the decimal part automatically when applied.

In the example below, `12.3` is rounded by XOR'ing with 0:

[js run]
alert( 12.3^0 )  // 12
[/js]

The XOR `^0` was chosen, because it doesn't change the number. Any bitwise operator, which doesn't modify the number, will do. For example, double NOT `~~12.3`, right shift to 0 bits <code>12.3&gt;&gt;0</code> etc.

Note that for negative numbers cutting of the decimal part is not the same as `Math.floor`.
[/smart]


### Rounding to given precision   

It is often required round to precision, like: two digits after the decimal point. An old trick is multiply and divide on 10 with given number of zeroes:

[js run]
var n = 3.456
alert( Math.round( n * 100 ) / 100 )  // 3.456 -> 345.6 -> 346 -> 3.46
[/js]


### `toFixed(precision)`   
There is also a method `toFixed(precision)` can be called directly on a number.

It rounds the number to given precision and returns a string:

[js run]
var a = 12.34
alert( a.toFixed(1) ) // "12.3"
[/js]

The returned string is right-padded with zeroes if needed:

[js run]
var a = 12.34
alert( a.toFixed(5) ) // "12.34000"
[/js]

So, if we need a number, we can convert it back by adding "+" to `n.toFixed()`:

[js run]
var a = 12.34
alert( +a.toFixed(5) ) // 12.34
[/js]



## Random numbers   

The `Math.random()` returns a random number from 0(inclusive) to 1(exclusive):
[js run]
alert( Math.random() )
[/js]

Most often recipes regarding random numbers are represented as a set of tasks. Check them out below.

[task src="task/random0b.md"]

[task src="task/randomab.md"]

[task src="task/intrandomminmax.md"]



## Summary   

In this section you've learned about numbers in JavaScript:

<ul>
<li>Which written forms exist.</li>
<li>An imprecision which is a consequence of the internal number format.</li>
<li>How errors are handled: `Infinity` and `NaN`.</li>
<li>How to round numbers.</li>
<li>How to convert a string to number in a permissive way, for values like "12px".</li>
</ul>

There are more methods and mathematical actions upon numbers. Consult the manual about <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number">Number</a> and <a href="https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Math">Math</a> objects.

