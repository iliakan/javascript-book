
# Modifying the document 

DOM modifications is the key to making pages dynamic. Using the methods described below, it is possible to construct new page elements and fill them on-the-fly.

=Cut

The DOM manipulation methods described above are defined in <a href="http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html">DOM Level 1</a>.


## Creating elements   

There are following methods for creating new elements in DOM:

<dl>
<dt>`document.createElement(tag)`</dt>
<dd>Creates a new DOM element of type node: 
[js]
var div = document.createElement('div')
[/js]
</dd>
<dt>`document.createTextNode(text)`</dt>
<dd>Creates a new DOM element of type text: 
[js]
var textElem = document.createTextNode('Robin was here')
[/js]
</dl>

The `createElement` is the most commonly used method, but `createTextNode` is also good. It creates a text node that can be appended to another element.

For an empty element, creating a text node and appending it works much faster than `innerHTML` in most modern browsers. 

But `innerHTML` is simpler and supports nested tags, so they both find their place in the world.

[smart header="Cloning"]
An element can also be cloned:
<dl>
<dt>`elem.cloneNode(true)`</dt>
<dd>Clones an element deeply, with all descendants.</dd>
<dt>`elem.cloneNode(false)`</dt>
<dd>Clones an element only, with attributes, but without children.</dd>
</dl>
[/smart]



## Adding elements   

To do something with the element, you need to call the corresponding method of its parent:

<dl>
<dt>`parentElem.appendChild(elem)`</dt>
<dd>Appends `elem` to the children of `parentElem`. 

The following example demonstrates creating and adding new element to `BODY`:
[html run height=150]
<div>
  ...
</div>
<script>
  var div = document.body.children[0]

  var span = document.createElement('span')
  span.innerHTML = 'A new span!'
  div.appendChild(span)
</script>
[/html]

The new node becomes a last child of the `parentElem`.

[task src="task/createtextnode-vs-innerhtml.md"]
</dd>
<dt>`parentElem.insertBefore(elem, nextSibling)`</dt>
<dd>Inserts `elem` into the children of `parentElem` before the element `nextSibling`.

The following example inserts a new node before the first child:
[html run height=150]
<div>
  ...
</div>
<script>
  var div = document.body.children[0]

  var span = document.createElement('span')
  span.innerHTML = 'A new span!'
  div.insertBefore(span, div.firstChild)
</script>
[/html]

Note that you `insertBefore` with second argument `null` works as `appendChild`.

[js]
elem.insertBefore(newElem, null) // same as
elem.appendChild(newElem)
[/js]
</dd>
</dl>

All insertion methods return the inserted node.


## Removing nodes   

There are two main methods for removing nodes from DOM:

<dl>
<dt>`parentElem.removeChild(elem)`</dt>
<dd>Remove the `elem` from the children of `parentElem`.</dd>
<dt>`parentElem.replaceChild(elem, currentElem)`</dt>
<dd>Replace the child element of `parentElem`, referenced by `currentElem` with the `elem`.</dd>
</dl>

Both of them return a removed node which can later be reinserted into the DOM.

[smart]
If you want to move an element, you don't have to remove it first.

<b>`elem.appendChild/insertBefore` remove `elem` from it's previous place automatically.</b>

The following example moves the last child to the top of children list:
[html run height=150]
<div>First div</div>
<div>Last div</div>
<script>
  var first = document.body.children[0]
  var last = document.body.children[1]

  document.body.insertBefore(last, first)
</script>
[/html]

The removal occurs automatically when insertion methods are called for a node which already has a parent.
[/smart]



## Tasks and examples   

The following tasks can serve as examples depending on whether you read or try to solve them. Of course, it's always better to solve ;)

[task src="task/remove.md"]

[task src="task/insertafter.md"]

[task src="task/removechildren.md"]

[task src="task/createlist.md"]


## Summary   

Creation methods:
<ul>
<li>`document.createElement(tag)` - creates a new element node.</li>
<li>`document.createTextNode(value)` - creates a new text node with given value</li>
<li>`elem.cloneNode(deep)` - clones the element</li>
</ul>

Inserting and removing methods are called from parent node. All of them return `elem`:
<ul>
<li>`parent.appendChild(elem)`</li>
<li>`parent.insertBefore(elem, nextSibling)`</li>
<li>`parent.removeChild(elem)`</li>
<li>`parent.replaceChild(elem, currentElem)`</li>
</ul>

