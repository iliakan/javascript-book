
# Hotkey 

Create a `DIV` which becomes an editable `TEXTAREA` when Ctrl-E is pressed.
When in edit mode, the changes are saved to `DIV` on Ctrl-S and junked on Esc. After it, the `TEXTAREA` becomes the `DIV` again.

The contents is saved as HTML, tags should work.

Please look at how it should look: [play full src="/assets/browser/events/hotfield"].

The source code is here: [play src="/assets/browser/events/hotfield-src"].



=Solution

As you notice in the source code, `#view` is the `DIV` for the result and `#area` is the editable textarea.


## The look   

First, the look. Because we transform a `DIV` into `TEXTAREA` and back, we make them look almost same:
[css]
#view, #area {
  height:150px;
  width:400px;
  font-family:arial;
}
[/css]

The textarea should be emphased somehow. A possible way is to add aborder. But if I set the border, this will change the box, enlarge it and shift the text a little bit.

To make `#area` size same as `#view` we use padding:
[css]
#view {  
  /* padding + border = 3px */
  padding: 2px; 
  border:1px solid black; 
}
[/css]

The <code>#area</code replaces padding with border:
[css]
#area {
  border: 3px groove blue;  
  padding: 0px;

  display:none;
}
[/css]

It is initially hidden. Also, the following piece hides extra border around focused textarea which appears in Chrome/Safari:
[css]
#area:focus { 
  outline: none; /* remove focus border in Safari */
}
[/css]


## Tracking codes   

To track keys, we need their scan codes, not characters. That's important, because such hotkey will work in all languages and all cases. So, <code>keydown</code> is a reasonable choice:
[js]
document.onkeydown = function(e) {
  e = e || event 
  if (e.keyCode == 27) { // escape
    cancel()
    return false
  }

  if ((e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) && !area.offsetHeight) {
    edit()
    return false
  }

  if ((e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) && area.offsetHeight) {
    save()
    return false
  }
}
[/js]

In the example above, `offsetHeight` is checked to see if the element is visible. It is a very reliable way on all elements except for `TR` tag (works with tweaks).

Unlike simple `display=='none'` check it works with element hidden by styles (as we have here) and also for elements with hidden parents.


## Editing   

The following functions switch between modes. HTML is allowed, so the direct transform from/to `TEXTAREA` is possible.

[js]
function edit() {
    view.style.display = 'none'
    area.value = view.innerHTML
    area.style.display = 'block'
    area.focus()
}

function save() {
    area.style.display = 'none'
    view.innerHTML = area.value
    view.style.display = 'block'
}

function cancel() {
    area.style.display = 'none'
    view.style.display = 'block'
}
[/js]

The full solution is here: [play src="/assets/browser/events/hotfield"].
To test it, focus in the right iframe please.

