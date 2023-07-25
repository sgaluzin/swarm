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

    addTarget(target) {
        this.bees.forEach((bee) => {
            bee.addDistance(target.name)
        });
    }

    removeTarget(target) {
        this.bees.forEach((bee) => {
            bee.removeDistance(target.name);
        });
    }

    doActivities(borders, targets, walls) {
        this.bees.forEach((bee) => {
            bee.move();
            bee.checkBorders(borders);
            targets.forEach((target) => {
                if (bee.checkTargetCollision(target.getCollision())){
                    if (target.name !== this.hive.name) {
                        target.decreaseHealth(1);
                    }
                }
            });
            walls.forEach((wall) => {
                bee.checkWallBorders(wall.getWallBorders())
            })
            bee.scream();
        })
    }

    render() {
        this.hive.render();

        this.bees.forEach((bee) => {
            bee.render();
        })
    }
}