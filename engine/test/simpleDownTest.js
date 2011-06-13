Metadata.setup({
	idMap: {
		id: {
			href: "http://testId.com",
			title: "test id title"
		}
	}
});

var simpleDown = new SimpleDown();

test('makeLink()', function () {
	equals(simpleDown.applyFormatting('[Text]'), '[Text]', '[brackets] without () do not become a link');
	equals(simpleDown.applyFormatting('[Google](http://google.com)'), '<a href="http://google.com">Google</a>', 'Simple named link');
	equals(simpleDown.applyFormatting('[http://google.com]()'), '<a href="http://google.com">http://google.com</a>', 'Simple unnamed link');
	equals(simpleDown.applyFormatting('[http://google.com](#id)'), '<a href="http://testId.com">http://google.com</a>', 'Named link to #id');
	equals(simpleDown.applyFormatting('[](#id)'), '<a href="http://testId.com">test id title</a>', 'Unnamed link to #id');
});


test('makeHeaders()', function () {
	equals(simpleDown.makeHeaders('# Header'), '<h1 id="header">Header</h1>', 'Header 1');
	equals(simpleDown.makeHeaders('## My Header ##'), '<h2 id="my-header">My Header</h2>', 'Header 2');
	equals(simpleDown.makeHeaders('# Header [id]'), '<h1 id="id">Header</h1>', 'Header 1');
});


test('makeParagraphs()', function () {
	equals(trim(simpleDown.makeParagraphs('par 1.\n\npar 2.')), '<p>par 1.</p>\n<p>par 2.</p>', 'Paragraphs');
	equals(trim(simpleDown.makeParagraphs('par 1.\nnewline\n\npar 2.')), '<p>par 1.<br />\nnewline</p>\n<p>par 2.</p>', 'Paragraphs & Br');
});

test('makeCode()', function () {
	equals(trim(simpleDown.makeCode('`test`')), '<code>test</code>', 'Code');
	equals(trim(simpleDown.makeCode('`` `code` ``')), '<code>`code`</code>', 'Code Escaped');
});



function trim(str) {
	return str.replace(/^\s+|\s+$/gim, '');
}
