$(function() {
	$('#navigation').delegate('.folder', 'click', function() {
		$(this).next().toggle();
	}).bind('selectstart mousedown', function() {
		return false
	})
});

function rebuildNav() {
	alert('The applet may ask for permission. Allow it, but don\'t trust always.');

	var nav = new NavBuilder();
	nav.build(function() {
		alert('Rebuilt navigation successfully: '+new Date());
		window.location.reload(true);
	});


}