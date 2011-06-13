if (typeof module != 'undefined') {
	console.log("NOT READY");
}

/**
 * Uses loadFile to actually get the file
 * @param url
 */
function SrcLoader(url) {

	this.getBaseDir = function() {
		if (url.lastIndexOf('/')) {
			return url.substr(0, url.lastIndexOf('/'));
		} else {
			return '.';
		}
	};

	this.getUrl = function() {
		return url;
	};

	/**
	 * Returns full URL to src, from current dir
	 * Uses this.baseDir for relative urls
	 * @param src
	 */
	this.getFullUrl = function(src) {

		if (src.charAt(0) == '/') {
			src = fixAbsoluteSrc(src); // /tutorial/bla -> tutorial/bla (relative)
		} else {
			src = this.getBaseDir() + '/' + src;
		}

		return src;
	};

	/**
	 * Creates srcLoader for another base url
	 * It can be used to load srcs, given in that file
	 * @param src new baseDir
	 */
	this.createRelativeLoader = function(src) {
		return new SrcLoader(this.getFullUrl(src));
	};


	this.load = function(src) {

		src = this.getFullUrl(src);

		return loadFile(src);

	}

}
