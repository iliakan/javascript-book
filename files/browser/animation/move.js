function move(element, delta, duration) {
  var to = 500
  
  animate({
    delay: 10,
    duration: duration || 1000, // 1 sec by default
    delta: delta,
    step: function(delta) {
      element.style.left = to*delta + "px"    
    }
  })
  
}