class Debug {
    static time;

    static takeTime() {
        if (!Config.isDebug()) {
            return;
        }

        this.time = (new Date()).getTime();
    }

    static pushTimeDiff(elemId) {
        if (!Config.isDebug()) {
            return;
        }

        document.getElementById(elemId).innerText = ((new Date()).getTime() - this.time).toString();
    }
}