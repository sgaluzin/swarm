class Config {

    static screamRadiusProp = 35;
    static beesAmountProp = 1100;
    static beesAmountMaxProp = 2000;
    static beesAmountMinProp = 1;
    static init() {
        document.getElementById('bees-amount').value = this.beesAmount();
        document.getElementById('bees-amount').oninput = (event) => {
            let value = parseInt(event.target.value);
            if (value > this.beesAmountMaxProp) {
                this.beesAmountProp = this.beesAmountMaxProp;
            } else {
                this.beesAmountProp = value;
            }

            if (value < this.beesAmountMinProp) {
                this.beesAmountProp = this.beesAmountMinProp;
            } else {
                this.beesAmountProp = value;
            }

            //@todo accessing by zero key should be refactored
            window.animation.field.dynamics[0].updateBeesAmount(this.beesAmountProp);
        };

        document.getElementById('scream-radius').value = this.screamRadiusProp;
        document.getElementById('scream-radius').oninput = (event) => {
            let value = parseInt(event.target.value);
            if (value > this.screamRadiusProp) {
                this.screamRadiusProp = this.beesAmountMaxProp;
            } else {
                this.screamRadiusProp = value;
            }

            if (value < this.beesAmountMinProp) {
                this.screamRadiusProp = this.beesAmountMinProp;
            } else {
                this.screamRadiusProp = value;
            }
        };
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