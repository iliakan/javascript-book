
# Replace div with same size 

There was a green-bordered `div` in the text:
[iframe height=140 src="tutorial/browser/dom/replaceDiv/1/index.html"]

A programmer John of your team wrote the code to shift the `div` to right-top with `position: absolute`:

[js]
var div = document.getElementById('moving-div')
div.style.position = 'absolute'
div.style.right = div.style.top = 0
[/js]
 
Naturally, the text after `DIV` shifted up:
[iframe height=90 src="tutorial/browser/dom/replaceDiv/2/index.html"]

Enhance the code, make the text keep it's place even after the `DIV` is shifted. 

<b>Hint:</b> Create a helper `DIV` with the same size as the green-bordered `DIV` and insert it in the document. This is called <i>making a placeholder</i>.

Should be like this (placeholder got background for demo purposes):

[iframe height=140 src="tutorial/browser/dom/replaceDiv/solution/index.html"]

The source document: [play src="/assets/browser/dom/replaceDiv/2.html"].

<b>P.S... Do it without any additional CSS.</b>




=Solution

What we need is to create a `div` with same height and insert it instead of the moving one.

[js]
var div = document.getElementById('moving-div')

var placeHolder = document.createElement('div')
placeHolder.style.height = div.offsetHeight + 'px'
[/js]

<ul>
<li>`offsetHeight` is outer box height includig borders, but margins are not counted.</li>
<li>`'px'` is required for CSS property.</li>
</ul>

But we're not done yet. The `placeHolder` doesn't have a margin, so the text will shift.

Let's use JavaScript to copy the margin:

[js]
var div = document.getElementById('moving-div')

var placeHolder = document.createElement('div')
placeHolder.style.height = div.offsetHeight + 'px'

// IE || other browser
var computedStyle = div.currentStyle ||  getComputedStyle(div, null)

placeHolder.style.marginTop = computedStyle.marginTop // full prop name
placeHolder.style.marginBottom = computedStyle.marginBottom
[/js]

Full property name `marginTop` is used. It guarantees that for any  combination of `margin-top, margin-bottom, margin`, the computed value is correct.

The final result (see `SCRIPT`):
[html src="/assets/browser/dom/replaceDiv/solution.html" run][/html]

