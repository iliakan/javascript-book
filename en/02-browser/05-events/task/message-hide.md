
# Message hide 

There is a message list. Add a delete button to each message to remove it.

The result:
[iframe src="/assets/browser/events/messages/index.html"]

The source is [play src="/assets/browser/events/messages-src"|here].


=Hint 1

First, the algorithm:

<ol>
<li>Develop HTML/CSS structure. Position the button.</li>
<li>Find all images</li>
<li>Assign handlers to them</li>
<li>The handler will lookup parent message div and hide it</li>
<ol>

=Hint 2

How to position images?

Use `position: relative` to make the `pane` positioned, and then `position: absolute + right/top` for the image. 

Use `padding-top` on the `pane` to get space on top of the message.


=Hint 3

How to find the images?

That's simple: grab the container and get all `IMG`. Surely, there can be many images in the message, but you can check the `className` to make sure it is really a delete button.

=Solution

The solution is shown [play src="/assets/browser/events/messages"|here].


