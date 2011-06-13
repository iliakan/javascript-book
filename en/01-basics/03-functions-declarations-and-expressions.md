
# Functions: declarations and expressions [15]

A function, like a variable, can be defined anywhere in the code.

JavaScript provides several ways of defining them:
<ul>
<li>Function Declaration</li>
<li>Function Expression</li>
<li>Function as a result of a `new Function` call</li>
</ul>

=Cut


## The syntax   
The basic syntax to create a function is a <i>Function Declaration</i>. The syntax is:
[js]
function f(arg1, arg2, ...) {
   ... code ... 
}
[/js]

Looks like this:
[js run]
*!*
function sayHi(name) {
  alert("Hi, "+name)
}
*/!*

sayHi('John')
[/js]
The example above declares a function named `sayHi` with a single argument `name` and calls it.



### Returning a value   

To return a value, use `return` statement:

[js run]
function sum(a, b) {
  *!*return a+b*/!*
}

var result = sum(2,5)
alert(result)
[/js]

If a function does not return anything, it's result is considered to be a special value, `undefined`. You can check it out on the following example.

[js run]
function getNothing() {
  // no return 
}

var result = getNothing()

alert(result) 
[/js]

An empty return gives same result:
[js run]
function getNothing() {
  return 
}
alert( getNothing() === undefined ) // true
[/js]



### Local variables   

A function may contain variables, defined by `var`. Such variables are called <i>local</i> and are only visible inside the function.

[js]
function sum(a, b) {
  var sum = a + b

  return sum
}
[/js]


[task src="task/function-simple.md"]
[task src="task/funciton-powxn.md"]


## Function Declaration   

[smart header="Nested functions come later"]
Here in this section, we are not talking about advanced topics like nested functions. They are covered later in [](#30) and the next articles. 

Everything in due time, right now we need to get the most important stuff right.
[/smart]

<b>Function Declarations are parsed at pre-execution stage, when the browser prepares to execute the code.</b>

That's why the function declared this way can be called both <i>after</i> and <i>before</i> the definition.

This works:
[js run]
function sayHi(name) {
  alert("Hi, "+name)
}

sayHi("John")
[/js]

... But changed order also works:

[js run]
sayHi("John")

function sayHi(name) {
  alert("Hi, "+name)
}
[/js]

<b>A function can be declared anywhere in the code</b>.

[warn title="Conditional function declaration doesn't work"]
For example, we may want to declare a function differently, depending on the condition:

[js run]
sayHi()

if (1) {
  function sayHi() {  alert(1)  }
} else {
  function sayHi() {  alert(2)  } // <--
}
[/js]

Try running the example above in different browsers. At the time of writing, Firefox gives error, other browsers output 2.

That's because the declarations are parsed <i>before the execution</i>. According to the specification (p.10.5), the latter function with same name overwrites the existing one.

When it comes to execution, the declarations are ignored. So the `if` statement doesn't affect anything.
[/warn] 


## Function Expression   

A function in JavaScript is a first-class value, just like a number or string.

<b>Anywhere where you could put a value, you can also put a function</b>, declared "at place" with a <i>function expression</i> syntax: `function(arguments) { ... }`.

For example, you can do:

[js]
var f = 5
[/js]

But you can also assign it to a function expression:

[js run]
var f = function(name) {
    alert("Hi, " + name + "!");
}
[/js]


[smart header="When `function` means Expression and when it's a Declaration?"]

The rule is simple.

When the JavaScript parser sees a `function` in the main code flow, it assumes Function Declaration.

When a `function` comes as a part of a statement, it is a Function Expression.
[/smart]

Function Expressions are created when the execution flow reaches them. As a consequence, <b>Function Expressions can be used only  <i>after</i> they are executed</b>.

[js run]
var sayHi

// sayHi() <-- can't call here, there is no sayHi yet

if (1) {
  sayHi = function() {  alert(1)  }
} else {
  sayHi = function() {  alert(2)  }
}

sayHi() 
[/js]

In the example above, the result is the same in all browsers. 


### Use declarations, please   

In the code of unexperienced developers, functions are often declared by expressions:

[js]
... code ...
var f = function() { ... }
...
[/js]

Function Declarations are much more readable and shorter. Use them instead.

[js]
... code ...
function f() { ... }
...
[/js]

Besides, functions declared this way can be called before it's definition. 

<b>Use expressions only if you mean it. E.g for conditional function definition.</b>


## Function is a value   

A function in JavaScript is a regular value. We could even output it:

[js run]
function f() { alert(1) }

alert(f)
[/js]

The example above outputs the function. Usually as the source code.

<b>Both declarations and expression declare a variable and put the function into it.</b> Only the creation time is different.


### Passing a function around   

Just like any value, a function can be assigned, passed as a parameter for another function and so on.

And it doesn't matter how it was defined, for example:

[js run]
function sayHi(name) {
  alert("Hi, "+name)
}

var hi = sayHi // assign a function to another variable

hi("dude")     // call the function
[/js]

The function is assigned <i>by reference</i>. That is, a function is kept somewhere in memory and `sayHi` is a reference (or you could say pointer) to it. When I assign it to `hi`, both variables start to reference the same function.

<b>One function can accept another function as an argument.</b>

[js run]
function runWithOne(f) {  // runs given function with argument 1
  f(1)
}

runWithOne( 
  function(a){ alert(a) } 
)
[/js]

Logically, a function is an action. So, passing a function around is transferring an action which can be initiated from another part of the program. This feature is widely used in JavaScript. 

In the example above, we create a function without a name, and don't assign it to any variable. Such functions are called <i>anonymous functions</i>. 


## Running at place   

It is possible to create <i>and</i> run a function created with Function Expression at once, like this:

[js run]
(function() {

  var a, b    // local variables 
 
  // ...      // and the code 

})()
[/js]

Running in place is mostly used when we want to do the job involving local variables. We don't want our local variables to become global, so wrap the code into a function.

After the execution, the global namespace is still clean. That's a good practice.

<b>Why `function` is in brackets? That's because JavaScript only allows Function Expressions to be called in-place.</b>

Function Declarations can't be called like that:
[js run]
function work() {
  // ...
}()  // syntax error
[/js]

Even if we remove the name, JavaScript would see the `function` keyword and try to parse Function Delaration:

[js run]
function() { // error, function declaration without name.
  // ...
}()
[/js]

So, the only way is to wrap the function in brackets. Then the interpreter consider it as a part of a statement, hence a Function Expression.

If the function is obviously an expression, then there's no need in wrapping it, for instance:

[js run]
var result = function(a,b) { return a+b }(2,2)
alert(result) // 4
[/js]

In the code above, the function is created and called instantly. 
That's just like `var result = sum(2,2)`, where `sum` is replaced by a function expression.


[task src="task/closure-syntax-test.md"]

[smart]
There is one more way which uses a direct call to `Function` constructor. It takes arguments list and body as strings and creates a function from them:
[js run]
var sayHi = new Function('name', ' alert("Hi, "+name) ');

sayHi("Benedict");
[/js]

It is used very very rarely, almost never.
[/smart]





## Named function expressions   

A function expression may have a name:
[js]
var f = function sayHi(name) {
  alert("Hi, "+name)
}
[/js]

The syntax is called <i>named function expression</i> (or NFE) and works as it should in all browsers except IE&lt;9. 

In those browsers which support it, the name is visible inside the function only:

[js]
var f = function sayHi(name) {
  alert(sayHi) // outputs function
}

alert(sayHi) // error: undefined variable 'sayHi'
[/js]

IE will actually create two function objects in such case: `sayHi` and `f`:

[js run]
var f = function g() {  }

// false in IE, error (g is undefined) in other browsers
alert(f=== g) 
[/js]


<b>NFEs exist to allow recursive calls from anonymous functions.</b>

See the following `factorial` function wrapped into   `setTimeout` call:

[js]
setTimeout(function factorial(n) { 
  return n == 1 ? n : n*factorial(n-1) 
}, 100)
[/js]

[task src="task/nfe-test.md"]


## Function naming   

A function is an action. So it's name should be a verb, like `get`, `read`, `calculateSum`, etc.

Short function names can be allowed if:
<ul>
<li>A function is temporary and used only in nearest code. Same logic as with variables.</li>
<li>A function is used everywhere in the code. So from the one hand, there is no danger to forget what it does, and from the other hand, you have less writing. 

The real-world examples are '$', '$$', '$A', '$F' etc. JavaScript libraries use these names to make frequent calls shorter.</li>
</ul>

In other cases, the name of a function should be a verb or multiple words starting with a verb.


## Summary   

Functions in JavaScript are regular values. They can be assigned, passed around and called when needed.

<ul>
<li>A function which returns nothing actually returns special value: `undefined`.</li>
<li>Use verbs to name functions. Short names are allowable in two edge cases:  a name is used in the nearest code only, or it is extremely widely used.</li>
</ul>

<table class="table-bordered">
<tr>
<th>Function Declaration</th>
<th>Function Expression</th>
</tr>
<tr>
<td>`function` is used in the main code flow</td>
<td>`function` is created as a part of an expression.</td>
</tr>
<tr>
<td>Created at pre-execution stage. Can be called both before and after the definition.</td>
<td>Created when the execution reaches it. Can be called only after creation.</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>Can be called in-place</td>
</tr>
</table>

Generally, it is recommended to use `Declaration` unless there is a reason for `Expression`.

