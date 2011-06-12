
# lastChild.nextSibling vs children[0].previousSibling 

Is it right that `document.body.lastChild.nextSibling` is always `null`?

.. Same question about `document.body.children[0].previousSibling` ?

=Solution

The answers are 'Yes' and then 'No'.

The first expression is always `null`, that's right. The `document.body.lastChild` is last and has no siblings.

The second expression maybe either `null` or a text node. That's because `document.body.children[0]` is a first <i>element</i> child, it may have a text node as the `previousSibling`.


