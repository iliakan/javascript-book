
# What's wrong? 

What's wrong here?
[js]
var a = "Empty spaces - what are we living for?
  Abandoned places - I guess we know the score..
  On and on!
  Does anybody know what we are looking for?"

alert(a)
[/js]


=Solution

The multiline string must have backslashes before every line break:

[js run]
var a = "Empty spaces - what are we living for? \
  Abandoned places - I guess we know the score.. \
  On and on! \
  Does anybody know what we are looking for?"

alert(a)
[/js]


