
# Initialization of functions and variables [30]

Mechanics of variables and functions in JavaScript is completely different from most other languages.

Advanced topics become easy to grasp once you know how it works.

=Cut

[sum]In JavaScript, all local variables and functions are properties of the special internal object, called `LexicalEnvironment`.</b>

[/sum]

The top-level `LexicalEnvironment` in browser is `window`. It is also called a <i>global object</i>. 


## Instantiation of top-level variables   

When the script is going to be executed, there is a pre-processing stage called <i>variables instantiation</i>.

<ol>
<li>First, the interpreter scans the code for `[Function Declarations](#15)`, which are declared as `function name {...}` in the main code flow.

It takes every declaration, creates the function from it and puts it into `window`. 

For example, consider the code:
[js]
var a = 5

function f(arg) { alert('f:'+arg) }

var g = function(arg) { alert('g:'+arg) }
[/js]

At this stage, the browser finds `function f`, creates the function and stores it as `window.f`:

[js]
// 1. Function Declarations are initialized before the code is executed.
// so, prior to first line we have: window = { f: function }

var a = 5

*!*function f(arg)*/!* { alert('f:'+arg) } // <-- FunctionDeclaration

var g = function(arg) { alert('g:'+arg) }
[/js]

As a side effect, `f` can be called before it is declared:

[js run]
f()
function f() { alert('ok') }
[/js]

</li>
<li>Second, the interpreter scans for `var` declarations and creates `window` properties. Assignments are not executed at this stage. All variables start as `undefined`.


[js]
// 1. Function declarations are initialized before the code is executed.
// window = { f: function }

// 2. Variables are added as window properties.
// window = { f: function, a: undefined, g: undefined }

*!*var a*/!* = 5   // <-- var

function f(arg) { alert('f:'+arg) }

*!*var g*/!* = function(arg) { alert('g:'+arg) } // <-- var
[/js]

The value of `g` is a function expression, but the interpreter doesn't care. It creates variables, but doesn't assign them.

So to sum:

[sum]
<ol>
<li>`FunctionDeclarations` become ready-to-use functions. That allows to call a function before it's declaration.</li>
<li>Variables start as `undefined`.</li>
<li>All assignments happen later, when the execution reaches them.</li>
</ol>
[/sum]

As a side effect, it is impossible to have a variable and a function with the same name. 

</li>
<li>Then the code starts running. 

When a variable or function is accessed, the interpreter gets it from `window`:

[js]
alert("a" in window) // true, because window.a exists
alert(a) // undefined, because assignment happens below
alert(f) // function, because it is Function Declaration
alert(g) // undefined, because assignment happens below

var a = 5  

function f() { /*...*/ } 
var g = function() { /*...*/ } 
[/js]

</li>
<li>


After the assignments, `a` becomes `5` and `g` becomes a function. In the code below, `alerts` are moved below. Note the difference:

[js run untrusted]
var a = 5  
var g = function() { /*...*/ } 

alert(a) // 5
alert(g) // function
[/js]

If a variable is not declared with `var`, then, of course, it doesn't get created at initialization stage. The interpreter won't see it:

[js run]
alert("b" in window) // false, there is no window.b
alert(b) // error, b is not defined

b = 5  
[/js]

But after the assignment, `b` becomes the regular variable `window.b` as if it were declared:

[js run]
b = 5 

alert("b" in window) // true, there is window.b = 5
[/js]
</li>
</ul>



[task src="task/window-and-variable.md"]
[task src="task/window-and-variable-2.md"]


## Function variables   

When the function runs, on every function call, the new `LexicalEnvironment` is created and populated with arguments, variables and nested function declarations.

This object is used internally to read/write variables. Unlike `window`, the `LexicalEnvironment` of a function <i>is not available for direct access.</i>

Let's consider the details of execution for the following function:
[js]
function sayHi(name) {
  var phrase = "Hi, " + name
  alert(phrase)
}

sayHi('John') 
[/js]

<ol>
<li>When the interpreter is preparing to start function code execution, before the first line is run, an empty `LexicalEnvironment` is created and populated with arguments, local variables and nested functions.

[js]
function sayHi(name) {
// LexicalEnvironment = { name: 'John', phrase: undefined }
  var phrase = "Hi, " + name
  alert(phrase)
}

sayHi('John') 
[/js]

Naturally, arguments have the starting value, but the local variables don't.
</li>
<li>Then the function code runs, eventually assignments are executed. 

A variable assignment internally means that the corresponding property of the `LexicalEnvironment` gets a new value.

So, `phrase = "Hi, "+name` changes the `LexicalEnvironment`:

[js]
function sayHi(name) {
// LexicalEnvironment = { name: 'John', phrase: undefined }
  var phrase = "Hi, " + name
// LexicalEnvironment = { name: 'John', phrase: 'Hi, John'}
  alert(phrase)
}

sayHi('John') 
[/js]

The last line `alert(phrase)` searches the `phrase` in `LexicalEnvironment` and outputs it's value. 
</li>
<li>At the end of execution, the `LexicalEnvironment` is usually junked with all its contents, because the variables are no longer needed. But (as we'll see) it's not always like that.</li>
</ol>

[ponder header="Specification peculiarities"]
If we look into the recent ECMA-262 specification, there are actually two objects.

The first is a `VariableEnvironment` object, which is actually populated by variables and functions, declared by `FunctionDeclaration`, and then becomes immutable.

The second is a `LexicalEnvironment` object, which is almost same as `VariableEnvironment`, but it is actually used during the execution. 

A more formal description can be found in the ECMA-262 standard, sections 10.2-10.5 and 13.

It is also noted that in JavaScript implementations, these <i>two objects can be merged into one</i>. So, we evade irrelevant details and use the term `LexicalEnvironment` everywhere. 
[/ponder]


## Blocks do not have scope   

There is no difference between the following:

[js]
var i = 1
{
  i = 5
}
[/js]
...And the following
[js]
i = 1
{
  var i = 5
}
[/js]

All `var` declarations are processed before the execution in  in both cases.</dd>

<strong>Unlike languages like Java, C etc, variables in JavaScript survive after a loop.</strong>

That's again, because their scope is a function.

[js run]
for(var i=0; i<5; i++) { }

alert(i) // 5, variable survives and keeps value
[/js]

Declaring a variable in the loop is convenient, but doesn't make the loop it's scope.

[task src="task/varwindow.md"]

[task src="task/scope-type.md"]

