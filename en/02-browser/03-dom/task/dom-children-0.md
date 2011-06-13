
# DOM children 

In the <a href="http://JavaScript.info/files/tutorial/browser/dom/example.html">example document</a>:

<ul>
<li>Write the code to access the `UL` using `children`.</li>
<li>Write the code to access the second `LI` using `children`.</li>
</ul>

=Solution

The code is cross-browser:

[js]
document.body.children[1]
document.body.children[1].children[1]
[/js]
It works fine, because there are no comment nodes before `UL`, so `children` indexes are same for IE&lt;9 and other browsers.

