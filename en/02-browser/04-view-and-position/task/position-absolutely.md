
# Position absolutely 

We've got the `Text`, <span style="background-color:yellow">Question</span> and the <span style="color:red">Button</span>:


[iframe src="/assets/browser/dom/position/source/index.html"]

Use JavaScript and CSS to move the <span style="color:red">Button</span> under the <span style="background-color:yellow">Question</span>:

<ol><li>First, to the left:
[iframe src="/assets/browser/dom/position/left/index.html"]
</li>
<li>Second, to the right:
[iframe src="/assets/browser/dom/position/right/index.html"]
</li>
</ol>
The text should be overlapped, as if the button were a sliding menu.

The source code is here: [play src="/assets/browser/dom/position/source.html"]


=Solution

The solution is to:
<ol>
<li>Use relative positioning on the question.</li>
<li>Use absolute positioning on button, append it to the question.</li>
<li>Add `background-color` to the button so it will overlap text.</li>
<li>Use `buttonElem.style.right=0` for the right side.</li>
</ol>

Left: [play src="/assets/browser/dom/position/left.html"].
Right: [play src="/assets/browser/dom/position/right.html"].

Note that <i>the button does not inherit yellow background</i>, because it is positioned absolutely and, speaking in terms of CSS is <i>out of normal flow</i>.

