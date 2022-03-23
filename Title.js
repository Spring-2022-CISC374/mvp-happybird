class Title extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.spritesheet("redbird", "assets/spritesheets/redbird.png", {
            frameWidth: 20,
            frameHeight: 18
        });

        this.load.spritesheet("redBerry","assets/spritesheets/redBerry.png", {
            frameWidth: 20,
            frameHeight: 20
        })
    }

    create() {
        this.add.text(config.width / 2 - 100, 100, "Happy Bird", { fontSize: "32px"});
        
        this.startButton = this.add.text(config.width / 2 - 80, 400, "Click to start");
        this.startButton.setInteractive();
        this.input.on('gameobjectdown', this.start, this);
    }

    start() {
        this.scene.start("playGame");
    }
}