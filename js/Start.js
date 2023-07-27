function createCanvas() {
    let canvasElement = document.createElement("canvas");
    canvasElement.setAttribute('id', 'field');
    canvasElement.width = Config.width();
    canvasElement.height = Config.height();
    document.getElementById('canvas-div').appendChild(canvasElement);
}

function delayForAddHoney() {
    document.getElementById('add-honey').disabled = true;
    document.getElementById('add-honey-delay').innerText = Config.addHoneyDelay() + 's.';
    let interval = setInterval(() => {
        if (Config.pause()) {
            return;
        }

        Config.addHoneyDelayDecrease();
        document.getElementById('add-honey-delay').innerText = Config.addHoneyDelay() + 's.';
        if (Config.addHoneyDelay() <= 0) {
            Config.addHoneyDelaySetDefault();
            document.getElementById('add-honey').disabled = false;
            clearInterval(interval);
        }
    }, 1000);
}

function intervalForAddHoney() {
    setInterval(() => {
        if (Config.pause()) {
            return;
        }

        Config.addHoneyDelayIntervalDecrease()
        document.getElementById('add-honey-delay-interval').innerText = Config.addHoneyDelayInterval() + 's.';
        if (Config.addHoneyDelayInterval() <= 0) {
            Config.addHoneyDelayIntervalSetDefault();
            createHoney();
        }
    }, 1000);
}

function createHoney(e) {
    let honeyName = 'h' + window.animation.field.targets.length;
    let honey = new Honey(
        honeyName,
        Helper.getInstance().getRandomInt(0, Config.width()),
        Helper.getInstance().getRandomInt(0, Config.height())
    );
    window.animation.addHoney(honey);
}

function createAnimation() {
    let hive = new Hive(Config.hiveName(), 50, 150);

    let swarm = new Swarm(hive);
    swarm.createBees(Config.beesAmount());

    let field = new Field();
    field.addSwarm(swarm);

    let wall1 = new Wall(300, 180, 60, 360);
    // field.addWall(wall1);
    let wall2 = new Wall(150, -10, 60, 300);
    // field.addWall(wall2);

    window.animation = new Animation(field);
}

Images.load();
Sounds.create();

document.addEventListener("DOMContentLoaded", function () {
    Config.init();
    createCanvas();
    createAnimation();
    intervalForAddHoney();

    document.getElementById('start').onclick = function () {
        window.animation.start();

        Sounds.play()
    };

    document.getElementById('stop').onclick = function () {
        window.animation.stop();

        Sounds.pause()
    };

    document.getElementById('add-honey').onclick = function() {
        createHoney();
        delayForAddHoney();
    };
});