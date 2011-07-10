# Basic DOM Node properties 

A DOM node is an object with properties containing information about node itself and its contents. Some of the properties are read-only, and some can be updated on-the-fly.

=Cut


## Structure and content properties   


### `nodeType`   

All nodes are typed. There are totally 12 types of nodes. described in <a href="http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-1950641247">DOM Level 1</a>.

[js]
interface Node {
  // NodeType
  const unsigned short      ELEMENT_NODE       = 1;
  const unsigned short      ATTRIBUTE_NODE     = 2;
  const unsigned short      TEXT_NODE          = 3;
  const unsigned short      CDATA_SECTION_NODE = 4;
  const unsigned short      ENTITY_REFERENCE_NODE = 5;
  const unsigned short      ENTITY_NODE        = 6;
  const unsigned short      PROCESSING_INSTRUCTION_NODE = 7;
  const unsigned short      COMMENT_NODE       = 8;
  const unsigned short      DOCUMENT_NODE      = 9;
  const unsigned short      DOCUMENT_TYPE_NODE = 10;
  const unsigned short      DOCUMENT_FRAGMENT_NODE = 11;
  const unsigned short      NOTATION_NODE      = 12;
   
  ...
}
[/js]   

<b>The most important ones are `ELEMENT_NODE` with number 1 and `TEXT_NODE`, which has number 3.</b> Other types are rarely used.

For example, to list all nodes skipping non-elements, one can iterate over `childNodes` and use `childNodes[i].nodeType != 1` check.

That is demonstrated in the example below:

[html run]
<body>
  <div>Allowed readers:</div>
  <ul>
    <li>John</li>
    <li>Bob</li>
  </ul>
 
  <!-- a comment node -->

  <script>   
     var childNodes = document.body.childNodes
     for(var i=0; i<childNodes.length; i++) {
*!*
       if (childNodes[i].nodeType != 1) continue
*/!*
       alert(childNodes[i])
     }
  </script>
</body>
[/html]

[task src="task/nodetype-test.md"]


### `nodeName`, `tagName`   

Both `nodeName` and `tagName` contain the name of an element node. 

For `document.body`:
[js run]
alert( document.body.nodeName )   // BODY
[/js]

<b>In HTML any `nodeName` is uppercased, no matter which case you use in the document.</b>

[smart header="When the `nodeName` is not uppercased"]
That's a rare, exceptional case when `nodeName` is not uppercased. Read on only if you're curious.

As you probably know, a browser has two modes of parsing: HTML-mode and XML-mode. Usually, HTML-mode is used, but XML documents, received via `XMLHttpRequest` (an AJAX technique), XML-mode is enabled.

In Firefox, the XML-mode is also used when XHTML documents have xmlish Content-Type.

In XML-mode `nodeName` preserves case, so there may appear "body" and "bOdY" `nodeNames`.

So, if one loads XML from the server with `XMLHttpRequest` and transfer XML nodes into the HTML document, the case will be kept "as is".
[/smart]

For element nodes, `nodeName` and `tagName` are the same.

But `nodeName` property also exists on non-element nodes. It has special values on such nodes, like in the example below:
[js run]
alert(document.nodeName) // #document
[/js]

The `tagName` property is undefined on most node types and equals `'!'` for comment nodes in IE. 

So, generally `tagName` is less informative than `nodeName`. But it is one-symbol shorter. So, if you are working with node elements only, feel free to prefer it over `nodeName`.


### `innerHTML`   

The `innerHTML` property is a part of HTML 5 standard, see <a href="http://www.w3.org/TR/html5/embedded-content-0.html">embedded content</a>.

It allows to access node contents in the text form. The example below will output all contents from `document.body` and replace it by a new one.

[html run]
<body>
  <p>The paragraph</p>
  <div>And a div</div>
  <script>
    alert( document.body.innerHTML ) // read current contents
    document.body.innerHTML = 'Yaaahooo!' // replace contents
  </script>
</body>
[/html]

The `innerHTML` should contain a valid HTML. But usually the browser can parse malformed HTML as well.

The `innerHTML` property works for any element node. It's very, very useful.


### `innerHTML` pitfalls   

The `innerHTML` is not as simple, pink and puffy as it seems. There is a number of pitfalls waiting for a newbie, and sometimes even an experienced programmer.

[warn header="Read-only `innerHTML` for tables in IE"]
In Internet Explorer, <a href="http://msdn.microsoft.com/en-us/library/ms533897.aspx">innerHTML</a> is read-only for `COL, COLGROUP, FRAMESET, HEAD, HTML, STYLE, TABLE, TBODY, TFOOT, THEAD, TITLE, TR`. 

<b>In IE, `innerHTML` is read-only for all table tags except `TD`</b>.
[/warn]

[warn header="`innerHTML` can't be appended"]
Syntactically, is possible to append to innerHTML with `elem.innerHTML += "New text"`, like below:

[js]
chatDiv.innerHTML += "<div>Hi <img src='smile.gif'/> !</div>"
chatDiv.innerHTML += "How you doing?"
[/js]

But what actually is done:
<ol>
<li>Old content is wiped</li>
<li>The new value `innerHTML` is parsed and inserted.</li>
</ol>

The content is not appended, it is re-created. So, <b>all images and other resources will be reloaded after `+=`,</b> including the `smile.gif` in the example above.

Fortunately, there are other ways to update content, which make no use of  `innerHTML` and don't have that issue.
[/warn]




### `nodeValue`   

The `innerHTML` works only for element nodes. 

For other types of nodes, there is a `nodeValue` property, which keeps the content.

The example below demonstrates how it works for text nodes and comments:

[html run height="50"]
<body>
  The text
  <!-- A comment -->
  <script>
    for(var i=0; i<document.body.childNodes.length; i++) {
      alert(document.body.childNodes[i].nodeValue)
    }
  </script>
</body>
[/html]

In the example above, few alerts are empty, just because of whitespace text nodes. Also note, that `nodeValue === null` for `SCRIPT`. That's because `SCRIPT` is an element node. For element nodes, use `innerHTML`.


## Summary   

<dl>
<dt>`nodeType`</dt>
<dd>Type of the node. Most notable types are `1` for elements and `3` for text nodes. Read-only.</dd>
<dt>`nodeName/tagName`</dt>
<dd>Tag name in upper case. The `nodeName` also has special values for non-element nodes. Read-only.</dd>
<dt>`innerHTML`</dt>
<dd>Content of an element node. Writeable.</dd>
<dt>`nodeValue`</dt>
<dd>Content of a text node. Writeable.</dd>
</dl>

DOM Nodes also have other properties, depending on the tag. For example, an `INPUT` element has `value` and `checked` properties, `A` has `href` etc.

