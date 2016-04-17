var httpProxy = require('http-proxy'),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    EE = require('events').EventEmitter,
    url = require('url');

module.exports = SherpaProxy;

util.inherits(SherpaProxy, EE);

function SherpaProxy(opt){
    if(!(this instanceof SherpaProxy))
        return new SherpaProxy(opt);
    //opt options
    var proxy = httpProxy.createProxyServer(opt);
    var httpserver = http.createServer((req, res) => {
        var urldata = url.parse(req.url);
        var sid = urldata.path.split('/')[1];
        var port = sid === 1? '5001':'5002';
                
        var request =  http.request({
            host: 'localhost',
            port: port
        }, function(response){
            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + JSON.stringify(response.headers));
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });
        
        request.write("SAY HI");
        request.end();
        
    }).listen(3000);
    
    httpserver.on('connect', function(){
        console.log('On connnection');
    });
    
    console.log('listening 3000...');
    
}