
# Event delegation  

The <i>event delegation</i> helps to simplify event handling by smart use of bubbling. It is one of the most important JavaScript patterns.

=Cut

[smart header="The delegation concept"]
If there are many element inside one parent, and you want to handle events on them of them - don't bind handlers to each element.

Instead, bind the single handler to their parent, and get the child from `event.target`. 
[/smart]


## The Ba gua example   

For example, here's a <a href="http://en.wikipedia.org/wiki/Ba_gua">Ba gua chart</a>. The ancient Chinese philosophy table. 

Click on the cells. They are highlightable.

[iframe height=350 src="tutorial/browser/events/delegation/bagua/index.html"]

The table contains 9 cells. Each cell has text and `STRONG` tag to format directions: `South`, `North` etc. The source playground is at [play src="/assets/browser/events/delegation/bagua"].

The important point is how highlighting is implemented.

The example uses <i>event delegation</i>. Instead of attaching a handler to each cell, we attach a <i>single handler</i> to the whole table, which uses `event.target` to get the originating element.

[js]
table.onclick = function(event) {
  event = event || window.event
  var target = event.target || event.srcElement
  // ...
}
[/js]

A click can happen on any tag inside the table. For example, on the <code>&lt;STRONG&gt;</code> tag. It then bubbles up:

[img src="/assets/browser/events/bagua.png"]

To find the cell, we need to follow `parentNode` chain:

[js]
table.onclick = function(event) {
  event = event || window.event
  var target = event.target || event.srcElement
  
  while(target != table) { // ( ** )
    if (target.nodeName == 'TD') { // ( * )
       toggleHighlight(target)
    }
    target = target.parentNode
  }
}
[/js]

The code above follows the <i>general delegation scheme</i>:
<ol>
<li>In the handler we can grab the originating `target`. It can be a `TD`, but also any other tag, like `STRONG`. A click can also occur between cells, in this case, the target may be `TR` or a `TABLE`.</li>
<li>We go up to the parent chain until we either meet `TD` or hit the table.</li>
<li>( * ) If we meet `TD` - process it.
( ** ) If we hit the table, it means the click was between table cells or on table caption. Do nothing with it.</li>
</ol>


## The menu example   

Event delegation allows to graciously handle trees and nested menus.

Let's first discuss a one-level clickable menu from the list:

[html]
<ul id="menu">
  <li><a class="button" href="/php">PHP</a></li>
  <li><a class="button" href="/html">HTML</a></li>
  <li><a class="button" href="/JavaScript">JavaScript</a></li>
  <li><a class="button" href="/flash">Flash</a></li>
</ul>
[/html]

The example above is just a semantic HTML/CSS. Clicks on menu elements will be handled by JavaScript, but items are represented as `A` to ensure accessibility for visitors without JavaScript (which are mostly search engines).

The links should become clickable, like in the example below:

[iframe height=50 src="tutorial/browser/events/delegation/menu/index.html"]

[smart header="Mouse over (hover) state"]
Hover state indication in the menu above is implemented with pure CSS. 
As of now, all browsers allow that. IE6 has problems with hover on arbitrary elements, but for `A` tags `:hover` works fine.
[/smart]

With delegation, we can set a single handler on the whole menu:
[js]
document.getElementById('menu').onclick = function(e) {
  e = e || event   
  var target = e.target || e.srcElement 

  if (target.nodeName != 'A') return
    
  var href = target.href
  alert( href.substr(href.lastIndexOf('/')+1) )

  return false // prevent url change
}
[/js]

The code does not ascend the `parentNode` chain, because there are no nested tags inside `A`.

Full source in the playground: [play src="/assets/browser/events/delegation/menu"].


## The nested menu example   

A nested menu has similar semantic structure:
[html]
<ul id="menu">
<li><a class="button" href="/php">PHP</a>
  <ul>
    <li><a href="/php/manual">Manual</a></li>
    <li><a href="/php/snippets">Snippets</a></li>
  </ul>
</li>
<li><a class="button" href="/html">HTML</a>
  <ul>
    <li><a href="/html/information">Information</a></li>
    <li><a href="/html/examples">Examples</a></li>
  </ul>
</li>
</ul>
[/html]

With the help of CSS, second-level `UL` can be hidden until a mouse hovers over outer `LI`.

The nested menu actually causes <i>no changes in JavaScript at all</i>.

[iframe height=110 src="tutorial/browser/events/delegation/menu-nested/index.html"]

Full source in the playground: [play src="/assets/browser/events/delegation/menu-nested"].

We can also add/remove menu items in runtime, `without` any handlers management.

We can even take the menu and replace it's innerHTML with another menu. And it will work fluently. Thanks delegation.

[task src="task/message-hide-delegate.md"]
[task src="task/image-gallery.md"]
[task src="task/catch-links.md"]


## Actions in the markup   

Table cells and nested menu items are the examples of <i>similar elements handling</i>. It worked so well, because actions on children elements were same.

But event delegation can be also used to handle complely different actions. 

For example, we need to create an menu with different buttons: Save, Load, Search etc. 

An obvious solution would be to write a JavaScript code to find each button and bind to it the unique handler.

A smart way is to assign a single handler for the whole `menu`. All clicks inside the `menu` will get into the handler. 

But how it will know which button is clicked and how to handle it? For that purpose, in every button, we put the triggered method name into a custom attribute named `data-action` (could be any name, but `data-*` is valid in HTML5):
[html]
<button data-action="Save">Click to Save</button>
[/html]

The handler reads the attribute and executes the method. See the working demo below:

[html autorun height=auto]
<div id="menu">
  <button data-action="Save">Click to Save</button>
  <button data-action="Load">Click to Load</button>
</div>

<script>
function Menu(elem) {
  this.onSave = function() { alert('saving') }
  this.onLoad = function() { alert('loading') }

  var self = this

  elem.onclick = function(e) {
    var target = e && e.target || event.srcElement
*!*
    var action = target.getAttribute('data-action')
    if (action) {
      self["on"+action]()
    }
*/!*
  }
}

new Menu(document.getElementById('menu'))
</script>
[/html]

Note how the `var self = this` trick is used to keep a reference to the `Menu` object. Otherwise, the handler would be unable to call `Menu` methods, because it's own `this` references the element.

[smart header="data-* attributes"]
HTML attributes starting with `data-...` are valid in HTML5.

There is a <a href="http://dev.w3.org/html5/spec/Overview.html#embedding-custom-non-visible-data-with-the-data-attributes">section in the specification</a> about it. Also, there is an API which helps to manipulate such attributes, but it is not supported by all major browsers yet.

So, as of now, the main idea of using `data-*` attributes is to pass HTML5 validator and be future-compatible.
[/smart]

What did we win by using event delegation here?
<ul class="balance">
<li class="plus">No need to write JavaScript code to assign a handler to each button. Less code, less time spent in initialization.</li>
<li class="plus">HTML structure becomes is really flexible. We can add/remove buttons any time. An action corresponds to `"onMethod"`. Simple.</li>
<li class="plus">The approach integrates with semantic markup. We could use classes "action-save", "action-load" instead of `data-action`. The handler would check for `action-*` class and call the corresponding method. Very convenient indeed.</li>
</ul>



## Summary   

Event delegation is cool. It is one of the most useful JavaScript patterns.

The prerequisite is a single container with elements which allow common handling.

The algorithm:
<ol>
<li>Bind a handler to the container.</li>
<li>In the handler: get `event.target`.</li>
<li>If necessary, climb up the `target.parentNode` chain, until either the first suitable target is found (and handle it), or the container (`this`) is reached. </li>
</ol>

Use-cases:
<ul>
<li>Single handler for similar actions on many children</li>
<li>Simplifies architecture for different actions, if the action can be figured out from the target.</li>
</ul>

Benefits:
<ul class="balance">
<li class="list-plus">Simplifies initialization, saves memory from extra handlers.</li>
<li class="list-plus">Simplifies updates.</li>
<li class="list-plus">Allows to use `innerHTML` without additional processing.</li>
</ul>

Of course, as any pattern, event delegation has it's limits.

<ul class="balance">
<li class="list-minus">First, an event should bubble in IE. Most of events do bubble, but not all of them. For other browsers, capturing phase is also suitable.</li>
<li class="list-minus">Second, delegation in theory puts extra load on the browser, because the handler runs when an event happens anywhere inside the container. So, most of time the handler may do idle loops. Usually it's not a big deal.</li>
</ul>

