
# Camelize 

Create a function `camelize(str)` which transforms a string from "my-short-string" to "myShortString".

So, all parts after a hyphen become camelcased instead. For instance:

[js]
camelize("background-color") == 'backgroundColor'
camelize("list-style-image") == 'listStyleImage'
[/js]

Such function may be useful when operating with CSS. 

Note. Remember `charAt`, `substr` and check `str.toUpperCase()` function which transforms the string to upper case.



=Solution

There is a number of ways to implement such task.

A possible solution is [play src="/assets/intro/array/camelize.html"|here].


