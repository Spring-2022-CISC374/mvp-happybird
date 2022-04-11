class Title extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.spritesheet("redbird", "assets/spritesheets/redbird.png", {
            frameWidth: 20,
            frameHeight: 18
        });

       this.load.image("background", "assets/sky.png");
    }

    create() {
        this.add.text(config.width / 2 - 100, 100, "Happy Bird", { fontSize: "32px"});
        this.background = this.add.image(0,0,"background");
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        this.background.setOrigin(0,0);
        this.startButton = this.add.text(config.width / 2 - 80, 400, "Click to start");
        this.startButton.setInteractive();
        this.input.on('gameobjectdown', this.start, this);
    }

    start() {
        this.scene.start("playGame");
    }
}