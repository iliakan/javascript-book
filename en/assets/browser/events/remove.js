remove: function(elem, type, handler) {
  // (1)
  var handlers = elem.events && elem.events[type]  
  if (!handlers) return
  
  // (2)
  delete handlers[handler.guid]
  
  // (3)
  for(var any in handlers) return
  // (3.1)
  if (elem.removeEventListener)
    elem.removeEventListener(type, elem.handle, false)
  else if (elem.detachEvent)
    elem.detachEvent("on" + type, elem.handle)
    
  delete elem.events[type]

  // (3.2)
  for (var any in elem.events) return
  try {
    delete elem.handle
    delete elem.events 
  } catch(e) { // IE
    elem.removeAttribute("handle")
    elem.removeAttribute("events")
  }
}
  
