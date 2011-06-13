
# Searching elements in DOM 

Most of time, to react on user-triggered event, we need to find and modify elements on the page.

The `childNodes`, `children` and other helper links are helpful, but they allow to move between adjacent elements only.

Fortunately, there are more global ways to query DOM.

=Cut


## Methods   


### `document.getElementById`   

A fastest way to obtain an element is to query it by `id`.

The following example queries the `document` for a div with `id='info'`. It doesn't matter where is the node in the document, it will be found.

[html run height=50]
<body>
  <div id="info">Info</div>
  <script>
    var div = document.getElementById('info')
    alert( div.innerHTML )
  </script>
</body>
[/html]

Note, there can be only one element with certain `id` value. Of course, you can violate that and put many elements with same ids in the markup, but the behavior of `getElementById` in this case will be buggy and inconsistent across browsers. So it's better to stick to standards and keep a single element with certain id.

If no element is found, `null` is returned.


#### Implicit `id`-valued variables   
All browsers implicitly create a variable for every id. 

For instance, run the following code. It will output "test", because `a` is IE-generated reference to the element.

[html run]
<div id="a">test</div>
<script>
  alert(a)
</script>
[/html]

In Internet Explorer that may lead to errors, see the example below.
[html run]
<div id="a">test</div>
<script>
  a = 5 // (x)
  alert(a)
</script>
[/html]

If you run it <u>in IE</u>, it won't work. Line (x) is erroneous, because:
<ol>
<li>`a` references the `DIV` (it's ok).</li> 
<li>IE-generated referenes can't be overwritten (ah, bad bad!).</li>
</ol>

BUT it <b>will</b> work if you use `var a` instead of just `a`:

[html run]
<div id="a">test</div>
<script>
  var a = 5 
  alert(a) // all fine
</script>
[/html]

Yeah. IE tought us another good practice.. And also, just for fun...

[task src="task/window-windowwindow.md"]



### `document/node.getElementsByTagName`   

This method searches all elements with given tagname and returns an array-like list of them. The case doesn't matter.

[js]
// get all div elements
var elements = document.getElementsByTagName('div')
[/js]

The following example demonstrates how to obtain a list of all `INPUT` tags of the document and loop over results:

[html run height=50]
<table id="myTable">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked/> under 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"/> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"/> older than 60
      </label>
    </td>
  </tr>

</table>

<script>
*!*
  var elements = document.getElementsByTagName('input')
*/!*
  for(var i=0; i<elements.length; i++) {
    var input = elements[i]  
    alert(input.value+': '+input.checked)
  }
</script>
[/html]
 
It is also possible to get a first element by direct referencing:
[js]
var element = document.getElementsByTagName('input')[0]
[/js]
  
There is a way to get all elements by specifying `'*'` instead of the tag:
[js]
// get all elements in the document
document.getElementsByTagName('*')
[/js]



### Limit search by parent element   

<b>`getElementsByTagName` can be called on a document, but also on a DOM element.</b>

The example below demonstrates that by calling `getElementsByTagName` inside another element:

[html run]
<ol id="people">
  <li>John</li>
  <li>Rodger</li>
  <li>Hugo</li>
</ol>
<script>

  var elem = document.getElementById('people')

  var list = *!*elem.*/!*getElementsByTagName('li')
  alert(list[0].innerHTML)

</script>
[/html]

<b>elem.getElementsByTagName('li')</code> finds all `LI` inside `elem`</b>. The element before the dot is called <i>the searching context</i>.


### `document.getElementsByName`   

For elements <u>which support the `name` attribute</u>, it is possible to query them by name. 

In the example above, it was possible to use the code:
[js]
var elements = document.getElementsByName('age')
[/js]


### `document/node.getElementsByClassName`   

This method is supported in all modern browsers excluding IE<9.

It performs a search by class name, not attribute. In particlar, it  understands multiple classes.

The following example demonstrates how it finds an element using one of the classes.

Please use other browser than IE&lt;9 to run it.

[html run height=50]
<div class="a b c">Yep</div>
<script>
alert( document.getElementsByClassName('a')[0].innerHTML )
</script>
[/html]

Like `getElementsByTagName`, it can be called for a DOM element.


### `document/node.querySelector`, `querySelectorAll`   

The methods `querySelector` and `querySelectorAll` allow to select elements by CSS 3 query.

The `querySelector` returns only first element (in tree depth-first walking order), the `querySelectorAll` gets all of them.

They work in all modern browsers including IE8+. There are limitations on IE support:
<ol>
<li>IE8 must be in IE8-mode, not compatibility mode.</li>
<li>It isn't CSS 3, but is CSS 2.1 for IE. That's less powerfull, but fine for most cases.</li>
</ol>

The following query gets all `LI` elements that are last children and have `UL` as direct parent. It will work on IE8, because this site is rendered in IE8-mode.

[html run]
<ul>
  <li>The</li>
  <li>Test</li>
</ul>
<ul>
  <li>Is</li>
  <li>Passed</li>
</ul>
<script>
  var elements = document.querySelectorAll('UL > LI:last-child')

  for(var i=0; i<elements.length; i++) {
    alert(elements[i].innerHTML )
  }
</script>
[/html]

The `querySelector` is a shortcut for `querySelectorAll('...')[0]`.


## XPath in modern browsers   

All modern browsers support powerful <a href="http://www.w3.org/TR/xpath/">XPath queries</a> which is a general DOM-searching tool from the world of XML. Most browsers can run them against HTML either.
 
The following example demonstrates a generic non-IE syntax for finding all `H3` containing 'XPath' using an XPath query:

[js run]
var result = document.evaluate("//h3[contains(text(),'XPath')]", document.documentElement, null,                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

for (var i=0; i<result.snapshotLength; i++) {
    alert(result.snapshotItem(i).innerHTML)
}
[/js]

The only exception is IE(including 9) which supports it for XML document objects only. That's fine for documents loaded from server with `XMLHTTPRequest` (AJAX), but to search in the document, you'll need to explicitly load the page into an XML document object.

In real-life `querySelector` can solve the task in a more convenient way, but it's always good to keep various possibilities in mind. 



## Query results are alive!   

All DOM queries, which may match multiple elements, return an array-like collection with length and indexes. It is also possible too loop over it with `for`, just like an array.

But indexes and the `length` property is actually the only similarities between `Array` and the returned collection of elements which has a special type <a href="http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-536297177">NodeList</a> or <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-75708506">HTMLCollection</a>.

So it doesn't have `push`, `pop` and other properties of JavaScript array.

But instead, this query result is alive for all `getElementsBy*` methods. When you select elements and modify the document - the query result is updated automatically.

The folling example demonstrates how collection length changes when elements are removed.

[html run height=50]
<div id="outer">
  <div id="inner">Info</div>
</div>
<script>
  var outerDiv = document.getElementById('outer')
  var divs = document.getElementsByTagName('div')

  alert(divs.length) 

  outerDiv.innerHTML = '' // clear inner div

  alert(divs.length)
</script>
[/html]

The liveness applies to collections only. If you get a reference to the element, the reference will not become null. For example, the element `elem = document.getElementById('inner')` will persist after the `outer` div is cleared.

Also, `querySelectorAll` is special here. For the sake of performance, it returns a non-live `NodeList`. That's an exception of the general rule.


## Practice   

Consider the following html:

[html src="/assets/browser/dom/searchTask.html"][/html]

Here are the tasks which base on the HTML above.

[task src="task/stylize-labels.md"]
[task src="task/check-inside-table.md"]


### Label links   

[task src="task/label-links.md"]



### Show children count   


[task src="task/tree.md"]


## Summary   

There are 5 main ways of querying DOM:
<ol>
 <li>`getElementById`</li>
 <li>`getElementsByTagName`</li>
 <li>`getElementsByName`</li>
 <li>`getElementsByClassName` (except IE&lt;9)</li>
 <li>`querySelector` (except IE&lt;8 and IE8 in compat mode)</li>
</ol>

All of them can search inside any other element. All of them excepts the last one return live collections.

XPath is kind-of supported in most browsers, but very rarely used.

