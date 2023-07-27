class Movable {
    x;
    y;
    speed;
    angle;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Config.movableSpeed();
        this.angle = Helper.getInstance().getRandomAngle();
    }

    move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    checkBorders(borders) {
        if (this.x < borders.xMin) {
            this.angle = Math.PI - this.angle;
            this.x = borders.xMin;
        }
        if (this.y < borders.yMin) {
            this.angle = -this.angle;
            this.y = borders.yMin;
        }
        if (this.x > borders.xMax) {
            this.angle = Math.PI - this.angle;
            this.x = borders.xMax;
        }
        if (this.y > borders.yMax) {
            this.angle = -this.angle;
            this.y = borders.yMax;
        }
    }

    checkWallBorders(wallBorders) {
        if (!this.isInsideWall(wallBorders)) {
            return;
        }

        let normalizedAngle = this.angle - (Math.ceil((this.angle + Math.PI)/(2*Math.PI))-1)*2*Math.PI;
        if (this.x - wallBorders.xMin < 5) {
            this.angle = normalizedAngle > 0 && normalizedAngle < Math.PI / 2 ?  Math.PI / 2 : -Math.PI / 2;
            this.x = wallBorders.xMin;
        }
        if (wallBorders.xMax - this.x < 5) {
            this.angle = normalizedAngle > Math.PI / 2 && normalizedAngle < Math.PI ?  Math.PI / 2 : -Math.PI / 2;
            this.x = wallBorders.xMax;
        }
        if (this.y - wallBorders.yMin < 5) {
            this.angle = normalizedAngle > 0 && normalizedAngle < Math.PI / 2 ?  0 : -Math.PI;
            this.y = wallBorders.yMin;
        }
        if (wallBorders.yMax - this.y < 5) {
            this.angle = normalizedAngle > -Math.PI / 2 && normalizedAngle < 0 ?  0 : -Math.PI;
            this.y = wallBorders.yMax;
        }
    }

    isInsideWall(wallBorders) {
        return this.x > wallBorders.xMin
            && this.x < wallBorders.xMax
            && this.y > wallBorders.yMin
            && this.y < wallBorders.yMax;
    }
}