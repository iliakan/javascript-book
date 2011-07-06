
function TocBuilder() {

	this.build = function(tocArr, url) {

		if (!tocArr.length) return '';

		var text = '<ol class="toc">';
		var level = tocArr[0].level;

		for(var i=0; i<tocArr.length; i++) {
			var item = tocArr[i];
			if (i) {
				if (item.level > level) {
					text+='<ol>';
				} else if (item.level < level) {
					text+='</li></ol></li>'
				} 
			}
			level = item.level;
			text += '<li><a href="view.html?'+url+'#'+item.id+'">'+item.title+'</a>';
		}

		text += '</li></ol>';

		return text;
	};
}
