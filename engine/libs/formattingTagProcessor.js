if (typeof module != 'undefined') {
	module.exports = FormattingTagProcessor;
	var Bookifier = require('./bookifier.js');
	var TagExpander = require('./tagExpander.js');
	var TaskParser = require('./taskParser.js');

}

/**
 * Formats each square tag with processSquareTag.
 * Can work with or without metadata.
 *
 * Currently, required to be reenterant for performance.
 *
 * @param srcLoader loads URL from src
 * @param metadata id structure for interlinking (optional)
 * matadata = {
 * idMap.href[id] -> href for id
 * idMap.title[id] -> title for id
 * }
 */
function FormattingTagProcessor(srcLoader) {

	var langs = 'css java ruby js php txt py xml xslt html erl as'.split(' ');
	var blocks = 'smart warn ponder summary'.split(' ');

	/**
	 * Replace square tag
	 * @param match
	 * @param tag The tag name, like "reg"
	 * @param attrs Tag attributes in object(parsed) form
	 * @param attrsMatch Tag attributes in string form
	 * @param body Tag body or undefined if absent
	 */
	this.processSquareTag = function(data) {
		data.tag = data.tag.toLowerCase();

		for (var i = 0; i < langs.length; i++) {
			if (langs[i] == data.tag) {
				return this.lang(data);
			}
		}

		for (i = 0; i < blocks.length; i++) {
			if (blocks[i] == data.tag) {
				return this.block(data.tag, data);
			}
		}

		if (!this[data.tag]) return data.match;

		return this[data.tag](data)
	};

/*
	// [link ref="..."]...[/link]
	// TODO: remove, deprecated
	this.link = function(data) { // Linking to files is prohibited. Link only to ref

		return '<a href="' + Metadata.idToHref(data.attrs.id) + '">' + (data.attrs.body || Metadata.idToTitle(data.attrs.id) || 'Link: ' + data.attrs.id) + '</a>';
	};
*/
	// remove all planning stuff like [todo ...]
	this.todo = function() {
		return '';
	};

	// TODO!
	// check for file.
	// if fails, check for file/.play
	// if fails, return <div class="format-error">ERROR ... </div>
	this.play = function(data) {
		var attrs = data.attrs;

		// try to load play from the given url
		try {
			var text = srcLoader.load(attrs.src);
		} catch(e) {
		}

		if (!text) {
			// now check if src is a directory enabled for .play
			try {
				text = srcLoader.load(attrs.src + '/index.html');
				attrs.src += '/index.html'
			} catch(e) {
			}
		}

		if (!text) {
			return '<div class="format-error">ERROR: no such play: '+attrs.src+'</div>';
		}
		var url = srcLoader.getFullUrl(attrs.src);

		// TODO: add online mode
		// Metadata.getDomain()+'/play/
		var title = attrs.vertical || attrs.src;
		return '<a href="'+url+'" class="liplay" target="_blank">'+title+'</a>';
		//debugger
	};

	// [task src="..."]
	this.task = function(data) {
		var text = srcLoader.load(data.attrs.src);

		var loader = srcLoader.createRelativeLoader(data.attrs.src);

		var taskParser = new TaskParser(loader);

		return taskParser.getEmbeddedText(text);
	};

	this.img = function(data) {
		return '<img ' + data.attrsMatch + '>';
	};

	// [verbatim] ... [/verbatim] leaves contents as is
	this.verbatim = function(data) {
		return data.match;
	};

	this.iframe = function(data) {

		var attrs = data.attrs;
		var height = attrs.height;

		if (height && +height + '' == height) height += 'px';

		var border = attrs.border ? '1px solid black' : 'none';
		var src = srcLoader.getFullUrl(attrs.src);

		if (height) {
			var result = '<iframe frameborder="0" style="width:100%;height:' + height + ';border:' + border + '" src="' + src + '"></iframe>';
		} else {
			result = '<iframe onload="iframeResize(this)" frameborder="0" style="display:none;border:' + border + '" src="' + src + '"></iframe>';
		}

		if (attrs.hide) {
			var hideText = attrs.hide !== true ? attrs.hide : 'Click to open';
			result = result.replace(/'/g, "\\'").replace(/"/g, '&quot;');

			// TODO: replace div by iframe, not innerhtml it
			// TODO: untested
			result = '<div style="cursor: pointer;text-decoration: underline; color: #39c" onclick="this.innerHTML=\'' + result + '\';this.parentNode.replaceChild(this.firstChild, this)">' + hideText + '</div>';
		}

		return result;

	};


	this.block = function(blockName, data) {
		var result = '<div class="' + blockName + '">';

		if (data.attrs.header) {
			result += '<div class="' + blockName + '-header">' + data.attrs.header + '</div>';
		}


		var tagExpander = new TagExpander(srcLoader);
		result += tagExpander.expandSquareTags(data.body) + '</div>';

		return result;
	};

	this.lang = function(data) {
		var className = [];
		if (data.tag == 'html') {
			className.push('brush:js');
			className.push('html-script:true');
		} else {
			className.push('brush:' + data.tag);
		}
		var code = data.body, attrs = data.attrs;

		var lines = code.match(/\n/g) || [];

		if (lines.length <= 2 && !attrs.run) {
			// simple non-runnable scripts without line numbers
			className.push('light:true');
		}


		if (attrs.autorun) {
			className.push('autorun:true');
		}

		if (attrs.untrusted) {
			className.push('untrusted:true');
		}

		if (attrs.run || attrs.autorun) {
			if (data.tag == 'html') {

				if (attrs.height !== undefined) {
					if (attrs.height == 'auto') className.push('height:auto');
					else className.push('height:' + parseInt(attrs.height));
				}
				if (attrs.width !== undefined) {
					className.push('width:' + parseInt(attrs.height));
				}
			}
		}


		if (attrs.run) {
			className.push('run:true');
		}

		if (attrs.nouserhighlight) {
			className.push('noUserHighlight:true');
		}

		if (attrs.nolines) {
			className.push('gutter:false');
		}

		if (attrs.firstline) {
			className.push('first-line:'.intval(attrs.firstline));
		}

		if (attrs.nolinks) {
			className.push('auto-links:false');
		}

		if (attrs.hide) {
			if (attrs.hide === true) {
				className.push('collapse:true');
			} else {
				className.push('collapse:\'' + attrs.hide + '\'');
			}
		}

		className = 'source ' + className.join(';');

		var style = [];
		if (attrs['code-height'] && parseInt(attrs['code-height']) < 600) {
			style.push('height:'.parseInt(attrs['code-height']) + 'px');
		}

		style = style.join(';');

		if (attrs.src) {
			try {
				code = srcLoader.load(attrs.src);
			} catch(e) {
				return '<div class="format-error">ERROR: failed to load src="'+attrs.src+'"</div>';
			}
		}

		var result = "<pre class=\"" + className + "\" style=\"" + style + "\">\n" + code + "\n</pre>";

		/* TODO?
		 if ($params['example.title']) {
		 $result = '<div class="example-title">'.t('Example').
		 ': '.$params['example.title'].
		 '</div>'.
		 "\n".$result;
		 }
		 */

		return result;
	}


}


