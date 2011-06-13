
# Adding a script to HTML 

A script can be put anywhere on the page. The most useful places include:
<ul>
<li>`HEAD` of the document</li>
<li>At the bottom of the document, right before closing `BODY`</li>
</ul>

=Cut

..But, generally, a script can be put anywhere.

When browser is rendering a HTML-page and meets <code>&lt;script&gt;</code> - it switches into JavaScript-mode, executes the code and after it continues with the rest of the page.


## Page rendering and `SCRIPT`   

The following example demonstrates how browser switches in-out JavaScript mode.

[html run src="/assets/browser/script/rabbits.html" link][/html]


Note the order of execution in the example above:
<ol><li>When the page starts rendering, only the beginning of the document is shown.</li>
<li>Browser meets a script and runs it, executing `alert` 3 times, and then.</li>
<li>After the script is complete, the browser returns to HTML, and <i>only then</i> the rest of the page is shown.</li>
</ol>



## Moving scripts into `HEAD`   

The HTML may be large, where to put JavaScript? If you want a script to execute early, before the page is displayed, then the `HEAD` section is a good place. 

[html run height=100]
<html>
  <head>
    *!*
    <script>
      function count_rabbits() {
        for(var i=1; i<=3; i++) {
          alert("Rabbit "+i+" out of the hat!")
        }
      }
    </script>
    */!*
  </head>

  <body>
  
    
### Press the button to start   

    <input type="button" onclick="count_rabbits()" value="Count rabbits!"/>

  </body>

</html>
[/html]

Putting scripts into `HEAD` is a common and easy practice, but highly optimized sites use another method.


## Scripts at the end of `BODY`   

A script can also be at the bottom of page body. In this case it executes after the page is shown. 

<ul class="balance">
<li class="plus">Good, because user doesn't have to wait for scripts. </li>
<li class="minus">Bad, because the functions become available <i>after</i> the page is loaded. So, a user has a chance to click on not-working button. 
That needs to be worked out, usually by special "loading" design pieces, hiding functionality until they are removed by the script.</li>
</ul>


By the way, CSS styles must be declared in the `HEAD` according to HTML standard. Only scripts allow such freedom.


## External scripts   

Usually, most JavaScript code is put into an external file, which is attached to HTML, like this:

[html]
<script src="/path/to/script.js"></script>
[/html]

Here `/my/script.js` is absolute path to script (from current site root). You may also use relative path, or put full URL there.

File `/my/script.js` contains JavaScript code, which will execute immediately after browser recieves the file.

This is very handy replacement for embedded scripts, because same file may be used on many pages. If the web-server is configured correctly, browser will cache the file and will not download it every time.

Here is how it looks like:

[html src="/assets/browser/script/rabbits_ext.html" height=100 link][/html]

Here is the contents of `/files/tutorial/browser/script/rabbits.js`:

[js src="/assets/browser/script/rabbits.js" link][/js]

Note, there are no `SCRIPT` tags inside this file. `SCRIPT` tags are used are only in HTML.

[sum]External scripts block page rendering in same way as embedded scripts do.

So, if an external script is in `HEAD` then page will not be shown until the script is downloaded and executed. [/sum]

<div class="smart"><div class="smart-head">Closing <code>&lt;/script&gt;</code> and XHTML</div>
Note that usually one can't use XML-style self-closing tags like <code>&lt;script src="..."/&gt;</code> even if DOCTYPE XHTML is specified. 

A separate closing <code>&lt;/script&gt;</code> must be present, replacing it with shorter <code>&lt;script src="..."<b>/</b>&gt;</code> doesn't work.

That's if your server uses `Content-Type: text/html` which makes a browser to parse the page in "HTML-mode". 
</div>

To attach several scripts - use several tags:
[html]
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
...
[/html]

[sum]If `src` attribute is present then tag contents is ignored.

That is, one can't attach external file and execute code in single <code>&lt;script&gt;</code>. Two separate tags are needed: first one with `src` for external file, and the second one without `src`, but with the code, which will be executed after that file.

[/sum]

<div class="smart">
<div class="smart-head">Modern markup for the <code>&lt;script&gt;</code> tag.</div>

Nowadays, only a validator (a special tool which checks page for correctness in terms of standards) blames for bad markup. Sometimes people use old ugly code and it works.

Although the right, correct markup is useful to know. At least you will be able to differ between professional JavaScript and outdated crap, written many years ago.

<dl>
 <dt>Attribute <code>&lt;script <u>type</u>=...&gt;</code></dt>

  <dd>The older HTML4 standard required this attribute to be set, but HTML5 allows it to be absent. A correct pre-HTML5 value was `type="text/JavaScript"`.

If you put an unsupported value into `type`, e.g. <code>&lt;script type="<b>text/html</b>"&gt;</code>, the contents will be ignored. It is used as a tricky way to add unshown data to the page. Browser does not execute or show  <code>&lt;script&gt;</code> with unknown type. Such script is like a div with forever `style="display:none"`.
</dd>

 <dt>Attribute <code>&lt;script <u>language</u>=...&gt;</code></dt>
  <dd>You may find this attribute in outdated scripts. It is obsolete and dead. Don't use it for JavaScript.</dd>
<dt>Comments before and after scripts</dt>
<dd>Old manuals and tutorials sometimes recommend to "hide" JavaScript from browsers that don't support it, using HTML-comments: <code>&lt;!-- ... --&gt;</code>. 

The browser which required such tricks (very old Nescape) is dead for a long time. Other browsers ignore comments. Don't put them, there's no need indeed.</dd>
</dl>
</div>
[task src="task/rabbits-offline.md"]


## Summary   

Scripts can be embedded directly using `SCRIPT` or added as external files by a `SCRIPT` with `src="path/to/file.js"` attribute. An external script file is pure JavaScript.

In either way, HTML page rendering is blocked until the script is downloaded and executed.

That's why an advanced technology is to put scripts at the bottom of `BODY`, but in this case a user can start interacting with a page before it is "made alive" by JavaScript. 

Putting scripts in `HEAD` is easy and guarantees that they will be available before the page is shown.

