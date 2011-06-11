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
		var regHeader = /^#[ \t]*(.+?)[ \t]*(\[[\w-]+?])?\#*(?:$|\n+)/gm

		text = trim(text);

		var titleExtractor = new TitleExtractor();
		var res = titleExtractor.extract(text);
		text = res.body;

		var result = {
			title: tagExpander.expandSquareTags(res.title)
		};

		var splitLabel = Math.random();

		text = text.replace(regHeader, splitLabel+'$1'+ splitLabel);

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

		var text = parsed.body;
		for(var key in parsed) {
			if (key.match(/^hint/i)) {
				text += '<h2>'+key+'</h2>'
				text +=
			}
		}
// TODO: finish task
		return '<div class="learning-task"> \
			<div class="task-formulation">'+ parsed.body + '</div>';

<div id="learning-task-nid-118" class="learning-task learning-task-nid-118">
<div class="task-formulation">There is a message list. Add a delete button to each message to remove it.
<p>The result:<br />
<iframe onload="iframeResize(this)" frameborder="0" style="display:none;border:none" src="/files/tutorial/browser/events/messages/"></iframe>
</p>
<p>The source is <a href="/play/tutorial/browser/events/messages-src" class="liplay" target="_blank">here</a>.
</p></div>
<p><span class="task-solution-open">Open solution</span></p>
<div class="task-solution">
<div class="learning-task-solution-header">Solution</div>

<p>The solution is shown <a href="/play/tutorial/browser/events/messages" class="liplay" target="_blank">here</a>.
</p>
</div>
</div>
				
	};

}