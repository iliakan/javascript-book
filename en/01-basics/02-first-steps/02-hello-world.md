
# Hello, World! 

JavaScript is an interpreted language. That means: no compilation. You just write code and attach it to HTML.

The simplest way is to put JavaScript directives into `SCRIPT` tag somewhere inside the page.

=Cut

Here is a `SCRIPT` tag containing single JavaScript statement. Please click the 'Show' button to see the example.

[html run height=100]
<!DOCTYPE HTML>
<html>
<body>

  <p>Header...</p>

  <script>
    alert('Hello, World!')
  </script>

  <p>...Footer</p>

</body>
</html>
[/html]

Note that contents of the `SCRIPT` block is not shown, instead, it is executed.

This example makes use of following elements:

<dl>
<dt><code>&lt;script&gt; ... &lt;/script&gt;</code></dt>
<dd><code>&lt;script&gt;</code> tag tells browser that there is executable content inside. In older HTML standard, namely HTML4, a special attribute `type` was required. Although more up-to-date HTML5 makes it optional.

Browser:
<ol>
<li>Starts showing the page, shows `Header`</li>
<li>Switches to JavaScript mode inside this tag and executes the contents of <code>&lt;script&gt;</code></li>
<li>Returns back to HTML-mode and continues with the page, outputs `Footer`.</li>
</ol>
</dd>
<dt>`alert(...)`</dt>
<dd>Outputs a message window on the screen and awaits until visitor presses OK</dd>
</dl>

Not only reading, but actually testing and doing something on your own is very important. Below you can see a "check yourself" block. It contains a task and the solution.

Fulfil the task to ensure you got eveything right. 

[task src="task/alert.md"]

On next pages we'll go deeper into the examples and basic script building blocks.

