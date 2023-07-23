class Animation {
    interval;
    field;

    constructor(field) {
        this.field = field;
    }

    start() {
        this.interval = setInterval(this.tick.bind(this), Config.tickDelay());
    }

    stop() {
        clearInterval(this.interval);
    }

    tick() {
        this.field.doActivities();
        this.field.render();
    }

    addTarget(target) {
        this.field.addTarget(target)
    }
}