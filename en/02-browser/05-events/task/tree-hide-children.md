
# Tree hide children  

Create a tree which hides/shows children on click. 

[iframe src="/assets/browser/events/tree/index.html"]

The source code of the tree is [play src="/assets/browser/events/tree-src"|here].


=Hint 1

Modify HTML/CSS structure to move titles into separate `SPANs`. Can be done with JavaScript walking the tree. Bolding can be done with `:hover` CSS. 

Also, spans are required to catch clicks on text, not on blank space to the right of it.

=Solution

The generic approach to the task is to use event delegation: assign a `click` handler to the tree top and see on which tree node it has happened.

Then get internal `UL` of this node and show/hide it.


## Fix HTML/CSS   

The first problem is catching tree node clicks. How do we catch a click on "Mammals" ? The list is a block element, so the click will trigger even aside from the text:

Run the example below and click on the same line with `Mammals`, but not on `Mammals` itself. See, it works :(

[html run height=300 untrusted]
<style>
li { border: 1px solid green; }
</style>

<ul onclick="alert(event.target || event.srcElement)">
<li>Mammals
  <ul>
    <li>Cows</li>
    <li>Donkeys</li>
    <li>Dogs</li>
    <li>Tigers</li>
  </ul>
</li>
</ul>
[/html]

`LI` is a block element, so it expands for full width. You can see that above, because all `LIs` have a border. 

A visitor can click on an empty space on the right, and that still is `LI`.

To fix this, it is sufficient to wrap all node titles into `SPAN` and handle clicks on spans only.

We could do it by changing HTML, but let's use JavaScript here for additional experience.

The code below finds all `LI` and wraps text node into span.
[js]
var treeUl = document.getElementsByTagName('ul')[0]

var treeLis = treeUl.getElementsByTagName('li')

for(var i=0; i<treeLis.length; i++) {
  var li = treeLis[i]
  
  var span = document.createElement('span')
  li.insertBefore(span, li.firstChild) // add empty span before title
  span.appendChild(span.nextSibling) // move the title into span
}
[/js]

Now the tree handles title clicks correctly:

[html run height=auto untrusted]
<style>
span { border: 1px solid red; }
</style>

<ul onclick="alert((event.target||event.srcElement).nodeName)">
<li><span>Mammals</span>
  <ul>
    <li><span>Cows</span></li>
    <li><span>Donkeys</span></li>
    <li><span>Dogs</span></li>
    <li><span>Tigers</span></li>
  </ul>
</li>
</ul>
[/html]

The `SPAN` is an inline element, so it is always same size as the text. Viva la `SPAN`!


## Handle clicks   

Implement event delegation. We don't need to ascent the parent chain, just check if the `SPAN` was clicked and show/hide it's next sibling.

[js]
var tree = document.getElementsByTagName('ul')[0]

tree.onclick = function(e) {
  e = e || event
  var target = e.target || e.srcElement
    
  if (target.nodeName != 'SPAN') {
    // click on somewhere away from the title
    return;
  }
    
  // get the corresponding UL 
  var node = target.parentNode.getElementsByTagName('ul')[0]
  if (!node) return // no children

  // toggle it
  node.style.display = node.style.display ? '' : 'none'
}
[/js]


## Polishing   

The polishing involves:

<ul>
<li>Making spans bold when hovered (CSS)</li>
<li>Disabling selection with `mousedown/selectstart`</li>
</ul>

You can see the full code of the solution at [play src="/assets/browser/events/tree"|here].




