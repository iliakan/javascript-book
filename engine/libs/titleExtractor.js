
function TitleExtractor() {
	var regHeader = /^#[ \t]*(.+?)[ \t]*(\[[\w-]+?])?\#*(?:$|\n+)/m;
	
	function trim(str) {
		return str.replace(/^\s+|\s+$/g, '');
	}

	/**
	 * Splits text into the object
	 * { title: first h1 header OR "untitled", body: the rest of text
	 * @param text
	 */
	this.extract = function(text) {
		text = trim(text);
		var title;

		function extractTitle(match, m1) {
			title = m1;
			return '';
		}
		
		if (text.match(regHeader)) {
			text = text.replace(regHeader, extractTitle);
		}
		return {
			title: title || '',
			body: text
		};
	}
}