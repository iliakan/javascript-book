
# Mouse on keys 

Click on the mouse below. Then press arrow keys, it will move.

<div style="width:41px;height:48px">
<div style="width:41px; height:48px;background:url(/files/tutorial/browser/events/mousie/mousie.gif)" id="mousie" tabindex="0"></div>
</div>

<script>
    function getOffset(elem) {
        var box = elem.getBoundingClientRect()
        
        var body = document.body
        var docElem = document.documentElement
        
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
        
        var clientTop = docElem.clientTop || body.clientTop || 0
        var clientLeft = docElem.clientLeft || body.clientLeft || 0
        
        var top  = box.top +  scrollTop - clientTop
        var left = box.left + scrollLeft - clientLeft
        
        return { top: Math.round(top), left: Math.round(left) }
    }


document.getElementById('mousie').onfocus = function() {
  this.style.position = 'absolute'
  var offset = getOffset(this)
  this.style.left = offset.left + 'px'
  this.style.top = offset.top + 'px'
}

document.getElementById('mousie').onkeydown = function(e) {
  e = e || event
  switch(e.keyCode) {
  case 37: // left
    this.style.left = parseInt(this.style.left)-this.offsetWidth+'px'
    return false
  case 38: // up
    this.style.top = parseInt(this.style.top)-this.offsetHeight+'px'
    return false
  case 39: // right
    this.style.left = parseInt(this.style.left)+this.offsetWidth+'px'
    return false
  case 40: // down
    this.style.top = parseInt(this.style.top)+this.offsetHeight+'px'
    return false  
  }
}
</script>

The task is a prototype of the real keyboard navigation on an interface.
  
The source document and mousie await you here: [play src="/assets/browser/events/mousie-src"].

The `getOffset` for absolute coords is attached too, if you need it.


=Hint 1

On click focus on the mouse to accept keys on it and bind `keydown` handler.



=Hint 2

Position the mouse absolutely. Use `getOffset` from article [](#80) to get current position. 
Learn exact values of keyCodes for arrow keys by pressing them on the test stand in [the article](#126) or in browser manual. 


=Hint 3

Prevent default behavior or the page will scroll too.

=Solution


## The algorithm   

There are few steps which comprise the solution:

<dl>
<dt>How to track when a mousie is in clicked state and when it's not?</dt>
<dd>An obvious solution here is `focus`. Key events will trigger on the focused element and bubble up.

To make `DIV` focusable, we should add `tabindex`:
[html]
<div style="width:41px;height:48px;background:url(mousie.gif)" id="mousie" tabindex="0"></div>
[/html]
</dd>
<dt>How to track keys?</dt>
<dd>We need to track arrow keys. So there are two events in our disposal: `keydown` and `keyup`. We choose `keydown`, because it allows to <b>cancel the default action, which is page scrolling</b>.</dd>
<dt>How to move the mousie?</dt>
<dd>Like any other element: `position:absolute`, `left` and `top` change depending on the key.</dd>
</dl>


## Changing position on click.   

In the beginning, the mousie has static position. First, we need change it to absolute on click or on <i>focus</i> which gives better accessibility, because the focus can be given by keyboard tab too.

An absolutely positioned mousie will stick to the left-upper corner of the `BODY`. To keep mousie at same place, we need to set `left/top` to it's current coordinates:
[js]
document.getElementById('mousie').onfocus = function() {
  this.style.position = 'absolute'
  var offset = getOffset(this)  
  this.style.left = offset.left + 'px'
  this.style.top = offset.top + 'px'
}
[/js]
The function `getOffset` is described in [](#80).

Also, the pitfall is that if the mousie is surronded by other elements, they  will shift. An absolutely positioned element jumps out of the flow:

[html autorun]
<div style="color:green">Before</div>

<div onclick="this.style.position = 'absolute'" style="cursor:pointer"> 
  Click me 
</div>

<div style="color:red">After</div>
[/html]

To fix it, we need a placeholder or a wrapper, like this:
[html]
<div style="width:41px; height:48px">
  <div style="width:41px;height:48px;background:url(mousie.gif)" id="mousie" tabindex="0"></div>

</div>
[/html]
The outer `DIV` occupies the space no matter if the contents exists (in flow) or not. 


## Moving the beast   

The codes for arrows are 37-38-39-40 (left-top-right-bottom).

[js]
document.getElementById('mousie').onkeydown = function(e) {
  e = e || event
  switch(e.keyCode) {
  case 37: // left
    this.style.left = parseInt(this.style.left)-this.offsetWidth+'px'
    return false
  case 38: // up
    this.style.top = parseInt(this.style.top)-this.offsetHeight+'px'
    return false
  case 39: // right
    this.style.left = parseInt(this.style.left)+this.offsetWidth+'px'
    return false
  case 40: // down
    this.style.top = parseInt(this.style.top)+this.offsetHeight+'px'
    return false  
  }
}
[/js]

Note that the default action of arrows is to scroll the page. So we have to `return false` to prevent it.

There is no need to remove handlers on `blur`, because the browser will stop triggering `keydown`. So when a user blurs the mousie, it stops reacting on keys.

The final solution is [play src="/assets/browser/events/mousie"].


