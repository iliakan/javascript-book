
# Object syntax check 

What will be the result of the code below?
[js]
obj = {
  go: function() { alert(this) }
}

(0 || obj.go)() 
[/js]

=Solution

Error! Try it:
[js run]
obj = {
  go: function() { alert(this) }
}

(0 || obj.go)()  // error
[/js]

That's because there is no semicolon after `obj`. JavaScript ignores spaces after `obj` and reads the code as:


[js]
obj = { go: ... }(0 || obj.go)()  
[/js]

It tries to call object `{...}(..)` as a function, evaluate the right part of the expression and assign the result to `obj`. 

That's better (semicolon added):
[js run]
obj = {
  go: function() { alert(this) }
}*!*;*/!*

(0 || obj.go)()  // window
[/js]






