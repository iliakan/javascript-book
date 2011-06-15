
# Closures 

From the [previous article](#30), we know that a variable is a property of the `LexicalEnvironment` object.

Here we discuss access to outer variables and nested functions. In-depth understanding of <i>closures</i> follows automatically.

=Cut


## Access to outer variables   

What if a variable is accessed, but it isn't local? Like here:

[js]
var a = 5

function f() {
  alert(a)
}
[/js]

In this case, the interpreter finds the variable in the outer `LexicalEnvironment` object.

The process consists of two steps:

<ol>
<li>First, when a function `f` is created, it is not created in an empty space. 

There is a current `LexicalEnvironment` object. In the case above, it's `window` (`a` is `undefined` at the time of function creation).

[img src="/assets/intro/scope/le_window1.png"]

When a function is <u>created</u>, it gets a hidden property, named `[[Scope]]`, which references current `LexicalEnvironment`.

[img src="/assets/intro/scope/le_window2.png"]
</li>
<li>Later, when the function runs, it creates it's own `LexicalEnvironment` and links it with `[[Scope]]`. 

So when a variable is not found in the local `LexicalEnvironment`, it is searched outside:

[img src="/assets/intro/scope/le_window3.png"]
</li>
</ol>

If a variable is <i>read</i>, but can not be found anywhere, the error is generated.

[js]
function f() {
  alert(x) // reading x gives error, no x
}
[/js]

Certain language constructs block the error, for example `typeof x` works if there is no `x` (and returns `undefined`), but that's an exception.

If a variable is <i>set</i>, but not found anywhere, then it is created in the outmost `LexicalEnvironment`, which is `window`.

[js]
function f() {
  x = 5 // writing x puts it into window
}
[/js]


## Nested functions   

Functions can be nested one inside another, forming a chain of `LexicalEnvironments` which can also be called a <i>scope chain</i>.

[js run]
var a = 1
function f() {

  function g() {
*!*
    alert(a) 
*/!*
  }

  return g  
}

var func = f()
func() // 1
[/js]

`LexicalEnvironments` form a chain (from inside out):

[js]
// LexicalEnvironment = window = {a:1, f: function}
var a = 1
function f() {
  // LexicalEnvironment = {g:function}

  function g() {
    // LexicalEnvironment = {}
    alert(a) 
  }

  return g  
}
[/js] 
So, function `g` has access to `g, a` and `f`.

[task src="task/sumclosure.md"]

[task src="task/sum-with-arbitrary-number-brackets.md"]


## Closures   

Nested function may continue to live after the outer function has finished:

[js run]
function User(name) {
	
  this.say = function(phrase) {  
    alert(name + ' says: ' + phrase)
  }

}

var user = new User('John')
[/js]

Marking up `LexicalEnvironments`:

[img src="/assets/intro/scope/user1.png"]


<b>Note, the `this` context is not related to scopes and variables.</b> It does not participate here.

As we see, `this.say` is a property in the `user` object, so it continues to live after `User` completed.

And if you remember, when `this.say` is created, it (as every function) gets an internal reference `this.say.[[Scope]]` to current `LexicalEnvironment`. So, the `LexicalEnvironment` of the current `User` execution stays in memory. All variables of `User` also are it's properties, so they are also carefully kept, not junked as usually. 

The whole point is to ensure that if the inner function wants to access an outer variable in the future, it is able to do so.


[sum]
<ul>
<li>The inner function keeps a reference to the outer  `LexicalEnvironment`.</li>
<li>The inner function may access variables from it any time even if the outer function is finished.</li>
<li> The browser keeps the `LexicalEnvironment` and all it's properties(variables) in memory until there is an inner function which references it.</li>
</ul>

This is called a <i>closure</i>.


[/sum]


### Mutability of `LexicalEnvironment`   

Several function may share same outer `LexicalEnvironment`. In this case they can modify it's properties.

In the example below, `this.fixName` changes `name`, which is used by `this.say`:

[js run]
function User(name) {
	
  this.fixName = function() {
    name = 'Mr.' + name.toUpperCase()
  }

  this.say = function(phrase) {  
    alert(name + ' says: ' + phrase)
  }

}

var user = new User('John')
// (1)
user.fixName()
// (2)
user.say("I'm alive!") // Mr.JOHN says: I'm alive!
[/js]

Here `user.fixName.[[Scope]]` and `user.say.[[Scope]]` reference same `LexicalEnvironment`, which corresponds to `new User` run.

From (1) to (2), the `LexicalEnvironment.name` is updated, so both functions see the variable change.

[sum]
Variables in outer `LexicalEnvironment` may change. 

Inner functions always see the <i>last</i> value.
[/sum]



### The notorious closure loop   

The task below contains interesting tricks, best demonstrated by an example. <b>Please, glance at the solution, or, much better, try to solve it.</b>

[task src="task/shooters-loop.md"]



### `[[Scope]]` for `new Function`   

There is an exception to general scope binding rule. When you create a function using `new Function`, it's `[[Scope]]` points to `window`, not to current `LexicalEnvironment`.

The following example demonstrates how a function, created with `new Function` ignores local variable `a` and outputs the global variable.

The regular behavior:

[js run]
window.a = 1;
function getFunc() {
  var a = 2;
 
  var func = function() { alert(a) }

  return func; 
}

getFunc()() // 2, from LexicalEnvironemnt of getFunc
[/js]

And now the function, created by `new Function`:

[js run]
window.a = 1
function getFunc() {
  var a = 2
 
  var func = new Function('', 'alert(a)')  
  return func
}

getFunc()() // 1, from window
[/js]


## Summary   

We discussed the following topics:
<ul>
<li>How variables are handled in JavaScript.</li>
<li>How scopes work.</li>
<li>What is a closure and how to use it.</li>
<li>Possible pitfalls and subtles in working with closures.</li>
</ul>

Closures in JavaScript is like a salt. You can live without it, but not very long. Usually people put it everywhere...

