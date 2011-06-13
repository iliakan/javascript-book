
# Styles and classes, getComputedStyle [81]

This section is about reading and changing the view of an element.

Please make sure you are familiar with <a href="http://www.w3.org/TR/CSS2/box.html">CSS Box Model</a> before reading it. Knowing what is a padding, margins, a border is a prerequirement.

=Cut


## `className`   

The `className` property is always synchronized with the `class` attribute.

The following example demonstrates it:

[html]
<body class="class1 class2">
<script>
  alert(document.body.className)
  document.body.className += ' class3'
</script>
</body>
[/html]

To remove a single class, it is extracted from the string either by replace function or after splitting it by whitespaces and then joining back. 

All JavaScript frameworks contain built-in functions for such job.


## `style`   

The `style` property gives a read-write access to the element style.

It is possible to change most CSS properties using it, e.g `element.style.width='100px'` will act as if element had a `style="width:100px"` attribute.

And, same as in CSS, you need to supply the measurements: 'px', 'pt', '%' or 'em'.

For a-multi-word-property, you need to camelCase it:
[js]
background-color  => backgroundColor
z-index           => zIndex
border-left-width => borderLeftWidth
[/js] 

The value of `style` always overrides CSS properties, so you can change it and then revert the change by assigning empty string: `elem.style.width=''` will remove `width` setting.

Using the `style` property is demonstrated in the example below:

[js run]
// enter an empty value to reset the color
document.body.style.backgroundColor = prompt('background color?', 'green')
[/js]

[smart]
Browser-specific style properties like `-moz-border-radius`, `-webkit-border-radius` are assigned like this:
[js]
button.style.MozBorderRadius = '5px'
button.style.WebkitBorderRadius = '5px'
[/js]

Of course, it is much better to leave them in classes and decorate elements by adding/removing them in `elem.className`.
[/smart]



### cssText   

The `style.cssText` property allows to read/write whole declaration:

[html run]
<div>Button</div>

<script>
  var div = document.body.children[0]
 
  div.style.cssText='*!*color: red !important;*/!* \
    background-color: yellow; \
    width: 100px; \
    text-align: center; \
    *!*blabla: 5; \*/!*
  '

  alert(div.style.cssText)
</script>
[/html]

Browser parses `cssText` and applies what it knows. There are no exceptions on writing unknown property `blabla`, so most browsers  ignore it.

In the example above, reading `cssText` does not show property `blabla` in Firefox.

<b>`style.cssText` is the only way to add `!important`.</b> 



### Reading the style   

The `style` gives access only to properties set through it, or with `"style"` attribute.

So, in the example below, an attempt to get `marginTop` will be unsuccessful:
[html run height=100]
<style>
  body { margin: 10px }
</style>
<body>
  <script> 
    alert(document.body.style.marginTop) 
  </script>
</body>
[/html]

That's because `margin` is a result of applying CSS cascade, not `style`.

If you've set it with style then reading it works:
[html run height=100]
<style>
  body { margin: 10px }
</style>
<body>
  <script> 
    document.body.style.margin = '20px'
    alert(document.body.style.marginTop) 
  </script>
</body>
[/html]

Note from the example above how browser unpacks `margin` property, providing readable subproperties. Same happens with `border`, `background` etc.

In the example below, `color` is shown as `rgb(...)` in Firefox:

[html run height=100]
<body style="color:#abc">
  <script> 
    alert(document.body.style.color)  // rgb(170, 187, 204)
  </script>
</body>
[/html]

The following tasks shows most often-used style properties. 

[task src="task/rounded-button.md"]


## `getComputedStyle` and `currentStyle`   

The `style` gives access only to information which is put into `elem.style` 

In the example below, `style` doesn't tell anything about the margin defined in CSS:

[html

 run height=100]
<style>
  body { margin: 10px }
</style>
<body>

  <script> 
    alert(document.body.style.marginTop) 
  </script>

</body>
[/html]

For example, we want to introduce animation and smoothly increment the margin by `10px` more. How to do it? First, we need to get the current value.

To read the actual property after CSS and styles are applied, the <a href="http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/css.html">DOM Level 2</a> standard describes `window.getComputedStyle` method.

The syntax is:
[js]
getComputedStyle(element, pseudo)
[/js]

<dl>
<dt>element</dt>
<dd>The element to get a styling for</dd>
<dt>pseudo</dt>
<dd>A pseudo-selector like 'hover' or `null` if not needed.</dd>
</dl>

All browsers excepts IE<9 support it. The following code will work as it should in all non-IE:

[html run height=100]
<style>
  body { margin: 10px }
</style>
<body>

  <script> 
    var computedStyle = getComputedStyle(document.body, null)
    alert(computedStyle.marginTop) 
  </script>

</body>
[/html]

And for IE, there is a proprietary <a href="http://msdn.microsoft.com/en-us/library/ms536497.aspx">currentStyle</a> property which is <i>almost</i> same.

The pitfall is that `currentStyle` returns value 'as-is', in measurements from CSS, not in pixels. 
Let's demonstrate this:

[html run height=100]
<style>
  body { margin: 10% }
</style>
<body>
  <script> 
    if (window.getComputedStyle) {
      var computedStyle = getComputedStyle(document.body, null)
    } else {
      computedStyle = document.body.currentStyle
    }
    alert(computedStyle.marginTop) 
  </script>
</body>
[/html]

<ol><li>In Firefox, pixels may be fractional.</li>
<li>Other browsers round pixels.</li>
<li>IE keeps the units. The example above gives percents.</li>
</ol>

If you have values in pixels, then IE behaves same as other browsers.


[smart header="IE: converting `pt,em,%` to pixels"]

Sometimes the CSS is given in other units than pixels, like percents or <i>em</i>. And we need pixels to perform calculations, just because it is impossible to sum 10px and 10%.

To get a real pixel value out of percents, there exists a runtimeStyle+pixel, described by Dean Edwards <a href="http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291">here</a>.

It is based on IE-only properties `runtimeStyle` and `pixelLeft`. 

In the example below, the `getCurrentPixelStyle(elem, prop)` gets a pixel value for `elem.currentStyle` property `prop`.

If you are interested to know how it works, read the code carefully and check <a href="http://msdn.microsoft.com/en-us/library/ms535889(v=vs.85).aspx">runtimeStyle</a> and <a href="http://msdn.microsoft.com/en-us/library/ms531129%28VS.85%29.aspx">pixelLeft</a> properties in MSDN. 

[js src="/assets/browser/dom/getCurrentPixelStyle.js"][/js]
<script src="/files/tutorial/browser/dom/getCurrentPixelStyle.js"></script>

The function is in action below (IE only):

[html]
<style> #margin-test { margin: 1% } </style>
<div id="margin-test">margin test</div>

<script>
  var elem = document.getElementById('margin-test')
  if (elem.currentStyle) // IE
    document.write(getCurrentPixelStyle(elem, 'marginTop')) 
  else 
    document.write('Open the page in IE please')
</script>
[/html]
<style> #margin-test { margin: 1% } </style>
<div id="margin-test">margin test</div>

<script>
  var elem = document.getElementById('margin-test')
  if (elem.currentStyle) // IE
    document.write(getCurrentPixelStyle(elem, 'marginTop')) 
  else 
    document.write('Open the page in IE please')
</script>

Modern JavaScript frameworks use it or it's variant for IE and `getComputedStyle` for browsers which have it.

[/smart]


## Summary   

All DOM elements provide the following properties.

<ul>
<li>The `className` property is always synchronized with the `class` attribute.</li>
<li>The `style` property is an object with camelCased CSS properties. It works good for writing. It allows to read properties, set by `style`, but not the properties defined in CSS.
</li>
<li>The `cssText` allows to get/set the full value for `style` in text form. You can't add `!important` with `style` property. With `cssText` - you can.</li>

<li>The `currentStyle` property (IE) and `getComputedStyle` (standard) method allow to get the live value of the style property, after all styles are applied.

Special notes:
<ol>
<li>Firefox may return a fractional value.</li>
<li>IE returns value in given units, not translates it to pixels. But there is a function which can do it.</li>
</ol>
</ul>

