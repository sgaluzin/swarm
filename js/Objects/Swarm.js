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

        for (let i = 0; i < amount; i++) {
            this.bees.push(
                new Bee(
                    i,
                    this.hive.name,
                    Object.fromEntries(targetsArr),
                    this.getRandomInt(Config.width()),
                    this.getRandomInt(Config.height())
                )
            )
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