
# Get a random value from array 

Write a code to `alert` a random value from array `arr`:
[js]
var arr = ["Plum","Orange","Donkey","Carrot","JavaScript"]
[/js]

P.S. The code to get a random integer from min to max (inclusive) is:
[js]
var rand = min + Math.floor(Math.random()*(max+1-min))
[/js]

=Solution

We need to get a random integer from `0` to `arr.length-1`(inclusive).

[js run]
var arr = ["Plum","Orange","Donkey","Carrot","JavaScript"]

var rand = Math.floor(Math.random()*arr.length)

alert(arr[rand])
[/js]

