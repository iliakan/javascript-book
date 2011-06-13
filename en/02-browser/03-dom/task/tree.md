
# Tree 

Here's a tree: [play src="/assets/browser/dom/treeSource.html"]. 

Write a code to add a bracketed descendants count to each list item (`LI`). Skip those `LI` which don't have other list items inside.

Put the code at the bottom of `BODY` so it runs during page rendering.

[iframe src="/assets/browser/dom/tree/index.html"]. 

=Hint 1

First, let's describe the algorithm.

It can be like that:
<ol>
<li>Find all list elements.</li>
<li>For each list element:
<ol>
<li>Calculate a count of child `LI`</li>
<li>If the count is 0, skip it, otherwise modify the DOM to add this information.</li></ol>
</li>
</ol>

Please note which subtask is causing difficulties? Check the corresponding section of the book.


=Hint 2

How to add text with descendants count to `LI` ?

The tree node title (first child of `LI`) is a text node. Add the text to it's `nodeValue`.

=Solution

Generally, it could be a good idea to modify the markup, so that title will be in a <code>&lt;span class="title"&gt;</code>, descendants count will have an element with it's own class too etc. That could be good for applying CSS as well.

But from the other side, the less tags - the faster it runs. There's no silver bullet, only silver fork.
[img src="/assets/browser/dom/silverfork.jpg"]

The solution is here: [play src="/assets/browser/dom/tree.html"]. 



