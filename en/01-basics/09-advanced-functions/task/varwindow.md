
# VarWindow 

What this test is going to alert? Why? (Don't run it before you answer, please)
[js run]
function test() {
  
  alert(window)

  var window = 5
}
test()
[/js]

=Solution

The `var` directive is processed on the pre-execution stage.

So, `window` becomes a local variable before it comes to alert:
[js]
LexicalEnvironment = {
  window: undefined
}
[/js]

So when the execution starts and reaches first line, variable `window` exists and is undefined.


