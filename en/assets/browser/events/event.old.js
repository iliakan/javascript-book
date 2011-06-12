Event = (function() {

  var guid = 0
    
  function fixEvent(event) {
    if ( event.isFixed ) {
      return event
    }
    event.isFixed = true 
  
    event.preventDefault = event.preventDefault || function(){this.returnValue = false}
    event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true}
    
    if (!event.target) {
        event.target = event.srcElement
    }
  
    if (!event.relatedTarget && event.fromElement) {
        event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
    }
  
    if ( event.pageX == null && event.clientX != null ) {
        var html = document.documentElement, body = document.body;
        event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
    }
  
    if ( !event.which && event.button ) {
        event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
    }
  }  
  
  function commonHandle(elem, type, event) {
    fixEvent(event)
    
    handlers = elem.events[type]

	for ( var g in handlers ) {
      var handler = handlers[g]

      var ret = handler.call(elem, event)
      if ( ret === false ) {
          event.preventDefault()
          event.stopPropagation()
      }
    }
  }
  
  return {
    add: function(elem, type, handler) {
      if (elem.setInterval && ( elem != window && !elem.frameElement ) ) {
        elem = window;
      }
      
      if (!handler.guid) {
        handler.guid = ++guid
      }
      
      if (!elem.events) {
        elem.events = {}
      }      
      if (!elem.events[type]) {
        elem.events[type] = {}        
      
        elem.handle = function(event) {
          commonHandle(elem, type, event)
        }
        
        if (elem.addEventListener)
		  elem.addEventListener(type, elem.handle, false)
		else if (elem.attachEvent)
          elem.attachEvent("on" + type, elem.handle)
      }
      
      elem.events[type][handler.guid] = handler
    },
    
    remove: function(elem, type, handler) {
      var handlers = elem.events && elem.events[type]
      
      if (!handlers) return
      
      delete handlers[handler.guid]
      
      for(var any in handlers) { break; }
      if (!any) {
        if (elem.removeEventListener)
          elem.removeEventListener(type, elem.handle, false);
        else if (elem.detachEvent)
          elem.detachEvent("on" + type, elem.handle);
          
        delete elem.events[type]
      }
      
    } 
  }
}())