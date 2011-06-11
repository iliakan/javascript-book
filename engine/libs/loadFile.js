/* wrapper around  XHR / fs
 * works for relative paths on client
 * */
function loadFile(src) {
	try {
		xhr.open('GET', src, false);
		xhr.send(null);
	} catch(e) {
		debugger; // for easier debugging
		throw e;
	}
	return xhr.responseText.replace(/\r/g, '');
}