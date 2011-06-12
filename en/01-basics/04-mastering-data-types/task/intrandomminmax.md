
# intRandom(min,max) 

Write the code to generate a random <b>integer</b> value between `min` and `max`, with both `min,max` as possible values.

Any value from `min..max` range should happen with the same probability.


=Solution


## The wrong way   
A first idea could be to generate a value between `min..max` and round it.

But the probability of edge values `min` and `max` will be two times less than any other value. 

For example, let's find random between 1 and 3. We take the following code as the source:
[js]
// random float value from min(inclusive) to max(exclusive)
var rand = min + Math.random()*(max-min) 

// so for 1 and 3
var rand = 1 + Math.random()*(3-1)
[/js]

The `Math.round()` will map the resulting `rand` like this:
[js]
1   ... 1.499+ will map to 1
1.5 ... 2.499+ will map to 2 
2.5 ... 2.999+ will map to 3 
[/js]

Note that the first range (for 1) is of length 0.5, the second (for 2) has length 1, and the third range is again 0.5.

So, 2 will happen two times more often than 1 or 3, the probability will not be same as required.


## The good way   

A better way is to `Math.floor()` a number from `min` to `max+1`. 

So, to find a random integer between 1 and 3, we need to generate a random float between 1(inclusive) to 4(exclusive) first. 

Then the `Math.floor()` will map them like this:
[js]
1 ... 1.999+ will map to 1
2 ... 2.999+ will map to 2
3 ... 3.999+ will map to 3
[/js]

You can see, the ranges are same, so the probability is uniform.

The resulting code is:

[js run]
var min=5, max=10
*!*
var rand = min + Math.random()*(max+1-min) 
rand = Math.floor(rand)
*/!*
alert(rand)
[/js]


## Another nice solution   

The following also works. Please figure out why.

[js]
var rand = Math.round(random(min-0.5, max+0.5))
[/js]







