var LivingCreature = require('./class.base.js');

module.exports = class Person extends LivingCreature{
    constructor(x,y,index){
        super(x,y,index)
        this.multiply = Math.round(Math.random(40))-Math.round(Math.random(30));
        this.energy=20;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
 
    move() {
        var vand = this.random(this.chooseCell(0));
        if (vand && this.multiply >= this.speed / 4) {
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 2;
            this.multiply = 0;
        }
    }
    hndzel() {
        this.getNewCoordinates();
        var filledCells = this.chooseCell(1);
        if (filledCells.length != 0) {
            var randomCell = this.random(filledCells);
            var x = randomCell[0];
            var y = randomCell[1];
            for (var i in this.directions) {
                var ix = this.directions[i][0], iy = this.directions[i][1];
                if (matrix[ix] != undefined && matrix[iy] != undefined) {
                    matrix[iy][ix] = 0;
                    for (var i in grassArr) {
                        if (ix == grassArr[i].x && iy == grassArr[i].y) {
                            grassArr.splice(i, 5);
                            break;
                        }
                    }
                    this.energy--;
                }
            }
            return true;
        }

    }

}