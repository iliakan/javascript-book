<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>SyntaxHighlighter Build Test Page</title>
	<script type="text/javascript" src="/misc/jquery.js"></script>
	<script type="text/javascript" src="scripts/shCore.js"></script>
	<script type="text/javascript" src="scripts/shBrushCss.js"></script>
	<script type="text/javascript" src="scripts/shBrushJava.js"></script>
	<script type="text/javascript" src="scripts/shBrushJScript.js"></script>
	<script type="text/javascript" src="scripts/shBrushPhp.js"></script>
	<script type="text/javascript" src="scripts/shBrushPlain.js"></script>
	<script type="text/javascript" src="scripts/shBrushPython.js"></script>
	<script type="text/javascript" src="scripts/shBrushXml.js"></script>
	<link type="text/css" rel="stylesheet" href="styles/shCore.css"/>
	<link type="text/css" rel="stylesheet" href="styles/shThemeDefault.css"/>
	<script type="text/javascript">
		SyntaxHighlighter.config.clipboardSwf = 'scripts/clipboard.swf';
		SyntaxHighlighter.all();
	</script>
</head>

<body >
<h1>SyntaxHihglighter Test</h1>
<p>This is a test file to insure that everything is working well.</p>

<?php
$text = "
{
/*!*/ test /*/!*/

	/*!*/
	this.create = function()
	{
		return sh.config.strings.viewSource;
	};
	/*/!*/
	this.execute = /*u*/ function(sender, event, args) /*/u*/
	{
		var code = sh.utils.fixInputString(highlighter.originalCode).replace(/</g, '&lt;'),
			wnd = sh.utils.popup('', '_blank', 750, 400, 'location=0, resizable=1, menubar=0, scrollbars=1')
			;

		code = sh.utils.unindent(code);

		wnd.document.write('<pre>' + code + '</pre>');
		wnd.document.close();
	};
},

";
?>

<pre class="brush: js;">
<?php echo htmlspecialchars($text); ?>
</pre>
</html>

