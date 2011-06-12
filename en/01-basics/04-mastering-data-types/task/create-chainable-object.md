
# Create chainable object 

Create an object `ladder` with <i>chainable</i> calls.

The source:
[js]
var ladder = {
  step: 0,
  up: function() { 
    this.step++ 
  },
  down: function() { 
    this.step-- 
  },
  showStep: function() { 
    alert(this.step) 
  }
}
[/js]

Currently it works in a dull way:
[js]
ladder.up()
ladder.up()
ladder.down()
ladder.showStep() // 1
[/js]

Modify the code, so the methods can be chained like this:
[js]
ladder.up().up().down().up().down().showStep()  // 1
[/js]



=Solution

The solution is to `return this` on every call:

[js run]
var ladder = {
  step: 0,
  up: function() { 
    this.step++ 
    return this
  },
  down: function() { 
    this.step-- 
    return this
  },
  showStep: function() { 
    alert(this.step) 
    return this
  }
}

ladder.up().up().down().up().down().showStep()  // 1
[/js]

