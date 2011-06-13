
# Rounded button 

Take the document at [play src="/assets/browser/dom/roundedButton/source.html"] and create the <code>&lt;A&gt;</code> link with given style by pure JavaScript, <i>without any HTML tags at all</i>:

[html src="/assets/browser/dom/roundedButton/task.html" height=auto link autorun][/html]


Also, check yourself: <b>remember what each style property means, describe why it is here</b>.



=Solution

There are two variants. 

<ol>
<li>Use `elem.style.cssText` property to assign the textual style. That will overwrite all existing style properties.</li>
<li>Use `elem.style` subproperties to assign style items one-by-one. That changes only style properties which get assigned.</li>
</ol>

The solution follows the second way: [play src="/assets/browser/dom/roundedButton/solution.html"]. 

CSS properties:

[css]
.button {
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  border: 2px groove green;
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-decoration: none;
  text-align: center;
  color: red;
  font-weight: bold;
}
[/css]
<dl>
<dt>`*-border-radius`, `border`</dt>
<dd>Adds rounded corners for Mozilla, Chrome/Safari and other standard-compliant browsers (Opera).</dd>
<dt>`display`</dt>
<dd>By default, the `A` has `display: inline`.</dd>
<dt>`height`, `line-height`</dt>
<dd>Sets element height and makes the text vertical-centered. Vertical centering with `line-height = height` works for single line.</dd>
<dt>`text-align`</dt>
<dd>Centers the text horizontally.</dd>
<dt>`color`, `font-weight`</dt>
<dd>Makes the text red and bold.</dd>
</dl>


[warn]
Don't assign style properties directly until you know that can't be done with CSS classes, or classes are inconvenient (rarely, but happens).

In the example above, probably only few properties (depending on the application) are to be handled by JavaScript. Most of them should reside in a class, which JavaScript adds.
[/warn]


