
# Static variables and methods 

A function is an object. That provides us with a nifty way to create <i>static</i> variables or, in other words, the variables which persist along multiple calls.

=Cut

For example, we want a variable which counts function calls. 


## Static variables   

There are languages which allow to put a <i>static</i> keyword before a variable, and then such variable is not cleared in next calls. 

Example of a static variable in PHP language:
[php]
function f() { // PHP code!
  static $count = 0;

  echo ++$count;
}

f(); f(); f(); // 1 2 3
[/php]

In JavaScript, there is no term or keyword <i>static</i>, but we can put such data directly into function object (like in any other object).

[js run]
function f() {
  f.count = ++f.count || 1 // f.count is undefined at first 

  alert("Call No " + f.count)
}

f(); // Call No 1 
f(); // Call No 2
[/js]

Of course, a global variable can keep the counter, but static variables lead to a better architecture. 

We could make the code more universal by replacing `f` with `arguments.callee`.

[js]
function f() {
  arguments.callee.count = ++arguments.callee.count || 1 

  alert("Called " + arguments.callee.count + " times")
}
[/js]

Now you can safely rename the function if needed :)


## Static methods   

Static methods, just like variables, are attached to functions. They are used mostly for objects:

[js run]
function Animal(name) {
  arguments.callee.count = ++arguments.callee.count || 1 

  this.name = name
}

*!*
Animal.showCount = function() {
  alert( Animal.count )
}
*/!*

var mouse = new Animal("Mouse")
var elephant = new Animal("elephant")

Animal.showCount()  // 2
[/js]

