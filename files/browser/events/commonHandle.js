function commonHandle(event) {
  // (1)
  event = fixEvent(event)
  
  // (2)
  var handlers = this.events[event.type]

  for ( var g in handlers ) {
    // (3)
    var ret = handlers[g].call(this, event)
    // (4)
    if ( ret === false ) {
        event.preventDefault()
        event.stopPropagation()
    }
  }
}
