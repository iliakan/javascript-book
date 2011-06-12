
# User interaction: alert, prompt and confirm 

The basic UI operations are `alert`, `prompt` and `confirm`.

=Cut


## `alert`   

The syntax:
[js]
alert(message)
[/js]

`alert` outputs a window with the message and stops execution until visitor presses "OK" button.

The message window is called <i>a modal window</i>. The word "modal" means that page interface is suspended until "OK" is clicked. A visitor can't do anything until he clicks "OK".

[js run]
alert("Test me");
[/js]



## `prompt`   

This method accepts two arguments:
[js]
result = prompt(text[, default]);
[/js]

It outputs a modal window with the `text`, OK/CANCEL buttons and input field. 

<b>`prompt` returns either a string (maybe empty) or `null`.</b>

The result depends on user's action. There are three options:
<ol>
<li>If user types something into field and presses OK, then user text is the result.</li>
<li>If user types nothing, but presses OK, then the result is  `default`.</li>
<li>If user presses CANCEL (or keyboard Escape), then result is `null`.</li>
</ol>


As with `alert`, the window is modal, user can't do anything until he presses one of two buttons (or Escape which is same as CANCEL).

[js run]
var years = prompt('How old are you?', 100)
alert('You are ' + years + ' years old!')
[/js]


[warn header="Always set second argument"]
Always set the default value in `prompt`, otherwise IE will insert `"undefined"` into dialog:

Try this in IE:
[js run]
prompt("Test")
[/js]
[/warn]


## `confirm`   

The syntax:

[js]
result = confirm(message)
[/js]

`confirm` outputs the `message` with two buttons: OK and CANCEL. 

<b>The result is `true/false`</b>, for OK/CANCEL.

For example:

[js run]
var result = confirm("Should I say hello?")

alert(result)
[/js]

Note that you can't style, decorate or change screen position of basic modal windows. That's the main drawback of basic UI functions.

But all these functions are simple and require no additional code. That's why people still use them.

[task src="task/simple-page-task.md"]


## Summary   


<ul>
<li>`alert` outputs a message.</li>
<li>`prompt` outputs a message and waits for user input, then returns the value or `null` if ESC is pressed.</li>
<li>`confirm` outputs a message and awaits until user presses ok or cancel. The returned value is `true/false`</li>
</ul>

