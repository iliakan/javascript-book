
if (typeof exports != 'undefined') {
	module.exports = Bookifier;
	var TagExpander = require('./tagExpander.js');
	var FormattingTagProcessor = require('./formattingTagProcessor.js');
	var AnalyzingTagProcessor = require('./analyzingTagProcessor.js');
}

/**
 * Sectionize the page and process each square tag with tagProcessor for teaser and body
 * does either formatting or structure analyze(first pass)
 */
function Bookifier() {

	// split by "=W..ord" at the beginning of line
	// sections = { teaser: ..., body: ..., meta ... 	}
	function sectionize(text) {
		var sections = {};
		var split = text.split(/^(?==\w)/mg);

		if (split[1] && split[1].match(/^=Cut/)) {
			sections.teaser = split.shift();
			// cutoff =Cut
			split[0] = split[0].substr(split[0].indexOf('\n') + 1)
		}

		sections.body = split[0];

		for (var i = 1; i < split.length; i++) {
			var name = split[i].match(/^=(\w+)/)[1].toLowerCase();
			sections[name] = split[i].substr(split[i].indexOf('\n') + 1)
		}

		return sections
	}

	this.isTask = function(url) {
		return url.match(/\/task\/[^\/]+$/);
	};

	this.convert = function(url) {
		var srcLoader = new SrcLoader(url);

		try {
			var text = srcLoader.load(url.substr(url.lastIndexOf('/')+1));
		} catch(e) {
			return {
				title: 'Error',
				body: '<div class="format-error">Error: not found '+url+'</div>'
			};
		}
		
		var titleExtractor = new TitleExtractor();
		var result = titleExtractor.extract(text);
		var title = result.title;
		text = result.body;

		if (this.isTask(url)) {
			return this.convertTask(srcLoader, title, text);
		} else {
			return this.convertBook(srcLoader, title, text);
		}
	};

	this.convertTask = function(srcLoader, title, text) {

		var taskParser = new TaskParser(srcLoader);

		return {
			title: title,
			body: taskParser.getEmbeddedText(text)
		}
	};

	this.convertBook = function(srcLoader, title, text) {

		var sections = sectionize(text);
		sections.title = title;

		var tagExpander = new TagExpander(srcLoader);

		var tocArr = [];


		sections.body = tagExpander.expandSquareTags(sections.body, tocArr);

		var tocBuilder = new TocBuilder();

		var toc = tocBuilder.build(tocArr, srcLoader.getUrl());

		sections.toc = toc;

		if (sections.teaser) {
			sections.teaser = tagExpander.expandSquareTags(sections.teaser);
		}

		return sections;
	};

}
