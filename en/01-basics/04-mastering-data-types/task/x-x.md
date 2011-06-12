
# ['x'] == 'x' 

Why the following is true?

[js run]
alert( ['x'] == 'x' )
[/js]

=Solution

There is an array to the left and primitive value to the right.

So, a numeric conversion is applied to the array. The `Array` has no `valueOf`, so `toString` is used.

The default implementation of `Array#toString` lists it's comma-delimited values:

[js run]
alert( ['a','b'] + '' )   // 'a,b'
[/js]

Because, there is a single value, `['x']` becomes `'x'`.

P.S.
Same logic leads to:
[js]
['x','y'] == 'x,y'
[] == ''
[/js]






