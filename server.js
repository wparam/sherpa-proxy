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
    
    var httpserver = http.createServer(function(request, response){
        var httpclient = http.request({
            port: 1337,
            hostname: '127.0.0.1',
            method: 'CONNECT',
            path: 'www.google.com:80'
        });
        httpclient.on('response', function(res){
            console.log('receiving response event now');
                
        });
        httpclient.on('data', function(chunk){
            console.log('on data received');
        });
        
        httpclient.on('end', function(){
            console.log('on end event');
        });
        
    }).listen(3000);
    
    httpserver.on('connect', function(){
        console.log('On connnection');
    });
    
    console.log('listening 3000...');
    
}