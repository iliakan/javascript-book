
# Array find 

Create a function `find(arr,value)` which finds a value in given array and returns its index, or -1 if not found.

For instance:
[js]
arr = [ "test", 2, 1.5, false ]

find(arr, "test") // 0
find(arr, 2) // 1
find(arr, 1.5) // 2

find(arr, 0) // -1
[/js]


=Solution

A possible solution could look like that:
[js]
function find(array, value) {

  for(var i=0; i<array.length; i++) {
    if (array[i] == value) return i;
  }
   
  return -1;
}
[/js]

Although it is wrong, because `==` makes no difference between `0` and `false`. 

More correct variant uses `===`. Also, there is a native function <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf">Array#indexOf</a> in the newer ES5 standard. So we can define the function like this:

[js run]
function find(array, value) {
  if (array.indexOf) return array.indexOf(value) 

  for(var i=0; i<array.length; i++) {
    if (array[i] === value) return i;
  }
   
  return -1;
}

var arr = ["a", -1, 2, "b"];

var index = find(arr, 2);

alert(index);
[/js]

An even smarter step would be to define find conditionally, by checking if the `indexOf` method exists. We'll cover that in the next sections.

