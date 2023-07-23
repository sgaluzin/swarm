class Sounds {
    static sources = [
        {name: 'm1', src: "sounds/bg/alex-productions-cyberpunk-computer-game-idra.mp3"},
        {name: 'm2', src: "sounds/bg/alex-productions-extreme-trap-racing-music-power.mp3"},
        {name: 'm3', src: "sounds/bg/Enigma-Long-Version-Complete-Version.mp3"},
        {name: 'm4', src: "sounds/bg/puk1.m4a"},

    ];

    static sound;

    static lastKey = 0;

    static create() {
        this.sound = new Audio();

        this.load();
    }

    static load() {
        this.sound.src = this.sources[this.lastKey].src;
    }

    static getNextUrl() {
        this.lastKey++;
        if (this.lastKey >= this.sources.length) {
            this.lastKey = 0;
        }

        return this.sources[this.lastKey].src;
    }

    static play() {
        this.sound.volume = 0.1;
        this.sound.play();
        this.sound.onended = () => {
            this.sound.pause();
            this.sound.src = this.getNextUrl()
            this.sound.load();
            this.sound.play();
        };
    }

    static pause() {
        this.sound.pause();
    }
}