if (typeof module != 'undefined') {
	module.exports = TaskParser;
}

/**
 * Parses the task text
 * Format:
 *
 *  Task body
 *
 *  # Hint 1
 *  lalal
 *  # Solution
 *  olala
 *
 *  -> { body: Task body, 'Hint 1': lalal, 'Solution': olala}
 */
function TaskParser(srcLoader) {

	var tagExpander = new TagExpander(srcLoader);


	function trim(str) {
		return str.replace(/^\s+|\s+$/g, '');
	}

	this.parse = function(text) {

		text = trim(text);

		var titleExtractor = new TitleExtractor();
		var res = titleExtractor.extract(text);
		text = res.body;

		var result = {
			title: tagExpander.expandSquareTags(res.title)
		};

		var splitLabel = Math.random();

		text = text.replace(/^=(.*?)$/gim, splitLabel+'$1'+ splitLabel);

		var split = text.split(splitLabel);

		result.body = tagExpander.expandSquareTags(split[0]);

		for(var i=1; i<split.length; i++) {
			result[trim(split[i])] = tagExpander.expandSquareTags(trim(split[++i]));
		}

		return result;
	};

	this.getEmbeddedText = function(text) {

		var parsed = this.parse(text);

		delete parsed.title;

		var text = '<div class="learning-task"> ';

		text += '<div class="task-formulation">'+ parsed.body + '</div>';

		delete parsed.body;

		for(var key in parsed) {
			text += '<div class="task-section-open" data-title="'+key+'">Open '+key+'</div>'
			text += '<div class="task-section">'+parsed[key]+'</div>';
		}

		text += '<a href="view.html?'+srcLoader.getUrl()+'" class="task-meta">'+srcLoader.getUrl()+'</a>';

		text += '</div>';

		return text
				
	};

}