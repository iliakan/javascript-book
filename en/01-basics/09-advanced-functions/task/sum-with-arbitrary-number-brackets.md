
# Sum with arbitrary number of brackets 

Create a function `sum` that will work like that: `sum(a)(b) = a+b` and accepts <b>any number of brackets</b>.

For instance:
[js]
sum(1)(2) == 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
[/js]



=Hint 1

The `sum` needs to return another function, not a number. This function must have custom `toString` which will converts it to a number for `alerts` and computations.


=Solution

To make `sum(1)` callable as `sum(1)(2)`, it must return a function.

The function can be either called or converted to a number with `valueOf`.


The solution is really self-explanatory:

[js run]
function sum(a) {
  
  var sum = a 
  
  function f(b) {
    sum += b
    return f
  }
  
  f.toString = function() { return sum }
  
  return f
}

alert( sum(1)(2) )  // 3
alert( sum(5)(-1)(2) )  // 6
alert( sum(6)(-1)(-2)(-3) )  // 0
alert( sum(0)(1)(2)(3)(4)(5) )  // 15
[/js]

