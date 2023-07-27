class Helper {
    static instance;

    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new Helper();
        }

        return this.instance;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomAngle() {
        return Math.random() * Math.PI * 2;
    }
}
