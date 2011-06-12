
# Conversion quiz 

Figure out the result of expressions. When you are done, check against the solution.
[js]
6 / "3"
"2" * "3"
4 + 5 + "px"
"$" + 4 + 5 
"4" - 2 
"4px" - 2 
7 / 0 
{}[0] 
parseInt("09") 
5 && 2 
2 && 5 
5 || 0 
0 || 5
[/js]

=Solution

[js]
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5  = "$45"
"4" - 2  = 2
"4px" - 2  = NaN
7 / 0  = Infinity
{}[0]  = undefined
parseInt("09")  = "0" or "9" // octal or decimal, depends on the browser
5 && 2  = 2
2 && 5  = 5
5 || 0  = 5
0 || 5 = 5
[/js]

