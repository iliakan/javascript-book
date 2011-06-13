
# Variables and statements 

JavaScript is a special language indeed. Especially for those coming from PHP, C, Java. 

Let's start it with language basics: variables, coding style etc.

=Cut


## Code structure   

The code consists of multiple statements.


### Semicolon   

Statements are separated by a semicolon.

[html run height=100]
<html>
<body>

  <script>
    alert('Hello');
    alert('World!');
  </script>

</body>
</html>
[/html]

Spaces and tabs are ignored, so one-lining is possible:
[js]
alert('Hello');   alert('World!');
[/js]

But newlines are not ignored. Instead, <b>a newline may separate statements, just like semicolons do.</b>

These two lines are fully equivalent:
[js]
a = 5
a = 5;
[/js]


### Missing semicolon pitfalls   

There are few mistakes which beginners tend to make in multiline assignments and calls, because of semicolon issues.

First, this is not going to work:

[js]
var a = "long
  line "
[/js]

That's because a parser thinks that the first line is a full statement, like:

[js]
var a = "long*!*;*/!*
  line "*!*;*/!*
[/js]

And there will be an error about unfinished string (unterminated literal).

Second, these two snippets of code are equivalent:

[js]
return
  result;
[/js]

... Is, because of a newline, same as 

[js]
return*!*;*/!*
result*!*;*/!*
[/js]

And that's of course different from:
[js]
return result
[/js]

Only the last example actually returns `result`.

To insert a convenience newline, you can put a backslash before line break, like that:

[js]
var a = "long \
 line "

return \
   result
[/js]

<b>A backslash before a line break forces the interpreter to ignore the newline.</b>

The newline is also ignored if the expression is not finished, particularly for unfinished operators or unclosed brackets:
[js]
var a = "long " +
 " line "

var b = 2 + (
 2 + 3
)
[/js]

JavaScript tries to be even smarter than that. The output in the example below is `8`, the newline is ignored. And don't ask me why.
[js run]
var b = 2 * 2
+ 4

alert(b)
[/js]

The rules about the semicolon insertion are complicated and sometimes weird. They are described in the ECMAScript specification. 

<b>In short, it is possible to omit ending semicolons in most cases, but doing so gives freedom to the interpreter. The freedom which it could abuse and cause <i>bugs</i>.</b>

[ponder header="Semicolon: to write or not to write?"]

There was an argue between programmers: "should I put a semicolon or not?". Nowadays, most people agree that they should.

In the tutorial, you find lots of code without semicolons. That just my bad habit.

Because I'm in JavaScript for a very long time, I stepped into pitfalls so many times that I know how to get the way out very quickly. Guess, you don't want to repeat my path here, but rather walk around the pits. Put simicolons between statements.
[/ponder]

[task src="task/whats-wrong.md"]


## Variables   

If you are not familiar with general programming variable concept, there is a great <a href="http://en.wikipedia.org/wiki/Variable_%28programming%29">wiki article about it</a>. Shortly, a variable is a named "box", where you could put a value.


### Definition   

First, a variable should be defined. That can be done in any place of code using directive `var`

[js]
var x
[/js]

When a variable is defined, it is possible to operate with it, for example, put a value into it:

[js]
var x
x = 5
[/js]

Or you can define multiple variables in single `var` statement:

[js]
var a, b, c
[/js]

It is possible to assign a variable in definition:

[js]
var name = "John", song = "La-la-la"
[/js]


[smart]
In JavaScript you can assign to a variable which you haven't defined using `var`:

[js]
noVar = "value"
[/js]

Technically, it doesn't cause an error, but don't go this way. Always define variables with `var`. That's a good style and helps to evade certain errors, like in the code below.

Run this <u>in IE</u>:

[html run]
<html>
<body>
  <div id="test"></div>

  <script>
    test = 5
    alert(test)
  </script>

</body>
</html>
[/html] 

There will be an error.

IE, Safari/Chrome and Opera create a variable for each element with `id`, so variable `test` references `DIV` in the example above.

But <b>in IE the auto-generated variable is an internal reference that can't be changed.</b> That's why assignment to `test` causes an error.

The following code works:
[html run]
<html>
<body>
  <div id="test"></div>

  <script>
    *!*var*/!* test = 5
    alert(test)
  </script>

</body>
</html>
[/html] 

[/smart]


### Variable names   

<b>A variable name first char must be a letter, `$` or `_`. The second char and other chars are allowed to be digits.</b>

Strange, but valid names:
[js]
var $this,
 _private,
 $,
 _,
 $1,
 user15
[/js]

[sum]
JavaScript is CaSE-sEnSitiVe! 
<b>`Apple` and `APPLE` are two different names.</b> 
[/sum]


### Reserved words   

There is also a list of reserved words, which can't be variable names. It includes `var, function, return, class, implements` and other words, most of them are used in the language itself. 

Some words, like `class` are not used in modern JavaScript, but still reserved. There are browsers which allow them, but using them may lead into a pitfall.

The following code works in Firefox which allows `'class'` as variable name. And fails in  Safari which gives syntax error on such variable:

[js run]
var class = 5
alert(class)
[/js]


Read more about naming principles and how to make good names in the article [](#154).


### Language types   

JavaScript defined the following basic types:
<dl>
<dt>number</dt>
<dd>Any number, integer and non-integer: `1`, `2`, `1.5` etc.</li>
<dt>string</dt>
<dd>A string, like `'cat'`, `'dog'` or `'my mommie bought a puppy'`</dd>
<dt>boolean</dt>
<dd>Two possible values: `true` and `false`.</dd>
<dt>object</dt>
<dd>Objects.. We'll talk about them later.</dd>
<dt>special values</dt>
<dd>There are special values which have no type: `null` and `undefined`.</dd>
</dl>


### Weak typing   

Variables in JavaScript are <i>weakly typed</i>. That means two things:

<ol>
<li>Every value has a type</li>
<li>You can put a value of any type into any variable</li>
</ol>

For example:
[js] 
var userId = 123;   // 123 is a number
var name = "John";  // "John" is a string
[/js]

But you are free to reassign the variable to a value of another type:
[js]
var userId = 123;   // 123 is a number

userId = false;     // now userId is boolean
[/js]

<b>Before a variable is assigned, it has `undefined` value.</b> The following statements mean the same:

[js]
var x
var x = undefined
[/js]

Generally, `undefined` means "no value".


## Comments   

Did you note these "//" from the previous example? That were comments.

Comments in JavaScript have two different forms. Single line comment starts with `//` and continues to the end of line.

[js]
// let's see who is here:
var name = "John"; // My most valued visitor
[/js]

Anything you put after `//` is ignored by the interpreter.


### Multiline comments   

Multiline comment is enclosed with `/* ... */` and may span multiple lines.

[js]
/* 
The following variable has a short name.

Usually a short name means that the variable is 
temporary and used only in nearest code.
*/
var a = "John";
[/js]



### Blocks   

The next building element is a <i>block</code>. It consists of multiple statements wrapped in curly braces, like the following:

[js]
var i = 5;
*!*
{
  i = 6;
}
*/!*
var b;
[/js]

Standalone blocks are never used in JavaScript. But curly braced statements come as a part of more complex syntax constructs like `for`, `if`, `while`, functions, etc. 

We'll get to them in the next sections.


## Summary   

A few important points to summarize:

<ul>
<li>Variables are defined by `var` anywhere in the code. They can be assigned in definition.</li>
<li>A variable can contain a value of any type.</li>
<li>There are single-line `//` and multiline `/*...*/` comments.</li>
<li>Statements are divided by semicolons. A newline usually implies a semicolon, so technically it is possible to omit them most time. There are arguments pro and contra omitting semicolons. Choose your way with eyes open.</li>
</ul>

