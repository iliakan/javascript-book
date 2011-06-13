
# Function arguments 

In JavaScript, a function may be called with any number of arguments, no matter how many of them are listed.

=Cut

For instance:

[js run]
function go(a,b) {
  alert("a="+a+", b="+b)
}

go(1)     // a=1, b=undefined
go(1,2)   // a=1, b=2
go(1,2,3) // a=1, b=2, extra argument is not listed
[/js]

<b>Arguments which are not provided become `undefined`.</b> So we can see if the function is called with no arguments:

[js run]
function check(x) {
  alert(x === undefined) // ok now I know there is no x
}

check()
[/js]

[smart header="No syntax-level polymorphism"]

In some languages, a programmer may write two functions with same name but different parameter list, and the interpreter/compiler would choose the right one:
[js]
function log(a) {
  ...
}

function log(a,b,c) {
  ...
}

log(a) // first function is called
log(a,b,c) // second function is called
[/js]
That is called <i>function polymorphism</i>. In JavaScript, there's no such thing.

<b>There can be only one function named `log`, which is called for any given arguments.</b>
[/smart]


## Accessing the unnamed arguments   

How do we get more arguments than listed in parameters?

There is a special <i>pseudo-array</i> inside each function called <a href="https://developer.mozilla.org/en/JavaScript/Reference/functions_and_function_scope/arguments">arguments</a>. 

It contains all parameters by their number: `arguments[0]`, `arguments[1]` etc.

Here is an example of how to list all arguments, no matter how many of them:
[js run]
function sayHi() {
  for(var i=0; i<arguments.length; i++) {
    alert("Hi, " + arguments[i])
  }
}
 
sayHi("Cat", "Alice")  // 'Hi, Cat', then 'Hi, Alice'
[/js]


All parameters are in `arguments`, even if the function names some of them: `sayHi(a,b,c)`. 


## The guts of `arguments`   

A frequent beginner mistake is to use `Array` methods on it. Shortly, you can't:

[js run]
function sayHi() {
  var a = arguments.shift() // error! arguments is not Array
  alert(a)
}

sayHi()
[/js]

If it isn't `Array`, then what it is? Let's use the [[[Class]]](#type-class) property to see it:

[js run]
(function() {

  alert( {}.toString.call(arguments) )  // [object Arguments] 

})()
[/js]

This type is internally almost same as `Object`. It only looks like array, because it's keys are numeric and it has `length`, but here the similarity ends.


## Using `arguments` as `Array`   

There is still a way to call array methods on `arguments`:

[js run]
function sayHi() {
  var args = [].join.call(arguments, ':')
  alert(args)  // 1:2:3
}

sayHi(1,2,3)
[/js]

Here we execute the <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/join">join</a> method of `Array` in the context of `arguments`, providing `':'` as first argument. 

It works, because internally most array methods (and `join`) use numeric indexes and `length` to work. 

The `join` would work on a custom object as well, if the format is correct:

[js run]
var obj = { 0: "A", 1: "B", length: 2 }

alert( [].join.call(obj) ) // "A,B"
[/js]


## Making a real `Array`   

The <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/slice">arr.slice(start, end)</a> copies the part of `arr` from `start` to `end` into the new array. 

It can be called in the context of `arguments` to copy all elements into a real array:

[js run]
function sayHi() {
  var args = [].slice.call(arguments) // slice without parameters copies all

  alert( args.join(':') ) // now .join works
}

sayHi(1,2)
[/js]

[warn header="Gotcha! `arguments` are parameters"]

The `arguments` and named parameters reference same values.

Updating `arguments[..]` causes the corresponding parameter to change and vice versa. For example:

[js run]
f(1)

function f(x) {
  arguments[0] = 5
  alert(x) // 5, updating arguments changed x
} 
[/js]

And the reverse way:

[js run]
f(1)

function f(x) {
  x = 5
  alert(arguments[0]) // 5, update of x reflected in arguments
} 

[/js]

`Array` methods which modify `arguments` also modify local parameters:

[js run]
sayHi(1)

function sayHi(x) {
  alert(x)           // 1
  [].shift.call(arguments)  
  alert(x)           // undefined, no x any more :/  
}
[/js]

Actually, the modern ECMA-262 5th specification splits arguments from local variables. But as of now, browsers still behave like described above. Try the examples to see.


<b>Generally, it is a good practice not to modify `arguments`.</b>
[/warn]


## Default values   

If you want a function parameter to be optional, there are two ways.

<ol>
<li>First, you could check if for `undefined` and reassign:
[js]
function sayHi(who) {
  if (who === undefined) who = 'me' 
    
  alert(who)  
}
[/js]
</li><li>Or, use the OR `||` operator:

[js run]
function sayHi(who) {
  who = who || 'me'  // if who is falsy, returns 'me'
    
  alert(who)  
}
sayHi("John")
sayHi()  // 'me'
[/js]
This way works great for parameters which are either not given or true. It happens most of time in real life.</li>
</ol>


[task src="task/mathmax-array.md"]



## Keyword arguments   

Imagine you've got a function with several arguments. And most of them will have default values. 

Like the following:
[js]
function showWarning(width, height, title, contents, showYesNo) {
  width = width || 200; // default values
  height = height || 100;
  
  var title = title || "Warning";

  ...
}
[/js]

Here we have a function to show a warning window. It allows to specify `width, height, title`, textual `contents` and show the button if `showYesNo` is set.

Most parameters have default values.

Here is how we use it:

[js]
showWarning(null, null, null, "Warning text", true)
// or
showWarning(200, 300, null, "Warning text)
[/js]

<b>The problem is: people tend to forget arguments order, and what they mean.</b> 

Imagine you have 10 arguments and most are optional. The function call becomes really terrifying.

The technique of <i>keyword arguments</i> exists in Python, Ruby and many other languages.

In JavaScript, it is implemented with a parameters object:

[js]
function showWarning(options) {
  var width = options.width || 200  // defaults 
  var height = options.height || 100
  
  var title = options.title || "Warning"

  // ...
}
[/js]

Calling such function is easy. You just pass an object of arguments like this:
[js]
showWarning({ 
  contents: "Text", 
  showYesNo: true
})
[/js]

Another bonus is that the arguments object can be reconfigured and reused:

[js]
var opts = {
  width: 400,
  height: 200, 
  contents: "Text", 
  showYesNo: true
}

showWarning(opts)

opts.contents = "Another text"
showWarning(opts) // another text with same options
[/js]

Keyword arguments are employed in most frameworks.


## Special `arguments` properties   


### `arguments.callee`   

There is an interesting property of `arguments`, namely `arguments.callee`. It references the function which is being run. 
[warn]
This property is deprecated by ECMA-262 in favor of named function expressions and for better performance.

JavaScript implementations can optimize the code much better if they know that keeping `arguments.callee` is not required.

It will trigger error in "strict mode", which you need to enable. Normally, it works.
[/warn]

Usually it is used for recursion in anonymous functions.

For example, `setTimeout(func, ms)` is a built-in function which calls `func` after `ms` microseconds.

[js run]
setTimeout(  
  function() { alert(1) }, // alerts 1 after 1000 ms (=1 second)
  1000
)
[/js]

The function has no name. To call it recursively 3 times, let's use `arguments.callee`:


[js run]
var i = 1
setTimeout(  
  function() { 
    alert(i) 
    if (i++<3) setTimeout(arguments.callee, 1000)
  }, 
  1000
)
[/js]

Another example is factorial:
[js]
// factorial(n) = n*factorial(n-1)
var func = function(n) {  
  return n==1 ? 1 : n*arguments.callee(n-1)  
}
[/js]
The factorial function given above works even if `func` is reassigned to something else. That's because it uses `arguments.callee` to reference itself.


### `arguments.callee.caller`   
The property arguments.callee.caller keeps the reference to a calling function.
[warn]
This property is deprecated by ECMA-262, for the same reason as `arguments.caller`. 

There is a property `arguments.caller` with same meaning, but less supported. Don't use it, stick to `arguments.callee.caller`, all browsers have it.
[/warn]
 
In the example below, `arguments.callee.caller` references the calling function of `g`, that is `f`.
[js run]
f()

function f() {
  alert(arguments.callee.caller) // undefined
  g()
}

function g() {
  alert(arguments.callee.caller) // f
}
[/js]

