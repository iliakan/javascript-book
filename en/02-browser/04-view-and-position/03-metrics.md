
# Metrics 

It is possible to position elements with JavaScript. A simple example of such positioning is a tooltip which follows mouse.

This section describes how to get/calculate coordinates of elements and their position.

=Cut


## Prerequisite: CSS box model   

The CSS box model is painted below:
[img src="/assets/browser/dom/boxmodel.png"]

It is described in <a href="http://www.w3.org/TR/CSS21/box.html">the CSS Box model specification</a>.
Knowing it's components is a preliminary knowledge to going any further. 


## Example document   

The example document is at [play full src="/assets/browser/dom/metric.html"].

Before you continue reading, it would be a good idea to open it.

We'll use the following box in demonstrations:
[html]
<div id="example">
  
### Introduction   

  The contents. 
</div>
[/html]

The box is positioned absolutely, has borders, paddings, margins, and so scrollbar:
[css]
#example {
  position: absolute;

  width: 300px;
  height: 200px;

  left: 160px;
  top: 160px;

  padding: 20px;
  margin: 20px;

  overflow: auto;
  border: 25px solid #F0E68C;
}
[/css]

The CSS picture:

[img src="/assets/browser/dom/metric1.png"]


## Box metrics   

<dl>
<dt>CSS `width/height`</dt>
<dd>Size of the <i>content area</i>, which lies inside the padding. CSS properties can be set using `element.style` property and retrieved using `getComputedStyle()/currentStyle`. Read more in the article [](#81).
</dd>
</dl>

Next we'll learn more about other times of width and height available in JavaScript. 

<b>All JavaScript metrics are in pixels and don't have `'px'` at the end.</b>
<dl>
<dt>`clientWidth/Height`</dt>

Size of the <i>client area</i>: content area with paddings, but without  scrollbars. 

[img src="/assets/browser/dom/metric2.png"]

The sizes can be calculated as:
[js]
clientWidth = 300(width) + 40(paddings) - 16(scrollbar) = 324
clientHeight = 200(height) + 40(paddings) = 240
[/js]

If there is no padding, and the box is scrollable, <b>clientWidth/Height show the real content area size:</b>

[img src="/assets/browser/dom/metricClientWidth.png"]

On the picture above, CSS `width` is with the scrollbar. You can't actually insert something of 300px in the box. The real available width is `clientWidth`.

</dd>

<dt>`scrollWidth/Height`</dt>
<dd>
Content area width and height <i>including the scrolled out part</i>.
<ul>
<li>`scrollHeight = 723` - full height with scrollable area</li>
<li>`scrollWidth = 324` - full width with scrollable area</li>
</ul>

<b>`scrollWidth/Height` is same as `clientWidth/Height`, but includes full scrollable area.</b>

The following code changes the vertical size of an `element` to show all contents:
[js]
element.style.height = element.scrollHeight+'px'
[/js]

</dd>
<dt>`scrollTop/scrollLeft`</dt>
<dd>Size of scrolled out part: vertical and horizontal. The value is always in pixels.

The picture below illustrates `scrollHeight` and `scrollTop` for a vertically scrollable box.

[img src="/assets/browser/dom/elemScroll.png"]

[smart header="scrollLeft/scrollTop are writeable"]
Unlike other properties, which are read-only, you can change `scrollLeft/scrollTop`, and the browser scrolls the element.

In standards mode, the scroll of the document is in `document.documentElement`. The following code scrolls the document 10px down:

<button onclick="document.documentElement.scrollTop += 10">document.documentElement.scrollTop += 10</button>
[/smart]

</dd>
<dt>`offsetWidth/Height`</dt>
<dd>Outer box width/height, full size with borders, but without margins.
<ul>
<li>`offsetWidth = 390` - outer box width</li>
<li>`offsetHeight = 290` - outer box height</li>
</ul>

This is how the box looks from outside.
</dd>

<dt>`clientTop/Left`</dt>
<dd>The indent of <i>client area</i> from box outer corner. 

In other words, the width of top/left border in pixels.

<ul>
<li>`clientLeft = 25` - left border width</li>
<li>`clientTop = 25` - top border width</li>
</ul>

[img src="/assets/browser/dom/metric3.png"]

<b>There are two exceptions to the general border-width meaning:</b>

<ol>
<li>
In case of a <u>right-to-left document</u> (arabic, hebrew), the `clientLeft` property also includes the width of a right scrollbar.</li>
<li><u>In IE&lt;8 and IE8 compat. mode</u>:  `document.documentElement` (or `document.body` if in quirksmode) is shifted a bit from left-upper corner of the document. There is no border, but `document.body.clientLeft/clientTop` is not zero (usually 2) in this case.</li>
</ol>
</dd>
<dt>`offsetParent`, `offsetLeft/Top`</dt>
<dd>Properties `offsetLeft` and `offsetTop` reflect a relative shift of an element from its `offsetParent`.

The `offsetParent` is the parent element in the sense of layout. For example, if an element is positioned absolutely, the `offsetParent` is not it's DOM parent, but a nearest positioned element (or `BODY`).

The full rule for `offsetParent`:
<ul>
<li>For static positioning - the nearest table cell or `BODY` (in standards mode).</li>
<li>For other types of positioning - a closest <a href="http://www.w3.org/TR/CSS21/visuren.html#position-props">positioned element</a>.</li>


[img src="/assets/browser/dom/metricOffset.png"]
</dd>
</dl>


[warn header="Metrics for invisible elements are zero."]

JavaScript coordinates and sizes are set for <i>attached and displayed</i> elements only. 

They equal `0` for elements with `display:none` or out of DOM. The `offsetParent` is also `null` for such elements.
[/warn]

We could use this to check if an `elem` is hidden:
[js]
function isHidden(elem)
  return !elem.offsetWidth && !elem.offsetHeight
}
[/js]

<ul>
<li>Works even if parent element has `display:none`.</li>
<li>Works for all elements except `TR`, on which it bugs in some browsers. But usually we check other elements than `TR`, so it's ok.</li>
<li>Doesn't work if the element has `visibility:hidden` or is positioned off-screen. Empty elements will also be hidden.</li>
</ul>


## Practice   

[task src="task/replace-div-with-same-size.md"]
[task src="task/move-ball-center.md"]



## Summary   

There are following properties:
<ul>
<li>`clientWidth/clientHeight` - width/height of the visible in-border area (can be called a <i>client area</i>. 
The client area includes padding and doesn't include scrollbars.</li>
<li>`clientLeft/clientTop` - left/top border width or, more generally, a shift of the client area from the top-left corner of the box. 
Also used in IE, because `document.body` may be shifted there.
</li>
<li>`scrollWidth/scrollHeight` - width/height of the scrollable in-border area. Includes padding. Doesn't include scrollbars.</li>
<li>`scrollLeft/scrollTop` - the width/height of the scrolled out part of the document, starting from the top-left corner.</li>
<li>`offsetWidth/offsetHeight` - the "outer" width/height of the box as seen from outside, excluding margins.</li>
<li>`offsetParent` - the nearest table-cell, body for static positioning or the nearest positioned element for other positioning types.</li>
<li>`offsetLeft/offsetTop` - the position in pixels of top-left corner of the box related to it's `offsetParent`.</li>
</ul>

The summarizing picture for all properties except scrolls:

[img src="/assets/browser/dom/metricSummary.png"]

