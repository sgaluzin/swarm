class Hive extends Target {
    name;
    energy;

    constructor(name, x, y) {
        super(name, x, y);

        this.energy = 1000;
    }

    isDied() {

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
    }

    drawTargetWithImages(ctx) {
        let size = this.radius * 2;
        ctx.drawImage(Images.get('beeHive'), 0, 0, 32, 32, this.x - this.radius, this.y - this.radius, size, size);
    }

    drawTarget(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

        if (this.name === Config.hiveName()) {
            ctx.fillStyle = "rgb(232,102,8)";
        }

        ctx.fill();
    }
}