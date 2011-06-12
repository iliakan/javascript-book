
# createTextNode vs innerHTML 

There's an <i>empty</i> DOM node `elem`. What's the difference?
[js]elem.appendChild(document.createTextNode(text))[/js]
versus
[js]elem.innerHTML = text[/js] 

=Solution

`createTextNode` escapes node content.

Compare the two examples.
<ul>
<li>`createTextNode` makes text <code>'&lt;b&gt;tag&lt;/b&gt;'</code>:
[html run height=auto]
<div></div>
<script>
  var text = '<b>tag</b>'

  var elem = document.body.children[0]
  elem.appendChild(document.createTextNode(text)) 
</script>
[/html]
</li>
<li>`innerHTML` assigns HTML <code>&lt;b&gt;tag&lt;/b&gt;</code>:
[html run height=auto]
<div></div>
<script>
  var text = '<b>tag</b>'

  var elem = document.body.children[0]
  elem.innerHTML = text
</script>
[/html]
</li>
</ul>


