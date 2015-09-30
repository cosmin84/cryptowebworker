// Import cryptographic libraries
importScripts('libs/jsSHA/src/sha.js');

onmessage = function(e) {
	// Create a new jsSHA object
	var shaObj = new jsSHA('SHA-256', 'TEXT');
	
	// Set the data to encrypt
	shaObj.update(e.data);
	
	// Get hash
	var hash = shaObj.getHash('HEX');

	// Return hash
	postMessage(hash);
}