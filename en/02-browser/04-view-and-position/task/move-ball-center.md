
# Move the ball into the center 

Place a ball in the center of the field.

Source:
[iframe height=160 src="tutorial/browser/dom/ball-source/index.html"]

Use JavaScript to place the ball in the center:
[iframe height=160 src="tutorial/browser/dom/ball/index.html"]

The source document: [play src="/assets/browser/dom/ball-source"].




=Solution

The field has no padding. So, it's width and height are `clientWidth/Height`.

The center is `(clientWidth/2, clientHeight/2)`. 

If we set `ball.style.left/top` of the ball to the center, then the left-upper corner of the ball will be at the center, not the ball itself:

[js]
var ball = document.getElementById('ball')
var field = document.getElementById('field')

ball.style.left = Math.round(field.clientWidth / 2)+'px'
ball.style.top = Math.round(field.clientHeight / 2)+'px'
[/js]
[iframe hide="Click to see the current result" height=160 src="tutorial/browser/dom/ball-half/index.html"]

To align the center of the ball against the field center, we need to shift the ball. Half of it's width left, half of it's height up.


[js]
var ball = document.getElementById('ball')
var field = document.getElementById('field')

ball.style.left = Math.round(field.clientWidth/2 - ball.offsetWidth/2)+'px'
ball.style.top = Math.round(field.clientHeight/2 - ball.offsetHeight/2)+'px'
[/js]

Unfortunately, <i>there will be a bug</i>, because `IMG` has no width/height:
[html]
<img src="ball.gif" id="ball">
[/html]

<b>Width/height of an image is unknown to the browser until it loads, if not set explicitly.</b> So, we'll have `ball.offsetWidth = 0`.

A reasonable fix is to provide width/height:
[html]
<img src="ball.gif" width="40" height="40" id="ball">
[/html]

Now we're done.

[iframe hide="Click to see the final result" height=160 src="tutorial/browser/dom/ball/index.html"]

Full solution code: [play src="/assets/browser/dom/ball"]

P.S. Using `offsetHeight/offsetWidth` instead of `clientHeight/clientWidth` would be wrong, because positioning takes place inside the borders.

