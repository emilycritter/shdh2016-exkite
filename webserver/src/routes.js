var express = require('express')
    , http = require('http')
    , site = require('./routes/site')
    , passport = require('passport');

module.exports = function(app, io) {

    // GET listeners
	app.get('/', site.initial);
    app.get('/api/v1/getGeneralData', site.doNothing);
    app.get('/getGeneralData', site.generalData);
    app.post('/changecolor', site.changeColor);
    app.post('/gpstoggle', site.toggleGPS );
    app.post('/colortoggle', site.toggleColor );

    io.on('connection', site.ioConnectionHandler)
};