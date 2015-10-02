// Import cryptographic libraries
importScripts('libs/jsSHA/src/sha.js');

onmessage = function(e) {	
	if (e.data == "start") {		
		// Our big array
		var a = [];		
		
		// Create a 2MB array
		for (var i = 2 * 1024 * 1024; i >= 0; i--) {
		    a.push(i);
		};

		// Get start time
		start = new Date().getTime();

		// Create a new jsSHA object
		var shaObj = new jsSHA('SHA-256', 'TEXT');			

		// Set the data to encrypt
		shaObj.update(JSON.stringify(a));		
		
		// Get hash
		var hash = shaObj.getHash('HEX');

		// Get end time
		var end = new Date().getTime();

		// Get duration
		var time = end - start;

		// Create response
		var response = '{"hash":"' + hash + '", "time":"' + time + '"}';

		// Return response
		postMessage(response);
	}
}