
# Hide self 

Create an input button which hides itself when clicked.

Like this:
<input type="button" onclick="this.style.display='none'" value="Click to Hide"/>


=Solution

The solution is to use `this` in the handler to hide the current element.

[html run height=50]
<input type="button" onclick="this.style.display='none'" value="Click to Hide"/>
[/html]

