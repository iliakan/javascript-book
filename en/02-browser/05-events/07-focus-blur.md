
# Focus/Blur: methods and events [121]

The `focus` event triggers when a visitor <i>focuses</i> on an element. 

Not all elements are focusable by default. For example, `INPUT` and all types or form fields support this event, `A` supports it. As a counterexample, `DIV` doesn't support `focus`.

=Cut

The list of elements types which support focusing is slightly different between browsers. For IE, there is one at <a href="http://msdn.microsoft.com/en-us/library/ms536934.aspx">MSDN</a>.

Here is an example of `focus` usage. The `INPUT` below changes it's value on first click.

[html autorun height=auto]
<input type="text" value="E-mail" class="untouched" value="E-mail"/>

<style> .untouched { color: gray } </style>

<script>
var input = document.getElementsByTagName('input')[0]

*!*input.onfocus*/!* = function() {
  if (this.className == '') return 
  this.className = ''
  this.value = ''
}
</script>
[/html]

Note, that only the first focus removes the value. The starting value is a tip which is not needed anymore. 

[smart header="`getAttribute` to check for a change"]

A smarter one-line example checks if the value was modified using `getAttribute`:
[html autorun height=auto]
<input name="email" type="text" value="E-mail">

<script>
var input = document.getElementsByTagName('input')[0]

input.onfocus = function() {
  if ( this.value == this.getAttribute('value') ) {
    this.value=''
  }
}
</script>
[/html]

The code is fails in cases when user re-enters placeholder value. 
But in most cases, the placeholder is never re-entered, so it works.
[/smart]


## The `focus` method   

A focusable element can receive a focus programmatically.
For example, let's show a form and focus on it's first input:
[html run height=150]
<form style="display:none" name="form">
  <input style="text" name="data" value="Data">
</form>

<input type="button" value="show form" onclick="showForm()">

<script>
function showForm() {
  var form = document.forms['form']
  form.style.display = 'block'
*!*
  form.elements[0].focus()
*/!*
}
</script>
[/html]

Click on the button in the example above. The input will appear and receive focus.


## Tabindex   

Althgough not all elements are focusable but default, there is a `tabindex` attribute to fix that. 

When you assign <code>tabindex=&lt;number&gt;</code> to an element:

<ul>
<li>It becomes focusable.</li>
<li>A user can use the tab key to move from the element with lesser positive tabindex to the next one. The exception is a special value `tabindex="0"` means that the element will always be last.</li>
<li>The `tabindex=-1` means that an element becomes focusable, but the tab key will always skip it. Only the `focus()` method will work.</li>
</ul>

In the example below, there is a list with items. Click on any one of them and press the tab to make sure you understand the behavior.

[html autorun height=150]
<ul>
<li tabindex="1" onfocus="showFocus(this)">One</li>
<li tabindex="0" onfocus="showFocus(this)">Zero</li>
<li tabindex="2" onfocus="showFocus(this)">Two</li>
<li tabindex="-1" onfocus="showFocus(this)">Minus one</li>
</ul>

<span id="focus"></span>

<script>
function showFocus(elem) {
  document.getElementById('focus').innerHTML = "focus "+elem.tabIndex
}
</script>
[/html]

Some browsers browser outline the focused element, some do not. This behavior depends on browser default styling, and can be changed by :focus CSS selector.

But all browsers support the tab navigation, even if the outline is absent. Try it. The order should be: `1 - 2 - 0`.

A smart user knows what a "tab" key is and will try to use it. Your good attitude towards such users shall be rewarded :)



## The blur event and method   

The `blur` is a counterpart of `focus`. The event gets triggered when an element loses focus. The `elem.blur()` makes an element to lose focus if it has it.

The bubbling analogs for `blur` are `DOMFocusOut` (Opera, Safari/Chrome) and `focusout` (IE).

In the example below, the input size is validated on blur. Type in something and click away from an element (or press tab) to activate `blur`.
[html autorun height=100]
<label>Enter your age: <input type="text" name="age"></label>
<div id="error"></div>

<script>
var input = document.getElementsByName('age')[0]
var errorHolder = document.getElementById('error')

*!*input.onfocus*/!* = function() {
  this.style.backgroundColor = ''
  errorHolder.innerHTML = ''
}

*!*input.onblur*/!* = function() {
  var age = +this.value 
  if (isNaN(age)) {
    this.style.backgroundColor = 'red'
    errorHolder.innerHTML = 'Enter a number please.'
  }
}
</script>
[/html]
  
If visitor types in something non-numeric, or just nothing - a warning appears. Focusing on an input clears the warning, because it is not needed any more.



## Non-bubbling   

The `focus` event doesn't bubble. It just happened in the history that it doesn't, without a good reason.

Why I could want a bubbling focus? For instance, to make a form which outlines itself when focused:

[html autorun height=auto]
<form onfocus="this.className='focused'">
  <input type="text" name="name" value="Your name">
  <input type="text" name="surname" value="Your surname">
</form>

<style>
form { text-align: center }
.focused { border: 3px groove red; }
</style>
[/html]

The example above doesn't work. An `INPUT` receives focus, but it doesn't bubble up, so the `FORM` can't catch it.

Do we really have to assign the handler to each input, or there is a way to <i>delegate</i> the event handling to the `form`?



## Delegation with `focus`   

To support event delegation with focus, there are currently 3 ways:

<ol>
<li>The <a href="http://dev.w3.org/2006/webapi/DOM-Level-3-Events/html/DOM3-Events.html#event-type-DOMFocusIn">DOMFocusIn</a> event is same as `focus`, but bubbles. It is supported only by Safari/Chrome and Opera (only can be assigned with `addEventListener`). The `DOMFocusIn` is deprecated in favor of `focusin`</li>
<li>In newer standards, `focusin` replaces the junked `DOMFocusIn` event. IE supports it very well.</li>
<li>In Firefox the only way is to catch `focus` on capturing phase.</li>
</ol> 


So the code could be like that:

[html autorun height=60 run]
<form name="form">
  <input type="text" name="name" value="Your name">
  <input type="text" name="surname" value="Your surname">
</form>
<style>
form { text-align: center }
.focused { border: 3px groove red; }
</style>

<script>
function outline() { this.className='focused' }

var form = document.forms['form']

*!*
if (navigator.userAgent.indexOf('Firefox')>=0) { // Firefox
  form.addEventListener('focus', outline, true) 
} else if (form.addEventListener) {  // Opera, Safari/Chrome
  form.addEventListener('DOMFocusIn', outline, false)
} else {  // IE
  form.onfocusin = outline
}
*/!*
</script>
[/html]

Try it, click on an input above. Works in all browsers.

Because we catch `focus` on the capturing phase for one browser and on the bubbling phase for others, our code must handle both cases. In most cases, like the form above, phase doesn't matter.

<b>As a consequence, usually only 2 ways are used: `focusin` for IE and `focus on capture` for all other browsers</b>, without the `DOMFocusIn` branch.

So, the binding code shortens:

[js]
var form = document.forms['form']

if (form.addEventListener) { // W3C
  form.addEventListener('focus', outline, true) }
} else {  // IE
  form.onfocusin = outline
}
[/js]


### `onblur`   

The `onblur` event behaves similarly. The corresponding bubbling events are: `onDOMFocusOut` and `focusout`



## Removing the dotted border on focused elements   

When a user focuses on a link, input or textfield, some browsers outline it.

Try clicking on these in Firefox, Safari/Chrome, IE. They are different in what they outline and how.

[iframe link border=1 height=60 src="tutorial/browser/events/outline-src/index.html"]

Sometimes you want to handle focusing on your own, and don't need browser indication. Fortunately, we can disable it by pure CSS.

[css]
a:focus, input:focus { /* it should work, and it usually works */
  outline: none;
}

a:active, input:active {  /* for IE */
  outline: none; 
}

/* for buttons in Firefox */
button::-moz-focus-inner,
input[type="reset"]::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner,
input[type="file"] > input[type="button"]::-moz-focus-inner {
  border: none;
}
[/css]

[iframe link border=1 height=60 src="tutorial/browser/events/outline/index.html"]


## Summary   

There are 3 ways to focus on an element:
<ol>
<li>Mouse click</li>
<li>Keyboard tab</li>
<li>`elem.focus()` call</li>
</ol>

By default, many elements are not focusable. For example, if you click on a `DIV`, there will be no focus.

But they can made focusable by adding the `tabIndex` attribute. This attribute also allows to control keyboard tabs behavior.

The `focus` and `blur` events do not bubble.

In cases where bubbling could help, the solution is to use `focusin/focusout` in IE and `focus/blur` on capturing phase for other browsers.

