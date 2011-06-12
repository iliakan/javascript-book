
# Math.max for array 

A well-known function with variable number of arguments is `Math.max`. It returns the greatest or it's arguments:
[js run]
alert( Math.max(1, -2, 7, 3) )
[/js]

Use `func.apply(context, args)` and `Math.max` to find the greatest element of an array:

[js]
var arr = [1, -2, 7, 3]
/* your code to output the greatest value of arr */
[/js]

=Solution

The solution:

[js run]
var arr = [1, -2, 7, 3]

alert( Math.max.apply(Math, arr) ) // (*)
[/js]

Here, we call `Math.max`, passing array of arguments `args`.

In the "natural" call `Math.max(...)`, the context `this` is set to `Math`, the object before dot `'.'`. In our code we keep it same by explicitly passing to `apply`.

Actually, talking about `Math.max` - this method does not use the context at all. We could abuse that to simplify our code even further:

[js run]
var arr = [1, -2, 7, 3]

alert( Math.max.apply(0, arr) ) // dummy '0' context
[/js]


