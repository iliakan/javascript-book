
if (typeof module != 'undefined') {
	module.exports = TagExpander;
	Showdown = require('./showdown.js');
}

function TagExpander(srcLoader) {

	// these keywords can be used as [ref ], without closing [/ref]
	var keywordsSelfClose = 'img todo try play iframe task see'.split(' ');

	var langs = 'css java ruby js php txt py xml xslt html erl as';

	var keywordsNeedClose = ('sum verbatim link smart warn ponder'+' '+langs).split(' ');


	// str = 'str="lala\\" ]" test=5 blabla "test\\"]" | help me'
	// console.dir(parseAttrs(str)) -> {str: lala\", test: 5, "test\"\": true, vertical: help me}
	function parseAttrs(attrs) {
		var tokens = attrs.match(/"(\\[\s\S]|[^"\\])*"|\|[\s\S]*|=|[\w\/.-]+|[^\s"]/g);

		if (!tokens) {
			return {};
		}

		var result  = {};

		if (tokens[tokens.length - 1].charAt(0) == '|') { // [ref lalala |my text]
			result.vertical = tokens.pop().substr(1);
		}

		for (var i = 0; i < tokens.length; i++) { // strip quotes from tokens, "lala \" " -> lala "
			if (tokens[i].charAt(0) == '"') {
				tokens[i] = tokens[i].slice(1,-1).replace(/\\"/g, '"');
			}
		}

		for (var i = 0; i < tokens.length; i++) {
			var name = tokens[i].toLowerCase();
			if (tokens[i + 1] == '=') {
				result[name] = tokens[i + 2];
				i += 2;
			} else {
				result[name] = true;
			}
		}
		return result;
	}

	/**
	 * extracts tags, leaving bare labelled text + labels, ready for processing
	 * @param text
	 */
	this.extractTags = function(text) {

		// '[ref str="lala ]" test=5 blabla "test\"]"]' -> $0, ref, all the rest
		// the regexp allows backslashed quotes inside quotes " \" "
		// the regexp allows [] inside quotes: [ref str="[Class]"]

		// helper: string with \": /" (  \\.  |  [^"\\]  )* "/x
		var regSelfCloseTags = new RegExp((
			'\\[(' + keywordsSelfClose.join('|') + ')\\s+' +
				'((?:  [^"]  |  "(?: \\\\[\\s\\S] | [^"\\\\] ){0,200}")+?)' + // not a quote | quoted string with \" inside
				']').replace(/\s+/g, ''), 'gi');   // { 0, 200 } is limit on parameter length.
		// required to detect and stop matching on unclosed quotes
		// for example: [ref id="something] long text ... lalala [another tag.. ] will not match as [ref ... another tag.. ]

		var regNeedCloseTags = new RegExp((
			'\\[(' + keywordsNeedClose.join('|') + ')(?: \\s+' +
				'((?:  [^"]  |  "(?: \\\\[\\s\\S] | [^"\\\\] )*")+?)?' +
				')?]([\\s\\S]*?)\\[/\\1]').replace(/\s+/g, ''), 'gi');

		var labels = {};

		// we need to extract tags, convert them and then insert back
		// that's because each tag handles markdown by itself and doesn't need to be remarkdowned

        function process(match, tag, attrs, body, offset, s) {
			attrs = attrs || '';

            if (arguments.length < 6) { // match, tag, attrs, offset, s, no body
                body = '';
            }

			var label = '@@'+Math.random();
			labels[label] = function() { // postpone procession (maybe we just extracting tags, not want to process them
				var tagProcessor = new FormattingTagProcessor(srcLoader);
				return tagProcessor.processSquareTag({match:match, tag: tag, attrsMatch:attrs, attrs: parseAttrs(attrs), body: body });
			};
			return label;
		}

		text = text.replace(regNeedCloseTags, process);

		text = text.replace(regSelfCloseTags, process);

		return {
			text: text,
			labels: labels
		};

	};

	/**
	 * Extract all [tags.. ] from the text and pass them to tagProcessor.processSquareTag
	 * @param text with square tags
	 */
	this.expandSquareTags = function(text, tocArr) {

		var extracted = this.extractTags(text);

		text = extracted.text;
		var labels = extracted.labels;

        // references do not have space after #, remove them
        text = text.replace(/\[#([\w-]+?)(\|(?:[^"]|"(?:\\.|[^"\\])*")+?)?]/gim, '');

//		console.dir(labels)

//		console.log('out 1: '+text)


		var simpleDown = new SimpleDown();

		text = simpleDown.makeHtml(text, tocArr);

//		console.log('out 2: '+text)

		for(var label in labels) {
			var res = labels[label]();
			text = text.replace('<p>'+label + '</p>', res);
			text = text.replace(label, res);
		}

//		console.log('out 3: '+text)


		return text;
	};
}