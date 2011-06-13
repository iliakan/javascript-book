
# Type detection  [167]

<i>Polymorphic</i> functions is a great concept of programming. That's a function which treats parameters differently, depending on their type. 

To support polimorphism, we need a way to get the type of a variable. There is a small JS zoo here, let's check it out.

=Cut

As we know, there are several <i>primitive</i> types in JavaScript:
<dl>
<dt>null, undefined</dt>
<dd>Special values.</dd>
<dt>number</dt>
<dd>All numbers like `0` and `3.14`. Also pseudo-numerical values `NaN` and `Infinity`</dd>
<dt>boolean</dt>
<dd>`True` and `false` values.</dd>
<dt>string</dt>
<dd>Strings, like "Meow" and "".</dd>
</dl>

All other values are <b>objects</b>. For example, functions and arrays are objects.


## `Typeof` operator   

The `typeof` operator takes a value and return it's type. There are two possible syntaxes:
<ol>
<li>Operator: `typeof x`</li>
<li>Function-like: `typeof(x)`</li>
</ol>

Both syntaxes work same, but the first one is shorter.

[js]
typeof undefined // "undefined" 

typeof 0    // "number" 
 
typeof true // "boolean" 

typeof "foo" // "string" 

typeof {} // "object" 

*!*
typeof null  // "object" 
typeof function(){} // "function" 
typeof NaN  // "number"
*/!*
[/js]

You see, the three last lines are red. That's for a reason.

<ol>
<li>First, the `typeof null == "object"` is a official mistake in the language, carefully kept from 90x for compatibility. 

We can check it:

[js run]
var x = null
x.prop = 1 // error, can't assign a property to primitive
[/js]
</li>
<li>Functions are still objects despite of their special treatment.</li>
<li>The `typeof NaN == 'number'` is funny, because `NaN` is an acronym for 'Not-A-Number' :)</li>
</ol>


### Only primitive values   

The `typeof` works sufficiently well with primitive values (except `null`). But it says nothing about object types.

<b>The `typeof` can't distinguish between objects.</b>

For example, `Object`, `Array` and `Date` objects are same.

[js run]
alert( typeof {} ) // 'object'
alert( typeof [] ) // 'object'
alert( typeof new Date ) // 'object'
[/js]

We can also see the difference between a primitive string and `new String`:

[js run]
alert( typeof "lalala" ) // string
alert( typeof new String("lalala") ) // object
[/js]


### A good use of `typeof`   

Let's write a polymorphic function.

[js]
function f(x) {
 if (typeof x == 'function') {
    ... // in case when x is a function
  } else {
    ... // in other cases
  }
}
[/js]

That was a fair use.


### A bad use of `typeof`   

Now the antipattern. In old code you can find a test for variable existence with `typeof`:

[js]
// check if global variable jQuery exists
if (typeof(jQuery) !== 'undefined') ...
[/js]

The `typeof` is used here, because a direct usage of an undefined variable would lead to an error:
[js]
// error if jQuery is not defined
if (jQuery) { .. }
[/js]

<b>Don't use `typeof` this way.</b>

A global variable can be accessed as a property of built-in `window` object. Let's check it:

[js]
if (window.jQuery !== undefined) { ... }
[/js]

There will be no error, because no one asks for (probably undefined) `jQuery`. We are just asking the object property.

In most cases, like here, we know that `jQuery` can't be falsy if it exists, so the check shortens to:
[js]
if (window.jQuery) { ... }
[/js]

<b>The `typeof` shouldn't be used to check for variable existance.</b>

[#type-class]


## `[[Class]]` to differ between native objects   

The main problem with `typeof` is that it doesn't tell much about the object. The `function` is an exception.

[js run]
alert( typeof {key:'val'} ) // Object is object
alert( typeof [1,2] ) // Array is object
alert( typeof new Date ) // Date object
[/js]

<b>Fortunately, there is a hidden `[[Class]]` property in all JavaScript native objects.</b> It equals "Array" for arrays, "Date" for dates etc.

This property is not accessible directly, but `toString`, borrowed from native `Object` returns it with a small wrapping:

[js run]
var toClass = {}.toString // (1)

alert( toClass.call( [1,2] ) ) // [object Array]
alert( toClass.call( new Date ) ) // [object Date]
[/js]

Here's what we do:
<ol>
<li>Copy a reference to `toString` for objects into `toClass` variable.</li>
<li>Call it, but provide the object which we are going to check as `this`. So, object `toString` becomes applied to arrays, dates etc. We have to do it, because their own `toString` behaves differently. For arrays it returns element list, for dates it returns the string representation.</li>
</ol>

The method also works on primitives:
[js]
alert( toClass.call(123) ) // [object Number]
alert( toClass.call("primitive")) ) // [object String
[/js]

... With exception of `null` and `undefined`, because calling `call` with `null` or `undefined` passes `window` as `this`. 

<b>The `[[Class]]` is "Object" for custom objects:</b>
[js run]
function Animal(name) { 
  this.name = name
}
var animal = new Animal("Goofy")
var class = {}.toString.apply( animal )
alert(class) // [object Object]
[/js]

So, it is useful only for native objects. 


## Checking type for custom objects   

For objects, created by constructor functions, we usually use `instanceof` operator.

It's syntax is `obj instanceof Func`:

[js run]
function Animal(name) { 
  this.name = name
}
var animal = new Animal("Goofy")

alert( animal instanceof Animal ) // true
[/js]

We talk more about it in the article [](#instanceof).

As of now, for native objects `[[Class]]` approach is better and is used in most frameworks.

[smart header="Why not &quot;`arr instanceOf Array`&quot; ?"]

We could detect an array by using the `instanceOf` operator:
[js run]
var arr = [1,2,3]
alert(arr instanceof Array) // true
[/js]

Although, it will not work if `arr` was created in another window or iframe and then passed into current window. That's because each window has it's own object hierarchy.

To workaround that, most frameworks use `[[Class]]` for native objects.
[/smart]




## Summary   

<dl>
<dt>`typeof`</dt>
<dd>Good for primitives and functions, it lies about `null`.</dd>
<dt>`[[Class]]`</dt>
<dd>Exposed through `{}.toString`. Good for built-in object and primitives, excepts `null` and `undefined`.</dd>
<dt>`instanceof`</dt>
<dd>Works for custom objects. Can be used for native objects too, but lies if they come from another frame/window.</dd>
</dl>

