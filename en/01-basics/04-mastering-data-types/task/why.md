
# Why [ ] == ![ ]  ? 

Why they are equal?
[js run]
alert( [] == ![] ) // true
[/js]

=Solution

<ol>
<li>First, the two sides of comparison are evaluated. The right side is `![]`. Logical NOT `'!'` converts to boolean. According to the table, an object `[]` is `true`. So, the right side becomes `![] = !true = false`. It brings us to:
[js]
[] == false
[/js]
</li>
<li>The equality check between an object and a primitive converts the object to primitives in numeric way.

The array has no `valueOf`, but has `toString` which converts it to a comma-delimited list of items. In our case, no items lead to an empty string:
[js]
'' == false
[/js]
</li>
<li>Comparison between different primitives converts them to numbers:
[js]
0 == 0 
[/js]
Now the result is obvious.
</li>
</ol>

