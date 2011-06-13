
# Traversing the DOM 

An access always starts from the `document`. 
This object provides a variety of methods to search and modify elements.

=Cut


## The root: `documentElement` and `body`   

The root is the DOM always `document.documentElement`. This special property will give access to the topmost `HTML` tag.

Another starting point can be the `document.body`, which represents the `BODY` tag.

[img src="/assets/browser/dom/documentElement.png"]

Both entry points are valid. But <b>`document.body` can be `null`</b>.

For example, you access `document.body` from an inline script in the `HEAD`, prepare to see `null` instead. That's natural, because there is no `BODY` yet.

In the example below, first alert outputs `null`:

[html src="/assets/browser/dom/bodynull.html" height="80" link][/html]

Contrary to this, `document.documentElement` is available always.

Also note that `document.body` can't be `undefined`. <b>In the world of DOM, an "element not found" or "no such element" is always `null`.</b>

[sum]As a more general rule than described above, it is impossible to reference elements that are not yet rendered at the time of script execution. 
[/sum]


## Child elements   

There are several ways to obtain element children.


### `childNodes`   

An element keeps references to children in `childNodes` array-like property.

All nodes are referenced, including whitespace ones (excepts IE&lt;9).

[html autorun src="/assets/browser/dom/childNodes.html" link][/html]

Note that `SCRIPT` node is listed too.

In the <a href="http://JavaScript.info/files/tutorial/browser/dom/example.html">example document</a> above, `document.body.childNodes[1]` is `DIV` in all browsers except IE&lt;9. In older IEs, there are no whitespaces, so `document.body.childNodes[1]` is `UL`.


### `children`   

Sometimes we need to browse only element nodes, skipping text nodes. That's what the `children` property is for.

It contains all element nodes. Check out the same example as above, but with `children` instead of `childNodes`.

It will output only element nodes as it should.

[html autorun src="/assets/browser/dom/children.html" link][/html]

[warn header="Comment nodes in `children` if IE<9"]Internet explorer lower than 9 also lists comment nodes in `children`.[/warn]

[task src="task/dom-children-0.md"]


## Children links   

Getting a list of children is not enough for convenient walking around elements.
So, there are additional properties for siblings, parent, etc.


### The `firstChild` and the `lastChild`   

The `firstChild` and `lastChild` properties allow to quickly access first or last child.

[img src="/assets/browser/dom/children.png"]

They are basically same as corresponding `childNodes` indexes:

[js run]
var body = document.body

alert(body.firstChild === body.childNodes[0])
alert(body.lastChild === body.childNodes[body.childNodes.length-1])
[/js]


### `parentNode`, `previousSibling` and `nextSibling`   

<ul>
<li>The `parentNode` property references the parent node. It equals `null` for `document.documentElement`.</li>
<li>The `previousSibling` and `nextSibling` allow to access the left or the right neightbour.</li>
</ul>

For example:
[html run src="/assets/browser/dom/siblings.html" link][/html]

Picture for the document above (without whitespace nodes):
[img src="/assets/browser/dom/siblings.png"]

<b>The browser always maintains correct helper links.</b> It is possible to modify the DOM, add/remove elements, but no need to reassign the links manually, browser does that.

[task src="task/no-children-check.md"]
[task src="task/lastchildnextsibling-vs-children0previoussibling.md"]




## Summary   

The DOM tree is tightly interlinked:
<dl>
<dt>up</dt>
<dd>`parentNode`</dd>
<dt>down</dt>
<dd>`children/childNodes`, `firstChild`, `lastChild`</dd>
<dt>left/right</dt>
<dd>`previousSibling/nextSibling`</dd>
</dl>

Browser guarantees that the links are always correct. All of them are read-only.

If there is no such element (child, parent, neighbour etc), the value is `null`.

