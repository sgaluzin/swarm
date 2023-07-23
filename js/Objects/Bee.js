class Bee extends Movable {
    id;
    distances = {}
    hiveName;
    targetName;
    screamRadius = Config.screamRadius();
    screamRadius2 = this.screamRadius * this.screamRadius;

    constructor(id, hiveName, distances, x, y) {
        super(x, y);
        this.id = id;
        this.hiveName = hiveName;
        this.distances = distances;

        this.determineTarget();

        this.listenScream();
    }

    addDistance(targetName) {
        this.distances[targetName] = 0;
        this.targetName = targetName;
    }

    removeDistance(targetName) {
        delete this.distances[targetName];
        if (this.targetName === targetName) {
            this.targetName = undefined;
            this.determineTarget();
        }
    }

    determineTarget() {
        let targets = Object.keys(this.distances);

        if (this.targetName !== this.hiveName && targets.length < 2) {
            return;
        }

        if (this.targetName === this.hiveName || this.targetName === undefined) {
            let min = 100000000;
            let targetName = targets.reduce((prev, curr) => {
                return this.distances[prev] < this.distances[curr] && prev !== this.hiveName ? prev : curr;
            }, targets[0]);
            if (targetName === this.hiveName) {
                targetName = undefined;
            }
            this.targetName = targetName;
        } else {
            this.targetName = this.hiveName;
        }

        // throw 'Next target name was not found. Impossible to determine new target for bee. Current target: "' + this.targetName + '"';
    }

    move() {
        this.angle += this.getRandomInt(-Config.beeRandomAngle(), Config.beeRandomAngle()) * Math.PI / 180;
        super.move();

        for (let distance in this.distances) {
            if (this.distances.hasOwnProperty(distance)) {
                this.distances[distance] += this.speed;
            }
        }
    }

    checkTargetCollision(targetCollisions) {
        if (
            (this.x - targetCollisions.x) * (this.x - targetCollisions.x)
            + (this.y - targetCollisions.y) * (this.y - targetCollisions.y)

            <= targetCollisions.r * targetCollisions.r
        ) {
            if (this.targetName === targetCollisions.name) {
                this.angle += Math.PI
                this.distances[targetCollisions.name] = 0;
                this.determineTarget();

                return true;
            } else {
                this.distances[targetCollisions.name] = 0;
            }
        }

        return false
    }

    listenScream() {
        document.addEventListener("scream", (event) => {
            if (event.detail.id === this.id) {
                return;
            }

            let diffX = event.detail.x - this.x;
            let diffY = event.detail.y - this.y;
            if (
                (diffX * diffX)
                + (diffY * diffY)
                >= this.screamRadius2
            ) {
                return
            }

            if (event.detail.distances[this.targetName] + this.screamRadius < this.distances[this.targetName]) {
                this.angle = Math.atan2(diffY, diffX);
                this.distances[this.targetName] = event.detail.distances[this.targetName] + this.screamRadius;
            }
        });
    }

    scream() {
        let event = new CustomEvent("scream",
            {
                detail: {
                    id: this.id,
                    x: this.x,
                    y: this.y,
                    screamRadius: this.screamRadius,
                    distances: this.distances
                }
            }
        );
        document.dispatchEvent(event);
    }

    render() {
        const ctx = document.getElementById("field").getContext("2d");

        ctx.fillStyle = "rgb(250,230,100)";
        if (this.targetName === this.hiveName) {
            ctx.fillStyle = "rgb(232,102,8)";
        }
        if (this.targetName === 't1') {
            ctx.fillStyle = "rgb(229,216,169)";
        }
        if (this.targetName === 't2') {
            ctx.fillStyle = "rgb(97,189,50)";
        }
        if (this.targetName === 't3') {
            ctx.fillStyle = "rgb(142,31,173)";
        }
        if (this.targetName === 't4') {
            ctx.fillStyle = "rgb(38,167,176)";
        }
        if (this.targetName === 't5') {
            ctx.fillStyle = "rgb(127,105,133)";
        }

        ctx.fillRect(this.x - 1.5, this.y - 1.5, 3, 3);
    }
}