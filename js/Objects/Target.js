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

        if (Config.withImages()) {
            this.drawTargetWithImages(ctx);
        } else {
            this.drawTarget(ctx);
        }


        let fontSize = 12;
        ctx.font = fontSize + "px serif";
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillText(this.name, this.x, this.y + fontSize * 2);

        if (this.name !== 'hive') {
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.fillText(this.health, this.x, this.y + fontSize * 3);
        }
    }

    drawTargetWithImages(ctx) {
        if (this.name === Config.hiveName()) {
            let size = this.radius * 2;
            ctx.drawImage(Images.get('beeHive'), 0, 0, 32, 32, this.x - this.radius, this.y - this.radius, size, size);
        } else {
            let size = this.radius * 2;
            ctx.drawImage(Images.get('honeyComb'), 0, 0, 32, 32, this.x - this.radius, this.y - this.radius, size, size);
        }
    }

    drawTarget(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

        if (this.name === Config.hiveName()) {
            ctx.fillStyle = "rgb(232,102,8)";
        }
        if (this.name === 'h1') {
            ctx.fillStyle = "rgb(229,216,169)";
        }
        if (this.name === 'h2') {
            ctx.fillStyle = "rgb(97,189,50)";
        }
        if (this.name === 'h3') {
            ctx.fillStyle = "rgb(142,31,173)";
        }
        if (this.name === 'h4') {
            ctx.fillStyle = "rgb(38,167,176)";
        }
        if (this.name === 'h5') {
            ctx.fillStyle = "rgb(127,105,133)";
        }

        ctx.fill();
    }
}