
# Window and variable 

What will be the result?
[js]
if ("a" in window) {
    var a = 1
}
alert(a)
[/js]


=Solution

The answer is `1`.

Let's trace the code to see why. 

<ol>
<li>At initialization stage, `window.a` is created:
[js run]
// window = {a:undefined}

if ("a" in window) {
    var a = 1
}
alert(a)
[/js]
</li>
<li>`"a" in window` is `true`.
[js]
// window = {a:undefined}

if (true) {
    var a = 1
}
alert(a)
[/js]

So, `if` is executed and hence value of `a` becomes `1`.


