
# Compare people 

Create a function `ageSort(people)` to sort array of people objects by their age.
[js]
var john = { name: "John Smith", age: 23 }
var mary = { name: "Mary Key", age: 18 }
var bob = { name: "Bob-small", age: 6 }

var people = [ john, mary, bob ]

ageSort(people) // now people is [ bob, mary, john ]
[/js]

Output people names after sorting.


=Solution

The solution makes use of `Array#sort` and custom comparison:

[js run]
function ageCompare(a, b) {
  if (a.age > b.age) return 1
  else if (a.age < b.age) return -1
  return 0
}

*!*
function ageSort(people) {
  people.sort(ageCompare)
}
*/!*

// test it
var john = { name: "John Smith", age: 23 }
var mary = { name: "Mary Key", age: 18 }
var bob = { name: "Bob-small", age: 6 }

var people = [ john, mary, bob ]

ageSort(people)

// check the order
for(var i=0; i<people.length; i++) {
  alert(people[i].name)
}
[/js]


## Shorter variant   

The comparison function may be shorter. Alternative solution:
[js run]
people.sort(function(a,b) { return a.age - b.age })
[/js]

It works, because it is not required to return 1/-1/0, positive or negative will do.


