SyntaxHighlighter.config.clipboardSwf = '../engine/clientlibs/syntaxhighlighter/sh/scripts/clipboard.swf';

//file:///C:/tmp/xhrtest/showdown/src/1.html?document/events/01-introduction-browser-events.md
var bookifier = new Bookifier();

Metadata.read();

if (!location.search) {
    alert('No document');
} else {
    var path = location.search.substr(1);
    sections = bookifier.convert(path);
    sections.head && document.write(sections.head);
    sections.title && document.write('<title>'+sections.title+'</title>');

    $(function() {

	    var script = document.createElement('script');
	    script.src = 'http://javascript.info/check_update.php?loc='+window.location+'&version=0.1a';
	    document.documentElement.firstChild.appendChild(script);

        var navLink = '<a href="nav.html">Navigation</a>';
        document.getElementById('content-container').innerHTML =  navLink+ '<h1>'+sections.title
                +'</h1>'+(sections.toc||'')+(sections.teaser ? (sections.teaser + '<div class="cut"></div>') : '')
                + (sections.body || '')
                + navLink;


        SyntaxHighlighter.highlight()
    })

}
