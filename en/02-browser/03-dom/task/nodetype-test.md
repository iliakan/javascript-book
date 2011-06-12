
# nodeType test 

What does the page alert?
[html]
<!DOCTYPE HTML>
<html>  
<body>  
   <script>
      alert(document.body.lastChild.nodeType)
   </script>
</body>  
</html> 
[/html]

=Solution

The minor pitfall is that at the time of script execution, the last child is the `SCRIPT` itself.

So, the result is 1, the element node.

[html run height=60]
<!DOCTYPE HTML>
<html>  
<body>  
   <script>
      alert(document.body.lastChild.nodeType)
   </script>
</body>  
</html> 
[/html]


