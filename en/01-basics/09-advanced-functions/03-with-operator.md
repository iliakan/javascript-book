
# The "with" operator 

The `with` operator allows to use an arbitrary object as the scope.
It is used in the code around, but deprecated in modern JavaScript.

=Cut

The syntax is:
[js]
with(obj) {
  ...
}
[/js]

When the interpreter meets a variable in the `with` block, the lookup is made among the properties of `obj` first, and then out of it.


## Lookup example   

The example below demonstrates how `with` gets a value from the object.
[js run]
var a = 5

var obj = { a : 10 }
*!*
with(obj) {
  alert(a) // 10
}
*/!*
[/js]

Let's try to access a variable not in `obj`:

[js run]
var a = 5, b = 1

var obj = { a : 10 }
*!*
with(obj) {
  alert(b) // 1
}
*/!*
[/js]

The interpreter checks `obj` for property `b`, fails and takes it from outside of `with`.

Nested `with` are also possible:

[js run]
var box = {
  weight: 10,
  size: {
    width: 5,
    height: 7
  }
}

with(box) {
  with(size) { // size is taken from box
*!*
    alert( width*height / weight ) // width,height from size, weight from box
*/!*
  }
}
[/js]

Note how properties from different levels of the object are used in one line. Magic :)


The variable lookup order is <code>size =&gt; box =&gt; window</code>:

[img src="/assets/intro/scope/with_obj_size.png"]


## Setting example   

When the variable is found in the object, it can be changed:

[js run]
var a = 5

var obj = { a : 10 }

*!*
with(obj) {
  a = 20
}
*/!*
alert(obj.a)
[/js]

Another one from the real life:

[js]
with(elem.style) {
  position = 'absolute'
  left = '10px'
  top = '0'
}
[/js]

In the example above, `elem.style.position`, `elem.style.left` and `elem.style.top` receive new values.


## Why `with` is deprecated?   

[sum] People don't like `with`, because it gives the illusion of working with the object.[/sum]

Unfortunately, that's just an illusion. It is possible to lookup a variable, to change it, but if you try to add it.. Whops! Failure!..

In the example below, we take the `box` and try to modify it's properties. Everything is fine, until we try to add a new one in the line (*):

[js run]
var box = {
  weight: 10
}

with(box) {
  weight = 20 
  size = 35 // (*)
}

alert(box.size)
alert(window.size) 
[/js]

There is no `size` property in the `box`. So the lookup process doesn't stop at `with`, it goes up. In this example, there is no `size` at all, so the interpreter creates a new `window.size` variable.

That's possibly not the result we want. Such bugs are rare, but very hard to debug.

Another reason for not recommending `with` is JavaScript compression algorithms which can't handle `with` reliably.

And finally, the intermediate scope introduced by `with` slows down the execution. Modern JavaScript interpreters want to be extremely fast, as close to native code as possible. So, removing `with` removes one of performance problems.

Instead of `with`, it is recommended to use a temporary variable:
[js]
var s = elem.style
s.position = 'absolute'
s.top = '10px'
s.left = '0'
[/js]

That's not so elegant, but evades additional nesting level and is more bug-proof.


## Summary   

<ul>
<li>The `with(obj) { ... }` operator treats `obj` as an extra scope. All variables inside the block are first searched in the properties of `obj`, and then in the outside scope.</li>
<li>The `with` operator is deprecated and not recommended for a number of reasons. Try to evade it.</li>
<li>JavaScript compressors are buggy when you use `with`.</li>
</ul>

