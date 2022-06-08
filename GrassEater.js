class GrassEater extends LivingCreatures {
    constructor(x, y) {
      super(x, y)
      this.energy = 8;
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
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
  
      if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;
  
        var newGrassEater = new GrassEater(newX, newY);
        grassEaterArr.push(newGrassEater);
        this.energy = 8;
      }
    }
  
    move() {
      this.energy--;
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
      if (newCell && this.energy >= 0) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
      } else {
        this.die();
      }
    }
  
    eat() {
      var emptyCells = this.chooseCell(1);
      var newCell = random(emptyCells);
      if (newCell) {
        this.energy++;
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        for (var i in grassArr) {
          if (newX == grassArr[i].x && newY == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
          }
        }
  
        if (this.energy >= 12) {
          this.mul();
        }
      } else {
        this.move();
      }
    }
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in grassEaterArr) {
        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    }
  }