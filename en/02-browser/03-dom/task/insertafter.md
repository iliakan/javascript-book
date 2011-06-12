
# insertAfter 

Write a function `insertAfter(elem, refElem)` to insert `elem` right after `refElem`.
[html]
<div>Very</div>
<div>Secret</div>

<script>
  var elem = document.createElement('div')
  elem.innerHTML = '<b>Child</b>'

  function insertAfter(elem, refElem) { /* your code */

  insertAfter(elem, document.body.firstChild) // <--- should work
  insertAfter(elem, document.body.lastChild)  // <--- should work 
  
</script>
[/html]


=Solution

To insert an element <i>after</i> `refElem`, we can insert it <i>before</i> `refElem.nextSibling`.

But what if there is no `nextSibling`? That means `refElem` is the last child of its parent, so we can just call `appendChild`.

The code:
[js]
function insertAfter(elem, refElem) {
    var parent = refElem.parentNode
    var next = refElem.nextSibling
    if (next) {
        return parent.insertBefore(elem, next)
    } else {
        return parent.appendChild(elem)
    }
}
[/js]

But the code could be much shorter if it used `insertBefore` null second argument feature:

[js]
function insertAfter(elem, refElem) {
    return elem.parentNode.insertBefore(elem, refElem.nextSibling)
}
[/js]

If there is no `nextSibling` then the second argument of `insertBefore` becomes `null` and then `insertBefore(elem,null)` works as `appendChild`.



