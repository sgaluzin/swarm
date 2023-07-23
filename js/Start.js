function createCanvas() {
    let canvasElement = document.createElement("canvas");
    canvasElement.setAttribute('id', 'field');
    canvasElement.width = Config.width();
    canvasElement.height = Config.height();
    document.getElementById('canvas-div').appendChild(canvasElement);
    canvasElement.addEventListener("click", createTarget, false);
}

function createTarget(e) {
    const element = document.getElementById("field");
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let targetName = 't' + window.animation.field.statics.length;
    let target = new Target(targetName, x, y);
    window.animation.addTarget(target)
}

function createAnimation() {
    let hive = new Target(Config.hiveName(), 50, 150);


    let swarm = new Swarm(hive);
    swarm.createBees(Config.beesAmount());

    let field = new Field();
    field.addSwarm(swarm);

    window.animation = new Animation(field);
}

Images.load();

document.addEventListener("DOMContentLoaded", function () {
    createCanvas();
    createAnimation();

    document.getElementById('start').onclick = function () {
        window.animation.start();
    };

    document.getElementById('stop').onclick = function () {
        window.animation.stop();
    };
});