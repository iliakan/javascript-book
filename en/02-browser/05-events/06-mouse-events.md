
# Mouse events [108]

This section covers properties and specials of mouse-related events.

=Cut


## Mouse event types   


### Simple events   
There are following simplest mouse events:
<dl>
<dt>`mousedown`</dt>
<dd>Triggered by an element when a mouse button is pressed down over it</dd>
<dt>`mouseup`</dt>
<dd>Triggered by an element when a mouse button is released over it</dd>
<dt>`mouseover`</dt>
<dd>Triggered by an element when the mouse comes over it</dd>
<dt>`mouseout`</dt>
<dd>Triggered by an element when the mouse goes out of it</dd>
<dt>`mousemove`</dt>
<dd>Triggered by an element on every mouse move over it.</dd>
</dl>


### Complex events   
Also browser provides the following more complex events for convenience:

<dl>
<dt>`click`</dt>
<dd>Triggered by a mouse click: mousedown and then mouseup over an element</dd>
<dt>`contextmenu`</dt>
<dd>Triggered by a right-button mouse click over an element.</dd>
<dt>`dblclick`</dt>
<dd>Triggered by two clicks within a short time over an element</dd>
</dl>

There is also a mousewheel event, but it's not used. The `scroll` event is used to track scrolling instead. It occurs on any scroll, including keyboard scroll.


### Events fire order   

A single action may cause multiple events. For example, a click actually causes `mousedown`, `mouseup` and `click` in sequence.

Just click on the input below to see the events happening. Try double click.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click to log events" type="button" /> <input onclick="logClear('test')" value="Clear" type="button" /> <form id="testform" name="testform"> <textarea rows="14" cols="40"></textarea></form>

To make the logging more verbose, if there is more than 1 second between events, a dashed line is drawn. 

So, for example, for a single click, multiple events are fired. That's fairly ok. The order is consistent across all browser excepts IE&lt;9 which skips second `click` on `dblclick`.

<b>Mouse event handling example:</b>

[html autorun height=auto]
<input type="button" value="click me" id="btn">
<input type="button" value="right-click me" id="btn2">


<script> 
document.getElementById('btn').onclick = function() {
  alert('click!')
}

document.getElementById('btn2').oncontextmenu = function() {
  alert('right click!')
}
</script>
[/html]


[smart header="How to handle `click` and `dblclick`"]

When we want to handle both `click` and `dblclick`, we can't handle `click` immediately, because we don't know i the user is going to click once more. 

So the only way is to wait about 100ms, see if a double click is coming. If the time is out, then that's a single click. 

All browsers except IE&lt;9 generate two click events on double click. IE&lt;9 skips second click, try it on the test-stand above. But this logic is tolerant to the difference.
[/smart]



## Getting the button info: `which/button`   

For click-related mouse events it may be important, which button was pressed. 

For that purpose, the `event` object contains two properties: `which` and `button`. They store the button in a numeric form with few IE/W3C incompatibilities, which you can see in the table below.


### The W3C approach   

In W3C there is a `button` property which works same in all browsers except IE:

<ul>
<li>0 - left button</li>
<li>1 - middle button</li>
<li>2 - right button</li>
</ul>


### The IE approach   

Frankly speaking, the Microsoft approach is more universal. The properietary `button` property is a 3-bit number, every bit is up if the button is pressed.

So, <code>button & 1</code> (the 1st bit) is set to 1, if the left button is pressed, <code>button & 2</code> (the 2nd bit) is 1, if the right button is pressed, and <code>button & 4</code> (the 3rd bit) - if the middle button is pressed.

As the result, we can check if two buttons are pressed in one time. Unfortunately, this is possible only in IE. 


### Cross-browser approach   

The most convenient way here is to take the standard `which` property as the basis and use `button` to emulate it for IE:

[js autorun]
function fixWhich(e) {
  if (!e.which && e.button) {
    if (e.button & 1) e.which = 1      // Left
    else if (e.button & 4) e.which = 2 // Middle
    else if (e.button & 2) e.which = 3 // Right
  }
}
[/js]


## `mouseover/mouseout` and `relatedTarget`   

Events of types `mouseover` (and `mouseout`) occur when a mouse comes over(goes out) an element.

For these events, the mouse goes from one element to another, so two elements are actually engaged. Both elements can be retrieved from in event properties.

<dl>
<dt>`mouseover`</dt>
<dd>The element under the pointer is `event.target`(IE: `srcElement`).
The element the mouse came from is `event.relatedTarget`(IE: `fromElement`)
</dd>
<dt>`mouseout`</dt>
<dd>The element the mouse came from is `event.target`(IE: `srcElement`).
The element under the pointer is `event.relatedTarget`(IE: `event.toElement`).</dd>
</dl>
 
As you can see, the W3C specification joins both `fromElement` and `toElement` into the single property `relatedTarget` which serves as `fromElement` for `mouseover` and `toElement` for `mouseout`.

[js]
// from IE to W3C
if (e.relatedTarget === undefined) {
  e.relatedTarget = e.fromElement || e.toElement
}
[/js]

<b>`event.relatedTarget` (and IE analogues) can be `null`</b>.

For example when the mouse comes from out of the window, the `mouseover` will have `relatedTarget = null`.

Check it on the iframe below:

<iframe style="border:1px solid black; overflow: hidden; height:130px; width: 600px" src="/files/tutorial/browser/events/mouseoverout.html">

The source code in the playground: [play src="/assets/browser/events/mouseoverout.html"].



## `Mousemove` and `mouseover` frequency   

`Mousemove` triggers on every mouse movement. It's target is the topmost and most nested element which is covered by mouse.

[sum]
`Mousemove` and `mouseover/mouseout` trigger when browser internal timing allows.

That means if you move the mouse fast, intermediate DOM elements and parents are be skipped.
[/sum]

So you can move over an element without any `mousemove/mouseover` triggered on it.

You can move from a child through parent without any mouse event on the parent.

Although browser can skip intermediate elements, it guarantees that as far as `mouseover` was triggered, the `mouseout` will trigger too. 


### Test stand   

Try that on the test stand below. Move the mouse lightningly fast over the elements. There can be no events, or only the red `div` will get them, or only the green one.

Also try fast-moving it from the red child. The parent will be ignored.


<div id="green" class="green" onmouseover="return logMouseMove(event)" onmouseout="return logMouseMove(event)" onmousemove="return logMouseMove(event)" ><div id="red" class="red">Text</div></div>


<input onclick="logClear('move')" value="Clear" type="button" /> <form id="moveform" name="moveform"> <textarea rows="18" cols="40"></textarea></form>



## `Mouseout` to a child element   

The mouse pointer can only be over a <b>single</b> element in one moment of time. The one which is <i>topmost</i>, with maximal `z-index` and <i>deepest</i>, the most nested.

<b>When mouse goes to a child element, the parent triggers `mouseout`.</b> So it looks like the mouse has left the parent, but it just moved into a child.

The blue `DIV` in the example below has the event-printing handler.
See how it looks, move the mouse from blue to red.

<div class="parent" style="background:blue;width:200px;height:200px;position:relative" onmouseover="mol(event, this)" onmouseout="mol(event, this)">
    <div class="child" style="background:red;width:100px;height:100px;position:absolute;left:50px;top:50px">
    </div>
</div>

<textarea style="height:100px;width:400px" id="mouseoverlog"></textarea>
<input type="button" onclick="document.getElementById('mouseoverlog').value=''" value="Clear">

<script>
function mol(event, elem) {
  var area = document.getElementById("mouseoverlog")
  area.value += event.type+' '+elem.className+' [target: '+(event.target||event.srcElement).className+']\n'
  area.scrollTop = area.scrollHeight
}
</script>

When moving from the parent to the child, the events are:
<ol>
<li>`mouseout` on the parent</li>
<li>`mouseover` on the child, which bubbles to the parent and triggers it's handler.</li>
</ol>

So, there is actually a pair of events, which may spoil the code behavior if not taken into account.


### The `mouseenter/mouseleave` events.   

Usually, we don't want to care about the mouse moving to child elements.
All we want is to know when the mouse enters the element and when it leaves.

There are `mouseenter` and `mouseleave` events to handle this, described in <a href="http://www.w3.org/TR/DOM-Level-3-Events/#event-type-mouseenter">DOM Level 3</a> specification and supported by IE.

For the rest of the browsers, we need to filter out mouseouts to children. The standard trick is to check the `relatedTarget`, and do nothing if we are still inside the parent.

In the example below, we use `mouseout` for all browsers, but filter it through `isOutside` which ascends through parents of `relatedTarget` until it either meets the parent (this means we're inside) or reaches the top node (we're outside).

[html autorun run height=160]
<div style="padding:10px;border: 1px solid blue" id="parent">
 <p>Move the mouse in and outside of here. The blue box parent has <i>many</i> other <b>elements</b> inside.</p>
 <p>They do not generate extra `mouseover/mouseout` events.</p>
</div>
event

<script>
function isOutside(evt, parent) {
  var elem = evt.relatedTarget || evt.toElement || evt.fromElement

  while ( elem && elem !== parent) {
    elem = elem.parentNode;
  }

  if ( elem !== parent) {
    return true
  }
}

var parent = document.getElementById('parent')

parent.onmouseover = parent.onmouseout = function(e) {
  e = e || event
  
  if (isOutside(e, this)) {
    parent.nextSibling.nodeValue = new Date() + ' ' + e.type 
  } 
}   
</script>
[/html]


[task src="task/rollover.md"]


## Mouse coordinates: `clientX(Y)`,`pageX(Y)`   

For mouse-related event handling, a cross-browser way of getting coordinates is often needed.


### Relative to window   

There is a great cross-browser property pair `clientX/clientY` which contain coordinates relative to `window`.

If your window is 500x500, and the mouse is in the center, then  `clientX` and `clientY` are both equal to 250.

If you scroll down, left or up without moving the mouse - the values of  `clientX/clientY` don't change, because they are relative to the window, not the document.

Move the mouse over the input to see `clientX/clientY`:
[html]
<input onmousemove="this.value = event.clientX+':'+event.clientY">
[/html]
<input onmousemove="this.value = event.clientX+':'+event.clientY">



### Relative to document   

Usually, to process an event we need mouse position relative to document, with scroll. The W3C standard provides a property pair `pageX/pageY` for that. 

If your window is 500x500, and the mouse is in the middle, then both `pageX` and `pageY` equal 250. If you scroll it 250 pixels down, the value of `pageY` becomes 500. 

So, the pair `pageX/pageY` contains coordinates relative to document top-left corner, with all scrolls.

They are supported by all browsers except IE&lt;9. 

Move the mouse over the input to see `pageX/pageY` (except IE&lt;9):
[html]
<input onmousemove="this.value = event.pageX+':'+event.pageY">
[/html]
<input onmousemove="this.value = event.pageX+':'+event.pageY">


#### IE&lt;9 workaround   

In older IEs, page coordinates can be calculated by adding document scroll to `clientX/clientY`. 

If the document is in standards mode, then the page scroll is on  `HTML` element: `document.documentElement.scrollLeft`, in quirks mode it's on the `BODY`: `document.body.scrollLeft`.

So let's try both. And if nothing is set (possible if in quirks mode and the body hasn't loaded yet), then the scroll is `0`.

[js]
var html = document.documentElement
var body = document.body
e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
[/js]

We're almost done. But there is one more subtle feature for IE. The `document` in IE may be shifted from (0,0) position. The shift is kept in `document.documentElement.clientLeft/clientTop` (no quirks mode), so we'll need to take it into account as well.

The following code provides a reliable `pageX/pageY` for IE, even if it's not there:
[js autorun]
function fixPageXY(e) {
  if (e.pageX == null && e.clientX != null ) { 
    var html = document.documentElement
    var body = document.body

    e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
    e.pageX -= html.clientLeft || 0
    
    e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0)
    e.pageY -= html.clientTop || 0
  }
}
[/js]



### The demo of mouse coordinates   
 
The following example shows mouse coordinates relative to the document for all browsers.

[js autorun]
document.onmousemove = function(e) {
  e = e || window.event
  fixPageXY(e)

  document.getElementById('mouseX').value = e.pageX
  document.getElementById('mouseY').value = e.pageY
}
[/js]

Coordinate X:<input type="text" id="mouseX"/>
Coordinate Y:<input type="text" id="mouseY"/>


## Right click: `oncontextmenu`   

By default, the browser shows it's own context menu on right mouse click.
But if a JavaScript handler is set, it can suppress the native menu.

The only exception is older versions of Opera which require a special menu option to be enabled. Newer Opera 10.50+ is fine.

[html autorun height=auto]
<input type="button" oncontextmenu="alert('Custom menu');return false" value="Right-click me"/>
[/html]

In older version of Opera a typical solution was to replace `contextmenu` handler `Ctrl+click` combination or with a long click.



## Preventing selection   

A common problem with clicks on the text is selection. For example, you want to handle double click. Try double clicking the span below.

[html autorun height=auto]
<span ondblclick="alert('ok')">Text</span>
[/html]

The event handler works. But as a side effect, the text becomes selected. 

To stop the selection, we should prevent default browser action for <a href="http://msdn.microsoft.com/en-us/library/ms536969%28VS.85%29.aspx">selectstart</a> event in IE and `mousedown` in all other browsers.

The example below triggers click events correctly, but does not become selected.

[html autorun height=auto]
<span 
  ondblclick="alert('ok')"
  onselectstart="return false"
  onmousedown="return false"
>Text</span>
[/html]

The method described allow does not make an element unselectable. A user might want to select the text contents, and he is able to do it, for example by starting the mousedown near the element.


## Drag'n'drop   

An elementary drag'n'drop is easy. The algorithm is:
<ol>
<li>Track `mousedown` on the element. When triggers, start the drag'n'drop, assign handlers.</li>
<li>Drag by tracking `mousemove`. Make the element absolute positioned and move it's `left/top` with the mouse. 
By assigning them to `event.pageX/pageY` you match the top-left corner with the pointer. To put the element under the pointer, a shift is needed.</li>
<li>Finish with `mouseup` on the element</li>
</ol> 

In the following example, the ball image can be dragged around:
<div style="height:80px">
Click the ball and drag to move it.
[img src="/assets/browser/events/ball.gif"]
</div>

[js autorun]
document.getElementById('ball').onmousedown = function() {
  this.style.position = 'absolute'

  var self = this

  document.onmousemove = function(e) {
    e = e || event
    fixPageXY(e)  
    // put ball center under mouse pointer. 25 is half of width/height
    self.style.left = e.pageX-25+'px' 
    self.style.top = e.pageY-25+'px' 
  }
  this.onmouseup = function() {
    document.onmousemove = null
  }
}

//document.getElementById('ball').ondragstart = function() { return false }
[/js]

Try it in Firefox, in IE. Doesn't work well, right? 

That's because of the commented last line. Browser starts it's own drag'n'drop for the image which spoils our custom processing.

Cancelling browser default action for drag'n'drop is required here. 

The fixed example:
<div style="height:80px">
Click the ball and drag to move it.
[img src="/assets/browser/events/ball.gif"]
</div>

[js autorun hide="Show full code with uncommented ondragstart"]
document.getElementById('ball2').onmousedown = function() {
  this.style.position = 'absolute'

  var self = this

  document.onmousemove = function(e) {
    e = e || event
    fixPageXY(e) 
   
    self.style.left = e.pageX-25+'px' 
    self.style.top = e.pageY-25+'px' 
  }
  this.onmouseup = function() {
    document.onmousemove = null
  }
}

document.getElementById('ball2').ondragstart = function() { return false }
[/js]

In real applications there are additional mouse handlers which detect when the dragged object comes over possible targets and highlight these targets. Also the drop usually leads to more complex processing. 

[ponder header="Why `mousemove` is on `document`, not on `ball`?"]
Really, why? From the first sight, the mouse is always over the ball. The coordinates are always same, no matter which element catches the event. So using `ball.onmousemove` instead of `document.onmousemove` may seem fine.

But actually, the <i>mouse is not over the ball</i>. Remember, the browser registers `mousemove` often, but not for every pixel. 

A swift move will trigger `mousemove` on the far end of the page. That's why we need to track `mousemove` on the whole `document`.
[/ponder]

[smart header="Native drag'n'drop"]
Several browsers (Firefox, Safari/Chrome) support native drag'n'drop events. 

Their main benefit is that they allow to drag an arbitrary file into the browser, so that JavaScript is able to get their binary contents.

For regular in-browser drag'n'drop, mouse events work good enough.
[/smart]



## Summary   

Mouse events got the following additional standard properties:

<ul>
<li>The mouse button: `which`</li>
<li>Trigger elements: `target/relatedTarget`</li>
<li>Coordinates relative to the window: `clientX/clientY`</li>
<li>Coordinates relative to the document: `pageX/pageY`</li>
</ul>

There are incompatibilities around, but they are easily solvable as described above.

`Mouseover, mousemove, mouseout` have special features:
<ol>
<li>`Mouseover` and `mouseout` are only events which have second target: `relatedTarget` (`toElement` || `srcElement` in IE).</li>
<li>`Mouseout` triggers when mouse leaves the parent for it's child. Use `mouseenter/mouseleave` and their emulation to skip such events.</li>
<li>`Mouseover, mousemove, mouseout` can skip elements. The mouse may appear immediately over a child skipping all it's parents.</li>
</ol>

Additional recipes:

<ul>
<li>You can prevent selection with `selectstart/mousedown` handlers when making controls from text elements.</li>
<li>When using <code>mousedown -&gt; mousemove</code> interaction, like custom drag'n'drop, it is usually required to prevent `dragstart`.</li>
</ul>


[task src="task/tree-hide-children.md"]

=Head

<link rel="stylesheet" type="text/css" href="/files/tutorial/browser/events/mouse.css"/>
<script src="/files/tutorial/browser/events/log.js"></script>

<script type="text/javascript">
function highlightMe(elem) {
    elem.style.backgroundColor='yellow'
    alert(elem.className)
    elem.style.backgroundColor = ''
}

function highlightMe2(e) {
    highlightMe(e.currentTarget);
}
</script>
