class Movable {
    x;
    y;
    speed;
    angle;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Config.movableSpeed();
        this.angle = this.getRandomAngle();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomAngle() {
        return Math.random() * Math.PI * 2;
    }

    move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    checkBorders(borders) {
        if (this.x < borders.xMin) {
            this.angle = Math.PI - this.angle;
        }
        if (this.y < borders.yMin) {
            this.angle = -this.angle;
        }
        if (this.x > borders.xMax) {
            this.angle = Math.PI - this.angle;
        }
        if (this.y > borders.yMax) {
            this.angle = -this.angle;
        }
    }

    checkWallBorders(wallBorders) {
        if (
            this.x > wallBorders.xMin
            && this.x < wallBorders.xMax
            && this.y > wallBorders.yMin
            && this.y < wallBorders.yMax
        ) {
            return true
        }

        return false
    }
}