
# Random(a,b) 

Write a code to return a random float value between `min`(inclusive) and `max`(exclusive).


=Solution

The classical way to solve it is to generate a random value in range `0..max-min`, then shift it by `min`.

[js run]
var min=5, max = 10

alert( min + Math.random()*(max-min) )
[/js]

