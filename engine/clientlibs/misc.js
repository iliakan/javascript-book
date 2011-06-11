$(function() {

	$(document.body).delegate('.task-section-open', 'click', function() {
		$(this).next().show();
		$(this).replaceWith('<h2>' + this.getAttribute('data-title') + '</h2>');
	});

});

function iframeResize(ifrElem) {

	var document = ifrElem.contentDocument || ifrElem.contentWindow.document;
	ifrElem.style.display = '';
	ifrElem.style.width = '100%';
	ifrElem.style.height = '1px';
	var height = (document.documentElement.scrollHeight || document.body.scrollHeight);
	//var width = Math.min(document.documentElement.scrollWidth || Infinity, Infinity || document.body.scrollWidth)
	//debugger
	ifrElem.style.height = height + 10 + 'px';
	//ifrElem.style.width = width + 10 +'px'
}


