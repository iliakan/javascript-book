
# Caps lock warning input 

Create an input that warns user if the Caps Lock is on. Releasing Caps Lock removes the warning. This may help to prevent errors when entering password.

[iframe height=60 src="tutorial/browser/events/capslock/index.html"]

The source document: [play src="/assets/browser/events/capslock-src"].

=Hint 1

Detect Caps Lock the following way:
if a key pressed without shift and it's in the upper case - means caps is on.

=Solution

How to track Caps Lock?

Unfortunately, there is no direct access to the state.

But we could use the events:
<ol>
<li>Check `keypress` events. An uppercased char without shift or a lowercased char with shift means that Caps Lock is on.</li>
<li>Check `keydown` for Caps Lock key. It has keycode 20.</li>
</ol>

For reliability both `keydown` and `keypress` events should be tracked on page-level.

On page load, before anything was printed, we know nothing about Caps Lock, so the state is null:
[js]
var capsLockEnabled = null
[/js]

When a key is pressed, we can try to check if character case and shift do not match:
[js]
document.onkeypress = function(e) {
  e = e || event 

  var chr = getChar(e)
  if (!chr) return // special key

  if (chr.toLowerCase() == chr.toUpperCase()) {
    // caseless symbol, like whitespace 
    // can't use it to detect Caps Lock
    return
  }

  capsLockEnabled = (chr.toLowerCase() == chr && e.shiftKey) || (chr.toUpperCase() == chr && !e.shiftKey)
}
[/js]

When a user presses Caps Lock, we should change current Caps Lock state. But we can do it only if we know it. 

For example, when a user enteres page, we don't know if Caps Lock is on. Then a `keydown` for Caps Lock detected. But we still don't know what the new state is - did he <em>disable</em> Caps Lock or <em>enable</em> it.

[js]
document.onkeydown = function(e) {
  e = e || event
  
  if (e.keyCode == 20 && capsLockEnabled !== null) {
    capsLockEnabled = !capsLockEnabled
  }
}
[/js]

Now, the input. The task is to show a warning about Caps Lock On to protect the user from password errors.

<ol>
<li>First, the user focuses on it. We should show Caps Lock warning if we know it's enabled.</li>
<li>The user starts to type. Every `keypress` bubbles up to `document.keypress` handler which updates `capsLockEnabled`. 

We can't use `input.onkeypress` to indicate the state to the user, because it will work <i>before</i> `document.onkeypress` (cause of bubbling) and hence before we know the Caps Lock state.

There are many ways to solve this problem. We'll stick to simplest and assign caps lock indication handler to `input.onkeyup`. It always happens after `keypress`.</li>
<li>At last, user blurs the input. The Caps Lock warning may happen to be on, but it is not needed any more if the input is blurred. So we need to hide it.</li>
</ol>

The input checking code:
[html]
<input type="text" onkeyup="checkCapsWarning(event)" onfocus="checkCapsWarning(event)" onblur="removeCapsWarning()"/>

<div style="display:none;color:red" id="caps">Warning: Caps Lock is on!</div>

<script>
function checkCapsWarning() {
  document.getElementById('caps').style.display = capsLockEnabled ? 'block' : 'none'
}

function removeCapsWarning() {
  document.getElementById('caps').style.display = 'none'
}
</script>
[/html]


The full code for the solution is here: [play src="/assets/browser/events/capslock"].



