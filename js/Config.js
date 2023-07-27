class Config {

    static screamRadiusProp = 35;
    static beesAmountProp = 1100;
    static beesAmountMaxProp = 2000;
    static beesAmountMinProp = 1;
    static addHoneyDelayProp = 40;
    static pauseProp = true;

    static init() {
        document.getElementById('bees-amount').value = this.beesAmount();
        document.getElementById('bees-amount').oninput = (event) => {
            let value = parseInt(event.target.value);
            if (value > this.beesAmountMaxProp) {
                value = this.beesAmountMaxProp;
            }
            if (value < this.beesAmountMinProp) {
                value = this.beesAmountMinProp;
            }
            this.beesAmountProp = value;

            window.animation.field.swarm.updateBeesAmount(this.beesAmountProp);
        };

        document.getElementById('scream-radius').value = this.screamRadiusProp;
        document.getElementById('scream-radius').oninput = (event) => {
            let value = parseInt(event.target.value);
            if (value > this.screamRadiusProp) {
                value = this.beesAmountMaxProp;
            }
            if (value < this.beesAmountMinProp) {
                value = this.beesAmountMinProp;
            }

            this.screamRadiusProp = value;
        };
    }

    static setBeesAmount(beesAmount) {
        this.beesAmountProp = beesAmount
        document.getElementById('bees-amount').value = this.beesAmount();
    }

    static addHoneyDelay() {
        return this.addHoneyDelayProp
    }
    static addHoneyDelayDecrease() {
        this.addHoneyDelayProp -= 1;
    }

    static addHoneyDelaySetDefault() {
        this.addHoneyDelayProp = 40;
    }

    static pause() {
        return this.pauseProp;
    }

    static startGame() {
        this.pauseProp = false;
    }

    static stopGame() {
        this.pauseProp = true;
    }

    static width() {
        return 500;
    }
    static height() {
        return 500;
    }
    static beesAmount() {
        return this.beesAmountProp;
    }

    static tickDelay() {
        return 40;
    }

    static targetRadius() {
        return 10;
    }

    static targetSpeed() {
        return 0;
    }

    static targetHealth() {
        return 1500;
    }

    static beeRandomAngle() {
        return 5;
    }

    static screamRadius() {
        return () => {
            return this.screamRadiusProp;
        }
    }

    static movableSpeed() {
        return 3;
    }

    static hiveName() {
        return 'hive';
    }

    static withImages() {
        return false;
    }

    static isDebug() {
        return true;
    }
}