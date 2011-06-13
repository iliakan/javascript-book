
# Uppercase char 

Create a function `ucFirst(str)` which returns `str` with uppercased first character:
[js]
ucFirst("john") == "John"
[/js]

Note, there is no single method in JavaScript that can do so. Use `charAt`.

=Solution

We can't just replace the first character, because strings are immutable in JavaScript. 

The only way is to reconstruct the string:

[js run]
function ucFirst(str) {
  var newStr = str.charAt(0).toUpperCase()

  for(var i=1; i<str.length; i++) {
    newStr += str.charAt(i)
  }

  return newStr
}

alert( ucFirst("john") )
[/js]

P.S. A more advanced solution could use `substr` method or regular expression. 

