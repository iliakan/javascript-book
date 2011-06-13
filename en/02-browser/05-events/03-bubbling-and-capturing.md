
# Bubbling and capturing 

DOM elements can be nested inside each other. And somehow, the handler of the parent works even if you click on it's child.

The reason is <i>event bubbling</i>.

=Cut

For example, the following `DIV` handler runs even if you click a nested tag like  `EM` or `CODE`:
[html autorun height=auto]
<div onclick="alert('Div handler worked!')">
  <em>Click here triggers on nested `EM`, not on `DIV`</em>
</div>
[/html]

That's because an event <i>bubbles</i> from the nested tag up and triggers the parent.


## Bubbling   

The main principle of bubbling states:
<b>After an event triggers on the deepest possible element, it then triggers on parents in nesting order.</b>

For example, there are 3 nested divs:

[html src="/assets/browser/events/bubbling/example/index.html"][/html]
[iframe src="/assets/browser/events/bubbling/example/index.html"]

The bubbling guarantees that click on `Div 3` will trigger `onclick` first on the innermost element 3 (also caled the <em>target</em>), then on the element 2, and the last will be element 1.

[img src="/assets/browser/events/event-order-bubbling.gif"]

The order is called a <i>bubbling order</i>, because an event bubbles from the innermost element up through parents, like a bubble of air in the water.

<b>Click below to see it bubble:</b>

[iframe src="/assets/browser/events/bubbling/bubble/index.html"]

[html hide="Click to see the source" src="/assets/browser/events/bubbling/bubble/index.html" link][/html]


### `this` and `event.target`   

The deepest element which triggered the event is called <i>the target</i> or, <i>the originating element</i>.

Internet Explorer has the `srcElement` property for it, all W3C-compliant browsers use `event.target`. The cross-browser code is usually like this:
[js]
var target = event.target || event.srcElement
[/js]

When handlers trigger on parents:
<ul><li>`event.target/srcElement` - remains the same originating element.</li>
<li>`this` - is the current element, the one event has bubbled to, the one which runs the handler.</li>
</ul>

[img src="/assets/browser/events/event-order-bubbling-target.png"]

In the example below, each `DIV` has an `onclick` handler which outputs both `target` and `this`.

Click on a div. 

Note that:
<ul>
<li>the `target` is constant through all bubbling process,</li>
<li>`this` changes and gets highlighted.</li> 
</ul>
[iframe src="/assets/browser/events/bubbling/bubble-target/index.html"]

[html hide="Click to see the source" src="/assets/browser/events/bubbling/bubble-target/index.html" link][/html]

[smart]
In W3C-compliant browsers `this` is also available as `event.currentTarget`.

`attachEvent` does not pass `this` or `event.currentTarget` at all.
[/smart]



### Stopping the bubbling   

The bubbling goes right to the top. When an event occurs on an element - it will bubble up to <code>&lt;HTML&gt;</code>, triggering handlers on it's way.

But a handler may decide that event is fully processed and stop the bubbling.

The code is:
<ul>
<li>For W3C-compliant browsers:
[js]event.stopPropagation()[/js]</li>
<li>For IE&lt;9:
[js]event.cancelBubble = true[/js]</li>
</ul>

The cross-browser-code:

[js]
element.onclick = function(event) {
    event = event || window.event // cross-browser event
    
    if (event.stopPropagation) {
        // W3C standard variant
        event.stopPropagation()
    } else {
        // IE variant
        event.cancelBubble = true
    }
}
[/js]

There is a one-lined variant too:
[js]
event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true)
[/js]

<b>If the element has several handlers on same event, then handlers are independent. All of them get executed.</b>. 

For example, if there are two `onclick` handlers on the same link, then stopping bubbling in one of them has no effect on the other one. Also, the browser doesn't guarantee the order in which they trigger. 


## Capturing   

In all browsers, except IE&lt;9, there are two stages of event processing.

The event first goes down - that's called <i>capturing</i>, and then <i>bubbles</i> up. This behavior is standartized in W3C specification.

[img src="/assets/browser/events/event-order-w3c.gif"]

According to this model, the event:
<ol>
<li>Captures down - through 1 -&gt; 2 -&gt; 3.</li>
<li>Bubbles up - through 3 -&gt; 2 -&gt; 1.</li>
</ol>

All methods of event handling ignore the caputiring phase. <b>Using `addEventListener` with last argument `true` is only the way to catch the event at capturing</b>.

[js]
elem.addEventListener( type, handler, *!*phase*/!* )
[/js]

<dl>
<dt>`phase = true`</dt>
<dd>The handler is set on the capturing phase.</dd>
<dt>`phase = false`</dt>
<dd>The handler is set on the bubbling phase.</dd>
</dl>

Click in a `div` below to see capturing in action (<u>no IE&lt;9</u>):
[iframe src="/assets/browser/events/bubbling/capture/index.html"]

It should be 1 -&gt; 2 -&gt; 3.

Source JavaScript of the example:
[js]
var divs = document.getElementsByTagName('div')

for(var i=0; i<divs.length; i++) {
  divs[i].addEventListener("click", highlightThis, true)
}
[/js]

Click to open in the playground: [play src="/assets/browser/events/bubbling/capture"].

[smart]
In real-life the capturing phase is rarely used. But..
<b>There are events which don't bubble, but can be captured</b>. For example, `onfocus/onblur`.
[/smart]

Now let's assign handlers at both stages.

Click on a `div` below to see the event processing order (<u>no IE&lt;9</u>):

[iframe src="/assets/browser/events/bubbling/both/index.html"]

It should be 1 -&gt; 2 -&gt; 3 -&gt; 3 -&gt; 2 -&gt; 1.

Source JavaScript of the example:
[js]
var divs = document.getElementsByTagName('div')

for(var i=0; i<divs.length; i++) {
  divs[i].addEventListener("click", highlightThis, true)
  divs[i].addEventListener("click", highlightThis, false)
}
[/js]

Click to open in the playground: [play src="/assets/browser/events/bubbling/both"].




## Summary   
<ul>
<li>Events first are <i>captured</i> down to deepest target, then <em>bubble</em> up. In IE&lt;9 they only bubble.</li>
<li>All handlers work on <i>bubbling</i> stage excepts `addEventListener` with last argument `true`, which is the only way to catch the event on capturing stage.</li>
<li>Bubbling/capturing can be stopped by `event.cancelBubble=true` (IE) or `event.stopPropagation()` for other browsers.</li>
</ul>

=Head

<script type="text/javascript">
function highlightMe(elem) {
    elem.style.backgroundColor='yellow'
    alert(elem.className)
    elem.style.backgroundColor = ''
}

function highlightMe2(e) {
    highlightMe(e.currentTarget)
}
</script>
