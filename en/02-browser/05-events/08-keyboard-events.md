
# Keyboard events 

Keyboard events is one of wilder parts of frontend development. There are inconsistencies and cross-browser problems.

But still there are recipes which help to cope with ordinary situations easily.

=Cut

There are following keyboard events:
<dl>
<dt>`keydown`</dt>
<dd>A key is pressed down.</dd>
<dt>`keypress`</dt>
<dd>A <i>character</i> key is pressed.</dd>
<dt>`keyup`</dt>
<dd>A key is released.</dd>
</dl>

There is a fundamental difference between `keypress` and `keydown`.

[sum]
<ul>
<li>`Keydown` triggers on any key press and gives scan-code.</li>
<li>`Keypress` triggers after `keydown` and gives char-code, but it is guaranteed for character keys only.</li>
</ul>[/sum]



## Test stand   [test-stand]

To better understand keyboards event, we'll use the test stand.

<form name="keyform" id="keyform" onsubmit="return false">

        Prevent default:<label><input type="checkbox" name="keydownStop" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;<label><input type="checkbox" name="keypressStop" value="1"> keypress</label>&nbsp;&nbsp;&nbsp;<label><input type="checkbox" name="keyupStop" value="1"> keyup</label>
        Ignore:<label><input type="checkbox" name="keydownIgnore" value="1"> keydown</label>&nbsp;&nbsp;&nbsp;<label><input type="checkbox" name="keypressIgnore" value="1"> keypress</label>&nbsp;&nbsp;&nbsp;<label><input type="checkbox" name="keyupIgnore" value="1"> keyup</label>
Focus on the input below and press.
<input type="text" style="font-size:150%;width:600px" id="kinput">
Log:
<textarea rows="18" onfocus="this.blur()" style="width:600px;border:1px solid black"></textarea>
<input type="button" value="Clear" onclick="logClear('key')"/></form>

[js autorun hide="Show logging code"]
document.getElementById('kinput').onkeydown = khandle
document.getElementById('kinput').onkeyup = khandle
document.getElementById('kinput').onkeypress = khandle

function khandle(e) {
  e = e || event
  if (document.forms.keyform[e.type + 'Ignore'].checked) return
   
  var evt = e.type
  while (evt.length < 10) evt += ' '
  showmesg(evt + 
    ' keyCode=' + e.keyCode + 
    ' which=' + e.which + 
    ' charCode=' + e.charCode +
    ' char=' + String.fromCharCode(e.keyCode || e.charCode) +
    (e.shiftKey ? ' +shift' : '') +
    (e.ctrlKey ? ' +ctrl' : '') +
    (e.altKey ? ' +alt' : '') +
    (e.metaKey ? ' +meta' : ''), 'key'
  )
  
  if (document.forms.keyform[e.type + 'Stop'].checked) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false)
  }
}
[/js]

In the test stand, `char = String.fromCharCode(e.keyCode || e.charCode)`.
Unknown properties and methods are explained in details below.

<ul>
<li>Try pressing down a <i>character key</i>, like 'S', '1' or ','. 
It triggers `keydown` and then `keypress`. When the key is released, the `keyup` occurs.</li>
<li>Try pressing a <i>special key</i> like 'Shift', 'Delete' or 'Arrow Up'.
It triggers `keydown` and then `keyup` on the time of releasing.</li>
</ul>

Firefox and Opera  trigger `keypress` for most special keys.
IE also triggers `keypress` for Esc. 

<b>It is possible that a special key results in `keypress`, but generally browsers don't trigger it (and they shouldn't).</b>

The rule:
<ul><li>`keydown/keyup` are for any keys.</li>
<li>`keypress` is for characters.</li>
</ul>


## Key event properties   

There was a heck crazy zoo in keyboard events few years ago. Now we live iin happy time. Most terrible bugs and inconsistencies are fixed in recent browsers. IE is also pleasant to deal with. There are just several tricks to use.

Keyboard event have the following specific properties:

<dl>
<dt>`keyCode`</dt>
<dd>The <i>scan-code</i> of the key. For example, if an "a" key is pressed, the character can be "a" or "A" (or a character from another language), but the `keyCode` is same. It depends on key only, not on the resulting character.

You can always check the code by clicking on the test stand... There are two  main tables: Mozilla and IE. They are almost equal, but differ in few keys: `';', '='` and `'-'`.

You can read a great article from John Walter: <a href="http://unixpapa.com/js/key.html">JavaScript Madness: Keyboard Events</a>. It contains both events information and code tables.
</dd>
<dt>`charCode`</dt>
<dd>The <i>character code</i>, ASCII.</dd>
<dt>`which`</dt>
<dd>A non-standard property, the hybrid of `charCode` and `keyCode`, with the sole purpose to confuse a developer. 
But in the zoo of key events it also plays a good role. Particulary, it helps to get the character. That's described further in the section.</dd>
<dt>`shiftKey, ctrlKey, altKey, metaKey`</dt>
<dd>The properties are boolean and reflect the state of corresponding key: Shift, Ctrl, Alt or Command(Mac only).</dd>
</dl>


## Processing the character: `keypress`   

[smart header="`keypress` is deprecated, but still the way to go"]
The latest DOM 3 Events specification deprecates `keypress` and replaces it by <a href="http://www.w3.org/TR/DOM-Level-3-Events/#event-type-textInput">textInput</a>. 

But as of now, `textInput` event is supported in Safari/Chrome only, and the support is incomplete, so this is a far future. 
The `keypress` is now.
[/smart]

The only event which reliably provides the character is `keypress`.

In all browsers except IE, the `charCode` property is defined for `keypress` and contains the character code. Opera follows this principle, but bugs on special keys. It triggers `keypress` without `charCode` on some of them, e.g "backspace".
 
Internet Explorer has it's own way. In case of `keypress` event it doesn't set the `charCode`, but puts the character code in `keyCode` instead of scan-code.

<b>So here's the function to get all a symbol from `keypress` event:</b>

[js autorun]
// event.type must be keypress
function getChar(event) {
  if (event.which == null) {
    return String.fromCharCode(event.keyCode) // IE
  } else if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which)   // the rest
  } else {
    return null // special key
  }
}
[/js]
Note the last case. Special keys have no symbols. Applying `String.fromCharCode` to special keys gives weird results.

We filter them with <code>event.which!=0 && event.charCode!=0</code> check. It guarantees that the key is not special even in older browsers and Opera.

[warn header="The wrong `getChar`"]
You can also find the following function in the net:
[js]
function getChar(event) {
  return String.fromCharCode(event.keyCode || event.charCode) 
}
[/js]

It works wrong for many special keys for the reason described above. For example, it returns character '&' when 'Arrow Up' is pressed.
[/warn]


## Cancelling user input   

A non-special key usually results in a character. This can be prevented.

For all browsers except Opera, two events can be used to cancel a key input: `keydown` and `keypress`. But Opera is more picky. It will cancel character only if `preventDefault` comes from `keypress`.

[html]
Try to type something in the input below:
<input *!*onkeydown="return false"*/!* type="text" size="30">
<input *!*onkeypress="return false"*/!* type="text" size="30">
[/html]
Try to type something in the input below:
<input onkeydown="return false" type="text" size="30">
<input onkeypress="return false" type="text" size="30">

In the example above, there will be no characters in both inputs for all browsers with exception of Opera which ignores `preventDefault` on `keydown` and hence will show keys on the first input.

In IE and Safari/Chrome preventing default action on `keydown` cancels `keypressed` event too. Try that on the test stand: prevent `keydown` and type something. There should be no `keypressed` in IE and Safari/Chrome.


### Demo: char-uppercasing input   

The following input uppercases all characters:

[html]
<input id='my' type="text">
<script>
document.getElementById('my').onkeypress = function(event) {
  var char = getChar(event || window.event)
  
  if (!char) return // special key
  
  this.value = char.toUpperCase()
  
  return false
}
</script>
[/html]
Characters which you type here will be upper-cased: 
<input id="my" type="text">
<script>
document.getElementById('my').onkeypress = function(event) {
  var char = getChar(event || window.event)
  
  if (!char) return // special key
  
  this.value = char.toUpperCase()
  
  return false
}
</script>
In the example above, the default action is prevented by `return false`, our own value is added instead. 
 
There is a problem with this widget. If you move the cursor in the middle of input and type something - it appends to the end. So, the uppercasing input is not so simple, but still doable, because there exists a way to get caret position.

[task src="task/number-only-input.md"]


## Working with scan-codes: `keydown/keyup`   

Sometimes, we need to know only a key, not the character. For example, special like arrows, page up, page down, enter, escape - there are no characters at all.

Most browsers do not generate `keypress` for such keys. Instead, for special keys the `keydown/keyup` should be used.

The good news is that modern browsers and (even older) IE agree on keycodes for almost all special keys (with the exception of branded keys like IE start button).

Another example is hotkeys. When we implement a custom hotkey with JavaScript, it should work same no matter of case and current language. We don't want a character. We just want a scan code.


### Scan codes VS char codes   

As we know, the char code is a unicode character code. It is given only in the `keypress` event.

A scan-code is given on `keydown/keyup`. 

For all alphanumeric and most special keys, the scan code generally equals a character code. In case of a letter, the scan code equals an uppercased english letter char code.

For example, you want to track "Ctrl-S" hotkey. The checking code for `keydown` event would be:
[js]
e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)
[/js]

And it doesn't matter if user the resulting char is "s" or "S" or another language letter. 


[sum]
For alphanumeric keys, the scan code equals the character code of the uppercased english letter/digit.
[/sum] 

The scan code do not equal the char code for most punctuation characters including brackets and arithmetic symbols.

For example, a "-" key has `keyCode=109` in Firefox, `keyCode=189` in IE, but it's `charCode=45`. Obviously no match. 

[sum]For all keys except `';', '='` and `'-'` different browsers use same key code.[/sum]

Try that on the test stand above. Type '-' and watch <code>keydown keyCode</code and <code>keypress charCode</code>.


### Special actions   

Some special actions can be prevented. If the backspace is pressed, but the `keydown` returns `false`, the character will not be deleted. 

But of course certain actions can't be cancelled, especially OS-level ones. Alt+F4 closes browser window in most operating systems, no matter what you do in JavaScript. 


## Tasks and examples   

[task src="task/mouse-keys.md"]

[task src="task/caps-lock-warning-input.md"]

[task src="task/hotkey.md"]

=Head

<script src="/files/tutorial/browser/events/log.js"></script>
