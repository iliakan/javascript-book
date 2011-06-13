
# Loops and switch 

Loop constructs allow to repeat a block of code multiple times, while the given  condition is true.

JavaScript has three types of loops.

=Cut


## The `while` and `do..while` loops   

These loops check condition before/after every iteration:

[js]
while(i<10) {
  // do something
}

do {
  // something
} while (i<10)
[/js]

The code inside curly braces will repeat while the condition (<code>i&lt;10</code> in the example) holds true.


An endless loop looks like:

[js]
while(true) {
  // do something
}
[/js]

As with many other languages, you check for `0` like this:

[js run]
var i = 3
while(i) {
  alert(i--)
}
[/js]

The loop above will stop when `i==0`, because `0` is `false` in boolean context.

Note that `i--` decrements `i`, but returns a value before decrement. That's why alert starts with `3` and ends with `1`.


## The `for` loop    

This loop looks like:

[js]
for(i=0;i<10;i++) {
  alert(i)
}
[/js]

The statement consists of three parts divided by semicolon and the body.

Here is a description of the parts (generally same as in C, Java, PHP etc):
<dl>
<dt>`i=0` - starter</dt>
<dd>This executes at loop start.</dd>
<dt><code>i&lt;10</code> - loop condition</dt>
<dd>The condition to check if loop is finished. It is checked after every execution of loop body.</dd>
<dt>`i++` - increment</dt>
<dd>An action to perform after every iteration, but before the loop condition is checked.</dd>
</dl>

For the given example, the loop body is executed with `i` starting from `0` to `9`. When `i++` makes `i=10`, the loop is stopped by condition <code>i&lt;10</code>.

It is a common practice to define a loop variable inside `for`:

[js]
for(*!*var*/!* i=0; i<10; i++) { ... }
[/js]

You can leave any part of `for` empty. For example, a simple infinite loop looks like:

[js]
for(;;) { 
  // will repeat eternally (in theory)
}
[/js]

[task src="task/rewrite-while.md"]
[task src="task/loop-until-input-right.md"]


## Jumping out with `break`   

Sometimes it is required to break out of the loop right now. This is what `break` statement does.

The following loop will exit from loop when `i` becomes `6`.

The execution will continue from right after the loop (marked with asterisk).
[js]
var i=0
while(true) {

  i++   // increase i by one

  *!*if (i>5) break*/!*

  alert(i)
}
// (*)
[/js]



## Skipping with `continue`   

The `continue` operator allows to skip the rest of the block. 

For example, the following code ignores negative values:

[js run]
var i = -3
while(i<3) {

  i++
  
  *!*if (i<0) continue*/!*

  alert(i)  // (*)
}
[/js]

The code labelled with asterisk is never executed for negative `i`, thanks to `continue`.



## Jumping over blocks with labels   

Loop labels is something special in JavaScript.

They are used to break/continue through several nested loops.

A label is put before loop statement, and can be put on a separate line:

[js]
*!*outer:*/!* 
for(;;) {
  // ...
  *!*inner:*/!* for(;;) {
    // ...
  }
}
[/js]

One can use <code>break <i>label</i></code> and  <code>continue <i>label</i></code> to jump through several loops.

The following example demonstrates how to break through two loop levels.
[js run]
outer: 
for(;;) {
  
  for(i=0; i<10; i++) {

    if (i > 3) break outer;

  }

  // the part of code after inner loop is never executed, 
  // because break jumps right to outer label
  
}
alert("i="+i);
[/js]

You can use `continue` in exactly the same way. It will jump to next iteration of labelled loop.

An interesting thing about labels is that you can attach them to blocks:

[js run]
my: {

  for(;;) {
    for(i=0; i<10; i++) {
      if (i>4) break my;
    }
  }
  
  some_code;

}
alert("after my");
[/js]

In the given example, `break` jumps over `some_code`, to the end of the block labelled with <code><i>my</i></code>.

That looks like `goto`, but it is not, because you can't break outside loops, and you also can't break to a place of code <i>before</i>. 

JavaScript has no goto. Even in latest editions of the standard.

[task src="task/output-prime-numbers.md"]


## The `switch` construct   

Another useful construct in JavaScript is `switch`. It provides a short syntax for multiple equality tests.

It looks like this:
[js]
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
  case 'value2':  // if (x === 'value2')
    ...
  default:       
    // default code
}
[/js]

Switch operator checks the argument against each `case` and executes the code below the match until it meets the `break` operator.

If no case matches, it goes to optional default label.


### Example   

Let's see a working example.

[js run]
var x = 2

switch(x) {
  case 1:
    alert('never executes')
 
  case 2:   
    alert('x === 2')  
 
  case 3:
    alert('x === 3')
}
[/js]

<b>The example above outputs 2 and 3. That's because it starts execution from `case 2` and goes on.</b>

To stop the execution of a case, we need to add `break`:
  
[js run]
var x = 2

switch(x) {
  case 1:
    alert('never executes')
    break

  case 2:   
    alert('x === 2')   // <-- start
    break              // stop!

  case 3:
    alert('x === 3')
    break
}
[/js]

In the example above, every `case` is appended by `break`. That is a usual practice to ensure that only one case is executed.


### User-input example   

The next example is based on user-input.

[js run]
var arg = prompt("Enter arg?")
switch(arg) {
  case '0':
  case '1':
    alert('One or zero')

  case '2':
    alert('Two')
    break

  case 3:
    alert('Never happens')

  case false: 
    alert('False')
    break

  default:
    alert('Unknown value: '+arg)
}
[/js]

<ul>
<li>If you enter `0` or `1` it starts execution from the corresponding `case`, executes the first alert, then the second one and stops at `break`.</li>
<li>If you enter `2`, `switch` goes right to `case 2`, skipping first alert.</li>
<li><b>If you type in `3`, `switch` goes to default case.</b> That's because `prompt` returns string `'3'`, not number. Switch uses `===` to check equality, so `case 3` will not match.</li>
</ul>

That's also the reason why `case false` also never works in this example. It would work if `arg === false`, but prompt returns either a string or `null`.

