
# NFE test 

What is the result of the code? Why?

[js]
( function g() { return 1 } )

alert(g)
[/js]

=Solution

The answer is <i>error</i>:

[js run]
( function g() { return 1 } )

alert(g)
[/js]

The key to the solution is understanding that `(function ... )` is a function expression (see [](#15)), not a function definition.

So, we have a <i>named</i> function expression.

<b>The name of a named function expression is visible only inside it.</b>

All browsers except IE&lt;9 support NFEs, so they will give 'undefined variable' error, because name `g` is only visible inside the function.

IE&lt;9 doesn't support NFE, so it will output the function. 


