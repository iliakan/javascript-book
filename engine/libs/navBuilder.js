function NavBuilder() {

	var appletPath = "engine/jpath/jpath.jar";
	var appletClass = "path.PathApplet";

    this.metadata = {
        domain: "javascript.info",
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

		function isNavPath(path) {
			return self._getNameFromPath(path).match(/^\d+-/) && !path.match(/\.bak$/);
		}

		// ensure we have javascript array, not java Array
		// turn it into objects with data
		for (var i = 0; i < filesFromApplet.length; i++) {
			var file = filesFromApplet[i]+'';
			if (file.charAt(0) == '*') {
				file = { path: file.slice(1) };
				if (!isNavPath(file.path)) continue;

				file.children = self._getFiles(file.path);

			} else {
				file = { path: file };
				if (!isNavPath(file.path)) continue;
                file.data = this._loadFile(file.path);
			}
			file.toString = function() { return this.path };

			files.push(file)
		}

        // extract titles for all titles
		for(var i = 0; i<files.length; i++) {
			var file = files[i];

            if (file.children) {
                /* move folder index data into folder */
                for(var i=0; i<file.children.length; i++) {
                    var c = file.children[i];

                    if (this._isFolderIndex(c.path)) {
                        file.data = c.data;
                        file.children.splice(i, 1);
                        break;
                    }
                }
            }

			this._setFileTitle(file);
			this._extractReferences(file);
//			delete file.data;
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

    this._extractReferences = function(file) {
        var self = this;
        console.log(file.path);
	    if (!file.data) return;
        console.log('has data')
        file.data.replace(/\[#([\w]+?)(\|(?:[^"]|"(?:\\.|[^"\\])*")+?)?]/im, function(m, id, title) {

            if (title) title = title.slice(1);
            self.metadata.idMap[id] = {
                href: '/'+self._pathToRelative(file.path, self.currentDir) + (file.children ? '/':''),
                title: title
            };
            return m;
        });
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
		return this._getNameFromPath(path).match(/^00\-index/i);
	};

	this._getNameFromPath = function(path) {
		return path.match(/[^\\\/]+$/)[0];
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

		this.currentDir = location.pathname.replace(/\/[^\\\/]*$/, '');

        // used in map for navigation in the book
		this.bookDir = this.currentDir+'/book/en';
		files = this._getFiles(this.bookDir);

		// full path is not needed any more
		this._convertToRelativePaths(files, this.currentDir);

		this.metadata.files = files;

		this.metadata = JSON.stringify(this.metadata);
		this.applet.saveJsonFile(bookDir, "metadata", this.metadata);
	};

	this.build = function() {
		var self = this;
		this._insertApplet(function() {
			self._doBuild();
		});
	};

}