
# Create array 

<ol>
<li>Create an array `styles` with elements "Jazz", "Blues".</li>
<li>Append a value "Rock'n'Roll"</li>
<li>Replace the second value from tail by "Classic". The array should become "Jazz","Classic","Rock'n'Roll". <b>The code should work for any array length.</b></li>
<li>Extract the last value from the array and `alert` it.</li>
</ol>

=Solution

[js run]
// 1
var styles = ["Jazz", "Bluez"]

// 2
styles.push("Rock'n'Roll") // or: styles[styles.length] = "Rock'n'Roll"

// 3 
styles[styles.length-2] = "Classic"

// 4
alert( styles.pop() )
[/js]

