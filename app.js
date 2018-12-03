var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var Grass = require('./public/classes/class.grass.js');
var Xotaker = require('./public/classes/class.grassEater.js');
var Gishatich = require('./public/classes/class.predator.js');
var Person = require('./public/classes/class.person.js');
var Lightning = require('./public/classes/class.lightning.js');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('public');
});
server.listen(3000);

global.grassArr = [];
global.grassEaterArr = [];
global.predatorArr = [];
global.personArr = [];

var row = 30;
var column = 30;

global.matrix = [];

setInterval(function () {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    var lightning = new Lightning(x, y);
    lightning.xpel();
    io.emit('sending updated matrix', matrix);
}, 4000);

global.weather = 'spring';
io.emit('sending weather', weather);

function genMatrix(row, column) {
    var matrix = [];
    for (var y = 0; y < row; y++) {
        matrix[y] = [];
        for (var x = 0; x < column; x++) {
            var r = Math.floor(Math.random() * 105);
            if (r < 20) r = 0;
            else if (r < 65) r = 1; // grass
            else if (r < 90) r = 2; // grassEater
            else if (r < 100) r = 3; // predator
            else if (r < 105) r = 4; // person
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = genMatrix(row, column);

io.on('connection', function (socket) {

    setInterval(function () {
        var grassArr = [], grassEaterArr = [], predatorArr = [], personArr = [];
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 1) {
                    grassArr.push(new Grass(x * 1, y * 1, 1));
                }
                else if (matrix[y][x] == 2 || matrix[y][x] == 2.5) {
                    var r = (Math.round(Math.random()) / 2) + 2;
                    matrix[y][x] = r;
                    grassEaterArr.push(new Xotaker(x * 1, y * 1, r));
                }
                else if (matrix[y][x] == 3 || matrix[y][x] == 3.5) {
                    var r = (Math.round(Math.random()) / 2) + 3;
                    matrix[y][x] = r;
                    predatorArr.push(new Gishatich(x * 1, y * 1, r));
                }
                else if (matrix[y][x] == 4 || matrix[y][x] == 4.5) {
                    var r = (Math.round(Math.random()) / 2) + 4;
                    matrix[y][x] = r;
                    personArr.push(new Person(x * 1, y * 1, r));
                }
            }
        }

        io.sockets.emit("matrix", matrix);

        for (var i in grassArr) {
            grassArr[i].mul();
            grassArr[i].die();
        }
        io.emit('sending grassArr', grassArr);

        for (var i in grassEaterArr) {
            grassEaterArr[i].mul();
            grassEaterArr[i].eat();
            grassEaterArr[i].die();
        }
        io.emit('sending grassEaterArr', grassEaterArr);

        for (var i in predatorArr) {
            predatorArr[i].mul();
            predatorArr[i].eat();
            predatorArr[i].die();
        }
        io.emit('sending predatorArr', predatorArr);

        for (var i in personArr) {
            personArr[i].move();
        }
        io.emit('sending personArr', personArr);

    }, 2000);

});


io.on('updated matrix', function (data) {
    matrix = data;
});
io.on('sending updated grassArr', function (data) {
    grassArr = data;
});
io.on('sending updated grassEaterArr', function (data) {
    grassEaterArr = data;
});
io.on('sending updated predatorArr', function (data) {
    predatorArr = data;
});
io.on('sending updated personArr', function (data) {
    personArr = data;
});

setInterval(function () {

    if (weather == 'spring') {
        weather = 'summer';
    }
    else if (weather == 'summer') {
        weather = 'autumn';
    }
    else if (weather == 'autumn') {
        weather = 'winter';
    }
    else if (weather == 'winter') {
        weather = 'spring';
    }

    io.emit('sending weather', weather);

}, 10000);
