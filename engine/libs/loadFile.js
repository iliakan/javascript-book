/* wrapper around  XHR / fs
 * works for relative paths on client
 * */
function loadFile(src) {

	if (src.match('://')) {
		throw new Error('External src is not allowed: '+src);
	}
	
	// for Windows, use ActiveX, because native XHR doesn't support files
	var xhr = window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

	try {
		xhr.open('GET', src, false);
		xhr.send(null);
	} catch(e) {
		console && console.log("xhr error for "+src);
		//debugger; // for easier debugging
		throw e;
	}
	return xhr.responseText.replace(/\r/g, '');
}

function fixAbsoluteSrc(src) {
	if (src.charAt(0) == '/') {
		src = src.slice(1);
	}
	return src;
}
