
# More references in forms and tables 

DOM forms, tables, selects and other elements contain additional links to simplify navigation.

They are useful to keep the code shorter and smarter.

=Cut


## Table   

A table references it's <i>rows</i>, and rows reference <i>cells</i>:

[html run height=100]
<table>
  <tr> <td>one</td>   <td>two</td>  </tr>
  <tr> <td>three</td> <td>four</td> </tr>
</table>

<script>
var table = document.body.children[0]

alert(table.*!*rows*/!*[0].*!*cells*/!*[0].innerHTML) // "one"
</script>
[/html]

The `rows/cells` collection become even more convenient when a table can contain another table. In this case `outerTable.getElementsByTagName('TD')` would return cells from inner tables, which we may not need. Properties `table.rows/row.cells` only reference this exactly table.


The specification: <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-64060425">HTMLTableElement</a> and <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-6986576">HTMLTableRowElement</a>.



## Form   

<ul>
<li>A form is available by it's name or index in `document.forms[name/index]`.</li> 
<li>The `form.elements[name/index]` property references it's elements.</li>
</ul>

[img src="/assets/browser/dom/form.png"]

For example:
[html run height=40]
<body>
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
var form = document.forms.my // also document.forms[0]

var elem = form.elements.one  // also form.elements[0]

alert(elem.value) // "one"
</script>
</body>
[/html]

Multiple elements with <i>same name</i> are also accessible.
The corresponding `elements[name]` returns a collection in this case:

[html run height=40]
<body>
<form>
  <input type="radio" name="*!*age*/!*" value="10">
  <input type="radio" name="*!*age*/!*" value="20">
</form>

<script>
var form = document.forms[0]

var elems = form.elements.age

alert(elems[0].value) // 10
</script>
</body>
[/html]

References do not depend on nesting. An element can be burried deep inside the form, but still available directly using `form.elements`.

The specification: <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-40002357">HTMLFormElement</a>.

[warn header="`form.name` also works, but bugs"]
Form elements can be accessed like `form[index/name]`.
 
It works in all browsers. But in Firefox, when you remove the element, it still can be accessed as `form[name]`:

[html run height=40]
<form name="f"> <input name="text"> </form>

<script>
var form = document.forms.f
var input = form.text // input

form.removeChild(input) // remove input

alert(form.elements.text) // => undefined (correct)
*!*
alert(form.text) // => element, still accessible in Firefox!
*/!*
</script>
[/html]

In the example above, an element is removed, but `form[name]` still references it. So, generally it's more reliable to use longer `form.elements[name]` syntax.
[/warn]



## Form elements   

Form elements reference their form as `element.form`.


[html run height=40]
<body>
<form>
  <input type="text" name="*!*surname*/!*">
</form>

<script>
var form = document.forms[0]

var elem = form.elements.surname

alert(elem.form == form) // true
</script>
</body>
[/html]

See also the specification about <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-6043025">HTMLInputElement</a> and other element types.


### Select   

A `SELECT` element provides access to it's options:

[html run height=40]
<form name="form">
  <select name="genre">
    <option name="blues" value="blues">Soft blues</option>
    <option name="rock" value="bock">Hard rock</option>
  </select>
</form>

<script>
var form = document.body.children[0]

alert(form.elements['genre'].options[0].value) // blues
</script>
[/html]

As with `elements`, we can use both name: `options['blues']` and index: `option[0]`.

The `SELECT` also provides `selectedIndex` property which keeps the index of the selected option. Useful if the select is not multiple.

The example below demonstrates how to get a selected value:
[html run height=40]
<form name="form">
  <select name="genre">
    <option name="blues" value="blues">Soft blues</option>
    <option name="rock" value="rock">Hard rock</option>
  </select>
</form>

<script>
var form = document.forms.form

var select = form.elements.genre
var value = select.options[select.selectedIndex].value

alert(value) // blues
</script>
[/html]

The specification: <a href="http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-94282980">HTMLSelectElement</a>.



## Summary   

<dl>
<dt>`TABLE`</dt>
<dd>Direct access to rows and cells.</dd>
<dt>`FORM`</dt>
<dd>Forms are in <code>document.forms[name/index]. Elements are in <code>form.elements[name/index]</code>.</dd>
<dt>`SELECT`</dt>
<dd>Direct access to options by `select.options[name/index]`. The index of the selected option: `select.selectedIndex`.</dd>
</dl>

These methods are very convenient compared to general DOM searching machinery.

