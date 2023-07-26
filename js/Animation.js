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
        Debug.startTimer('tick-time');
        Debug.startTimer('algorithm-time');

        this.field.doActivities();

        Debug.stopTimer('algorithm-time');
        Debug.startTimer('rendering-time');

        this.field.render();

        Debug.stopTimer('rendering-time');
        Debug.stopTimer('tick-time');
    }

    addHoney(honey) {
        this.field.addHoney(honey)
    }
}