
# filterNumericInPlace 

Create a function `filterNumericInPlace(arr)` which takes an array and removes all non-numeric values from it.

An example of how it should work:
[js]
arr = ["a", 1, "b", 2];

filterNumericInPlace(arr);

alert(arr)  // [1,2]
[/js]

=Solution

The solution is to iterate over array and use `arr.splice` to remove non-numeric values. Check it out [play src="/assets/intro/array/filterNumeric2.html"|here].


