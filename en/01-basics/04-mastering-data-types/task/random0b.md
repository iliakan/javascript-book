
# Random(0,b) 

Write a code to return a random float value between `0`(inclusive) and `max`(exclusive).


=Solution

What we need is to generate a value between `0..1` and multiply it by `max`:

[js run]
var max = 10

alert( Math.random()*max )
[/js]

