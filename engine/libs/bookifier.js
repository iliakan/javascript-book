
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



	this.convert = function(url) {
		var srcLoader = new SrcLoader(url);

		var text = srcLoader.load(url.substr(url.lastIndexOf('/')+1));

		var titleExtractor = new TitleExtractor();
		var result = titleExtractor.extract(text);
		var title = result.title;
		text = result.body;

		var sections = sectionize(text);
		sections.title = title;

		var tagExpander = new TagExpander(srcLoader);

		var tocArr = [];


		sections.body = tagExpander.expandSquareTags(sections.body, tocArr);

		var tocBuilder = new TocBuilder();

		var toc = tocBuilder.build(tocArr, url);

		sections.toc = toc;

		if (sections.teaser) {
			sections.teaser = tagExpander.expandSquareTags(sections.teaser);
		}

		return sections;
	};

}
