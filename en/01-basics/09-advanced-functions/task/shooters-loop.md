
# Shooters in the loop 

Here is a function to create an army of shooters:

[js run]
function makeArmy() {

  var shooters = []

  for(var i=0; i<10; i++) {
    var shooter = function() { // a shooter is a function
      alert(i) // which should alert it's number
    }
    shooters.push(shooter)    
  }

  return shooters 
}

var army = makeArmy()

var shooter = army[0] // first shooter
shooter() // alerts 10, should be 0

shooter = army[5] // 5th shooter
shooter() // alerts 10, should be 5

// all shooters alert same: 10 instead of 1,2,3...10.
[/js]

Why all shooters alert the same? How to make each shooter output it's number?




=Solution

Note that the `shooter` function does not have a variable named `i`. 

So, when it is called, the interpreter takes `i` from the outer  `LexicalEnvironment`.

The problem is that at the time when shooters are run, function `makeArmy` has already finished the execution.

The loop has finished and the variable `i` is now `10`.

There are two possible solutions.

The first one is to put the correct value into the shooting function itself.
[js run]
function makeArmy() {

  var shooters = []

  for(var i=0; i<10; i++) {

*!*
    var shooter = function() {
      alert( arguments.callee.i ) 
    }
    shooter.i = i
*/!*

    shooters.push(shooter)    
  }

  return shooters 
}

var army = makeArmy()

army[0]() // 0
army[1]() // 1
[/js]

Another, more advanced solution is to use an extra function to trap the current value of `i`:

[js run]
function makeArmy() {

  var shooters = []

  for(var i=0; i<10; i++) {

*!*
    var shooter = function(i) {

      return function() {
        alert( i ) 
      }

    }(i)

*/!*
    shooters.push(shooter)    
  }

  return shooters 
}

var army = makeArmy()

army[0]() // 0
army[1]() // 1
[/js]

Let's consider the highlighted fragment more thoroughly.

[js]
var shooter = function(i) {
  return function() {
    alert( i ) 
  }
}(i)
[/js]

Here, the actual shooting function is created as the result of an anonymous `function(i)` which is created and executed in one place. 

So, when it comes to executing `alert(i)`, it will be taken from `LexicalEnvironment` of the anonymous function.

So, the anonymous function <i>traps</i> current `i` into it's `LexicalEnvironment` and allows the shooter to access it.

The last way is to wrap the whole loop into temporary function. Sometimes that's more readable:

[js run]
function makeArmy() {

  var shooters = []

*!*
  for(var i=0; i<10; i++) (function(i) {

    var shooter = function() {
      alert( i ) 
    }
    
    shooters.push(shooter) 
   
  })(i)
*/!*

  return shooters 
}

var army = makeArmy()

army[0]() // 0
army[1]() // 1
[/js]

The `(function(i) { ... })` definition is wrapped into brackets to make sure the interpreter treats that as expression.





