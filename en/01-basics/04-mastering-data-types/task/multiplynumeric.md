
# multiplyNumeric 

Create a function `multiplyNumeric` which gets an object and multiplies all numeric properties by 2. It should work like this:
[js]
// before call
var menu = {
    width: "200",  
    height: "300",
    title: "My menu"
}

multiplyNumeric(menu)

// after call
menu = {
    width: 400,
    height: 600,
    title: "My menu"
}
[/js]

P.S. The function to check for numericality:
[js]
function isNumeric(n) { 
  return !isNaN(parseFloat(n)) && isFinite(n)
}
[/js]

=Solution

The solution below uses `!isNaN(x)` to check for a number.

[js run]

var menu = {
  width: 200,
  height: 300,
  title: "My menu"
}

function isNumeric(n) { 
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function multiplyNumeric(obj) {
  for(var key in obj) {
    var val = obj[key]
    if (isNumeric(val)) {
      obj[key] = val*2
    }
  }
}

multiplyNumeric(menu)

alert("menu width="+menu.width+" height="+menu.height+" title="+menu.title)
[/js]

