
# SumClosure 

Create a function `sum` that will work like that: `sum(a)(b) = a+b`.

Yes, the syntax is dual brackets. Funny, isn't it? For instance:
[js]
sum(1)(2) = 3
sum(5)(-1) = 4
[/js]



=Solution

The idea is that `sum` should return a function which knows `a` and will take care about next argument.

Can be done like this:
[js run]
function sum(a) {

  return function(b) { // takes a from outer LexicalEnvironment
    return a+b
  }

}

alert( sum(1)(2) )
alert( sum(5)(-1) )
[/js]

