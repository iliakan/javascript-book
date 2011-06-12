function example1Handler(event) {
	this.innerHTML = "event.pageX="+event.pageX	
}

elem = document.getElementById("eventExample1Div")
Event.add(elem, 'click', example1Handler)
