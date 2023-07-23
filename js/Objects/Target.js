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

        if (this.name === Config.hiveName()) {
            ctx.fillStyle = "rgb(232,102,8)";
        }
        if (this.name === 't1') {
            ctx.fillStyle = "rgb(229,216,169)";
        }
        if (this.name === 't2') {
            ctx.fillStyle = "rgb(97,189,50)";
        }
        if (this.name === 't3') {
            ctx.fillStyle = "rgb(142,31,173)";
        }
        if (this.name === 't4') {
            ctx.fillStyle = "rgb(38,167,176)";
        }
        if (this.name === 't5') {
            ctx.fillStyle = "rgb(127,105,133)";
        }

        ctx.fill();

        let fontSize = 12;
        ctx.font = fontSize + "px serif";
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillText(this.name, this.x, this.y + fontSize * 2);

        if (this.name !== 'hive') {
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.fillText(this.health, this.x, this.y + this.radius + fontSize * 3);
        }
    }
}