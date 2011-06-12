
# No children check 

Write the code to check if the DOM Node `elem` is totally empty. That is, there are no children or text in it.

[js]
if (/*... put here your code to check if the elem is empty... */)  
[/js]

=Solution

There are many ways:
[js]
if (elem.childNodes.length) { ... }

if (elem.firstChild) { ... }

if (elem.lastChild) { ... }
[/js]

The last one appears to be the shortest.



