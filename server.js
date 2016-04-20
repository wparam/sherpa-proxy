var httpProxy = require('http-proxy'),
    http = require('http'),
    path = require('path'),
    util = require('util'),
    chalk = require('chalk'),
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
        var port;
        if(sid == 1)
            port = '5001';
        if(sid == 2)
            port = '5002'; 
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
        
        req.on('data', function(chunk){
            console.log(chalk.red('hit response event'));
        });
        
        req.on('end', function () {
            console.log(chalk.red('hit end request'));
        });
        
        req.on('error', function(err){
            console.log(chalk.red(err));
        });
        
    }).listen(3000);
    
    httpserver.on('connection', function(){
        console.log('On connnection');
    });
    
    console.log('listening 3000...');
    
}