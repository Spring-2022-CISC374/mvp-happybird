class Field extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.add.text(20, 20, "Use the arrow keys to move the bird.");
        this.redbird = this.physics.add.sprite(config.width/2, config.height/2, "redbird");
        this.redbird.setCollideWorldBounds(true);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.stick = this.add.sprite(config.width/2, config.height/2, "stick");
        this.stick.setScale(0.1, 0.1);
    }

    update() {
        this.moveBird();
    }

    moveBird() {
        if(this.cursorKeys.left.isDown) {
            this.redbird.setVelocityX(-globalSettings.playerSpeed);
            this.redbird.angle = 270;
        }else if (this.cursorKeys.right.isDown) {
            this.redbird.setVelocityX(globalSettings.playerSpeed);
            this.redbird.angle = 90;
        }else {
            this.redbird.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown) {
            this.redbird.setVelocityY(-globalSettings.playerSpeed);
            this.redbird.angle = 0;
        }else if (this.cursorKeys.down.isDown) {
            this.redbird.setVelocityY(globalSettings.playerSpeed);
            this.redbird.angle = 180;
        }else {
            this.redbird.setVelocityY(0);
        }
    }
}