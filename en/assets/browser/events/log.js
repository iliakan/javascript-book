
var timer = 0

function showmesg(t, form) {

   if (timer==0) timer = new Date()

   var tm = new Date()
   if (tm-timer > 300) {
	t = '------------------------------\n'+t
   }  
 
   var area = document.forms[form+'form'].getElementsByTagName('textarea')[0]
   
   area.value += t + '\n';
   area.scrollTop = area.scrollHeight

   timer = tm
}

function logMouse(e) {
   var evt = e.type
   while (evt.length < 11) evt += ' '
   showmesg(evt+" which="+e.which+" button="+e.button, 'test')
   return false
}

function logMouseMove(e) {
   var evt = e.type
   while (evt.length < 11) evt += ' '
   showmesg(evt+" target="+(e.target || e.srcElement).id, 'move')
   return false
}

/*  
function logKey(e) {
   var evt = e.type
   while (evt.length < 10) evt += ' '
   showmesg(evt + 'keyCode=' + keyval(e.keyCode) + ' which=' + keyval(e.which) +  ' charCode=' + keyval(e.charCode) + 
      (e.shiftKey ? ' +shift' : '') +
      (e.ctrlKey ? ' +ctrl' : '') +
      (e.altKey ? ' +alt' : '') +
      (e.metaKey ? ' +meta' : ''), 'key'
   )

} */

function keyval(n) {
   if (n == null) return 'undefined';
   var s = '' + n;
   if (n >= 32 && n < 127) s += ' ' + String.fromCharCode(n);
   while (s.length < 6) s += ' ';
   return s;
}


function logClear(form) {
	timer = 0
	document.forms[form+'form'].getElementsByTagName('textarea')[0].value ='';  
	lines=0
}
