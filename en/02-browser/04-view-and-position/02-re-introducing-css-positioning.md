
# Re-introducing CSS positioning 

CSS positioning becomes very important in building graphical components. 

In this section we remember it and use in widgets.

=Cut


## `Static`   

The default positioning type, used if no other position is set explicitly. 

For this and future examples the document below is used. 

[html autorun height=250]
<style> /* basic style */
.widget { 
  background-color: #ffe4c4;   
  width: 500px;
}

#today-header {
  background-color: #5f9ea0;
  margin: 0;
}
</style>


## Static positioning   

<div class="widget">
    The widget header.

    
## Information   [today-header]

    <p>A new byte-code standard is defined for JavaScript... <br/>
         Ok, just dreaming.</p>
</div>

The footer.
[/html]

[sum]
An element with `position: static` is also called an <i>not positioned element</i>, with any other positioning type - a <i>positioned element</i>.
[/sum]


## `Relative`   

An element can be positioned <i>relatively</i> to it's normal place.

To use relative positioning, you need to define `position: relative` CSS property and probably one or two coordinates:
<ul>
<li>`top/bottom`</li>
<li>`left/right`</li>
</ul>
Usually you choose one from the vertical pair and one from the horizontal pair. 

The element will be shifted from it's usual position by given distance.

Check the code below for the example below for that.

[html autorun height=250]
<style> /* basic style */
.widget { 
  background-color: #ffe4c4;   
  width: 500px;
}

#today-header {
  background-color: #5f9ea0;
  margin: 0;
}
</style>

<style>
*!*
  .widget{
    position: relative;
    left: 30px; 
    top: -30px;
  }
*/!*
</style>


## Relative positioning   

<div class="*!*widget*/!*">
    The widget header.

    
## Information   [today-header]

    <p>A new byte-code standard is defined for JavaScript... <br/>
         Ok, just dreaming.</p>
</div>

The footer.
[/html]

As you may see running the example above, the element is shifted:
<ul>
<li>`left: 30px`: moved 30px from it default left.</li>
<li>`top: -30px`: if it were just "30px", then element would go down 30px from it's default top, but because the value is negative, it goes 30px  <i>up</i>.</li>
</ul>

These `left/top` properties wouldn't work for `position:static`.

[sum]
`position: relative` moves the element, but the place which it occupied, remains empty.

In the example above, the the footer does not shift up to occupy the freed space.[/sum]


## `Fixed`   

This type positioning is not supported in IE&lt;8 and emulated using behaviors.

It does two things:

<ol>
<li>Removes the element from it's place. Other elements shift to take places as if the element did not exist.</li>
<li>Moves the element relative to <i>window</i>. That really means a <em>window</em>, not document. When the page is scrolled, the fixed element will remain at it the same coordinates.</li>
</ol>


In the example below, the page is scrollable, but `#go-top` link is always at the same place (in IE&lt;8 expressions are used for that).

[html autorun height=200]
<style>
*!* 
  #go-top {
    position: fixed;
    right: 10px;
    top: 10px;
    font-size: 125%;
  }
*/!*
</style>

*!*<a href="#top" id="go-top">Scroll, I don't move!</a>*/!*


## Fixed positioning   [top]
    The widget header.

<div class="widget">
    
## Information   [today-header]

    <p>A new byte-code standard is defined for JavaScript... <br/>
         Ok, just dreaming.</p>

   <p>SquirrelFish is a register-based, direct-threaded, high-level bytecode engine, with a sliding register window calling convention. It lazily generates bytecodes from a syntax tree, using a simple one-pass compiler with built-in copy propagation.</p>

</div>

The footer.
[/html]



## `Absolute`   

<b>The absolute positioning is the most important.</b>

It does two things:
<ol>
 <li>Removes the element from it's place. Other elements shift to take places as if the element did not exist.</li>
 <li>Moves the element relative to it's <i>closest positioned parent</i>, or the document if no such parent is found.</li>
</ol>

The <i>closed positioned parent</i> is nearest parent which has `position` other than `static`.

The example below positions a widget absolutely. Because there is no positioned parent, the widget moves to the document right-bottom corner.

[html autorun height=250]
<style>
  @import url(/files/tutorial/browser/dom/poscolor.css)
</style>

<style>
*!*
  .widget{
    border: 1px solid black;
    position: absolute;
    right: 0;
    bottom: 0;
  }
*/!*
</style>


## Absolute positioning   

<div class="*!*widget*/!*">
    The widget header.

    
## Information   [today-header]

    <p>A new byte-code standard is defined for JavaScript... <br/>
         Ok, just dreaming.</p>
</div>

The footer.
[/html]

Also note that the widget element is removed from the stream, so "The footer" shifted to it's former place.


## `Absolute` in the positioned ancestor   

Let's say we need to position a header in the right-top corner of the widget. The absolute positioning helps here:

[html autorun height=200]
<style>
  @import url(/files/tutorial/browser/dom/poscolor.css)
</style>

<style>
*!*
  .widget{
    position: relative;
  }
  #today-header {
    position: absolute;
    right: 0px;
    top: 0px;
  }
*/!*
</style>


## Absolute positioning   

<div class="*!*widget*/!*">
    The widget header.

    
## Information   [today-header]

    <p>A new byte-code standard is defined for JavaScript... <br/>
         Ok, just dreaming.</p>
</div>

The footer.
[/html]

In the example above, `#today-header` is positioned absolutely in the right-top corner of the closest positioned parent... Which is `.widget`, because it has other position than `static`.

The trick with setting `position:relative` without a shift is a general way to make an element positioned, so that inner elements can be positioned absolute to it.

The `#today-header` is removed from the stream so other elements are shifted to occupy a freed place. 

Sometimes that's fairly ok, but if you need to keep the place - it us usually done with paddings or other types of additional styling.

[task src="task/position-absolutely.md"]


## Read more   

CSS Positioning is well-described in the specification <a href="http://www.w3.org/TR/CSS2/visuren.html#positioning-scheme">Visual Formatting Model, 9.3 and below</a>.

Also, there is a tutorial <a href="http://www.barelyfitz.com/screencast/html-training/css/positioning/">CSS Positioning in 10 steps</a>, which covers main position types and floats.

