
# Introduction into browser events 

Most JavaScript-applications perform actions as a response to <em>events</em>. 

An <em>event</em> is a signal from the browser that something has happened.

=Cut

There are many types of events.

<ul>
 <li>DOM events, which are initiated by DOM-elements. For instance, a `click` event happens when an element is clicked, a `mouseover` - when a mouse pointer comes over an element,</li>
 <li>Window events. For instance, `resize` - when a browser window is resized,</li>
 <li>Other events, like `load`, `readystatechange`. They are used in AJAX and for other needs.</li>
</ul>

DOM events connect JavaScript code with the document, providing the means for building dynamical interfaces.


## Assigning event handlers   

For a script to react on the event, there should be a function assigned to it.

Functions which react on events are called <i>event handlers</i>. They are usually named like `"on+event type"`, for instance: `onclick`.

[smart]
JavaScript event handling is single-threaded, so handlers are executed sequentially. That means, if two events happen simultanteously, for example `mouseover` (mouse has come over an element) and `mousemove` (mouse moved over an element), their handlers will be executed one after another.
[/smart]

There are several ways of assigning an event handler. All of them are given in details below.
 

### Using a attribute of HTML-tag   

A handler can be set directly in the markup, right into the attribute named <code>on<em>event</em></code>.

For example, to process a `click` event on the `input` button, it is possible to assign an `onclick` handler like this:

[html]
<input id="b1" value="Click me" onclick="alert('Thanks!');" type="button"/>
[/html]

In action:

<input id="b1" value="Click me" onclick="alert('Thanks!');" type="button"/>
The last example uses <i>single quotes inside double quotes</i>. An often newbie mistake is to forget that the code is inside an attribute. 

Using them like `onclick="alert("Click")"` won't work. If you really need it, try <code>onclick="alert(&amp;quot;Click&amp;quot;)"</code>. But usually you don't. Read on for more event handling methods.




It is also possible to call a function for the event handling. 
The example below runs a function `count_rabbits()` if a button is clicked. 

[html src="/assets/browser/events/2.html" run height=80][/html]

Please recall that HTML-tag attribute names are case-insensitive, so `oNcLiCk` will work same as `onClick` or `onclick`. 

But it is generally considered a good style to use lowercase.


#### When to use this method   

This way of assigning handlers is very convenient - it's simple and all-inline, that's why it is sometimes used for really simple tasks.

There are certain drawbacks of this method. When a handler becomes longer than one line - readability suffers greatly.

But, after all, no one writes somewhat complex handlers in HTML. Instead of it, use JavaScript-only ways which are described in the next subsection.

<ul class="balance">
<li class="list-plus">A simple way for simple tasks</li>
<li class="list-minus">Mixed JavaScript-code and HTML-markup</li>
<li class="list-minus">Difficult to write complex handlers</li>
</ul>



### The element is `this`   

Although usage of this event-binding method is not recommended, let's demonstrate the value of `this` with it.

<b>Inside an event handler, `this` references the current element.</b> It can be used to get properties on modify the element.

Below, the `button` outputs it's contents using `this.innerHTML`:

[html height=auto autorun]
<button onclick="alert(this.innerHTML)">Click me to see me</button>
[/html]



### Using a DOM-object property   

A closest relative of the way described above - is an assignment using the property named <code>on<em>event</em></code>. 

All you need is:
<ol>
<li>To get an element</li>
<li>To assign a handler to the property <code>on<em>event</em></code></li>
</ol>

Here is an example of setting a `click` handler to the element with  <code>id=&quot;myElement&quot;</code>:

[html]
<input id="myElement" type="button" value="Press me"/>
<script>
document.getElementById('myElement').onclick = function() {
    alert('Thanks')
}
</script>
[/html]

In action:
<input id="myElement" type="button" value="Press me"/>
<script>
document.getElementById('myElement').onclick = function() {
    alert('Thanks')
}
</script>

Please, note the two details:
<ol>
 <li>It is a property, not an attribute. The name of the property is <code>on<i>event</i></code>, case-sensitive and must be <i>lowercased</i>. `onClick` won't work.
 </li>
 <li>The handler must be a function, not a string.
</li>
</ol>

When the browser meets an `on...` attribute in HTML-markup - it basically creates a function from its contents and assigns it to the property.

So these two codes do the same:

<ol>
<li>Only HTML:
[html run height=50]
<input type="button" onclick="alert('Click!')" value="Button"/>
[/html]
</li>
<li>HTML + JS:
[html run height=50]
<input type="button" id="button" value="Button"/>
<script>
 document.getElementById('button').onclick = function() {
     alert('Click!')
 }
</script>
[/html]
</li>
</ol>

If there is a handler set in markup, the script overwrites it. In the example below, JavaScript replaces a markup handler with a new one.

[html run height=50]
<input type="button" onclick="alert('Before')" value="Press me"/>
<script>
document.getElementsByTagName('input')[0].onclick = function() {
  alert('After')
}
</script>
[/html]

Of course, it is possible to use an existing function:

[js]
function doSomething() {
  alert('Thanks!')
}

document.getElementById('button').onclick = doSomething
[/js]

[smart header="An often newbie mistake"]
Please, note that the function should be assigned, namely `doSomething`, not `doSomething()`:

[js]
document.getElementById('button').onclick = doSomething
[/js]

`doSomething()` - is a result of function execution, and because there is no `return` in it, the result will be `undefined`.

Compare it against an attribute. Brackets are required there:
[html]
<input type="button" id="button" onclick="doSomething()"/>
[/html]

The difference is easy to explain. When the browser comes across `onclick` attribute, it automatically creates a function from its contents. So the last example is basically same as:
[js]
document.getElementById('button').onclick = function() {
  doSomething()  // an autocreated function
}
[/js]

[/smart]


#### When to use   

Assiging handlers using a property is a very simple and popular way.

It has a problem: only one handler for a certain event type can be set.

For example:
[js]
input.onclick = function() { alert(1) }
// ...
input.onclick = function() { alert(2) } // replaces the previous handler
[/js]

<ol class="balance">
<li class="list-plus">A convenient and reliable way, works in JavaScript</li>
<li class="list-minus">A single handler per event</li>
</ol>

Of course, it's possible to copy old handler and run it manually inside a new one. But it is better to use more advanced methods of assignment.



### Special methods   

In a complex JavaScript application, it's fairly ok that different interface components may be interested in handling the same event.

A classical example is a "document loaded" event and many graphical components which wait for it to initialize themselves.


#### Microsoft solution   

The solution provided by Microsoft and used only in Internet Explorer less than `9`.

It is also supported by Opera for compatibility, but no one uses it there, because Opera also supports another standard-compliant method (see in the next section).

Assigning a handler:
[js]
element.attachEvent( "on"+event, handler)
[/js]

Removing a handler:
[js]
element.detachEvent( "on"+event, handler)
[/js]

For instance:
[js]
var input = document.getElementById('button')
function handler() {
    alert('Thanks!')
}
input.attachEvent( "onclick" , handler) // assign the handler
// .... 
input.detachEvent( "onclick", handler) // remove the handler
[/js]

[smart header="An often newbie mistake"]
Please, note - setting and removal methods need the same `handler` object to operate correctly.

This would be wrong:
[js]
input.attachEvent( "onclick" ,
   function() {alert('Thanks')}
)
// .... 
input.detachEvent( "onclick", 
   function() {alert('Thanks')}
)
[/js]

In the example below, there are actually two different function objects.

So if it is planned to remove the handler sometime, the reference to it should be stored somewhere.
[/smart]

Using `attachEvent`, it is possible to assign multiple handlers to the same event on same element. The example below will work only <u>in IE and Opera</u>:

[html run]
<input id="myElement" type="button" value="Press me"/>

<script>
  var myElement = document.getElementById("myElement")
  var handler = function() {
    alert('Thanks!')
  }
 
  var handler2 = function() {
    alert('Thanks again!')
  }

  myElement.attachEvent("onclick", handler)
  myElement.attachEvent("onclick", handler2)
</script>
[/html]


[warn header="attachEvent does not pass `this`"]
The exception is `attachEvent` method. Handlers assigned with `attachEvent` do not have `this`!
[/warn]



#### Handlers assignment by W3C standard   

W3C or official event handler assignment works in all modern browsers and for IE9.

Assigning a handler:
[js]
element.addEventListener( event, handler, phase)
[/js]

Removing a handler:
[js]
element.removeEventListener( event, handler, phase)
[/js]

Please, note that the event name goes without the "on" prefix.

Another difference from the Microsoft syntax is the third parameter - <i>phase</i>, which is usually not used and set to `false`. 

The usage is generally same as `attachEvent`:
[js]
// ... declare a function called handler ...
elem.addEventListener( "click" , handler, false) // assign the handler
// .... 
elem.removeEventListener( "click", handler, false) // remove the handler
[/js]

So, there is a one big plus and one minus of the special methods:

<ol class="balance">
<li class="list-plus">As many handlers as you want</li>
<li class="list-minus">Cross-browser incompatibilities</li>
</ol>

The incompatibilities is not just different syntax, but there are few other differences. We'll return to it in the next sections and discuss a cross-browser method of event handling.




### Handlers order   

Special methods allow to assign multiple handlers to the same event on single object. 

Browser does not guarantee the order in which they execute.

Generally, the order of assignment is not related with the order of execution. The order may happen to be same, or inversed or random.



### A cross-browser way of assigning event handlers   

The task is not so simple as it seems. 

There simplest and mostly working solution is to create custom functions which add and remove event handlers using special methods:

[js]
if (document.addEventListener) {
    var addEvent = function(elem, type, handler) {
        elem.addEventListener(type, handler, false)
    }
    var removeEvent = function(elem, type, handler) {
        elem.removeEventListener(type, handler, false)
    }
} else {
    var addEvent = function(elem, type, handler) {
        elem.attachEvent("on" + type, handler)
    }
    var removeEvent = function(elem, type, handler) {
        elem.detachEvent("on" + type, handler)
    }
}

...
addEvent(elem, "click", function() { alert('hi') })
[/js]

It works good in most cases, but the handler will lack `this` in IE, because `attachEvent` doesn't provide `this`.

Fixing this problem may look easy, but it actually isn't, because of advanced topics like IE&lt;8 memory leaks. 

But you don't need `this` and don't care about memory leaks, then the solution is simple and works well.  

[task src="task/hide-click.md"]
[task src="task/hide-self.md"]
[task src="task/sliding-menu.md"]
[task src="task/message-hide.md"]



## Summary   


There are 3 ways of assigning event handlers: markup, <code>on<i>event</i></code> and special methods.

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
