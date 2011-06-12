
# Window and variable 2 

What will be the result (no `var` before `a`)?
[js]
if ("a" in window) {
    a = 1
}
alert(a)
[/js]


=Solution

The answer is "Error: no such variable", because there is no variable `a` at the time of `"a" in window` check.

So, the `if` branch does not execute and there is no `a` at the time of `alert`.



