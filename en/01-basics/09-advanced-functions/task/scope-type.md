
# Scope type 

How do you think, what will be the output? Why?

[js]
var value = 0

function f() {  
  if (1) {
    value = 'yes'
  } else {
    var value = 'no'
  }

  alert(value)
}

f()
[/js]

=Solution

The `var` directive is processed and created as `LexicalEnvironment` property at pre-execution stage.

So, the line `value='yes'` performs an assignment to the local variable, and the last alert outputs `'yes'`.




