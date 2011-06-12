
# Function simple 

Create a function `min(a,b)` which takes two numbers and returns the lesser one.

[js]
min(2, 5)  == 2
min(3, -1) == -1
[/js]

=Solution

The code with `if`:

[js]
function min(a, b) {
  if (a < b) {
    return a
  } else {
    return b
  }
}
[/js]

The solution with ternary operator:

[js]
function min(a, b) {
  return a < b ? a : b  // a if condition (a<b) is true, b otherwise
}
[/js]

