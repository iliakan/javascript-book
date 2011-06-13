
# Using document.write 

The `document.write` methods outputs a string directly into page.

This is one of most ancient methods of appending to a document. It is very rarely used in modern web applications, but still it <i>has</i> it's special place.

=Cut


## How `document.write` works   

<b>When document is loading, a script may `document.write(text)`</b> into the document. The `text` will be rendered same way as if it were in HTML.

See the example below:

[html run height=80]
...

<script>
  document.write('<i>Hello, there!</i>')
</script>
...
[/html]

<b>There are no restrictions on the contents of `document.write`</b>. It doesn't have to output valid tags, close them or anything.

In the example below, each `document.write` outputs a piece of text which is appended to the page.
[html run height=80]
<script> document.write('<style> td { color: #F40 } </style>') </script>
<table>
  <tr>
  <script> document.write('<td>') </script>
   The sun is rising, and I'm happy to welcome it.
  <script> document.write('</td>') </script>
  </tr>
</table>
[/html]

There is also a variation named `document.writeln(text)` which appends '\n' after the `text`.


## Open document only   

There is only one restriction on `document.write`.

[sum]Both `document.write` and `document.writeln` method should output text into an unready (open) document.[/sum]

When the page finishes loading, the document becomes <i>closed</i>. An attempt to `document.write` in it will cause the contents to be erased. 

[warn header="XHTML and document.write"]
Mozilla uses <i>XML mode</i> of parsing for any document served with `Content-Type: application/xhtml+xml`. 

In this mode, the browser parses the document as XML which is a fast and cool, but due to technical restrictions of such parsing, the `document.write` won't work. 
[/warn]


## The benefits and uses   

In most cases, it is preferred to use DOM for modifications, because it is convenient, and there is `innerHTML`, which is almost the same.

But `document.write` is the fastest way to add a script-generated text into the page. 

Also, it is used to insert advertising scripts and counters:
[html]
<script>
  var url = 'http://ads.com/buyme?rand='+Math.random()
  document.write('<script src="'+url+'"></scr'+'ipt>')
</script>
[/html]

<ul>
<li>
A script URL is generated dynamically, to allow user-specific data may be added to the URL, like screen resolution and other stuff available from JS. 
</li><li>
Adding a random value prevents caching even for a force-caching proxy.
</li><li>
Note that the closing <code>&lt;/SCRIPT&gt;</code> is split. Otherwise browser would think that the script finishes right at that <code>&lt;/SCRIPT&gt;.
</li></ul>

<b>That's convenient, but a bad way, because loading a script may block the rest of page from rendering. Especially, a problem when the ads server is slow.</b> 

Think thrice before inserting a third-party script into HTML.

There is a better way which doesn't block the page. Use the DOM, create <code>SCRIPT</code> element and append it to HEAD. 

[js]
var script = document.createElement('script')
script.src = 'http://ads.com/buyme?rand='+Math.random()

// now append the script into HEAD, it will fetched and executed
document.documentElement.firstChild.appendChild(script)
[/js]

Using DOM doesn't block the page and makes the page faster and safe from third-party lags.


## Summary   

The `document.write` (or `writeln`) allows to output a text directly into HTML. It deletes (<i>reopens</i>) the whole document if called after page loading.

The advantages of `document.write` are:
<ol>
<li>It can append arbitrary, even partial, incomplete and malformed HTML into document.</li>
<li>It is very fast, because the browser doesn't have to modify an existing DOM structure.</li>
</ol>

[sum]
Sometimes the scripts are added by the `document.write`. Don't use this method, as the rest of the page will await for script loading and execution. 

If the remote server hands up, the page will may take too much to load. And, anyway, why should the page wait for the remote server? 

Try to replace `document.write` with DOM methods, if remote architecture allows that.
[/sum]

