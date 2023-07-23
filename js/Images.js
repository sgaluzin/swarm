class Images {
    static sources = [
        {name: 'beeHive', src: "images/beehive.png", w: 32, h: 32},
        {name: 'honeyComb', src: "images/honeycomb.png", w: 32, h: 32},
        {name: 'bee', src: "images/bee.png", w: 16, h: 16},
    ];

    static images = [];

    static load() {
        for (let i = 0; i < this.sources.length; i++) {
            this.images[this.sources[i]['name']] = new Image(this.sources[i]['w'], this.sources[i]['h']);
            this.images[this.sources[i]['name']].src = this.sources[i]['src'];
        }
    }

    static get(name) {
        return this.images[name] !== undefined ? this.images[name] : null;
    }
}