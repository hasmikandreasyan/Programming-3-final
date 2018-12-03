socket = io.connect('http://localhost:3000');

var matrix = [];

socket.on('matrix', function (data) {
    matrix = data;
});

var row = 30;
var column = 30;
var side = 24;

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var personArr = [];

socket.on('sending grassArr', function (data) {
    grassArr = data;
});
socket.on('sending grassEaterArr', function (data) {
    grassEaterArr = data;
});
socket.on('sending predatorArr', function (data) {
    predatorArr = data;
});
socket.on('sending personArr', function (data) {
    personArr = data;
});
socket.on('sending updated matrix', function (data) {
    matrix = data;
});

var weather = 'spring';

socket.on('sending weather', function (data) {
    weather = data;
    document.getElementById('weather').innerText = weather;
});

var matrix;

function setup() {
    document.getElementById('weather').innerText = weather;
    createCanvas(side * row, side * column);
    background("#acacac");
    frameRate(3);
}

function draw() {
    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1 && weather == 'spring') {
                fill("green");
            }
            else if (matrix[y][x] == 1 && weather == 'summer') {
                fill("#0FFF00");
            }
            else if (matrix[y][x] == 1 && weather == 'autumn') {
                fill("#ADD915");
            }
            else if (matrix[y][x] == 1 && weather == 'winter') {
                fill("#ADFF7E");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 2.5) {
                fill("#F7FF7E");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 3.5) {
                fill("#FF4E4E");
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
            }
            else if (matrix[y][x] == 4.5) {
                fill("pink");
            }
            else if(matrix[y][x] == 5) {
                fill("#85C1E9");
            }
            rect(x * side, y * side, side, side);
        }
    }
}