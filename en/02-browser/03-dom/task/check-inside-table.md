
# Check inside table 

For the document [play src="/assets/browser/dom/searchTask.html"] 

Write a function `checkInsideTable(id)` which returns `true` if an element with given <code><code>id</code></code> is inside the table with `id="age-table"`.

If there is no such element, it should return `false`.

Like this:
[js]
checkInsideTable('age-header')  // true
checkInsideTable('top')         // false
checkInsideTable('non-existant-id') // false
[/js]

=Solution

First, we need to get the DOM element and table by id:
[js]
var elem = document.getElementById(id)
var table = document.getElementById('age-box')
[/js]

Then we need to go through parent elements: `elem.parentNode`, `elem.parentNode.parentNode..` etc. Can be done in `while` loop until the next parent is `null`.

The function can be written as follows:

[js]
function checkInsideTable(id){
  var elem = document.getElementById(id)
  var table = document.getElementById('age-box')
  
  while (elem != table && elem) {
    elem = elem.parentNode
  }
  
  return !!elem
}
[/js]

After `while` we have either `elem == table` or `elem == null`. So, getting a boolean value for `elem` gives the result.

