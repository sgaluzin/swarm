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
        Debug.takeTime()

        this.field.doActivities();
        this.field.render();

        Debug.pushTimeDiff('tick-time');
    }

    addTarget(target) {
        this.field.addTarget(target)
    }
}