class Swarm {
    bees = [];
    hive;

    constructor(hive) {
        this.hive = hive;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    createBees(amount) {
        let targetsArr = [[this.hive.name, 0]];
        let startId = this.bees.length;


        for (let i = 0; i < amount; i++) {
            this.bees.push(
                new Bee(
                    startId + i,
                    this.hive.name,
                    Object.fromEntries(targetsArr),
                    this.getRandomInt(Config.width()),
                    this.getRandomInt(Config.height())
                )
            )
        }
    }

    removeBees(amount) {
        for (let i = 0; i < amount; i++) {
            let bee = this.bees.pop();
            if (bee === undefined) {
                return;
            }
            //@todo add constant for event name
            //@todo dont touch property directly
            EventDispatcher.getInstance().removeListener('scream', bee.id.toString());
        }
    }

    updateBeesAmount(amount) {
        let diff = amount - this.bees.length;
        if (diff > 0) {
            this.createBees(diff);
        } else if (diff < 0) {
            this.removeBees(-diff);
        }
    }

    removeHoney(honey) {
        this.bees.forEach((bee) => {
            bee.removeDistance(honey.name);
        });
    }

    doActivities(borders, collisions, walls) {
        this.bees.forEach((bee) => {
            bee.move();
            bee.checkBorders(borders);
            collisions.forEach((target) => {
                if (bee.checkCollision(target.getCollision())){
                    //@todo need to avoid typeof
                    if (target.constructor.name === "Honey") {
                        target.decreaseHealth(1);
                    }

                    if (target.constructor.name === "Hive") {
                        target.changePoints(1);
                    }
                }
            });
            walls.forEach((wall) => {
                bee.checkWallBorders(wall.getWallBorders())
            })
            bee.scream();
        });

        this.hive.changePoints(-1);
    }

    render() {
        this.hive.render();

        this.bees.forEach((bee) => {
            bee.render();
        })
    }
}