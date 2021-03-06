var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 4321;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host,() => {
    console.log(`Serving CORS Anywhere on ${host}:${port}...`);
});