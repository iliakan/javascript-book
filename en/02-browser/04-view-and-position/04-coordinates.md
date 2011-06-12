
# Coordinates 

There are two coordinate systems in the browser.
<ol>
<li>relative to <strong>`document`</strong> - the zero point is at the left-upper corner of the page.</li>
<li>relative to <strong>`window`</strong> - the zero point is at the left-upper corner of the current visible area.</li>
</ol>

=Cut


## Coordinate systems   

When the page is not scrolled, window and document coordinates are the same and share the zero point:

[img src="/assets/browser/dom/coords.png"]

After the scroll, the visible area moves from the document start:
 
[img src="/assets/browser/dom/coords2.png"]

Actually, it is easy to transform between these coordinate systems. <b>Document coordinates are window coordinates plus scroll.</b>

Most of time, only document coordinates are used, because they remain same after scrolling.


## Element coordinates by `offsetParent`   

<i>Element coordinates</i> are the coordinates of the left-upper corner. There is unfortunately no single property which gives coordinates. But they can be calculated using `offsetTop/offsetLeft` and `offsetParent`.

[img src="/assets/browser/dom/offsetSum.png"]

A natural (but as we'll see, a buggy) way of calculating absolute coordinates is to traverse up the `offsetParent` chain and sum `offsetLeft/offsetTop`, like this:

[js autorun]
function getOffsetSum(elem) {
  var top=0, left=0

  while(elem) {
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent        
  }
   
  return {top: top, left: left}
}
[/js]

There are two main downsides of this approach.

<ol>
<li>It is buggy. Different browsers have different pitfalls. There are problems with taking borders and scrolls into account.</li>
<li>It is slow. Every time we have to go through whole chain of  `offsetParents`.</li>
</ol>

It is possible to write a cross-browser code with all the bugs fixed, but let's review an alternative solution which is supported by Internet Explorer 6+, Firefox 3+ и Opera 9.62+, and modern Safari/Chrome too.


## The right way: `elem.getBoundingClientRect`   

This method is described in W3C standard, and most modern browsers implement it (IE too).

It returns a rectangle which encloses the element. The rectangle is given as an object with properties `top, left, right, bottom`.

The four numbers represent coordinates of the top-left and right-bottom corners. For example, click on the button below to see it's rectangle:

<input id="brTest" type="button" value="Show button.getBoundingClientRect()" onclick='showRect(this)'/>

<script>
function showRect(elem) {
  var r = elem.getBoundingClientRect()
  alert("Top: "+r.top+"\nLeft: "+r.left)
  alert("Right: "+r.right+"\nBottom: "+r.bottom)
}
</script>

[html hide="Show the button code"]
<input id="brTest" type="button" value="Show button.getBoundingClientRect()" onclick='showRect(this)'/>

<script>
function showRect(elem) {
  var r = elem.getBoundingClientRect()
  alert("Top/Left: "+r.top+" / "+r.left)
  alert("Right/Bottom: "+r.right+" / "+r.bottom)
}
</script>
[/html]

<b>The coordinates are given relative to `window`, not the document</b>.

For example, if you scroll this page, so that the button goes to the window top, then its `top` coordinate becomes close to `0`, because it is given relative to window.

To calculate coordinates relative to the document that, we need to take page scroll into account. 


<div class="smart"><div class="smart-head">What is `elem.getBoundingClientRect()`?</div>

Following CSS specification, any content is enclosed by the rectangle called a <i>CSS box</i>.

In case of block element, like `DIV` - the element itself forms such a rectangle. Such rectangle is called a <i>block box</i>.

But if an element is inline and contains long text, it requires multiple rectangles to show up. Every line is a rectangle. Such rectangles are called <i>anonymous boxes</i>. This stuff is described in great details in CSS specification: <a href="http://www.w3.org/TR/CSS21/visuren.html#anonymous-block-level">http://www.w3.org/TR/CSS21/visuren.html#anonymous-block-level"</a>.

So, the element contents can be in single or multiple rectangles.
It is possible to get all these rectangles by calling `elem.getClientRects()`. It works fine excepts for IE&lt;8 which returns non-standard rectangles, but anyway we don't call `getClientRects` directly.

The method `elem.getBoundingClientRect()` returns a single minimal rectangle which encloses all boxes returned by `getClientRects()`.
</div>

Let's make a new version of coordinate calculator using `getBoundingClientRect`:

[js autorun]
function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect()
    
    var body = document.body
    var docElem = document.documentElement
    
    // (2)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    
    // (3)
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    
    // (4)
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
    
    return { top: Math.round(top), left: Math.round(left) }
}
[/js]

The steps are:

<ol>
<li>Get the enclosing rectangle.</li>
<li>Calculate the page scroll. All browsers except IE&lt;9 support `pageXOffset/pageYOffset`, and in IE when DOCTYPE is set, the scroll can be taken from <code>documentElement(&lt;html&gt;)</code>, otherwise from `body` - so we take what we can.</li>
<li>The document (`html` or `body`) can be shifted from left-upper corner in IE. Get the shift.</li>
<li>Add scrolls to window-relative coordinates and substract the shift of `html/body` to get coordinates in the whole document.</li>
</ol>

For Firefox an additional rounding is sometimes required, that's why `Math.round()` is in.


## Comparison of methods   

In the demo below, there are 3 nested `DIVs`. All of them have `border`, some of them have `position/margin/padding`.

A click on the inner div shows absolute coordinates from both methods: `getOffsetSum` and `getOffsetRect`, and also shows real mouse coordinates as `event.pageX/pageY` (we discuss them later in the article [](#108)).

All values appear below the `DIVs`.

<noautop>
<div style="position:relative;padding:10px;height:80px;width:380px;border:7px red solid">
  <div style="border:10px blue solid;padding:2px;position:absolute;left:20%;top:20%">
    <div id="getBoundingClientRectEx" style="background-color:yellow;border:4px solid black;margin:2px;cursor:pointer">Click to get my absolute coordinates with`getOffsetSum` and `getOffsetRect`</div>
  </div>
</div>
<div id="getBoundingClientRectExRes">
<div><b>getOffsetSum</b>:<span>value of getOffsetSum()</span></div>
<div><b>getOffsetRect</b>:<span>value of getOffsetRect()</span></div>
<div><b>mouse</b>:<span>mouse coordinates</span></div>
</div>
<script>
document.getElementById('getBoundingClientRectEx').onclick = function(event) {
    var o = getOffsetSum(this)
    var orect = getOffsetRect(this)
    
    event = event || window.event
    if ( event.pageX == null && event.clientX != null ) {
        var html = document.documentElement, body = document.body;
        event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }

    var list = document.getElementById('getBoundingClientRectExRes').getElementsByTagName('SPAN')
    list[0].innerHTML = '{left:'+o.left+', top:'+o.top+'}'
    list[1].innerHTML = '{left:'+orect.left+', top:'+orect.top+'}'
    list[2].innerHTML = 'pageX='+event.pageX+' pageY='+event.pageY
}
</script>
</noautop>

Click anywhere on the yellow div. It will show results for `getOffsetSum(elem)` and `getOffsetRect(elem)` below. Note they usually don't match.

To see which result is correct - click on the very upper-left corner of the  yellow element. It is located on the upper-left corner of the black border.

The absolute mouse coordinates will appear so you can compare them with `getOffsetSum/getOffsetRect`.

Try it to see that `getOffsetRect` is always right :).


## The combined approach   

Many frameworks use something a combined approach:

[js]
function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else { // old browser
        return getOffsetSum(elem)
    }
}
[/js]

[js hide="Open to see getOffsetRect/getOffsetSum"]
function getOffsetSum(elem) {
  var top=0, left=0
  while(elem) {
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent        
  }
   
  return {top: top, left: left}
}


function getOffsetRect(elem) {
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


function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}
[/js]



## Summary   

There are document-based and window-based coordinates. Document-based are scroll-tolerant and are used most of time.

The two methods to calculate coordinates are:
<ol>
<li>Sum `offsetLeft/Top` - many browser bugs, not recommended.</li>
<li>Use `getBoundingClientRect` - works in all recent major browsers, also supported by IE6+.</li>
</ol>

