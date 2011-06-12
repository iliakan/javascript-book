
# Obtaining the event object 

The event object is always passed to the handler and contains a lot of useful information what has happened.

=Cut

One property is generic:
<ul>
<li>`event.type` - type of the event, like "click"</li>
</ul>

Different types of events provide different properties. For example, the `onclick` event object contains:

<ul>
<li>`event.target` - the reference to clicked element. IE uses `event.srcElement` instead.</li>
<li>`event.clientX / event.clientY` - coordinates of the pointer at the moment of click.</li>
<li>... Information about which button was clicked and other properties. We'll cover them in details later.</li>
</ul>

Now our aim is to get the event object. There are two ways.


## W3C way   

Browsers which follow W3C standards always pass the event object as the first argument for the handler.

For instance:
[js]
element.onclick = function(event) {
 // process data from event
}
[/js]

It is also possible to use a named function:

[js]
function doSomething(event) {
  // we've got the event
}

element.onclick = doSomething
[/js]

[smart]
<b>It is possible to use a variable named `event` in markup event handlers</b>:

[html autorun height=50]
<button onclick="alert(event)">See the event</button>
[/html]


This works, because the browser automatically creates a function handler with the given body and `event` as the argument.

[/smart]


## Internet Explorer way   

Internet Explorer provides a global object `window.event`, which references the last event. And before IE9 there are no arguments in the handler.

So, it works like this:
[js]
// handler without arguments
element.onclick = function() {
  // window.event - is the event object
}
[/js]


## Cross-browser solution   

A generic way of getting the event object is:
[js]
element.onclick = function(event) {
    event = event || window.event

    // Now event is the event object in all browsers.
}
[/js]


### The inline variant   

Both standards-compilant browsers and IE make is possible to access `event` variable in markup handlers. 

[html autorun height=auto]
<input type="button" onclick="alert(event.type)" value="Alert event type"/>
[/html]

For older IE, the handler has no arguments, so `event` will reference a global variable, for other browsers, the handler will recieve event as the first argument. So, <b>using `event` in markup handler is cross-browser.</b>


## Summary   

The event object contains valuable information about the details of event.

It is passed as first argument to the handler for most browsers and via `window.event` for IE.

So, for a JavaScript handler we'd use:
[js]
element.onclick = function(event) {
    event = event || window.event

    // Now event is the event object in all browsers.
}
[/js]

And, for a markup handler, just `event` will do.

=Head

<style type="text/css">
.d0 { text-align:center;margin:auto; }
.d1 p { margin: 0 }
.d1 {
margin:2em;
background-color:green;
width:13em;
height:13em;
text-align:center;
}
.d1 .number {
  line-height: 2em;
}
.d2 {
text-align:center;
margin:auto;
background-color:blue;
width:9em;
height:9em;
}
.d1 .d2 ,number {
  line-height: 2em;
}
.d3 {
text-align:center;
margin:auto;
background-color:red;
width:5em;
height:5em;
}
.d1 .d2 .d3 .number {
  line-height: 5em;
}
.d1 .d2 .d2a {
  color:white;
  line-height: 2em;
}
</style>
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
