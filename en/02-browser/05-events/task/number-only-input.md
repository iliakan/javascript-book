
# Number-only input 

Write an input which accepts only digits. There is a demo below.

[iframe src="/assets/browser/events/numeric-input/index.html"]


=Solution

We need characters here, so the event is `keypress`.

The algorithm is to take the char and see if it is numeric. Cancel default action if it's not.

The only minor pitfall is to accept special chars as well as numbers. Otherwise it will become impossible to use arrow keys and delete in browsers which generate `keypress` on them. Namely, Firefox.

So, here's the solution:
[js]
input.onkeypress = function(e) {
  e = e || event
  var chr = getChar(e)
  
  if (!isNumeric(chr) && chr !== null) {
    return false
  }
}
[/js]

Helper function `getChar` gets the character, `isNumeric` checks for number.

The full solution code is here: [play src="/assets/browser/events/numeric-input"].


