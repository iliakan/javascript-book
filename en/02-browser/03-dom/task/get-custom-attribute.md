
# Get custom attribute 

<ol>
<li>Assign the `div` to a variable.</li>
<li>Get the value of `"data-widgetName"` attribute.</li>
</ol>

The document:
[html]
<body>

  <!-- hello world! don't remove me.-->

  <div data-widgetName="menu">Select the genre</div>  

  <script>/* ... */</script>
</body>
[/html]

The source is at [play src="/assets/browser/dom/custom_attribute.html"].


=Solution

<ol>
<li>
First, we need to get the `div`. Unfortunately, `children` contain comment nodes in IE, so direct `document.body.children[0]` is not cross-browser.

But we can check the `nodeType` and take next child if needed:

[js]
var div = document.body.children[0]
if (div.nodeType != 1) {
  // can't use nextSibling, because it can be whitespace
  div = document.body.children[1]  
}
[/js]
</li>
<li>
The only way to access a custom attribute lies through the attribute API.

For example, `getAttribute()` method. (We use a simpler document as an example:

[html run height=100]
<div data-widgetName="menu">Select the genre</div>

<script>
var div = document.body.children[0]

alert( div.getAttribute('data-widgetName') )  // "menu"
</script>
[/html]

</li>
</ol>


