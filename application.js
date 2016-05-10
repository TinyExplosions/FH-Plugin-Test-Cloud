var mbaasApi = require('fh-mbaas-api'),
    express = require('express'),
    mbaasExpress = mbaasApi.mbaasExpress(),
    cors = require('cors'),
    Logger = require(__dirname + '/lib/logger').getLogger(),
    packageInfo = require('./package.json'),

    // fhlint-begin: securable-endpoints
    securableEndpoints = ['/hello'],
    // fhlint-end

    app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// fhlint-begin: custom-routes
app.use('/hello', require('./lib/hello.js')());
// Heartbeat endpoint for connectivity check
app.use('/heartbeat', function(req, res) {
    res.send({
        status: 'ok',
        version: packageInfo.version
    });
});
app.use('/download', function(req, res) {
    res.sendFile('/SampleDoc.pdf', {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    });
});
// fhlint-end

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001,
    host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, host, function() {
    Logger.info("App started at: " + new Date() + " on port: " + port);
});
