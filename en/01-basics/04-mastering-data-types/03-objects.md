
# Objects 

Objects in JavaScript are kind of two-faced.

From one side, an object is an associative array (called <i>hash</i> in some languages). It stores key-value pairs. 

From the other side, objects are used for object-oriented programming, and that's a different story.

In this section we start from the first side and then go on to the second one.

=Cut


## Creating objects   

An empty object (you may also read as <i>empty associative array</i>) is created with one of two syntaxes:

[js]
1. o = new Object()
2. o = { }  // the same
[/js]

It stores any values by key which you can assign or delete using "dot notation":

[js run]
var obj = {}       // create empty object (associative array)

obj.name = 'John'  // add entry with key 'name' and value 'John'

*!*
// Now you have an associative array with single element
// key:'name', value: 'John'
*/!*

alert(obj.name) // get value by key 'name'

delete obj.name // delete value by key 'name'

*!*
// Now we have an empty object once again
*/!*
[/js]
 
You can use square brackets instead of dot. The key is passed as a string:

[js run]
var obj = {}

obj['name'] = 'John'

alert(obj['name'])

delete obj['name'] 
[/js]

There's a significant difference between dot and square brackets.
<ul>
<li><strong>`obj.prop`</strong> returns the key named 'prop'</li>
<li><b>`obj[prop]` returns the key named by value of prop:
[js]
var prop = 'name'

// returns same as obj['name'], which is same as obj.name
alert(obj[prop])  
[/js]
</li>
</ul>



### Literal syntax   

You can also set values of multiple properties when creating an object, using a curly-bracketed list: `{ key1: value1, key2: value2, ... }`.

Here's an example.

[img src="/assets/intro/objectLiteral.png"]

Literal syntax is a more readable alternative to multiple assignments:

[js]
var menuSetup = {
    width:  300,
    height: 200,
    title: "Menu"
}

// same as:

var menuSetup = {}
menuSetup.width = 300
menuSetup.height = 200
menuSetup.title = 'Menu'
[/js]

[task src="task/fist-object.md"]

It is also possible to create nested objects:
[js]
var user = {
  name:  "Rose",
  age: 25,
  size: {
    top: 90,
    middle: 60,
    bottom: 90
  }
}

alert( user.name ) // "Rose"
alert( user.size.top ) // 90
[/js]


[smart header="Getting an object dump in Firefox"]
For debugging purposes, it is possible to get an object dump by calling <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/toSource">toSource</a> method, supported only in Firefox.

[js run]
var user = {
  name:  "Rose",
  size: {
    top: 90,
    middle: 60
  }
}

alert( user.toSource() ) // works only in Firefox
[/js]
 
[/smart]




## Non-existing properties, `undefined`   

We can try to get any property from an object. There will be no error.

But if the property does not exist, then `undefined` is returned:

[js run]
var obj = {}

var value = obj.nonexistant

alert(value)
[/js]

So it's easy to check whether a key exists in the object, just compare it against `undefined`:

[js]
if (obj.name !== undefined) { // strict(!) comparison 
  alert(" I've got a name! ")
}
[/js]



## Checking if a key exists   

A peculiar coder (I bet you are) might have a question.

What if I assign a key to `undefined` explicitly? How to check if whether the object got such key?
[js run]
var obj = { key: undefined }

alert( obj.key ) // undefined.. just if there were no key
[/js]

Hopefully, there is a special `"in"` operator to check for keys. It's syntax is `"prop" in obj`, like this:

[js run]
var obj = { key: undefined }

alert("key" in obj) // true, key exists
alert("blabla" in obj) // false, no such key
[/js]

In real life, usually `null` is used a "no-value", leaving `undefined` for something... truly undefined.



## Iterating over keys-values   

There is a special `for..in` syntax to list object properties:

[js]
for(key in obj) { 
  ... obj[key] ...
}
[/js]

The following example demonstrates it.

[js run]
var menu = {
    width:  300,
    height: 200,
    title: "Menu"
};

for(var key in menu) {
    var val = menu[key];
    
    alert("Key: "+key+" value:"+val);
}
[/js]

Note how it is possible to define a variable right inside `for` loop.


### Order of iteration   

In theory, the order of iteration over object properties is not guaranteed. In practice, there is a de-facto standard about it.

<ul>
<li>IE&lt;9, Firefox, Safari always iterate in the order of definition.</li>
<li>Opera, IE9, Chrome iterate in the order of definition for string keys.
Numeric keys become sorted and go before string keys.</i>
</ul>
Try the code below in different browsers.

[js run]
var obj = {
  "name": "John",
  "1": 1,
  age: 25,
  "0": 0
}
obj[2] = 2 // add new numeric
obj.surname = 'Smith' // add new string

for(var key in obj) alert(key) 
// 0, 1, 2, name, age, surname  <-- in Opera, IE9, Chrome
// name, 1, age, 0, 2, surname  <-- in IE<9, Firefox, Safari
[/js]

Here "numeric keys" are those which can be parsed as integers, so `"1"` is a numeric key.

There is an issue about it in Chrome, with long discussion at <a href="http://code.google.com/p/v8/issues/detail?id=164">http://code.google.com/p/v8/issues/detail?id=164</a>.


[smart header="Force iteration order over numeric keys"]
Sometimes, we want `for..in` to keep the iteration order for numeric keys across all browsers.

For example, server may generate a JavaScript object with select options, something like:

[js run]
var countries = {
  // every option is given as "id": "title"
  "5": "Afghanistan",
  "3": "Brunei",
  "8": "Italy"
}
[/js]

And now we need to build `SELECT` with these options in same order. But Chrome won't let us, it will resort numeric keys.

An ugly, but working hack is to prepend numeric keys by an underscore `'_'`. When browser reads such object, it removes the underscore:

[js run]
var countries = {
  // _id: title
  "_5": "Afghanistan",
  "_3": "Brunei",
  "_8": "Italy"
}
for(var key in countries) {
  alert(key.substr(1)) // keeps the order always
}
[/js]

Now all browsers keep the order.
[/smart]


## Object variables are references   

A variable which is assigned to object actually keeps reference to it. That is, a variable stores kind-of pointer to real data. 

You can use the variable to change this data, this will affect all other references.

[js run]
var user = { name: 'John' }; // user is reference to the object

var obj = user;  // obj references *!*same object*/!*

*!*obj*/!*.name = 'Peter'; // change data in the object

alert(*!*user*/!*.name);  // now Peter
[/js]

Same happens when you pass an object to function. <b>The variable is <b>a reference, not a value</b>.

Compare this:
[js run]
function increment(val) {
  val++
}

val = 5
increment(val) 

alert(val) // val is still 5
[/js]

And this (now changing val in object):
[js run]
var obj = { val: 5}

function increment(obj) {
  obj.val++
}
increment(obj)

alert(obj.val) // obj.val is now 6
[/js]

The difference is because in first example variable `val` is changed, while in second example `obj` is not changed, but data which it references is modified instead.

[task src="task/multiplynumeric.md"]


## Properties and methods   

You can store anything in object. Not just simple values, but also functions.

[js]
var user = {
    name: "Guest",
    askName: function() {
        this.name = prompt("Your name?")
    },
    sayHi: function() {
        alert('Hi, my name is '+this.name)
    }
}
[/js]

[img src="/assets/intro/object/methods.png"]

[smart]
To check if a method is supported, we usually check it's existance by `if`:

[js]
if (user.askName) user.askName()
[/js]
[/smart]



### Calling methods   

When you put a function into an object, you can call it as <i>method</i>:

[js run]
var user = {
    name: "Guest",
    askName: function() {
        this.name = prompt("Your name?")
    },
    sayHi: function() {
        alert('Hi, my name is '+this.name)
    }
}

user.askName()
user.sayHi()
[/js]

Note the `this` keyword inside `askName` and `sayHi`. When a function is called from the object, `this` becomes a reference to this object.

[task src="task/create-summator.md"]

[task src="task/create-chainable-object.md"]


[#new]

## The constructor function, "new"   

An object can be created literally, using `obj = { ... }` syntax.

Another way of creating an object in JavaScript is to <em>construct</em> it by calling a function with `new` directive.



### A simple example   

[js run]
function Animal(name) {
  this.name = name
  this.canWalk = true  
}

var animal = new Animal("beastie")

alert(animal.name)
[/js]

A function takes the following steps:

<ol>
<li>Create `this = {}`.</li>
<li>The function then runs and may change `this`, add properties, methods etc.</li>
<li>The resulting `this` is returned.</li>
</ol>

So, the function constructs an object by modifying `this`.

The result in the example above:
[js]
animal = {
  name: "beastie",
  canWalk: true
}
[/js]


[smart header="If the function returns an object, `this` is ignored"]
This feature is rarely used, but still interesting to know:

[js run]
function Animal() {
  this.name = 'Mousie'
  return { name: 'Godzilla' }  // <-- will be returned
}

alert( new Animal().name )  // Godzilla
[/js]
[/smart]



[sum]
Traditionally, all functions which are meant to create objects with `new` have uppercased first letter in the name.
[/sum]

[smart]
By the way, a call without arguments may omit braces:
[js]
var animal = new Animal()
// same as
var animal = new Animal
[/js]

In both cases `animal.name` will be `undefined`.
[/smart]


### An example with the method   

Let's declare a function `User` and create two objects with `sayHi` method.

[js run]
function User(name) {
  this.name = name
 
  this.sayHi = function() {
    alert(" I am "  +this.name)
  };
}

var john = new User("John")
var peter = new User("Peter")

john.sayHi()
peter.sayHi()
[/js]


[task src="task/create-summator-with-new.md"]



## Built-in Objects   

The "standard" library of JavaScript includes a list of built-in objects.

For example:
<ul>
<li><a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math">Math</a> provides methods for mathematical computations,</li>
<li><a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date">Date</a> - for dates,</li>
<li><a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp">RegExp</a> - for regular expressions.</li>
</ul>

Functions are also objects, instances of the <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function">new Function</a>. We'll meet their advanced usage further in the book.


### String, Number, Boolean   

The three objects are standing apart from the others. These are `String, Number, Boolean`.

Unlike other objects, they are never created explicitly. No one should ever make a `new String`. Primitives should be used instead. 

The purpose of these objects is to support methods, which can be called directly on a primitive, like this:

[js run]
alert( "string".length )
alert( "lala".toUpperCase() )
[/js]

It works, because <b>the interpreter converts a primitive to object, calls its method, and the returned value is primitive again.</b> 

Same with numbers: 

[js run]
alert( 123.456.toFixed(2) )

alert( 123..toFixed(2) ) // Two dots is not a typo. 
// 123.toFixed(2) won't work, because the expects the decimal part after '.' 
[/js]



## Summary   

<ul>
<li>
Objects are associative arrays with additional features.
<ul>
<li>Assign keys with `obj[key] = value` or `obj.name = value`</li> 
<li>Remove keys with `delete obj.name`
<li>Iterate over keys with `for(key in obj)`, remember iteration order for string keys is always in definition order, for numeric keys it may change.</li>
</ul>
</li>
<li>Properties, which are functions, can be called as `obj.method()`. They can refer to the object as `this`.</li>
<li>Properties can be assigned and removed any time.</li>
<li>A function can create new objects when run in constructor mode as `new Func(params)`. 

It takes `this`, which is initially an empty object, and assigns properties to it. The result is returned (unless the function has explicit `return anotherObject` call).

Names of such functions are usually capitalized.
</li>
</ul>

