var url = require('url');
var promise = require('promise');
var fs = require('fs');
var request = require('request');
var Promise = require("promise");
var ejs = require('ejs');
var io = require('socket.io');

var normalizeTime = function(date, incr) {
	var i = incr || 0;
	var seconds = date.getSeconds() + i;
	var minutes = date.getMinutes();
	var hour = date.getHours();
	return hour + ':' + minutes + ':' + seconds;
};

var _temp = 0;
var _altitude = 0;
var _socket = null;
var tempData = [{
	time: normalizeTime(new Date()),
	val: 100
},
	{
		time: normalizeTime(new Date(), 10),
		val: 100
	}];
var altData = [{
	time: normalizeTime(new Date()),
	val: 100
},
	{
		time: normalizeTime(new Date(), 10),
		val: 100
	}];

var initial = function(req, res) {
	res.render('index.ejs');
};

var generalData = function(req, res) {
	var tempBeginning = tempData.length > 100 ? tempData.length - 100 : 0;
	var altBeginning = altData.length > 100 ? altBeginning.length - 100 : 0;
	res.json({
		temperature: tempData.slice(tempBeginning),
		altitude: altData.slice(altBeginning)
	});
};

var onDataReceived = function(data) {
	var temp = data.temperature;
	var altitude = data.altitude;
	if(temp != 'null') {
		tempData.push({
			val: temp,
			time: normalizeTime(new Date())
		});
	}
	if(altitude != 'null') {
		altData.push({
			val: altitude,
			time: normalizeTime(new Date())
		});
	}
};

var ioConnectionHandler = function(socket) {
	socket.emit('connected');
	socket.on('dataTransfer', onDataReceived);
	_socket = socket;
};

var changeColorMode = function(req, res) {
	_socket.emit('changecolormode', {mode: req.query.mode});
	var modechanged = function() {
		_socket.removeListener('modechanged', modechanged);
		_socket.removeListener('modefailed', modefailed);
		res.send('ok');
	};
	var modefailed = function() {
		res.setHeaders(500, {
			'Content-Type': 'text.plain'
		});
		res.write('Failed to connect to hardware');
		_socket.removeListener('modechanged', modechanged);
		_socket.removeListener('modefailed', modefailed);
	};
	_socket.on('modechanged', modechanged());
	_socket.on('modefailed', modefailed())
};

var toggleColor = function(req, res) {
	var onoff = req.body.onoff;
	console.log('Color On: ' + onoff);
	//_socket.emit('togglecolor');
	//var colortoggled = function() {
	//	_socket.removeListener('colortoggled', colortoggled);
	//	_socket.removeListener('colorfailed', colorfailed);
	//	res.send('ok');
	//};
	//var colorfailed = function() {
	//	res.setHeaders(500, {
	//		'Content-Type': 'text.plain'
	//	});
	//	res.write('Failed to connect to hardware');
	//	_socket.removeListener('colortoggled', colortoggled);
	//	_socket.removeListener('colorfailed', colorfailed);
	//};
	//_socket.on('colortoggled', colortoggled);
	//_socket.on('colorfailed', colorfailed);
};

var toggleGPS = function(req, res) {
	var onoff = req.body.onoff;
	console.log('GPS On: ' + onoff);
	//_socket.emit('togglegps');
	//var gpstoggled = function() {
	//	_socket.removeListener('gpstoggled', gpstoggled);
	//	_socket.removeListener('gpsfailed', gpsfailed);
	//	res.send('ok');
	//};
	//var gpsfailed = function() {
	//	res.setHeaders(500, {
	//		'Content-Type': 'text.plain'
	//	});
	//	res.write('Failed to connect to hardware');
	//	_socket.removeListener('gpstoggled', gpstoggled);
	//	_socket.removeListener('gpsfailed', gpsfailed);
	//};
	//_socket.on('gpstoggled', gpstoggled);
	//_socket.on('gpsfailed', gpsfailed);
};

var changeColor = function(req, res) {
	var r, g, b;
	var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
	var match = matchColors.exec(req.body.color);
	r = match[1];
	g = match[2];
	b = match[3];
	console.log('changingcolor');
	var data = {
		r:r,
		g:g,
		b:b
	};
	_socket.emit('changecolor', data);

};
var doNothing = function(req, res) {
	res.send('ok');
};

module.exports = {
	initial: initial,
	generalData: generalData,
	ioConnectionHandler: ioConnectionHandler,
	changeColor: changeColor,
	toggleGPS: toggleGPS,
	toggleColor: toggleColor,
	doNothing: doNothing
};