
# DOM Nodes 

The DOM represents a document as a tree. A parent-child relationship is naturally one tag inside another.

=Cut


## An idea of DOM   

Let's consider the following HTML as the starting point:
[html]
<html>
  <head>
    <title>The title</title>
  </head>
  <body>
     The body
   </body>
</html>
[/html]

The DOM will look like that:

[img src="/assets/browser/dom/simpledom.png"]

At the top level, there is an `html` node, with two children: `head` and `body`, among which only `head` has a child tag `title`.

HTML tags are <i>element nodes</i> in DOM tree, pieces of text become <i>text nodes</i>. Both of them are <i>nodes</i>, just the type is different.

<b>The idea of DOM is that every node is an object. We can take it and change its properties</b>, like this:
[js run]
// change background of the <BODY> element, *!*make all red*/!*
document.body.style.backgroundColor = 'red'
[/js]

If you have run the example above, here is the code to reset the style to default:
[js run]
// revert background of <BODY> to default, *!*put it back*/!*
document.body.style.backgroundColor = ''
[/js]

It is also possible to change node contents, search DOM for certain nodes, create new elements and insert into document on-the-fly etc.

But first of all we need to know what DOM looks like and what it contains.


### Another document   

Let's see the DOM of a more complicated document.

[html]
<!DOCTYPE HTML>
<html>
    <head>
        <title>The document</title>
    </head>
    <body>
        <div>Data</div>
        <ul>
            <li>Warning</li>
            <li></li>
        </ul>
        <div>Top Secret!</div>
    </body>
</html>
[/html]

And here is the DOM if we draw hierarchy in lines.

[img src="/assets/browser/dom/simpledom2.png"]



## Walking DOM using Developer Tools   

It is quite easy to walk DOM using a browser developer tool.
For example:

<ol>
<li>Open <a href="http://JavaScript.info/files/tutorial/browser/dom/simpledom2.html">simpledom2.html</a></li>
<li>Open Firebug or any other developer tool</li>
<li>Go HTML tab in Firebug or Elements in Safari/Chrome or.. whatever.</li>
<li>Here you are.</li>
</ol>

Below is a screenshot from Firebug for the document above. Basically it's layout is same as HTML, plus the minus icon [-] for nodes. 

[img src="/assets/browser/dom/simpledom2_tools.png"]

<b>But the DOM displayed in developer tools is not full</b>. There are elements, which exist in DOM, but not shown in developer tools.


## Whitespace nodes   

Now let's make the picture closer to reality and introduce whitespace text elements. Whitespace symbols in the HTML are recognized as the text and become text nodes. <b>These <i>whitespace nodes</i> are not shown in developer tools, but they do exist.</b>

The following picture shows text nodes containing whitespaces.

[img src="/assets/browser/dom/simpledom2_white.png"]

By the way, note that last `li` does not have a whitespace text tag inside. That's exactly because there is no text at all inside it.

Whitespace nodes are created from spaces between nodes. So they disappear if we elimitate the space between tags.

The example below has no whitespace nodes at all.
[html]
<!DOCTYPE HTML><html><head><title>Title</title></head><body></body></html>
[/html]

<div class="danger"><div class="smart-head">IE&lt;9</div>

IE&lt;9 does not generate tags from whitespaces. That's incorrect, and IE 9 is fixed - it behaves just as described above, same way as other modern browsers do.

But in older IEs, the DOM tree is different from other browsers because of this.
</div>



## Other node types   


### DOCTYPE   
Did you notice a `DOCTYPE` from the example above? That is not shown on the picture, but DOCTYPE is a DOM node too, located at the topmost level to the left from `HTML`. 

Good to know, but <strike>rarely</strike>never used.


### Comments   
Also, a HTML comment is a DOM node too:
[html]
<html>
...
<!-- comment -->
...
</html>
[/html]

The comment above is also stored in DOM tree, with <i>comment node</i> type and textual content. That is important when traversing nodes as we'll see.


## Summary   

Now you should have understanding of DOM structure, how it looks like, which nodes it includes.

The next chapter describes how to traverse it using JavaScript.

