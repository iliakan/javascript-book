
var Metadata = new function() {

	this.setup = function(obj) {
		metadata = obj;
	};

	this.getDomain = function() {
		if (!metadata.domain) {
			throw new Error("No domain in metadata")
		}

		return metadata.domain;
	};

	this.idToHref = function(id) {
		var href = metadata && metadata.idMap && metadata.idMap[id].href;
		return href || "javascript:alert('ID: " + id + "');return false";
	};

	this.idToTitle = function(id) {
		return metadata && metadata.idMap && metadata.idMap[id].title;
	};

	var headerId = 1

	/**
	 * Makes header id from title.
	 * If fails to convert, uses a number
	 *
	 * TODO: translit for Russian, something like that for other languages?
	 * 
	 * @param title
	 */
	this.makeHeaderId = function(title) {
		var id = title.replace(/[^\w]+/g, '-').toLowerCase();
		id = id.replace(/^-|-$/g, '');

		if (!id) {
			id = 'h'+ headerId++
		}
		return id
	}

};