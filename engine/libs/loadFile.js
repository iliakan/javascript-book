/* wrapper around  XHR / fs
 * works for relative paths on client
 * */
function loadFile(src) {

	// for Windows, use ActiveX, because native XHR doesn't support files
	var xhr = window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

	try {
		xhr.open('GET', src, false);
		xhr.send(null);
	} catch(e) {
		debugger; // for easier debugging
		throw e;
	}
	return xhr.responseText.replace(/\r/g, '');
}