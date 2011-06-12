
# Endless by chance 

The following loop hangs up the browser. Why?
[js]
var i = 0
while(i != 10) { 
  i += 0.2
}
[/js]



=Solution

That's because `i` never equals `10`.

Run the following to see <i>real</i> values of `i`:
[js run]
var i = 0
while(i < 11) { 
  i += 0.2
  if (i>9.8 && i<10.2) alert(i)
}
[/js]

Note that neither value equals `10`. 

