var Base = require('./class.base.js');

module.exports = class GrassEaterArr extends Base {
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
        this.multiply++;
        var cell = this.random(this.chooseCell(1));
        if (cell && this.multiply >= this.speed / 4) {
            this.energy += this.speed;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 2;
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.move();

    }

    mul() {
        if (this.index == 2) {
            var cell = this.random(this.chooseCell(2.5));
            if (cell) {
                var newcell = this.random(this.chooseCell(0));
                if (newcell) {
                    var r = (Math.round(Math.random()) / 2) + 2;
                    var newGrassEater = new newGrassEater(newcell[0], newcell[1], r);
                    grassEaterArr.push(newGrassEater);
                    matrix[newcell[1]][newcell[0]] = r;
                }
            }
        }
    }

    die() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
            }
        }
    }
}
