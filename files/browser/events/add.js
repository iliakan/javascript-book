add: function(elem, type, handler) {
  // исправляем небольшой глюк IE с передачей объекта window
  if (elem.setInterval && ( elem != window && !elem.frameElement ) ) {
	elem = window;
  }
  
  // (1)
  if (!handler.guid) {
    handler.guid = ++guid
  }
  
  // (2)
  if (!elem.events) {
	elem.events = {}
	
	elem.handle = function(event) {
	  if (typeof Event !== "undefined") {
		return commonHandle.call(elem, event)
	  }
	}
  }
  
  // 3  
  if (!elem.events[type]) {
    elem.events[type] = {}        
  
    if (elem.addEventListener)
      elem.addEventListener(type, elem.handle, false)
    else if (elem.attachEvent)
      elem.attachEvent("on" + type, elem.handle)
  }
  
  // (4)
  elem.events[type][handler.guid] = handler
}