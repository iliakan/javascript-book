var readyList = []

function onReady(handler) {
	
	function executeHandlers() {
		for(var i=0; i<readyList.length; i++) {
			readyList[i]()
		}
	}

	if (!readyList.length) { // set handler on first run 
		bindReady(executeHandlers)
	}

	readyList.push(handler)
}
