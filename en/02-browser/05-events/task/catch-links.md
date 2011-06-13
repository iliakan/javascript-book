
# Catch links 

Make all links inside the <code>&lt;DIV id="content"&gt;</code> ask if the visitor wants to leave and stop if he doesn't.

Below is how it should work (in iframe):

[iframe height=100 border=1 src="tutorial/browser/events/links/index.html"]

<ul>
<li>The `DIV` content may be AJAX-loaded. It's `innerHTML` can be replaced any time, and the links behavior should not change. Use delegation.</li>
<li>The DIV contents can contain nested tags both outside the links ( like <code>&lt;P&gt;</code>) and inside them (like `I` or `B`).</li>
</ul>

The source page is at [play src="/assets/browser/events/links-src.html"]



=Solution

The task is classical for event delegation.

In real life, we could catch also add AJAX-logging to the server and see where our users leave.

We catch the event on `contents` and ascend the `parentNode` until either process `A` or hit the container.

[js]
  document.getElementById('contents').onclick = function(evt) {
    var evt = evt || event
    var target = evt.target || evt.srcElement

    function handleLink(href) {    
      var isLeaving = confirm('Leave to '+href+'?')      
      if (!isLeaving) return false
    }
    
    while(target != this) {
      if (target.nodeName == 'A') {
        return handleLink(target.href)
      }
      target = target.parentNode
    }
  }  
[/js]

See the full solution at [play src="/assets/browser/events/links.html"].


