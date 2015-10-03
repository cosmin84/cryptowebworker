// Import cryptographic libraries
importScripts('libs/jsSHA/src/sha.js');
importScripts('libs/SparkMD5/spark-md5.js');

self.onmessage = function(e) {	
	if (e.data.command == 'start') {		
		// Our big array
		var a = [];		
		
		// A string with possible chars that will be used to generate a random char
		var chars = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    	 
		// Create a 2MB array
		for (var i = 2 * 1024 * 1024; i >= 0; i--) {
		    a.push(chars.substr( Math.floor(Math.random() * 62), 1));
		};

		var s = JSON.stringify(a);

		// Encrypt string
		for (n = 0; n < e.data.iterations; n++) {
			// Get start time
			start = new Date().getTime();

			// Create a new jsSHA object
			var shaObj = new jsSHA('SHA-1', 'TEXT');			

			// Set the data to encrypt
			shaObj.update(s);		
			
			// Get SHA-1 hash
			var sha1_hash = shaObj.getHash('HEX');

			// Get MD5 hash
			var md5_hash = SparkMD5.hash(s);

			// Get end time
			var end = new Date().getTime();

			// Get duration
			var time = end - start;

			// Create response
			var response = '{"workerIndex":' + e.data.workerIndex + ', "iteration:' + n + ', time":"' + time + '"}';
			
			// Return response
			self.postMessage(response);
			
		}
	}
}