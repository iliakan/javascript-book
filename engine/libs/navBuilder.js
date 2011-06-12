function NavBuilder() {

	var appletPath = "../engine/jpath/jpath.jar";
	var appletClass = "path.PathApplet";

	this.metadata = {
		idMap: {}
	};

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


		// we search process all markdown files for references
		function isMarkDown(path) {
			return path.match(/\.md$/i);
		}

		// ensure we have javascript array, not java Array
		// turn it into objects with data
		for (var i = 0; i < filesFromApplet.length; i++) {
			var file = filesFromApplet[i] + '';
			if (file.charAt(0) == '*') { // applet marks folder by prepending with *
				file = { path: file.slice(1) };

				file.children = self._getFiles(file.path);

			} else {
				file = { path: file };
				if (!isMarkDown(file.path)) continue;
				file.data = this._loadFile(file.path);
			}
			file.toString = function() {
				return this.path
			};

			files.push(file)
		}

		// extract titles for all titles
		for (var i = 0; i < files.length; i++) {
			var file = files[i];

			if (file.children) {
				/* move folder index data into folder */
				for (var j = 0; j < file.children.length; j++) {
					var c = file.children[j];

					if (this._isFolderIndex(c.path)) {
						file.data = c.data;
						// let index remain in nav, so an editor can browse it
						// file.children.splice(j, 1);
						c.title = 'Index';
						break;
					}
				}
			}

			this._setFileTitle(file);
			this._extractReferences(file);

		}


		return files;
	};

	/**
	 * Clear data, non-navigational files, sort
	 * @param files
	 */
	this._finalizeFiles = function(files) {
		var self = this;
		
		function isNavPath(path) {
			return self._getNameFromPath(path).match(/^\d+-/) && !path.match(/\.bak$/);
		}

		for(var i=0; i<files.length; i++) {
			var file = files[i];
			// we had to process any markdown for references, but we leave only nav path for metadata
			if (!isNavPath(file.path)) {
				files.splice(i--, 1);
			}

			if (file.children) {
				this._finalizeFiles(file.children)
			}

			delete file.data;
		}

		files.sort(function(a, b) {
			// extract and compare file names, not paths
			return self._getNameFromPath(a.path) > self._getNameFromPath(b.path)
		});
	};

	this._pathToRelative = function(src, dir) {
		// Converting src to relative path, stripping given dir
		// TESTED only on WINDOWS yet
		src = '/' + src.replace(/\\/g, '/');
		src = src.replace(dir, '');
		src = src.replace(/^\/+/g, '');
		return src;
	};

	this._loadFile = function(src) {

		src = this._pathToRelative(src, this.currentDir);

		// I can only ask files under my dir
		return loadFile(src);
	};

	this._extractReferences = function(file) {
		if (this._isFolderIndex(file.path)) {
			// folder indexes data is copied to folders and processed later (we're on postorder walk)
			return;
		}

		var self = this;

		if (!file.data) return;

		var href = self._pathToRelative(file.path, self.bookDir) + (file.children ? '/00-index.md' : '');

		var idMap = this.metadata.idMap;

		var tagExpander = new TagExpander(new SrcLoader(file.path));
		var res = tagExpander.extractTags(file.data);
		var text = res.text; // text without tags

		// [#id] references
		text.replace(/\[#([\w-]+?)(\|(?:[^"]|"(?:\\.|[^"\\])*")+?)?]/gim, function(m, id, title) {
			if (title) title = title.slice(1);
			if (idMap[id]) {
				alert("Duplicate id:"+id+", clash at href:"+idMap[id].href+" title:"+idMap[id].title);
			}
			//console.log("1.add ", id, file.path)
			idMap[id] = {
				href: href, title: title
			};
			return m;
		});

		// ## Header  [id] 
		text.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*(\[[\w-]+?])?\#*(?:$|\n+)/gm,
			function(m, m1, m2, m3) {
				var id = m3 && m3.slice(1, -1);
				if (!id) return m; // header without id => no reference

				if (idMap[id]) {
					alert("Duplicate id:"+id+" in "+file.path+", clash at href:"+idMap[id].href+" title:"+idMap[id].title);
				}
				//console.log("2.add ", id, file.path)
				idMap[id] = {
					href: href,
					title: m2
				};
				return m;
			}
		);

	};

	this._setFileTitle = function(file) {
		var titleExtrator = new TitleExtractor();

		if (file.data) {
			file.title = titleExtrator.extract(file.data).title;
		}

		if (!file.title) {
			file.title = this._getNameFromPath(file.path);
		}
	};


	this._isFolderIndex = function(path) {
		return this._getNameFromPath(path) == '00-index.md';
	};

	this._getNameFromPath = function(path) {
		return path.match(/[^\\\/]+$/)[0];
	};

	this._convertToRelativePaths = function(files, dir) {

		for (var i = 0; i < files.length; i++) {
			files[i].path = this._pathToRelative(files[i].path, dir);

			if (files[i].children) {
				this._convertToRelativePaths(files[i].children, dir);
			}
		}

	};

	// applet ready now
	this._doBuild = function() {

		this.currentDir = location.pathname.replace(/\/[^\\\/]*$/, '');

		// used in map for navigation in the book
		this.bookDir = this.currentDir; // + '/book/en';
		files = this._getFiles(this.bookDir);

		// full path is not needed any more
		// metadata paths and refs inside itis per-language
		// different languages may have same references.
		this._convertToRelativePaths(files, this.bookDir);
		this._finalizeFiles(files);
		
		this.metadata.navigation = files;

		this.metadata = JSON.stringify(this.metadata);

		this.applet.saveJsonFile(this.bookDir, "metadata", this.metadata);
	};

	this.build = function(cb) {
		var self = this;
		this._insertApplet(function() {
			self._doBuild();
			cb();
		});
	};

}