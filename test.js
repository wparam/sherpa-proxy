var server  = require('./server.js')(),
    chalk = require('chalk'),
    http = require('http');


var server1 = http.createServer(function(req, res){
    console.log(chalk.green('coming request to 5001 - server 1, the url is :'+req.url));
    res.write("from server 1");
    res.end();
}).listen(5001);
console.log('listening 5001');

var server2 = http.createServer(function(req, res){
    console.log(chalk.yellow('coming request to 5001 - server 2, the url is :'+req.url));
    res.write("from server 2");
    res.end();
}).listen(5002);
console.log('listening 5002');