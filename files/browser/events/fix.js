function fixEvent(event) {
  // получить объект события
  event = event || window.event
  
  // один объект события может передаваться по цепочке разным обработчикам
  // при этом кроссбраузерная обработка будет вызвана только 1 раз
  if ( event.isFixed ) {
    return event
  }
  event.isFixed = true // пометить событие как обработанное

  // добавить preventDefault/stopPropagation для IE
  event.preventDefault = event.preventDefault || function(){this.returnValue = false}
  event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true}
  
  // добавить target для IE
  if (!event.target) {
      event.target = event.srcElement
  }

  // добавить relatedTarget в IE, если это нужно
  if (!event.relatedTarget && event.fromElement) {
      event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
  }

  // вычислить pageX/pageY для IE
  if ( event.pageX == null && event.clientX != null ) {
      var html = document.documentElement, body = document.body;
      event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
      event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
  }

  // записать нажатую кнопку мыши в which для IE
  // 1 == левая; 2 == средняя; 3 == правая
  if ( !event.which && event.button ) {
      event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
  }
  
  return event
}