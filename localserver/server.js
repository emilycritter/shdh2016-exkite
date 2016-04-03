    var express = require('express');
    var serverConfig = require('./configs/configs.json');
    var io = require('socket.io-client');
    var sp = require('serialport');
    var request = require('request');
    var SerialPort = sp.SerialPort;
    var _portopen = false;

    app = express();

    var ipaddress, port;
    var _speed = null;
    var _last_speed_reading = null;
    var _distance = 35;
    var _distance_counter = 0;
    var _distance_travelled = 0;
    var _temp = null;
    var _humid = null;
    var _status = 0;
    var _water_level = null;
    var _fan = false;
    var _lights = false;


    var setupVariables = function() {
        ipaddress = serverConfig.ip;
        port = serverConfig.port;
    };

    var terminator = function(sig) {
        if(typeof sig === "string") {
            process.exit(1);
        }
    };

    var setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () {
            terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
                process.on(element, function () {
                    terminator(element);
                });
            });
    };

    setupVariables();
    setupTerminationHandlers();

    app.configure(function () {
        app.use(function(req, res, next) {
            res.setHeader("Connection", "close");
            return next();
        });
    });

    var server = app.listen(port, ipaddress, function() {
        console.log('Server Started at ' + ipaddress + ':' + port);
    });

    var sockets = [];
    var socket = io.connect('http://asarioglo.com');
    var data_buff = '';
    var socketConnections = 0;

    socket.on('connected', function() {
        if(socketConnections == 1) {
        } else {
            socketConnections++;
        }
    });

    var changecolor = function(data) {
        var ip = 'http://192.168.43.154';
        console.log(data);
        var url = ip + '/color?r=' + data.r + '&g=' + data.g + '&b=' + data.b;
        request(url);
    };

    socket.on('changecolor', changecolor);

    function feedHamsterS() {
        if(_portopen) {
            serialport.write('m', function(err) {
                if(err) {
                    console.log('Error feeding hamster with Arduino');
                    return socket.emit('feedingfailed');
                }
                console.log('Hamster Fed Successfully');
                socket.emit('hamsterfed');
            });
        } else {
            console.log('COM communication is not opened, Could not feed hamsty');
            socket.emit('feedingfailed');
        }
    }
    function feedHamsterS1() {
        if(_portopen) {
            serialport.write('m', function(err) {
                if(err) {
                    console.log('Error feeding hamster with Arduino');
                    return socket1.emit('feedingfailed');
                }
                console.log('Hamster Fed Successfully');
                socket1.emit('hamsterfed');
            });
        } else {
            console.log('COM communication is not opened, Could not feed hamsty');
            socket1.emit('feedingfailed');
        }
    }

    function toggleFanS() {
        if(_portopen) {
            serialport.write('f', function(err) {
                if(err) {
                    console.log('Error toggling fan Arduino');
                    return socket.emit('fanfailed');
                }
                console.log('Fan toggled successfully');
                _fan = !_fan;
                socket.emit('fantoggled');
            });
        } else {
            console.log('COM communication is not opened, Could not toggle fan');
            socket.emit('fanfailed');
        }
    }

    function toggleFanS1() {
        if(_portopen) {
            serialport.write('f', function(err) {
                if(err) {
                    console.log('Error toggling fan Arduino');
                    return socket1.emit('fanfailed');
                }
                console.log('Fan toggled successfully');
                _fan = !_fan;
                socket1.emit('fantoggled');
            });
        } else {
            console.log('COM communication is not opened, Could not toggle fan');
            socket1.emit('fanfailed');
        }
    }
    //
    function toggleLightsS() {
        if(_portopen) {
            serialport.write('l', function(err) {
                if(err) {
                    console.log('Error toggling lights Arduino');
                    return socket.emit('lightsfailed');
                }
                console.log('Light toggled successfully');
                _lights = !_lights;
                socket.emit('lightstoggled');
            });
        } else {
            console.log('COM communication is not opened, Could not toggle lights');
            socket.emit('lightsfailed');
        }
    };

    function toggleLightsS1() {
        if(_portopen) {
            serialport.write('l', function(err) {
                if(err) {
                    console.log('Error toggling lights Arduino');
                    return socket1.emit('lightsfailed');
                }
                console.log('Light toggled successfully');
                _lights = !_lights;
                socket1.emit('lightstoggled');
            });
        } else {
            console.log('COM communication is not opened, Could not toggle lights');
            socket1.emit('lightsfailed');
        }
    };
