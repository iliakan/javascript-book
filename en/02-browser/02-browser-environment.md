
# Browser environment 

The browser kindly provides us with a hierarchy of objects which we can use to control it and access various information about time, screen, page, elements on it etc.

=Cut


## The global structure   

Browser provides a large hierarchy of objects to control it. You can see a part of it below.

[img src="/assets/browser/JSTop.png"]

On the top is the `window`, also called global object.

All other objects form 3 groups. 

<dl>
<dt style="color:#002061">Document Object Model (DOM)</dt>
<dd>`document` and related objects allow to access contents of the page, modify elements etc. Most interaction with HTML is handled here.

There is a pack of standards for DOM, developed by W3C. You can find it at <a href="http://www.w3.org/DOM/DOMTR">W3C DOM</a> page. As of now, three levels of DOM exist, a next one extends the lower version. Modern browsers also support pre-W3C features from browser dark-ages, called DOM 0.</dd>
<dt style="color:#008100">Browser Object Model (BOM)</dt>
<dd>BOM is a pack of objects that allow to control the browser, e.g change current URL, access frames, do background requests to server with XMLHttpRequest etc. Functions like `alert,confirm,prompt` also belong BOM, they are provided by the browser.

Many BOM features are standartized in HTML5, but not all.
</dd>
<dt style="color:#c20000">JavaScript objects and functions</dt>
<dd>JavaScript itself is a language which gives us access to DOM, BOM and provides objects and functions of its own.

JavaScript follows the ECMA-262 standard.
</dd>
</dl>

The global `window` object mixes browser window functionality (methods `focus()`,`open()` etc) with being a JavaScript global object. That's why it is both green and red.


## Summary   

The information is theoretical, but the terms are always good to know.

More than that, they are not just good to know, it is advisable that you read DOM and other standards in the mean time. It helps in complex situations and serves general educational purposes :).

And, by the way, the components can be used separately. 

<ul>
<li>JavaScript is a general purpose language, you can use it in command line, build a <a href="http://nodejs.org">Node.JS-based server</a> in it.</li>
<li>BOM and DOM can be controlled by an external program or a plugin, using browser API, not just with JavaScript. E.g <a href="http://seleniumhq.org/docs/09_webdriver.html">Webdriver</a> unit-testing framework works like that.</li>
<li>DOM is also used for XML documents, not just HTML, and of course not limited to frontend programming.</li>
</ul>

