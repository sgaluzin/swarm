class Target extends Movable{
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

    decreaseHealth(points) {
        this.health -= points;
    }

    isDied() {
        return this.health < 0;
    }

    doActivities(borders) {
        super.move();

        this.checkBorders(borders);
     }

    render() {
        const ctx = document.getElementById("field").getContext("2d");

        const radius = this.radius;

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(150, 150, 150, 1)";
        ctx.fill();

        ctx.font = "12px serif";
        ctx.fillStyle = "rgba(20, 20, 20, 1)";
        ctx.fillText(this.name, this.x - 3, this.y);

        if (this.name !== 'hive') {
            ctx.font = "12px serif";
            ctx.fillStyle = "rgba(20, 20, 20, 1)";
            ctx.fillText(this.health, this.x - 5, this.y + 5);
        }
    }
}