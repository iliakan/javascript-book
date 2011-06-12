function highlight(elem, delta) {
  var from = [255,0,0], to = [255,255,255]
  animate({
    delay: 10,
    duration: 1000,
    delta: delta,
    step: function(delta) {
      elem.style.backgroundColor = 'rgb(' +
        Math.max(Math.min(parseInt((delta * (to[0] - from[0])) + from[0], 10), 255), 0) + ',' +
        Math.max(Math.min(parseInt((delta * (to[1] - from[1])) + from[1], 10), 255), 0) + ',' +
        Math.max(Math.min(parseInt((delta * (to[2] - from[2])) + from[2], 10), 255), 0) + ')'
    }
  }) 
}


function animateText(textArea) {
  var text = textArea.value
  var to = text.length, from = 0
  
  animate({
    delay: 20,
    duration: 5000,
    delta: bounce,
    step: function(delta) {
      var result = (to-from) * delta + from
      textArea.value = text.substr(0, Math.ceil(result))
    }
  })
}