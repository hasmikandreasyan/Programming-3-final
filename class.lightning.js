module.exports = class Lightning {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 3, this.y - 3],
            [this.x + 4, this.y - 4],
            [this.x + 5, this.y - 5],
            [this.x + 6, this.y - 6],
            [this.x + 7, this.y - 7],
            [this.x + 8, this.y - 8],
            [this.x + 9, this.y - 9]
        ];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 3, this.y - 3],
            [this.x + 4, this.y - 4],
            [this.x + 5, this.y - 5],
            [this.x + 6, this.y - 6],
            [this.x + 7, this.y - 7],
            [this.x + 8, this.y - 8],
            [this.x + 9, this.y - 9]
        ];
    }

    xpel() {
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (this.directions[0] != undefined && this.directions[1] != undefined) {

                    if (matrix[y][x] == 1) {
                        for (var i in grassArr) {
                            if (x == grassArr[i].x && y == grassArr[i].y) {
                                grassArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[y][x] == 2) {
                        for (var i in grassEaterArr) {
                            if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                                grassEaterArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[y][x] == 3) {
                        for (var i in predatorArr) {
                            if (x == predatorArr[i].x && y == predatorArr[i].y) {
                                predatorArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[y][x] == 4) {
                        for (var i in personArr) {
                            if (x == personArr[i].x && y == personArr[i].y) {
                                personArr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    matrix[y][x] = 5;
                }
            }
        }
    }
}
