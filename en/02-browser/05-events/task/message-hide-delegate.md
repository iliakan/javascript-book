
# Message hide delegate 

There is a message list. Add a delete button to each message to remove it.

<b>Use event delegation. Single event handler for everything.</b>

The result should work like this (click on the right-top image):
[iframe src="/assets/browser/events/messages/index.html"]

As the source, you can use either a sample page [play src="/assets/browser/events/messages-src"], or take a working example with per-element handlers [play src="/assets/browser/events/messages"] and modify it to use delegation.

=Hint 1

The `click` handler on container should first check if the click actually happened on the delete button. 

Use `target/srcElement` for that.

If yes, then remove the parent div.

=Solution

The solution is shown [play src="/assets/browser/events/messages-delegate"|here].


