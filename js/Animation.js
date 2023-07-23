class Animation {
    interval;
    field;

    constructor(field) {
        this.field = field;
    }

    start() {
        this.interval = setInterval(this.tick.bind(this), Config.tickDelay());
        const audio = document.getElementById("audio");
        audio.volume = 0.2;
        audio.play();
        audio.ended(() => {

        });
    }

    stop() {
        clearInterval(this.interval);
        const audio = document.getElementById("audio");
        audio.pause();
    }

    tick() {
        this.field.doActivities();
        this.field.render();
    }

    addTarget(target) {
        this.field.addTarget(target)
    }
}