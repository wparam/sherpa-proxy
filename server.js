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
    var httpserver = http.createServer(function(req, res){
        var urldata = url.parse(req.url);
        var sid = urldata.path.split('/')[1];
        var port = sid == 1? '5001':'5002';
        var request =  http.request({
            host: 'localhost',
            port: port
        }, function(response){
            var str = '';
            response.on('data', function(chunk){
                str += chunk;
            });
            
            response.on('end', function(){
                console.log(str);
                res.end(str);
            });
        }).end();
        
        // request.on('response', function(response){
        //     console.log('hit response event');
        // });
        
        // request.on('data', function (chunk) {
        //     console.log('BODY: ' + chunk);
        // });
        
    }).listen(3000);
    
    httpserver.on('connect', function(){
        console.log('On connnection');
    });
    
    console.log('listening 3000...');
    
}