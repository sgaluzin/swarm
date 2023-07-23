class Wall{
    x;
    y;
    w;
    h;

    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    getWallBorders() {
        return {
            xMin: this.x,
            yMin: this.y,
            xMax: this.x + this.w,
            yMax: this.y + this.h
        }
    }


    render() {
        const ctx = document.getElementById("field").getContext("2d");

        ctx.fillStyle = "rgba(100, 100, 200, 1)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}