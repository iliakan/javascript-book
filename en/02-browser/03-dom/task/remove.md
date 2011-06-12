
# remove 

Write a function which removes an element from DOM without referencing its parent.
The syntax should be: `remove(elem)`

[html]
<div>Very</div>
<div>Secret</div>
<div>Child</div>

<script>
  var elem = document.body.children[0]

  function remove(elem) { /* your code */
*!*
  remove(elem)   // <-- should remove the element
*/!*
</script>
[/html]

=Solution

The parent of `elem` is referenced by the `parentNode` property.

And better don't forget to return the removed element for compatibility.

So the code can be like this:
[js]
function remove(elem) {
  return elem.parentNode.removeChild(elem)
}
[/js]


