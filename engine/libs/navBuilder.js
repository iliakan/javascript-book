function NavBuilder() {

	var appletPath = "engine/jpath/jpath.jar";
	var appletClass = "path.PathApplet";
	/**
	 * Returns callback which triggers when applet is ready
	 */
	this._insertApplet = function(callback) {
		var a = this.applet = document.createElement('applet');
		a.setAttribute('code', appletClass);
		a.setAttribute('archive', appletPath);
		a.setAttribute('width', '1');
		a.setAttribute('height', '1');

		document.body.appendChild(a);

		var interval = setInterval(function() {
			try {
				a.getCodeBase();
			} catch(e) {
				return;
			}

			clearInterval(interval);
			callback();
		}, 100)
	};

	this._getFiles = function(dir) {
		var filesFromApplet = this.applet.getDirectoryPaths(dir);

		var files = [];
		var self = this;

		function isNavPath(path) {
			return self._getNameFromPath(path).match(/^\d+-/) && !path.match(/\.bak$/);
		}

		// ensure we have javascript array, not java Array
		// turn it into objects
		for (var i = 0; i < filesFromApplet.length; i++) {
			var file = filesFromApplet[i]+'';
			if (file.charAt(0) == '*') {
				file = { path: file.slice(1) };
				if (!isNavPath(file.path)) continue;

				file.children = self._getFiles(file.path);

			} else {
				file = { path: file };
				if (!isNavPath(file.path)) continue;
			}
			file.toString = function() { return this.path };
			files.push(file)
		}

		for(var i = 0; i<files.length; i++) {
			this._setFileTitle(files[i]);
		}

		files.sort(function(a,b) {
			// extract and compare file names, not paths
			return self._getNameFromPath(a.path) > self._getNameFromPath(b.path)
		});

		return files;
	};

	this._pathToRelative = function(src, dir) {
		// Converting src to relative path, stripping given dir
		// TESTED only on WINDOWS yet
		src = '/'+ src.replace(/\\/g, '/');
		src = src.replace(dir, '');
		src = src.replace(/^\/+/g, '');
		return src;
	};

	this._loadFile = function(src) {

		src = this._pathToRelative(src, this.currentDir);

		// I can only ask files under my dir
		return loadFile(src);
	};

	this._setFileTitle = function(file) {
		var titleExtrator = new TitleExtractor();

		if (!file.children) {

			var data = this._loadFile(file.path);
			file.title = titleExtrator.extract(data).title;

		} else {

			// find a file starting with 00-index
			for(var i=0; i<file.children.length; i++) {
				var c = file.children[i];

				if (this._getNameFromPath(c.path).match(/^00\-index/i)) {
					var data = this._loadFile(c.path);
					file.title = titleExtrator.extract(data).title;
					break;
				}
			}

		}

		if (!file.title) {
			file.title = this._getNameFromPath(file.path);
		}
	};

	this._getNameFromPath = function(path) {

		return path.match(/[^\\\/]+$/)[0]

	};

	this._convertToRelativePaths = function(files, dir) {

		for(var i=0; i<files.length; i++) {
			files[i].path = this._pathToRelative(files[i].path, dir);

			if (files[i].children) {
				this._convertToRelativePaths(files[i].children, dir);
			}
		}

	};

	// applet ready now
	// TODO: extract ids
	this._doBuild = function() {

		var metadata = {};
		this.currentDir = location.pathname.replace(/\/[^\\\/]*$/, '');

		var bookDir = this.currentDir+'/book/en';
		files = this._getFiles(bookDir);

		// full path is not needed any more
		this._convertToRelativePaths(files, bookDir);

		metadata.files = files;

		metadata = JSON.stringify(metadata)
		this.applet.saveJsonFile(bookDir, "metadata", metadata);
	};

	this.build = function() {
		var self = this;
		this._insertApplet(function() {
			self._doBuild();
		});
	};

}