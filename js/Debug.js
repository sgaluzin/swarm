class Debug {
    static times = [];

    static startTimer(elemId) {
        if (!Config.isDebug()) {
            return;
        }

        this.times[elemId] = (new Date()).getTime();
    }

    static stopTimer(elemId) {
        if (!Config.isDebug()) {
            return;
        }

        document.getElementById(elemId).innerText = ((new Date()).getTime() - this.times[elemId]).toString();
    }
}