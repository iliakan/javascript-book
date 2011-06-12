
# Array element call, this 

What will be the result? Why?
[js]
arr = ["a", "b"]

arr.push( function() { alert(this) } )

arr[arr.length-1]()  // ?
[/js]


=Solution

Because arrays are objects, `arr[..]()` is actually an object method call, like `obj[method]()`.

[js]
arr[arr.length-1]() 

// is same as
arr[2]()

// syntactically wrong, but ideologically same as:
arr.2() 

// rewritten to be same style as obj.method()
[/js]


`this = arr` is passed to the function in such case, so the contents of `arr` is alerted.

[js run]
arr = ["a", "b"]

arr.push( function() { alert(this) } )

arr[arr.length-1]() // "a","b",function
[/js]

