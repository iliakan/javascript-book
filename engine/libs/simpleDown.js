/**
 * Markdownish format
 * inspired and partially borrowed from showDown.js from attacklab
 */
function SimpleDown() {

	/**
	 * Applies formatting, suitable for inline attributes like header="..."
	 * @param text
	 */
	this.applyFormatting = function(text) {
		text = this.makeLinks(text);

		text = this.makeCode(text);
		text = this.encodeAmpsAndAngles(text);

		return text;
	};


	this.makeHtml = function(text, tocObj) {

		// Split at <pre>, <script>, <style> and </pre>, </script>, </style> tags.
		// We don't apply any processing to the contents of these tags to avoid messing
		// up code. We look for matched pairs and allow basic nesting. For example:
		// "processed <pre> ignored <script> ignored </script> ignored </pre> processed"
		//var text = 'lala <script> test </script> bb';

		var labels = {};
		text = text.replace(/<!--[\s\S]*?-->|<(pre|script|style|object).*?>.*<\/\1>/gim, function(match) {
			var label = '<div>@@' + Math.random() + '</div>';
			labels[label] = match;
			return label;
		});

		text = this.deTab(text);

		text = this.makeHeaders(text, tocObj);
		text = this.applyFormatting(text);
		text = this.makeParagraphs(text);
		text = this.makeItalicsAndBold(text);

		for (var label in labels) {
			text = text.replace(label, labels[label])
		}


		return text;
	};

	this.makeCode = function(text) {

		/*
		 text = text.replace(/
		 (^|[^\\])					// Character before opening ` can't be a backslash
		 (`+)						// $2 = Opening run of `
		 (							// $3 = The code block
		 [^\r]*?
		 [^`]					// attacklab: work around lack of lookbehind
		 )
		 \2							// Matching closer
		 (?!`)
		 /gm, function(){...});
		 */
		var self = this;
		text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
			function(wholeMatch, m1, m2, m3) {
				var c = m3;
				c = c.replace(/^([ \t]*)/g, "");	// leading whitespace
				c = c.replace(/[ \t]*$/g, "");	// trailing whitespace
				c = self.encodeCode(c);
				return m1 + "<code>" + c + "</code>";
			});

		return text;
	};

	this.encodeCode = function(text) {
//
// Encode/escape certain characters inside Markdown code runs.
// The point is that in code, these characters are literals,
// and lose their special Markdown meanings.
//
		// Encode all ampersands; HTML entities are not
		// entities within a Markdown code span.
		text = text.replace(/&/g, "&amp;");

		// Do the angle bracket song and dance:
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");

		return text;
	};


	this.makeItalicsAndBold = function(text) {

		// <strong> must go first:
		text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,
			"<strong>$2</strong>");

		text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,
			"<em>$2</em>");

		return text;
	};


	this.makeParagraphs = function(text) {
		// All block level tags

		var block = '(?:table|thead|tfoot|caption|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|p|h[1-6]|hr)';

		text = text.replace(/\n*$/, '') + "\n\n"; // just to make things a little easier, pad the end
		text = text.replace(/<br \/>\s*<br \/>/gim, "\n\n");
		text = text.replace(new RegExp('(<' + block + '[\\s\\S]*?>)', 'gim'), "\n$1"); // Space things out a little

		text = text.replace(new RegExp('(</' + block + '>)', 'gim'), "\n$1"); // Space things out a little
		text = text.replace(/\n\n+/gim, "\n\n"); // take care of duplicates
		text = text.replace(/^\n|\n\s*\n$/g, '');
		text = '<p>' + text.replace(/\n\s*\n\n?(.)/g, "</p>\n<p>$1") + "</p>\n"; // make paragraphs, including one at the end
		text = text.replace(/<p>(<li.+?)<\/p>/gim, "$1"); // problem with nested lists
		text = text.replace(/<p><blockquote([^>]*)>/gim, "<blockquote$1><p>");
		text = text.replace(/<\/blockquote><\/p>/gim, '</p></blockquote>');

		text = text.replace(/<p>\s*<\/p>\n?/gim, ''); // under certain strange conditions it could create a P of entirely whitespace
		text = text.replace(new RegExp('<p>\\s*(</?' + block + '[^>]*>)', 'gim'), "$1");
		text = text.replace(new RegExp('(</?' + block + '[^>]*>)\\s*</p>', 'gim'), "$1");

		text = text.replace(/\s*\n(?!\s*<\/)/gim, "<br />\n"); // make line breaks but not before tag end
		text = text.replace(new RegExp('(</?' + block + '[^>]*>)\\s*<br />', 'gim'), "$1");
		text = text.replace(/<br \/>(\s*<\/?(?:p|li|div|th|pre|td|ul|ol)>)/, '$1');
		//text = text.replace(/&([^#])(?![A-Za-z0-9]{1,8};)/, '&amp;$1');
		return text;
	};


	this.encodeAmpsAndAngles = function(text) {
		// Smart processing for ampersands and angle brackets that need to be encoded.

		// Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
		//   http://bumppo.net/projects/amputator/
		text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");

		// Encode naked <'s
		text = text.replace(/<(?![a-z\/?\$!])/gi, "&lt;");

		return text;
	};


	this.makeLinks = function(text) {
		var regQuotedLinks = /\["((?:\\.|[^"\\])*)"]\((\S*?)\)/gi;
		var regLinks = /\[(.*?)]\((\S*?)\)/gi;

		function processLink(match, text, url) {
			url = url || text; // when no url (empty round brackets), it means "take from text"

			if (url.charAt(0) == '#') {
				var id = url.slice(1);
				url = Metadata.idToHref(id);
				if (!url) {
					return '<div class="format-error">ERROR: not found link '+url+'</div>';
				}
				if (!text) {
					text = Metadata.idToTitle(id);
				}
			}

			if (!text) text = '&raquo;&raquo;';

			return '<a href="' + url + '">' + text + '</a>';
		}

		text = text.replace(regQuotedLinks, processLink);
		text = text.replace(regLinks, processLink);

		return text;
	};


	this.makeHeaders = function(text, tocObj) {

		// atx-style headers:
		//  # Header 1
		//  ## Header 2
		//  ## Header 2 with closing hashes ##
		//  ...
		//  ###### Header 6 [lalala]  <-- sets id
		//

		var self = this;
		text = text.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*(\[[\w-]+?])?\#*(?:$|\n+)/gm,
			function(wholeMatch, m1, m2, m3) {
				var level = m1.length; // h1 should be only in title
				var id = (m3 && m3.slice(1, -1) || Metadata.makeHeaderId(m2));

				var title = self.applyFormatting(m2);
				if (tocObj) {
					tocObj.push({
						level: level,
						id: id,
						title: title
					})
				}

				return "<h" + level + ' id="' + id + '">' + title + "</h" + level + ">";
			}
		);


		return text;
	};

	this.deTab = function(text) {
		// attacklab: Detab's completely rewritten for speed.
		// In perl we could fix it by anchoring the regexp with \G.
		// In javascript we're less fortunate.

		// expand first n-1 tabs
		text = text.replace(/\t(?=\t)/g, "    "); // attacklab: g_tab_width

		// replace the nth with two sentinels
		text = text.replace(/\t/g, "~A~B");

		// use the sentinel to anchor our regex so it doesn't explode
		text = text.replace(/~B(.+?)~A/g,
			function(wholeMatch, m1) {
				var leadingText = m1;
				var numSpaces = 4 - leadingText.length % 4;  // attacklab: g_tab_width

				// there *must* be a better way to do this:
				for (var i = 0; i < numSpaces; i++) leadingText += " ";

				return leadingText;
			}
		);

		// clean up sentinels
		text = text.replace(/~A/g, "    ");  // attacklab: g_tab_width
		text = text.replace(/~B/g, "");

		return text;
	};

}
