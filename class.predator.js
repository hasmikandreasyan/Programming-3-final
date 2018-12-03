var Base = require('./class.base.js');

module.exports = class Predator extends Base{
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
        this.multiply = Math.round(Math.random() * 8);
        this.energy = Math.round(Math.random() * 16);
        this.speed = 8;
    }

    move() {
        var cell = this.random(this.chooseCell(0));
        if (cell && this.multiply >= this.speed / 4) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 2;
            this.multiply = 0;
        }
    }

    eat() {
        this.energy--;
        var cell = this.random(this.chooseCell(2));
        if (cell && this.multiply >= this.speed / 2) {
            this.energy += this.speed/2;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 3;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.move();
    }

    mul() {
        if (this.index == 3) {
            var cell = this.random(this.chooseCell(3.5));
            if (cell) {
                var newcell = this.random(this.chooseCell(0));
                if (newcell) {
                    var r = (Math.round(Math.random()) / 2) + 3;
                    var newPredator = new Predator(newcell[0], newcell[1], r);
                    predatorArr.push(newPredator);
                    matrix[newcell[1]][newcell[0]] = r;
                }
            }
        }
    }

    die() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}
