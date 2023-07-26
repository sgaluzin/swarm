class Field {
    width;
    height;
    swarm;
    targets = [];
    walls = [];

    constructor() {
        this.width = Config.width();
        this.height = Config.height();
    }

    addSwarm(swarm) {
        this.swarm = swarm;
        this.targets.push(swarm.hive);
    }

    addHoney(honey) {
        this.targets.push(honey);
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
        this.swarm.doActivities(borders, this.targets, this.walls);

        this.targets.forEach((object, index) => {
            object.doActivities(borders);
            //@todo avoid type checking
            if (object.constructor.name === "Honey" && object.isDied()) {
                this.swarm.removeHoney(object);

                delete this.targets[index];
            }

            //@todo avoid type checking
            if (object.constructor.name === "Hive" && object.isEmptyEnergy()) {
                this.swarm.removeBees(1);
                Config.setBeesAmount(this.swarm.bees.length);
            }
        })
    }

    render() {
        const ctx = document.getElementById("field").getContext("2d");

        ctx.clearRect(0, 0, this.width, this.height);

        this.swarm.render();

        this.targets.forEach((object) => {
            object.render();
        })

        this.walls.forEach((object) => {
            object.render();
        })
    }
}