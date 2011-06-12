
# Four scents of "this" 

The value of `this` is dynamic in JavaScript. It is determined when function is <i>called</i>, not when it is declared.

=Cut

<b>Any function may use `this`</b>. It doesn't matter if the function is assigned to the object or not.

The real value of `this` is defined in the call time anyway, and there are 4 possible cases.


[#four-scents-of-this]


## Method of the object   

If a function is called from the object (either dot or square bracket will do), `this` refers to this object.

[js run]
var john = { 
  firstName: "John" 
}

function func() { 
  alert(this.firstName + ": hi!")
}

john.sayHi = func

john.sayHi()  // this = john
[/js]

In the example above, `func` is initially apart from the object. But when called `john.sayHi()` sets `this` to the object before dot: `john`.


## Without a context   

If a function uses `this`, then it is meant to be called as a method. A simple `func()` call is usually a bug.

When there is no context, `this` becomes `window`:

[js run]
func() 

function func() { 
  alert(this) // [object Window] or [object global] or kind of..
}
[/js]

In the modern language specification, this behavior is altered, and `this = undefined`. By default, the browsers still behave the old (compatible) way, but some of them, like Firefox 4, support `"use strict"`. It switches the behavior to modern standard.

Try in Firefox 4:
[js run]
func()  

function func() { 
  "use strict"

  alert(this) // undefined in Firefox 4
}
[/js]

[ponder header="The reference type"]
How do you think, `obj.go` works equally in these calls?
[js]
1. obj.go()
2. (obj.go)()
3. (a = obj.go)()
4. (0 || obj.go)() 
[/js]

The answer is "No", because the two latter calls do not receive `this`. 

How do you think, why? You can try:

[js run]
obj = {
  go: function() { alert(this) }
}

obj.go(); // object

(obj.go)(); // object 

(a = obj.go)(); // window

(0 || obj.go)(); // window
[/js]

Give it a thought before going ahead...

That's because of so called <i>Reference Type</i>, described in the language specification. 

<b>To be passed as `this`, the value before brackets `"value()"` must be of Reference Type, or, shortly, an accessor, like `obj.a` or `obj['a']`,</b> but not anything more complex. Brackets around an accessor do not change it, so `(obj.a)` also works.

Any other expression, like `(a = obj.method)()` or `(a.method || b.method)()` does not pass proper `this`.

[task src="task/object-syntax-check.md"]

[/ponder]


## In `new`   

When a `new` function is called, `this` is initialized as a new object.

We've discussed that in the [Object constructor section](#new).


## Explicit `this`   

That's the tricky and JavaScriptish part.

A function can be called with explicit `this` value. This is done out by one of two methods: `call` or `apply`.


### `call`   

The syntax of `call`:
[js]
func.call(obj, arg1, arg2,...)
[/js]

The first argument of `call` becomes `this`, other arguments `arg1, arg2...` become arguments.

For example:

[js run]
var john = { 
  firstName: "John" 
}

function func() { 
  alert( this.firstName )
}

*!*
func.call(john)  // "John"
*/!*
[/js]

In the example above, `func` is called with `this = john`.

Let's add arguments:

[js run]
var john = { 
  firstName: "John",
  surname: "Smith"
}

function func(a, b) { 
  alert( this[a] + ' ' + this[b] )
}

*!*
func.call(john, 'firstName', 'surname')  // "John Smith"
*/!*
[/js]

Now `func` is called with `this = john` and given arguments, so it outputs `john['firstName']` and `john['surname']`.

<b>The `func.call(context, args...)` is essentially same as the simple call `func(args...)`, but additionally sets `this`.</b>


### `apply`   

The `func.apply` is same as `func.call`, but it accepts an array of arguments instead of a list.

The following two lines are same:
[js]
func.call(john, 'firstName', 'surname') 

func.apply(john, ['firstName', 'surname']) 
[/js]

In a way, `apply` is more powerful than `call`, because it allows to pass an array:

[js]
var args = ['firstName', 'surname']
func.apply(john, args) 
[/js]



## Summary   

<dl>
<dt>As method</dt>
<dd>
[js]
obj.func(...)    // this = obj
obj["func"](...)
[/js]
</dd>
<dt>As function</dt>
<dd>
[js]
func(...)        // this = window 
[/js]
</dd>
<dt>In `new`</dt>
<dd>
[js]
new func()       // this = {} (new object)
[/js]
</dd>
<dt>`call/apply`</dt>
<dd>
[js]
func.call(context, arg1, arg2, ...)  // this = context
func.apply(context, [args])
[/js]
</dd>
</dl>

