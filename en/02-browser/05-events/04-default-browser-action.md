
# The default browser action 

A browser has its own "default" behavior for certain events.

For instance:
<ul>
<li>a click on the link causes navigation,</li>
<li>a right-button mouse click shows the context menu,</li>
<li>enter on a form field cases it's submission to the server, etc.</li>
</ul>

=Cut

The default behavior is usually not needed, when we handle the click by ourselves. In most cases it can be cancelled in the handler. 


## Cancel the browser action   

There are generally two ways.

<ul>
<li>Event special method `event.preventDefault()` for W3C-compliant browsers and `event.returnValue = false` for IE&lt;9.

Cross-browser code:
[js]
element.onclick = function(event) {
    event = event || window.event 

    if (event.preventDefault) {  // W3C variant 
        event.preventDefault()
    } else { // IE<9 variant:
        event.returnValue = false
    }
}
[/js]

Or, in a single line:
[js]
..
event.preventDefault ? event.preventDefault() : (event.returnValue=false)
...
[/js]
</li>
<li>Return `false` from the handler:
[js]
element.onclick = function(event) {
  ...
  return false
}
[/js]
Returning false is simpler and used in most cases, but `event.preventDefault()` approach does not finish the handling, so it also has it's usage.
</li>
</ul>

In the following example, a link is clickable, but nothing happens, because the browser action is cancelled.

[html autorun height=auto]
<a href="/" onclick="return false">Click me</a>
[/html]

[warn header="`return false` in frameworks"]
jQuery has it's own event-handling layer. It wraps over the handler, and if the handler returns `false`, then both bubbling is stopped and the default action is prevented.

That differs from normal browser behavior, sometimes causing confusion. 

Normally, the browser <i>only</i> cancels the default action, but the event continues to bubble. That's the difference.
[/warn]


## Browser's "before" actions   

There are browser actions which happen <u>before</u> the handler. These can't be cancelled.

For example, when a link gets focus - most browsers outline it with a dashed border.

This action happens <i>before</i> the `focus` event, so it can't be canceled in the `onfocus` handler.

Contrary to this, changing the URL happens <i>after</i> the click, so it can be prevented. 

[html autorun height=auto]
<a href="/" onclick="return false" onfocus="return false">I get outlined on click, but don't go anywhere</a>
[/html]

[warn header="Bubbling and default action"]
Browser default action is independent from bubbling. 
Cancelling default action does not stop bubbling and vise versa.
[/warn]


## Handlers are independent   

<b>Handlers on the same element are also completely independent, their order is not defined.</b>

In the example below, there is a `TestStop` button with two handlers: `stop` which does everything possible to stop the event, and then an alerting handler.

When the button is clicked, the `alert` is always shown:

[html height=50 autorun]
<input type="button" id="TestStop" value="Test stop"/>

<script>
  elem = document.getElementById('TestStop')

  function stop(e) {
    e.preventDefault() // browser - don't act!
    e.stopPropagation() // bubbling - stop
    return false // added for completeness
  }

  elem.addEventListener('click', stop, false)

  // this handler will work
  elem.addEventListener('click', function() { alert('I still work') }, false)
</script>
[/html]


## Summary   

<ul>
<li>Browser has it's own actions on some events. Most of them can be cancelled.</li>
<li>There are two ways of cancelling the default action: use `preventDefault()/returnFalse` or `return false` from the handler. They are equal.</li>
<li>Default browser action is independent from bubbling. Other handlers on same element are also independent.</li>
</ul>

=Head

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
