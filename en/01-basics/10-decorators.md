
# Decorators 

A <i>function decorator</i> accepts a function, <i>wraps</i> (or <i>decorates</i>) it's call and returns the wrapper, which alters default behavior.

For example, a `checkPermissionDecorator` decorator may only allow the function to run if the user has enough permissions for that.

=Cut

[js]
function checkPermissionDecorator(f) {
  return function() {
    if (user.isAdmin()) f() 
    else alert('Not an admin yet')
  }
}

// Usage: make save check permissions

save = checkPermissionDecorator(save)

// Now save() calls will check permissions
[/js]

Let's see a more complex decorator. The `doublingDecorator` accepts a function `func` and returns the decorated variant which doubles the result:

[js]
function doublingDecorator(f) {        // (1)
  return function() {
    return 2*f.apply(this, arguments)
  } 
}

// Usage:

function sum(a, b) {
  return a + b
}

var doubleSum = doublingDecorator(sum)          // (2)

alert( doubleSum(1,2) ) // 6
alert( doubleSum(2,3) ) // 10
[/js]

The decorator creates a new anonymous function which passes the call to `func` and doubles the result. By the way, this `func.apply(this, arguments)` trick is often used in JavaScript to forward the call in same context with same arguments.

<a href="http://en.wikipedia.org/wiki/Decorator_pattern">Decorators</a> is a great pattern of programming, because it allows to take an existing function and extend/modify it's behavior. 

There are two reasons why decorators are cool:

<ol>
<li>
Decorators can be reused. The `doublingDecorator` can be applied to `minus` and `divide` as well as `sum`.
</li>
<li>
Multiple decorators can be combined for greater flexibility.
</li>
</ol>

See the tasks below for more examples.

[task src="task/make-logging-decorator.md"]
[task src="task/make-caching-decorator.md"]

