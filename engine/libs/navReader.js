function NavReader() {

	Metadata.read();

	var navigation = Metadata.getNavigaton();

	this.buildNavigationTree = function() {
		return '<div id="navigation">'+this.buildTree(navigation)+'</div>';
	};

	this.buildTree = function(children) {
		if (!children) return '';

		var text = '<ul>';

		for(var i=0; i<children.length; i++) {
			var file = children[i]
			text += '<li>';

			if (file.children) {
				text += '<span class="folder">'+file.title+'</span>';
				text += this.buildTree(file.children);
			} else {
				text += '<a href="view.html?'+file.path+'">'+file.title+'</a>';
			}
			text += '</li>';
		}

		text += '</ul>';

		return text;
	};

}
