
# window === window.window 

We know that `window` is a global object. JavaScript searches everything in <code><code>window</code></code> as the last resort.

Then what is `window.window`, is it true that `window === window.window` ?

Logically, it should be same, for consistency, but... Open solution to learn more and see why it is important.


=Solution

In all browsers excepts IE, `window.window` is just a hooky way to reference.. well.. `window`. So `window === window.window`, true.

And `window.window.window` is also the same as `window.window`.

But in IE, top-level `window` is a special object with special features, while `window.window` is something closer to standard window object.

You can check it out (in IE):

[js run]
  alert(window === window.window) // false
  alert(window.window === window.window.window) // true
[/js]

Why that may be important?

There are features and bugs which happen if you use a variable <u>without</u> `var`, because IE uses own outer window object to handle it.

Most notable are:
<ol>
<li>reassigning a variable with same name as `id` of an element - IE will generate error:
[html run]
<div id="a">...</div>
<script> 
  a = 5    // error in IE! Ok if "var a = 5"
  alert(a) // will never happen
</script>
[/html]
</li>
<li>recursion through outer window variable - the following code dies on IE<9:
[html run height=0]
<script>
// recurse is explicitly defined on the outer window
window.recurse = function(times) {
  if (times !== 0) recurse(times-1)
}

recurse(13)
</script>
[/html]

The bug with recursion is fixed in IE9.
</li>
</ol>


