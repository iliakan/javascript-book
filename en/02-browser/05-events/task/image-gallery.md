
# Image gallery 

Create an image gallery that will change main image on thumbnail click.

Should look like this:

[iframe src="/assets/browser/events/gallery/index.html"]

You can see and export the source HTML, images and thumbnails at [play src="/assets/browser/events/gallery-src"].


=Solution

The solution is to put a handler on either individual images or to the `#thumbs` container. 

On event it should change `#largeImg` `src` to `href` of the link and change `alt` to it's `title`.

[sum]
The border on hover is handled by pure CSS. That works everywhere except IE6. We could use an IE-only <a href="http://www.xs4all.nl/~peterned/csshover.html">behavior for IE6</a>, or just skip it if not strictly required.

The image can be accessed without JavaScript through the link.

That's all a result of proper HTML/CSS structure.
[/sum]

The result may look like this:
[js]
var largeImg = document.getElementById('largeImg')
		
document.getElementById('thumbs').onclick = function(e) {
  e = e || window.event
  var target = e.target || e.srcElement

  if (target.nodeName != 'IMG') return

  var anchor = target.parentNode
	
  largeImg.src = anchor.href
  largeImg.alt = anchor.title
			
  return false
}
[/js]

See it in action in the task text or [play src="/assets/browser/events/gallery"|here].



