$(function() {
	$('span.task-solution-open').click(function() {
		$(this).hide().parents('.learning-task').find('.task-solution').show()
	})
	
	$('span.task-hint-open').click(function() {
		$(this).hide().next('.task-hint').show()
	})
})

function iframeResize(ifrElem) {
	
	var document = ifrElem.contentDocument || ifrElem.contentWindow.document
	ifrElem.style.display = ''
	ifrElem.style.width = '100%'
	ifrElem.style.height =  '1px'
	var height = (document.documentElement.scrollHeight || document.body.scrollHeight)
	//var width = Math.min(document.documentElement.scrollWidth || Infinity, Infinity || document.body.scrollWidth)
	//debugger
	ifrElem.style.height = height + 10 + 'px'
	//ifrElem.style.width = width + 10 +'px'
}


