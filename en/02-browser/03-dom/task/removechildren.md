
# removeChildren 

Write a function `removeChildren` to remove all children of an element.

[html]
<div>Very</div>
<div>Secret</div>
<div>Children</div>

<script>
  function removeChildren(elem) { /* your code */

  removeChildren(document.body) // makes BODY absolutely empty  
</script>
[/html]

=Solution

First, let's check a way how it <i>shouldn't</i> be done:

[js]
function removeChildren(elem) {
  for(var k=0; k<elem.childNodes.length;k++) {
    elem.removeChild(elem.childNodes[k])
  }
}
[/js]

If you check it in action - you'll find that it doesn't work. 

That's because `childNodes` always starts from 0, it autoshifts when first child is removed. But `k` increases +1 every iteration. So, `k` skips half of nodes.

The right solution:

[js]
function removeChildren(elem) {
   while(elem.lastChild) {
       elem.removeChild(elem.lastChild)
   }
}
[/js]

Another solution:

[js]
function removeChildren(elem) {
   elem.innerHTML = ''
}
[/js]


