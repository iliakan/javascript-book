
# Array 

Here we'll talk about regular arrays, that is with numeric indices.

=Cut

An array is usually declared using square-bracketed notation:

[js run]
var fruits = ["Apple", "Orange", "Donkey"]
[/js]


To get an element, put its index in square brackets. First index is `0`:
[js run]
var fruits = ["Apple", "Orange", "Donkey"]

alert(fruits[0])
alert(fruits[1])
alert(fruits[2])
[/js]

We can also retrieve its length:
[js run]
var fruits = ["Apple", "Orange", "Donkey"]

alert(fruits.length)
[/js]
Wops! We created an array with two fruits and a donkey. The next step will be to remove the donkey.


## Methods `pop` and `push`   

There is a method `pop` which removes last item and returns it.

The following example demonstrates how the "Donkey" is being popped out.

[js run]
var fruits = ["Apple", "Orange", "Donkey"]

alert("I remove "+fruits.pop())

// Now we have ["Apple","Orange"]

alert("Now length is: "+fruits.length) // donkey removed 
[/js]

Note how `pop` modifies the array itself.

A counterpart to `pop` is `push` which appends an element to the array. Let's say we've forgotten a peach:

[js run]
var fruits = ["Apple", "Orange"]

fruits.push("Peach");

// now got ["Apple", "Orange", "Peach"]

alert("Last element is:"+fruits[fruits.length-1])
[/js]

[task src="task/create-array.md"]

## Methods `shift/unshift`   

Methods `pop/push` manipulate with the end of array, but you can also use `shift` to shift off first value or `unshift` to prepend a value to an array.

[js run]
var fruits = ["Apple", "Orange"]

var apple = fruits.shift() // now we have only ["Orange"] left

fruits.unshift("Lemon") // now got ["Lemon", "Orange"]

alert(fruits.length) // 2
[/js]

Both `push` and `unshift` can add multiple elements at once:

[js run]
var fruits = ["Apple"]

fruits.push("Orange","Peach")
fruits.unshift("Pineapple","Lemon")

// now: ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
[/js]

[task src="task/get-random-value-array.md"]



## Iterating over array   

To iterate over elements, a loop over all indices is usually used.

The following example demonstrates iterating with `for` loop.

[js run]
var fruits = ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]

for(var i=0; i<fruits.length; i++) {
  alert(fruits[i])
}
[/js]

[task src="task/array-find.md"]

[task src="task/filternumeric.md"]



### `join` and `split`   

Sometimes we need a quick'n'easy way to turn an array into a string. That is exactly what `join` method is for.

It joins an array into string using given separator:

[js run]
var fruits = ["Lemon","Apple","Orange","Peach"];

var str = fruits.join(', ');

alert(str);
[/js]

The inverse operation is also easy with `split`:

[js run]
var fruits = "Apple,Orange,Peach";

var arr = fruits.split(',');

// arr is ["Apple", "Orange", "Peach"]

alert(arr[0]);
[/js]

[task src="task/addclass.md"]
[task src="task/camelize.md"]

## Using `length` to trim an array   

Using `length` property, one can trim an array as follows:
[js run]
var arr = [0, 1, 2, 3] 

alert(arr[2]); // ok it's here

arr.length = 2; // trim to 2 elements (that is: [0,1])

alert(arr[2]); // nope, it was trimmed out
[/js]

You just set the length and browser trims the array.


## `Array` is `Object`, consequences.   

In fact `Array` in JavaScript is internally an `Object` extended with auto-length and special methods. 

This is different from arrays in some languages which represent a contiguous segment of memory, and also different from queue/stack structures based on linked-lists.

[warn header="Non-numeric array keys"]
The keys are numeric, but can have any name:

[js]
arr = []
arr[0] = 5
*!*arr.prop = 10*/!* // don't do that
[/js]

Although that's not recommended. Numeric arrays are suited for numeric keys, objects are for associative key-value pairs. There's usually no reason to mix them.
[/warn]

In JavaScript, arrays being a hash table gives certain performance benefits and drawbacks.

For instance, `push/pop` operate on last element of array only, so they are blazingly fast, say O(1).

See what I mean, `push` only works with the tail:
[js]
var arr = ["My", "array"]
arr.push("something")

alert(arr[1]) // string "array"
[/js]

<b>Methods `shift/unshift` are slow, because they have to renumber whole array.</b> Method `splice` may also lead to renumbering.

[img src="/assets/intro/array/shiftpush.png"]

So, using `shift/unshift` is generally slower than `push/pop`. The larger array - the more work to renumber it.

[task src="task/array-element-call-this.md"]




## Sparse arrays, details of `length`   

<b>The `length` property in JavaScript is not quite a length, it is `last index + 1`</b>.

That becomes important in <i>sparse</i> arrays, with 'holes' in indexes.

In the next example we add two elements to empty `fruits`, but `length` becomes `100`:

[js run]
var fruits = [] // empty array

fruits[1] = 'Peach'
fruits[99] = 'Apple'

alert(fruits.length)  // 100 (but 2 elements)
[/js]

If you try to output a sparse array, the browser outputs values at skipped indexes as empty:

[js run]
var fruits = [] // empty array

fruits[2] = 'Peach'
fruits[5] = 'Apple'

alert(fruits)  // ,Peach,,,Apple (or kind of)
[/js]

But naturally, an array is just an object with two keys. The missing values do not occupy space.

Sparse arrays behave weird when array methods are applied to them. They don't have an idea that indexes are skipped:

[js run]
var fruits = [ ]

fruits[1] = 'Peach'
fruits[9] = 'Apple'

alert( fruits.pop() ) // pop 'Apple' (at index 9)
alert( fruits.pop() )  // pop undefined (at index 8)
[/js]

Try to evade sparse arrays. Anyway, it's methods won't work well. Use an `Object` instead.


## Removing from an array   

As we know, arrays are just objects. So we could use `delete` to remove a value:

[js run]
var arr = ["Go", "to", "home"]

delete arr[1]

// now arr = ["Go", undefined, "home"]
alert(arr[1]) // undefined
[/js]

You see, the value is removed, but probably not the way we'd want it to be, because array has got an undefined hole inside.

A `delete` operator removes key-value pair, that's all it does. Naturally, because array is just a hash, the slot becomes `undefined`.

More often we need to remove an item without leaving holes between indexes. There is another method which helps with that.


### Method `splice`   

Method `splice` is a swiss-knife for JavaScript arrays, <b>it can delete elements and replace them</code>.

It's syntax is as follows:

<dl>
<dt>`arr.splice(index, deleteCount[, elem1, ..., elemN])`</dt>
<dd>Remove `deleteCount` elements starting with `index` and then paste `elem1, ..., elemN` on their place.</dd>
</dl>

Let's see a few examples.

[js run]
var arr = ["Go", "to", "home"]

arr.splice(1, 1)  // remove 1 element starting at index 1

alert( arr.join(',') ) // ["Go", "home"] (1 element removed)
[/js]

This way <b>you can use `splice` to remove a single element</b> from an array. Array numbers shift to fill the gap.

[js run]
var arr = ["Go", "to", "home"]

arr.splice(0, 1)  // remove 1 element starting at index 0

alert( arr[0] ) // "to" became first element
[/js]

The next example demonstrates how to <b>replace elements</b>. 

[js run]
var arr = [*!*"Go", "to", "home",*/!* "now"];

// remove 3 first elements and add two
arr.splice(0, 3, "Come", "here") 

alert( arr ) // [*!*"Come", "here"*/!*, "now"] 
[/js]

Method <b>`splice` returns array of removed elements</b>:

[js run]
var arr = [*!*"Go", "to", "home",*/!* "now"];

// remove 2 first elements 
var removed = arr.splice(0, 2) 

alert( removed ) // "Go", "to" <-- array of removed elements
[/js]

`Splice` is able to insert elements, just set `deleteCount` to `0`. 

[js run]
var arr = ["Go", "to", "home"];

// from 2nd position 
// delete 0 
// and insert "my", "sweet"
arr.splice(2, 0, "my", "sweet") 

alert( arr) // "Go", "to", "my", "sweet", "home"
[/js]


It also can use a negative index, which counts from array end:

[js run]
var arr = [1, 2, 5]

// at element -1 (pre-last)
// delete 0 elements, 
// then insert 3 and 4
arr.splice(-1, 0, 3, 4)

alert(arr)  // 1,2,3,4,5
[/js]

[task src="task/removeclass.md"]

[task src="task/filternumericinplace.md"]


### Method `slice`   

You can also extract a portion of array using `slice(begin[, end])`:

[js run]
var arr = ["Why", "learn", "JavaScript"];

var arr2 = arr.slice(0,2) // take 2 elements starting at 0

alert(arr2.join(', ')) // "Why, learn"
[/js]

Note, this method does not modify array, it just copies a slice of it.

You can omit second argument to get all elements starting with certain index:

[js run]
var arr = ["Why", "learn", "JavaScript"];

var arr2 = arr.slice(1) // take all elements starting at 1

alert(arr2.join(', ')) // "learn, JavaScript"
[/js]

The method also supports negative indices, just like `String#slice`.


## Method `reverse`   

Another useful method is reverse. Suppose, I want a last part of a domain, like "com" from "my.site.com". Here is how I can do that:

[js run]
var domain = "my.site.com"

var last = domain.split('.').reverse()[0]

alert(last)
[/js]

Note how JavaScript allows complex syntax like: `reverse()[0]` - to call a method and then take an element of resulting array.

Actually, you can compose longer calls, like `reverse()[0][1]()[5]...`, language syntax allows that.


## Sorting, method `sort(fn)`   

Method `sort()` sorts the array <i>in-place</i>:

[js run]
var arr = [ 1, 2, 15 ]

arr.sort()

alert( arr )   // 1, 15, 2
[/js]
 
Run the example above. Notice something strange? The order is 1, 15, 2.

That's because <b>`sort` converts everything to string and uses lexicographical order</b> by default.

To make it smarter, we need to pass in the custom comparison function. It should accept two arguments and return 1, 0 or -1:
[js run]
function compare(a, b) {
  if (a > b) return 1
  else if (a < b) return -1
  else return 0
}

var arr = [ 1, 2, 15 ]

arr.sort(compare)

alert( arr )   // 1, 2, 15
[/js]

Now it works right. 

[task src="task/compare-people.md"]



## More on array definition   
[#new Array]

### `new Array()`   
Technically, there is another syntax to define an array:
[js]
var arr = Array("Apple", "Peach", "etc")
[/js]

It is rarely used, just because square brackets `[]` are shorter.
Also, there is a pitfall here, because `new Array`, called with single numeric argument produces an array of `undefined` with given length:

[js run]
var arr = new Array(2,3) // ok we have [2, 3]

arr = new Array(2) // do we have [2] ?

alert(arr[0]) // no! we have array [undefined, undefined]
[/js]

The example above outputs `undefined`, because `new Array(number)` creates an <i>empty</i> array with `length` set to `number`.

That might be quite unexpectable. But if you know about the feature, then here's a nice use of `new Array(number)`:

[js run]
var indent = new Array(5).join('a') // aaaa (4 times)
[/js]

That's a smart way to repeat a string.



### Multidimensional arrays   

Arrays in JavaScript can store any data type inside.

[js run]
var arr = ["My", "Small array", true, {name:'John'}, 345]
alert(arr[1]) // Small array
[/js]

That can be used to store multidimensional arrays:

[js run]
var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

alert(matrix[1][1]) // central element
[/js]


[task src="task/filter.md"]

[task src="task/sieve-eratosthenes.md"]


## Summary   

That's all with deep introduction to array. 

We've covered:

<ol>
<li>How to declare an array, two syntaxes.</li>
<li>How to add, replace, remove from/to array and its both ends.</li>
<li>How to iterate over an array.</li>
<li>How to split a string into array and join it back.</li>
<li>Relations between `Array` and `Object` in JavaScript</li>
</ol>

That's enough 95% of time. For more methods and examples, refer to <a href="https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array">Array in Mozilla manual</a>.

