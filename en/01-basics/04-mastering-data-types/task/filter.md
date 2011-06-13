
# filter 

Make a generic function `filter(arr, func)` which filters an array using given function. 
Only those elements for which `func(elem)` returns `true` should compose the result.


Every element which pass through <code>and returns new array which contains only numeric values from <code>arr</code>.

An example of how it should work:
[js]
arr = ["a", -1, 2, "b"]

arr = filter(arr, isNumeric)
// arr = [-1, 2], only numeric in result

arr = filter(arr, function(val) { return val > 0 })
// arr = [2] , for other values function returns false
[/js]

=Solution

There is nothing really special in this task. Passing functions around and applying them is easy in JavaScript. Check the solution [play src="/assets/intro/array/filter.html"|here].


