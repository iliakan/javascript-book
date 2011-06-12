
# Make logging decorator  

Create a function `makeLogging(f)` which takes an arbitrary function `f`, and makes a wrapper over it which logs calls. The wrapper should have a static `outputLog()` method to output the log. 

Should work like this:

[js]
function work(a,b) { /* arbitrary function */ }

function makeLogging(f) { /* your code */ }

work = makeLogging(work)

// now work should log it's calls somewhere (but not in global)
work(1,2)
work(5,6)
work.outputLog() // <-- should alert('1,2'), alert('5,6')
[/js]

No modifications of `work` are allowed. Your code should reside only in `makeLogging`. 


=Solution

The idea of solution is given in the task.

We make a `wrapper` function which puts arguments into the log and forwards the call to `f`.

See the solution, and comments below it.

[js run]
function work(a,b) { /*...*/ }

function makeLogging(f) { 
  var log = []  // (1)

  function wrapper() {
    log.push(arguments)
    return f.apply(this, arguments)   // (2)
  }

  wrapper.outputLog = function() {  
    for(var i=0; i<log.length; i++) {
      alert( [].join.call(log[i], ',') ) // (3)
    }
  }

  return wrapper
}

work = makeLogging(work)

work(1, 10) 
work(2, 20)
work.outputLog()
[/js]

The details:
<ol>
<li>The log is implemented via closure.</li>
<li>Log and forward the call, including `this`. So, if `work` is an object method, everything is still fine.</li>
<li>We log `arguments`, which is not an array. So, we borrow `join` from arrays.
</li>
</ol>

Using a wrapper gives a nasty side effect. All static methods of the function can not be accessed any more, because they are on the function, which is wrapped around:

[js]
work.a = 5
work = makeLogging(work)
alert(work.a) // undefined
[/js]

So, static methods and functional decorators are not friends.


