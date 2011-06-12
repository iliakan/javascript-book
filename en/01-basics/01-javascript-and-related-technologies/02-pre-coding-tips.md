
# Pre-coding tips  

There are currently several main javascript/html engines available. 

A regular web-site should look equally good in all of them.

=Cut


## Know your enemy: browser types   


<ul>
<li><strong>Firefox</strong> and other less known browsers which use an open-source engine called <i>Gecko</i>.</li>
<li><strong>Safari/Chrome</strong> which both use an open-source rendering engine called <i>Webkit</i>, but different javascript implementations. Chrome uses <i>Google V8</i> and Safari uses it's own closed-source javascript engine. Because they both use Webkit, there's a lot in common between them.</li>
<li><strong>Opera</strong> uses it's closed source engine called <i>Presto</i>.</li>
<li><strong>Internet Explorer</strong> uses the closed-source engine called <i>Trident</i>. The engine is old and terrifying in IE6, IE7, but upgraded in IE8 and upgraded to much better standards compliance in IE9.</li>
</ul>

The terms Gecko, V8, Webkit are widely used in professional talks. Trident, Presto are less used. 

Sometimes, the cross-browser development becomes complicated, so browsers are  graded according to the level of support from A to C.

<dl><dt>A. Latest Firefox, IE, Safari/Chrome</dt>
<dd>Supported ideally.</dd>
<dt>B. Opera, less recent major browsers</dt>
<dd>Supported well enough, but minor drawbacks in look and feel are possible.</dd>
<dt>C. Old major browsers</dt>
<dd>Only the core functionality of the site is supported.</dd>
<dt>D. Very old. Text browsers.</dt>
<dd>Not supported. If it works, it works. If it doesn't, no one cares.</dd>
</dl>

The grading above is an example from real life.


## Choose the modern DOCTYPE   

As you probably already know from HTML, there are two main rendering modes: <i>Standards Mode</i> and <i>Quirks mode</i>. Actually, there is a third mode called <i>Almost Standards Mode</i>, all of them described well in <a href="http://en.wikipedia.org/wiki/Quirks_mode">Wikipedia quirks mode page</a>.

Browser chooses the mode according to `DOCTYPE` header of HTML.

For modern sites there is a good DOCTYPE:
[html]
*!*<!DOCTYPE HTML>*/!*
[/html]

This DOCTYPE make modern browsers render in Standards Mode and older ones in Almost Standards Mode (which is the maximum they can do).

Note, that the modern rendering mode is not just an HTML issue. There are javascript properties which also depend on the rendering mode, especially CSS-box and positioning-related.

Also, styles can be applied differently, for example Internet Explorer 7+ in standards-compliant mode (strict !DOCTYPE), can apply the `:hover` pseudo-class to any element (as it should), while in a non-strict mode it can only apply :hover to links. 

Not using correct DOCTYPE will cost you time debugging. <code>&lt;!DOCTYPE HTML&gt;</code> is ok.


## Resources   


### Manuals and how to search in them   

<b>There are 2 main manuals on the net about javascript.</b> One comes from Microsoft and called <a href="http://msdn.microsoft.com/">MSDN</a>. They also call JavaScript a "JScript".

Another one is documentation center of <a href="https://developer.mozilla.org/">Mozilla Developer Network</a>.

I use the following method of search. When I need to find "RegExp" in Mozilla documentation, I just type <b>"RegExp MDC"</b> in google.

When I want to check MSDN, then "RegExp msdn". Sometimes it helps to add additional "jscript" term: <b>"RegExp msdn jscript"</b>.

MDN is usually good for general and firefox-specific information, while MSDN helps to deal with IE-specific features.


### Incompatibilities   

There are many cross-browser incompatibilities in frontend-programming. When you come across them, <a href="http://www.quirksmode.org/">http://www.quirksmode.org/</a> may be a help.

It contains information about lots of incompatibilities. Also, there is a combo to search it. Try entering <b>"quirksmode onkeypress"</b> in google for instance.


### The ECMAScript specification   

The language specification (formal description of syntax, basic objects and algorithms) of javascript is called <a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">ECMAScript</a>. 

[smart header="Why not just &quot;Javascript&quot; ?"]
You may ask: "Why standard for Javascript is not just <i>Javascript</i>?".

That's because javascript&trade; is a registered trademark of Oracle corporation (used to be Sun trademark, but now Oracle acquired Sun). 

The title "ECMAScript" was choosen to keep the specification independent from trademark owners.
[/smart]

The language specification tells a lot about how it works, but it is an advanced source of information.

Today we live in a time of changes. The modern standard is <a href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">ECMA-262 5th edition (or just ES5)</a>, but browsers are in the process of implementing it.

The old standard is <a href="http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf">ECMA 262 3rd edition (ES3)</a>. It is supported by all major browsers.

When you want to learn how the language works in-depth, there's more perspective in reading ES5, but remember that many features are not implemented yet. You can find a list of supported browsers/features at <a href="http://kangax.github.com/es5-compat-table/">http://kangax.github.com/es5-compat-table/</a>.


### HTML5   

JavaScript is a general-purpose programming language. That's why ECMAScript specification does not tell a word about browsers. 

The browser stuff is described by a family of <a href="http://www.w3.org/TR/html5/">HTML5</a> standards.

The official <a href="http://www.w3.org/DOM/DOMTR">W3.org DOM specifications</a> are large, but extremely valuable. Use them as a reference. 

The searching combo <b>"something site:w3.org"</b> helps for DOM and Events-related questions. 

The only problem with W3 is that it describes how it should be, not how it is. 


## More?   

Please write your general coding tips in comments.

