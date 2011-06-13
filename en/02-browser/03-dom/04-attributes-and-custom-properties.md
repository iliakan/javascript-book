
# Attributes and custom properties 

A DOM node may have attributes and properties. Sometimes people mess them up, because they are related, but they are really two different things.

=Cut


## Properties   

<b>DOM node is an object. So it can store custom properties and methods just like any JavaScript object.</b>

The following example works by assigning an object to `myData` property of `document.body`:
[js run]
document.body.myData = { 
  name: 'John'
}
alert(document.body.myData.name) // John

document.body.sayHi = function() { 
  alert(this.nodeName)
}
 
document.body.sayHi()  // BODY
[/js]

Custom properties and methods are visible only in JavaScript and don't affect HTML.

Also, custom properties show up in `for..in` mixed with native properties:

[js run]
document.body.custom = 5

var list = []
for(var key in document.body) {
  list.push(key)
}

alert(list.join('\n'))
[/js]

Custom DOM properties:
<ul>
<li>May have any value.</lij
<li>Property names case-sensitive</li>
<li>Don't affect HTML</li>
</ul>


## Attributes   

DOM nodes provide access to HTML attributes using the following standard methods:
<ul>
<li>`elem.hasAttribute(name)` - checks if the attribute exists</li>
<li>`elem.getAttribute(name)` - gets an attribute value</li>
<li>`elem.setAttribute(name, value)` - sets an attribute</li>
<li>`elem.removeAttribute(name)` - removes an attribute</li>
</ul>

[warn]The attributes are broken in IE&lt;8 and in IE8 compatible rendering mode:

<ul>
<li>Only `getAttribute` and `setAttribute` methods exist.</li>
<li>They actually modify DOM properties, not attributes.</li>
<li>Attributes and properties in IE&lt;8 are merged. Sometimes that leads to weird results, but the ways to manage attributes which we discuss here work fine with that.</li>
</ul>
[/warn]

In contrast with properties, attributes:
<ul>
<li>May be only strings.</li>
<li>Names not case-sensitive, because HTML attributes are not case-sensitive</li>
<li>They show up in `innerHTML` (unless it's older IE)</li>
<li>You can list all attributes using an array-like `attributes` property of the element.</li>
</ul>

For example, let's see the following HTML:
[html]
<body>
  <div about="Elephant" class="smiling"></div>
</body>
[/html]

The example below sets attributes.

[html run]
<body>
  <div about="Elephant" class="smiling"></div>

  <script>
    var div = document.body.children[0]
    alert( div.getAttribute('ABOUT') ) // (1)
    
    div.setAttribute('Test', 123)   // (2)
    alert( document.body.innerHTML )   // (3)
  </script>
</body>
[/html]

When you run the code above, note the following:
<ol>
<li>An `getAttribute('ABOUT')` uses the name in upper case, but that doesn't matter.</li>
<li>You can try assign a string or other primitive value, which will become a string. Object should be autoconverted, but IE has problems here, so stick to primitives.</li>
<li>The `innerHTML` contains the new `"test"` attribute.</li>
</ol>


## Properties and attribytes synchronization   

Every type of DOM nodes has standard properties. 

For example, see the `'A'` tag: <a href="http://www.w3.org/TR/REC-DOM-Level-1/level-one-html.html#ID-48250443">Interface HTMLAnchorElement</a>.

It has `"href"` and `"accessKey"` and other specific attributes. Besides, it inherits `"id"` and other attributes from <a href="http://www.w3.org/TR/REC-DOM-Level-1/level-one-html.html#ID-58190037">HTMLElement</a>.

<b>Standard DOM properties are synchronized with attributes.</b>


### `id`   

For example, the browser synchronizes `"id"` attribute with `id` property:

[html run]
<script>
  document.body.setAttribute('id','la-la-la')
  alert(document.body.id) // la-la-la
</script>
[/html]


### `href`   

<b>The synchronization does not guarantee the same value.</b> Let's set the `"href"` attribute for example:

[html height=30 run]
<a href="#"></a>
<script>
  var a  = document.body.children[0]

  a.href = '/'
  alert( 'attribute:' + a.getAttribute('href') ) // '/'
  alert( 'property:' + a.href )  // IE: '/', others: *!*full URL*/!*

</script>
[/html]

That's because `href`, <a href="http://www.w3.org/TR/REC-html40/struct/links.html#adef-href">according to W3C specification</a> must be a well-formed link.

There are other attributes, which are synced, but not copied. For example `input.checked`:

[html run]
<input type="checkbox" checked>

<script>
  var input  = document.body.children[0]

  alert( input.checked ) // true
  alert( input.getAttribute('checked') ) // empty string
</script>
[/html]

The value of `input.checked` property is either `true` or `false`, but the attribute has whatever you put into it. 


### `value`   

<b>There are also built-in properties which are synced one-way only.</b>

For example, the `input.value` is synchronized from the attribute:

[html height=30 run]
<body>
  <input type="text" value="markup">
  <script>
    var input = document.body.children[0]

    input.setAttribute('value', 'new')

    alert( input.value ) // 'new', input.value changed
  </script>
</body>
[/html]

But the attribute is not synchronized from the property:
[html height=30 run]
<body>
  <input type="text" value="markup">
  <script>
    var input = document.body.children[0]

    input.value = 'new'

    alert(input.getAttribute('value')) // 'markup', not changed!
  </script>
</body>
[/html]

The `"value"` attribute keeps the original value after the property was updated, for example when a visitor typed in something. The original value can be used to check if the `input` is changed, or to reset it.


### `class/className`   

<b>The naming exception: `"class"` attribute corresponds to `className` property.</b>

Because `"class"` is a reserved word in JavaScript, the name of the corresponding property for the `"class"` attribute is `className`.

[html run]
<body>
  <script>
    document.body.setAttribute('class', 'big red bloom')

    alert( document.body.className )  // ^^^
  </script>
</body>
[/html]

Note, the example above <i>doesn't work in IE&lt;9</i>, because of the weird way attributes and properties are mixed up. 

We can live fine with it, just always use `className` property to manage classes, not the attribute.

[task src="task/get-custom-attribute.md"]


### The fun with old IEs   

<b>First, IE&lt;9 synchronizes all properties and attributes.</b>:

[js run]
document.body.setAttribute('try-in-ie', 123)

alert( document.body['try-in-ie'] === 123 )  // true in IE<9
[/js]

Note that the type is also same. The attribute did not become a string, as it should.

<b>Second, in IE&lt;8 (or IE8 in IE7-compat. mode) properties and attributes are same.</b> That leads to funny consequences.

For example, properties names are case-sensitive, and attribute names are not. And if the browser thinks that they are same, then what should be the result of the following code? 
[js run]
document.body.abba = 1 // assign property (now can read it by getAttribute)
document.body.ABBA = 5 // assign property with another case

// must get a property named 'ABba' in *!*case-insensitive*/!* way.
alert( document.body.getAttribute('ABba') ) // ??
[/js]

The browser escapes the trap by picking the first value by default. It also provides an optional second IE-only parameter for `getAttribute`, which makes it case-sensitive. See <a href="http://msdn.microsoft.com/en-us/library/ms536429(v=vs.85).aspx">MSDN getAttribute</a> for details.

<b>The `"class"` attribute changes class in all browsers except IE&lt;9. Don't use the attribute. Use `className` property all the time.</b> 

[sum]
To live well with any IE, use attributes correctly.

Or, in other words, try using properties all the time, until you <i>really</i> need an attribute.

And the only times you <i>really</i> need an attribute are:
<ol>
<li>To get a custom HTML attribute, because it is not synced to DOM property.</li>
<li>To get an "original value" of the standard HTML attribute, like <code>&lt;INPUT value="..."&gt;</code>.</li>
</ol>

[/sum]


### Attributes as DOM nodes   

Attributes are also accessible via `elem.attributes` collection.

In `attributes` collection, every attribute is represented by <a href="http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-637646024">a special kind of DOM node</a>. It has `name`, `value` and other properties. 

For example:

[html run height=50]
<span style="color:blue" id="my">text</span>

<script>
  var span = document.body.children[0]
  alert( span.attributes['style'].value )  // "color:blue;"
  alert( span.attributes['id'].value )  // "my"
</script>
[/html]

By the way, IE&lt;8 and IE8 in compatibility mode go crazy about the `"style"` attribute. Guess why.

Attribute DOM nodes are not the part of the document tree, they are accessible from their elements only.


## Summary   

Both attributes and properties are core features in the DOM model.

The table of differences and relations:

<table class="bordered">
<tr>
<th>Properties</th>
<th>Attributes</th>
</tr>
<tr>
<td>Any value</td>
<td>String</td>
</tr>
<tr>
<td>Names are case-sensitive</td>
<td>not case-sensitive</td>
</tr>
<tr>
<td>Don't show up in `innerHTML`</td>
<td>Visible in `innerHTML`</td>
</tr>
<tr>
<td colspan="2">Standard DOM properties and attributes are synchronized, custom are not.</td>
</tr>
<tr>
<td colspan="2">Attributes are mixed with properties and screwed up in IE&lt;8, IE8 compat. mode.</td>
</tr>
</table>

If you want to have custom attributes in HTML, remember that `data-*` attributes are valid in HTML5. See <a href="http://dev.w3.org/html5/spec/Overview.html#custom-data-attribute">Custom data attributes</a> section of HTML5 standard.

In real life, in 98% of cases DOM properties are used.

You should use attributes in only two cases:
<ol>
<li>A custom HTML attribute, because it is not synced to DOM property.</li>
<li>To access a built-in HTML attribute, which is not synced from the property, and you are sure you need the attribute. 
For example, `value` in `INPUT`.</li>
</ol>

