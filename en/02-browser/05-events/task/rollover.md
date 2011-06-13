
# Rollover 

Create a button, which changes on mouse over and click. Hover/Click on it to see:

[iframe src="/assets/browser/events/rollover/index.html"]

The source images are at [play src="/assets/browser/events/rollover-src"].

Also, the source code contains helper functions to add/remove class elements. Remember to use semantic markup.

=Hint 1

First, create an HTML structure. The button can be either `INPUT`, `BUTTON` or just `DIV`.

[html]
<div class="button"></div>
[/html]

Use `mouseover`, `mouseout` events to track the hover state. Use `mousedown` and `mouseup` to track the pressed state.

Use CSS and semantic markup to decorate the button.

=Solution

The button is a `DIV` and the state is described in CSS:

[css]
.button {
  width: 186px;
  height: 52px;    
  background: url(button_static.png);    
}
  
.button-hover {
  background: url(button_hover.png);    
}
    
.button-click {
  background: url(button_click.png);    
}
[/css]

When the mouse comes over the button, `.button-hover` class is added.

When the `mousedown` is detected, `.button-click` class is added.

[warn]
Note that button substate classes are below the `.button`, to make them more prioritized than `.button`. 
So adding/removing these classes actually overrides the background.
[/warn]

Now, the JavaScript part:

[js]
button.onmouseover = function() {
  addClass(this, 'button-hover')
}

button.onmouseout = function() {
  removeClass(this, 'button-hover')
  removeClass(this, 'button-click') // (*)
}

button.onmousedown = function() {
  addClass(this, 'button-click')  
}

button.onmouseup = function() {
  removeClass(this, 'button-click')  
}
[/js]

The `mouseout` handler also removes clicked state. When a visitor mousedowns over the button then moves the mouse away, it eventually becomes 'unclicked'.

See the full solution at [play src="/assets/browser/events/rollover"].



## CSS sprites   

There is a downside of the solution given above. When a user mouseovers a button, and it's background is changed, the browser may not have the image.

To actally show the new background, the browser has to download the new image.

That takes time, and the state change is not shown until the new image is loaded.

The much better real-life way is to join all button states in a single image, called <i>CSS sprite</i>:

[img src="/assets/browser/events/rollover-sprite/button.png"]

This image is set as background, and background-position is adjusted to show the current state:

[css]
.button {
  width: 186px;
  height: 52px;
  background: url(button.png) no-repeat;
}  
  
.button-hover { background-position: 0 -52px; }
    
.button-click { background-position: 0 -104px; }
[/css]

This solution has no problems with instant reflection of a state change.

See the full example at [play src="/assets/browser/events/rollover-sprite"].


P.S. Note that there <i>is</i> a [play src="/assets/browser/events/rollover-css"|pure-CSS solution], with `:active` and `:hover` pseudoclasses, but it doesn't work in IE&lt;8 or IE8 in compatibility mode because of bugs with `:active` handling.


