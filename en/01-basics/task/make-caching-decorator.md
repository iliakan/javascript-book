
# Make caching decorator  

Create a function `makeCaching(f)` which takes a one-argument function `f(arg)`, and makes a wrapper over it which caches calls.

The wrapper should have a static `flush()` method to flush the cache. 

Function `f` is allowed to have only one argument. 

Should work like this:

[js]
function work(arg) { return Math.random()*arg }

function makeCaching(f) { /* your code */ }

work = makeCaching(work);

var a = work(1);
var b = work(1);
alert( a == b ) // true (cached)

work.flush()    // clears the cache

b = work(1)
alert( a == b ) // false 
[/js]

No modifications of `work` are allowed. Your code should reside only in `makeCaching`. 


=Solution

The idea of solution is given in the task.

We make a `wrapper` function which puts arguments into the log and forwards the call to `f`.

See the solution, and comments below it.

[js run]
function work(arg) { return Math.random()*arg }

function makeCaching(f) { 
  var cache = {};  

  function wrapper(arg) {
    if (!(arg in cache)) {   // (1)
      cache[arg] = f.call(this, arg);
    }
    return cache[arg];
  }

  wrapper.flush = function() {  
    cache = {};
  }

  return wrapper;
}

work = makeCaching(work);

alert( work(1) );
alert( work(1) ); // outputs same
work.flush();      
alert( work(1) ); // output changed
[/js]

The object keeps the cache. The value `obj[arg]` can be anything, even undefined, that's why we are using the `arg in obj` test instead of `obj[arg] !== undefined`.



