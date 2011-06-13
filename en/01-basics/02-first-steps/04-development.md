
# Browser Developer's Tools 

By default, browsers hide JavaScript errors. Right, a visitor doesn't want to know about them, if he isn't into JavaScript.

For develpers, there are great tools to see errors and debug scripts, in all major browsers.

=Cut


## Firefox   

To develop in firefox, there is a tool named Firebug. 


### Install   
Grab it at:
<ol>
<li><a href="http://getfirebug.com">http://getfirebug.com</a></li>
</ol>

Install it and restart the browser.

Firebug should show up in the right-bottom corner of the browser: 

[img src="/assets/intro/error/firebug-gray.png"]


### Open and enable Console   

Click on the bug icon to open Firebug.

The Console functionality is initially disabled, so we need to click and enable it:

[img src="/assets/intro/error/firebug-console-gray.png"]


### Enter the buggy page   

Make sure Firebug is open, and then visit a buggy page: <a href="/files/tutorial/intro/error/bug.html">bug.html</a>.

You can see it's source by pressing Ctrl-U or going to menu <code>View -&gt; View Source</code>.

Firebug Console should show you the error:
[img src="/assets/intro/error/firebug-bug.png"]

Obviously, there is no variable or function `lalala`. 

Click on it to get to the source code. Enable the panels you need. Enjoy.

P.S. Firebug also opens on F12 


## Internet Explorer   

In IE starting with version 8, there is a similar native debugger, disabled by default.


### Enable Debugging   

Go to menu Tools -&gt; Internet Options:

[img src="/assets/intro/error/ie-options.png"]

Switch to `Advanced` tab and scroll until you see <i>checked</i> `Disable Script Debugging` item. Uncheck it:

[img src="/assets/intro/error/ie-options2.png"]


### Try it   

Now, visit the buggy page: <a href="/files/tutorial/intro/error/bug.html">bug.html</a>.

A window should open suggesting you to start debugging. Press "Yes" and enjoy.

[img src="/assets/intro/error/ie-bug.png"]


## Other browsers   


### Google Chrome   

Go to menu <code>Tools -&gt; Developer Tools</code>.

[img src="/assets/intro/error/chrome.png"]


### Safari   

In Safari, you should first enable the Develop Menu. 

Go menu `Preferences`, tab `Advanced`:

[img src="/assets/intro/error/safari.png"]

Check the "Show Develop menu" option.

Then you need to enable menu in <code>Preferenes -&gt; Show Menu bar</code>.

Now the tools become available through the Menu bar, under `Develop` item:

[img src="/assets/intro/error/safari-develop.png"]


### Opera   

In Opera, you need to enable `Show Menu bar` first. The developer tools are called "Opera Dragonfly" and available under <code>Tools -&gt; Advanced</code> menu:

[img src="/assets/intro/error/opera.png"]


### IE&lt;8   

For IE&lt;8, there is Microsoft Script Debugger, available in several flavours:
<dl>
<dt>MS Office</dt>
<dd>Doesn't install by default, you have to check the option when instaling MS Office, search it under Script Editor.</dd>
<dt>MS Visual Studio</dt>
<dd>The debugger is available if web-development components are installed. No need to install C# etc.</dd>
<dt>MS Script Debugger Express</dt>
<dd>A piece of crap.</dd>
</dl>

<b>Visual Studio is the best option for IE&lt;8.</b>

Also, there is <a href="http://www.microsoft.com/downloads/en/details.aspx?FamilyID=95e06cbe-4940-4218-b75d-b8856fced535">Internet Explorer Developer Toolbar</a> for page inspection. You'll need it for IE7 and (oh) IE6.

