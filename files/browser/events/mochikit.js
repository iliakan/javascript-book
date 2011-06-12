function commonHandle(event) {
  event = fixEvent(event)
  handlers = this.events[event.type]
  
  // (1)
  var errors = []
 
  for ( var g in handlers ) {
    try {
      var ret =  handlers[g].call(this, event)
      if ( ret === false ) {
        event.preventDefault()
        event.stopPropagation()
      }
    } catch(e) {
      // (2)
      errors.push(e)
    }
  }
  
  // (3)
  if (errors.length == 1) {
      throw errors[0]
  } else if (errors.length > 1) {
      var e = new Error("Multiple errors thrown in handling 'sig', see errors property");
      e.errors = errors
      throw e
  }  
}
