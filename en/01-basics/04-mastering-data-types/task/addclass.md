
# addClass 

An object has a `className` property which keeps it's class names delimited by spaces:
[js]
var obj = {
  className: 'open menu'
}
[/js]

Write a function `addClass(obj, cls)` which adds a class `cls`, but only if it doesn't yet exist:
[js]
addClass(obj, 'new') // obj.className='open menu new'
addClass(obj, 'open')  // no changes (class already exists)
addClass(obj, 'me') // obj.className='open menu new me'

alert(obj.className)  // "open menu new me"
[/js]

P.S. Your function shouldn't add extra spaces.

=Solution

The solution is to split the `className` and loop over pieces. If there is no matching class, then add it.

The loop is slightly optimized for performance:

[js run]
function addClass(elem, cls) {
  for(var c = elem.className.split(' '), i=c.length-1; i>=0; i--) {
    if (c[i] == cls) return
  }
	
  elem.className += ' '+cls
}

var obj = { className: 'open menu' }

addClass(obj, 'new')
addClass(obj, 'open') 
alert(obj.className)   // open menu new
[/js]

In the example above, `var c` is defined in the beginning of the loop and `i` is set to it's last index.

The loop itself goes backwards, ending condition is <code>i>=0</code>. The reason is that <code>i>=0</code> check is faster than <code>i<c.length</code>. It evades `length` property lookup in `c`.


