
# removeClass 

An object has a `className` property which keeps it's class names delimited by spaces:
[js]
var obj = { 
  className: 'open menu'
}
[/js]

Write a function `removeClass(obj, cls)` which removes a class `cls` if it is set:
[js]
removeClass(obj, 'open') // obj.className='menu'
removeClass(obj, 'blabla')  // no changes (no class to remove)
[/js]




=Solution

The solution is to split the `className` and loop over pieces. If there is a match, then remove it from the array and join the array back at the end.

We'll do it in a slightly optimized way:

[js run]
function removeClass(elem, cls) {
  for(var c = elem.className.split(' '), i=c.length-1; i>=0; i--) {
    if (c[i] == cls) c.splice(i,1)
  }
	
  elem.className = c.join(' ')
}

var obj = { className: 'open menu' }

removeClass(obj, 'open')
removeClass(obj, 'blabla')
alert(obj.className)   // menu
[/js]

In the example above, `var c` is defined in the beginning of the loop and `i` is set to it's last index.

The loop itself goes backwards, ending condition is <code>i>=0</code>. The reason is that <code>i>=0</code> check is faster than <code>i<c.length</code>. It evades `length` property lookup in `c`.


