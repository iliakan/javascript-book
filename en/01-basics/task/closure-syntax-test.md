
# Closure syntax test 

What will be the result of code execution? Why?
[js]
var a = 5

(function() {
  alert(a)
})()
[/js]

P.S. <i>Think well! Pitfall ahead! Ok, you've been warned :)</i>

=Solution

The result is <b>error</b>. Try it:

[js run]
var a = 5

(function() {
  alert(a)
})()
[/js]

That's because no semicolon after `var a = 5`. JavaScript treats the code as:

[js run]
var a = 5(function() {
  alert(a)
})()
[/js]

So, it tries to call `5` as if it were a function, which leads to an error. The working code:


[js run]
var a = 5;

(function() {
  alert(a)
})()
[/js]

This is probably the most dangerous pitfall of optional semicolons in JavaScript.



