class Field {
    width;
    height;
    dynamics = [];
    statics = [];
    walls = [];

    constructor() {
        this.width = Config.width();
        this.height = Config.height();
    }

    addSwarm(swarm) {
        this.dynamics.push(swarm);
        this.statics.push(swarm.hive);
    }

    addTarget(target) {
        this.statics.push(target);
        this.dynamics.forEach((swarm) => {
            swarm.addTarget(target);
        });
    }

    addWall(wall) {
        this.walls.push(wall);
    }

    getBorders() {
        return {
            xMin: 0,
            yMin: 0,
            xMax: this.width,
            yMax: this.height
        }
    }

    doActivities() {
        let borders = this.getBorders();
        this.dynamics.forEach((dynamic) => {
            dynamic.doActivities(borders, this.statics, this.walls);
        })

        this.statics.forEach((object, index) => {
            object.doActivities(borders);
            if (object.isDied()) {
                this.dynamics.forEach((dynamic) => {
                    dynamic.removeTarget(object);
                })

                delete this.statics[index];
            }
        })
    }

    render() {
        const ctx = document.getElementById("field").getContext("2d");

        ctx.clearRect(0, 0, this.width, this.height);

        this.dynamics.forEach((object) => {
            object.render();
        })

        this.statics.forEach((object) => {
            object.render();
        })

        this.walls.forEach((object) => {
            object.render();
        })
    }
}