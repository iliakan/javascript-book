
# Overview: JavaScript, Flash, Java, Silverlight and ActiveX 

Let's see what's so special in JavaScript, why JavaScript and what other useful  technologies exist besides it.

=Cut


## What is JavaScript?   

<b>JavaScript is a scripting language, created for making html-pages live</b>. It turns the web into something more powerful than just interlinked html pages.

JavaScript has nothing in common with Java. It is a completely different language with a similar naming. JavaScript has the language specification called <a href="http://en.wikipedia.org/wiki/ECMAScript">ECMAScript</a>.

Programs in JavaScript are called <i>scripts</i>. They need no compilation, you just write a script, append it to HTML-page and it works. 

Some people say JavaScript is like Python, some find it similar to Ruby or Self. The truth is that JavaScript is on its own, a really elegant but specific language.


## What JavaScript can do?   


<ul>
<li>Modify HTML page, write text in it, add or remove tags, change styles etc.</li>
<li>Execute code on events: mouse clicks and movements, keyboard input, etc. </li>
<li>Send requests to server and load data without reloading of the page. This technology is often called &quot;AJAX&quot;.</li>
<li>Get and set cookies, ask for data, output messages...</li>
<li>...And much, much more!</li> 
</ul>

Modern JavaScript is a generic language. It is not browser-only. There are console programs and server <a href="http://nodejs.org">Node.JS</a> written in JavaScript. In this tutorial we're talking about in-browser JavaScript only.


## What JavaScript can't do?   

JavaScript is a generic language, fast and powerful. 

But execution in browser context implies certain security limitations.

That's because you surely don't want a web-page script to execute with your privileges: read/write on hard disk, install software etc. The script must have strict security limitation not to harm your system, so you can open the page and feel safe. There are non-standard mechanisms of "signing" JavaScript, but not widely supported yet.

<b>Most JavaScript abilities are limited by browser window.</b>

[img src="/assets/intro/jslimit.jpg"]

<ul>
<li>JavaScript can't read/write to hard disk, copy files and call other programs. It doesn't have direct access to the OS. Newer browsers provide such abilities, but in a very limited and secure way.</li>
<li>JavaScript in one tab can't affect other tabs/windows. There are exceptions, namely when two windows come from same domain.</li>
<li>A page with JavaScript can do network requests on it's own domain without limitations. A request to another domain is also possible, but security measures apply.</li>
</ul>


## What's so cool in JavaScript?   

There are at least <i>three</i> killing points about it.

<ol class="balance">
<li class="list-plus">Full integration with HTML/CSS</li>
<li class="list-plus">Simple things can be done simply</li>
<li class="list-plus">Supported by all browsers and enabled by default</li>
</ol>

The mix of the advantages cannot be found in any of other technologies.

Also, remember that JavaScript is alive, under constant development. New features are coming, the modern ECMAScript standard brings nice features, new JavaScript engines work better and faster.


## Trends in JavaScript. HTML5.   

When you plan to study a technology, say <i>invest your time</i>, it is always good to overview the trends.

Besides the modern ECMAScript specification, which enhances the language itself, the browsers-makers are adopting features from HTML 5. That's a related standard, or more precisely a pack of standards, containing many features which people have been wanting for ages.

Just a few:
<ul>
<li>Reading/writing files on visitor's disk (with proper security to keep it safe).</li>
<li>A database embedded into the browser, which allows to store data on client side.</li>
<li>Multithreading (can use multiple CPUs).</li>
<li>Video playback.</li>
<li>Drawing 2d and 3d, with hardware acceleration, just like in modern games.</li>
</ul>

Most topics of HTML5 are still in "draft" stage, but browsers tend to adopt them.

The title "HTML5" is a bit misleading. As you saw, the new standard is not just about HTML, but about interaction and advanced browser features.

[sum]The trend is: JavaScript is enhancing its abilities. It is becoming more and more powerful, trying to reach desktop apps.[/sum]

Modern browsers improve their engines to achieve higher JavaScript execution speed. They also fix bugs and try to follow the standard.

[sum]The trend is: JavaScript is becoming faster and more stable.[/sum]

It is also very important that new standards HTML5 and ECMAScript 5/6 are mostly compatible with older standards. That means they don't break existing apps.

Well, to be sincere, there is a minor problem with HTML5, named "Browsers run too fast". Sometimes browsers adopt a feature which is in not fully described in the standard (draft stage), just because it is so cool they can't wait. 

But then, with time, the standard evolves and changes, so browsers have to reimplement or correct the feature. This breaks the code which relied on the earlier version. So we'd better think twice before using such draft-stage solutions. This mainly refers to an advanced stuff.

[sum]The trend is: things are going to be compatible.
Of course as far as we don't use browser-specific features or early-adopted draft sections of a standard.
[/sum]



## Alternative technologies   

Abilities of JavaScript in certain areas are limited. That's why alternative technologies are used.

The point is: all of them play really well with JavaScript. Sometimes, a task can't be solved by JavaScript, but there are possibilities to use JavaScript + Java or JavaScript + Flash or drop in ActiveX. 


### Java   

As you already know, JavaScript is not Java. In fact, they don't have much in common besides a name. Java is a different language that allows to write applets and embed them into HTML-page.

<b>A Java applet is a program for a browser just like an executable file.</b> A programmer writes it in Java, then compiles and puts a link on it into HTML. A browser then opens a page, finds the reference to an applet, downloads and executes it (if Java is enabled).

An important difference between a Java applet and JavaScript is their abilities. 

<ul class="balance">
<li class="plus">Java can do <i>everything</i>, just like an installed  executable. For security, an unsafe action requires visitor's confirmation.</li>
<li class="plus">Java development is easier: IDEs are cool.</li>
<li class="minus">Java takes more time to load and is heavy to start running.</li>
<li class="minus">Java needs to be installed and enabled.</li>
<li class="minus">Java is not integrated with HTML page, it runs in a separate container within the page.</li>
</ul>


### Adobe Flash   

Adobe Flash initially appeared as a cross-browser platform and language for multimedia, for making web alive with animation, audio and video. But there are other interesting features in Flash.

<b>A <i>flash movie</i> is a compiled program, written in ActionScript</b>, usually bundles with images and other resources. 

<ul class="balance">
<li class="list-plus">Great stuff for networking (sockets, UDP for P2P)</li>
<li class="list-plus">Support for complex multimedia: images, audio, video is must more advanced compared to HTML5. Camera and microphone are here too.</li>
<li class="list-plus">Comfortable IDE for Flash, no browser incompatibilities.</li>
<li class="minus">Flash has to be installed and enabled.</li>
<li class="minus">Flash is not integrated with HTML page, it runs in a separate container within the page.</li>
<li class="minus">Security limitations on Flash are almost as strict as on JavaScript.</li>
</ul>

As of now, there is a high pressure on Flash monopoly in many areas of it's use. For example, HTML5 provides means for browser to play video, draw, etc. Browsers which implement HTML5 stuff don't require Flash to do such things. And most browsers really go forward in making HTML5 features work.
 

But <b>both Java and Flash functions can call JavaScript and vice versa</b>, so usually a site uses mostly JavaScript, but also Java/Flash in places where JavaScript can't cope.


### ActiveX, browser plugins/extensions   

ActiveX is a great, but IE-only thing. It allows to write a program in C language which integrates with the page <i>if the visitor allows</i>.

<ul class="balance">
<li class="plus">Integrated with HTML/CSS</li>
<li class="plus">Written in C, hence very fast and featured.</li>
<li class="plus">Can do <i>everything</i> if the visitor allows it to install.</li>
<li class="minus">Internet Explorer only. Chrome has partial support that has to be enabled.</li>
<li class="minus">Development of ActiveX is difficult.</li>
</ul>

Programs on Windows provide interfaces which can be used by ActiveX. So, a page can call Microsoft Word, or load a document into Excel, etc. 

Other browsers allow to write plugins and extensions using NPAPI.

Personally, I'm not a Microsoft fan. But I saw great applications done with ActiveX, and I <i>can</i> understand why people are using it and bind themselves to Windows/IE.



### Other technologies: Silverlight, XUL, VBscript   

These technologies are much less widespread.

<ul>
<li><strong>XUL</strong> is a language for interfaces, useful if you only write for Mozilla browsers or making extensions to Firefox. Also used for desktop applications. 
</li><li>
<strong>Silverlight</strong> is an Adobe Flash competitor from Microsoft based on .NET. It runs best on Windows, the cross-platform support improves gradually time. Mostly used for Windows-based applications and intranet.
</li><li>
<strong>VBscript</strong> is an outdated attempt of Microsoft to do a JavaScript-like language based on Visual Basic. It is not being developed, VBScripts lack many abilities of JavaScript and hence are almost not used in  modern web programming.
</li></ul>


## Summary   

JavaScript is unique because it is a wide-spread and it's integration with HTML/CSS is best.

JavaScript has the bright and more-or-less compatible future.

But a good JavaScript programmer should keep other technologies in mind too. For example, Flash, Java have their own unique features. They are able to call JavaScript functions and vice versa.

So there are tasks which can be solved using a combinations of JavaScript + Flash, JavaScript + Java.

Examples are: selecting uploading multiple files at once (Flash), using camera and microphone (Flash), doing complex multimedia and graphics, including calculations (Flash, Java) and much more. You'll meet them on your way.

