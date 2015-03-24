var faker = require("faker");
var is = require("is_js");

// Below has nothing to do with the is_js issue, but more demonstrating some
// minimal functionality of some other module that is successfully required.
// The following loads up the faker library and prints to the console a fake
// IP address.
var fakeIP = faker.internet.ip();
console.log("Fake IP: "+ fakeIP);

// If the is_js module would work the below would log "Is fake IP valid: true"
//console.log("Is fake IP valid: "+ is.ip(fakeIP));