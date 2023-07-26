class Target extends Movable {
    name;
    health;
    radius = Config.targetRadius();

    constructor(name, x, y) {
        super(x, y);

        this.name = name;
        this.speed = Config.targetSpeed();
        this.angle = this.getRandomAngle();

        this.health = Config.targetHealth();
    }

    getCollision() {
        return {
            name: this.name,
            x: this.x,
            y: this.y,
            r: this.radius
        };
    }

    doActivities(borders) {
        super.move();

        this.checkBorders(borders);
    }

    render() {
    }
}