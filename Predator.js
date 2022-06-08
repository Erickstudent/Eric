class Predator extends LivingCreatures {
    constructor(x, y) {
        super(x, y)
        this.energy = 15;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }    
    chooseCell(character) {
        super.chooseCell(character);
        this.getNewCoordinates()
    }
    mul() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newpredator = new Predator(newX, newY);
            predatorArr.push(newpredator);
            this.energy = 15;
        }
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(1);
        var newCell1 = random(emptyCells1);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        } else if (newCell1 && this.energy >= 0) {
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 1;

            var newGrass = new Grass(this.x, this.y, 1);
            grassArr.push(newGrass);

            this.x = newX;
            this.y = newY;
        } else {
            this.die();
        }

    }

    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 20) {
                this.mul();
            }
        } else {
            this.move();
        }
    }
    die() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        matrix[this.y][this.x] = 1;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}