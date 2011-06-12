Event = (function() {

  // текущий номер обработчика
  var guid = 0

  function fixEvent(event) {
    // кросс-браузерная предобработка объекта-события
    // нормализация свойств и т.п.
  }

  function commonHandler(event) {
    // вспомогательный универсальный обработчик 
  }
  
  return {
    add: function(elem, type, handler) {
      // добавить обработчик события
    },
    
    remove: function(elem, type, handler) {
      // удалить обработчик события
    }
      
  }
}())
