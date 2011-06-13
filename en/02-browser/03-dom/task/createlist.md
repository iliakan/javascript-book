
# createList 

Create an interface to generate the list.

For each item:
<ol>
<li>Prompt the user for it's contents.</li>
<li>Create the item and append it to `UL`.</li>
<li>The process ends when user presses ESC.</li>
</ol>

<b>All elements must be created dynamically.</b>

The working example is here: [play full src="/assets/browser/dom/createList.html"]

P.S. `prompt` returns `null` if user pressed ESC.

=Solution

The solution is self-descriptive:

[html link src="/assets/browser/dom/createList.html"][/html]


Note checking for `null` value as a loop-breaking condition. The `prompt` only returns it when ESC is pressed.

`LI` contents is populated by `document.createTextNode` to ensure proper work of &lt;, &gt; etc.

