class Sleep extends Phaser.Scene {
    constructor() {
        super("sleep");
    }
    preload() {
        this.load.spritesheet("sleepingredbird", "assets/spritesheets/sleep.png", {
            frameWidth: 150,
            frameHeight: 131
        });
    }
    create() {
        this.sleepText = this.add.text(config.width / 2 - 725, 100, "The Bird sleeps until morning safely!",{fill: '#000', fontSize: '64px', strokeThickness: 5});
        this.continueButton = this.add.text(config.width / 2 - 80, 400, "Click to continue",{fill: '#000',backgroundColor: '#606060', fontStyle: 'bold'});
        this.continueButton.setInteractive();
        this.input.on('gameobjectdown', this.start, this);
        this.redbird = this.physics.add.sprite(config.width/2, config.height/2 - 175, "sleepingredbird");

    }

    start() {
        this.scene.start("playGame");
    }
}