

class Field extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.add.text(20, 20, "Use the arrow keys to move the bird.");
        this.redbird = this.physics.add.sprite(config.width/2, config.height/2, "redbird");
        this.redbird.setCollideWorldBounds(true);
        this.redbird.setScale(2, 2);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //set array of food items to spawn
        this.spawnBlueberries();
    }

    update() {
        this.moveBird();
    }

    moveBird() {
        if(this.cursorKeys.left.isDown) {
            this.redbird.setVelocityX(-globalSettings.playerSpeed);
            this.redbird.flipX=true;
        }else if (this.cursorKeys.right.isDown) {
            this.redbird.setVelocityX(globalSettings.playerSpeed);
            this.redbird.angle = 0;
            this.redbird.flipX=false;
        }else {
            this.redbird.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown) {
            this.redbird.setVelocityY(-globalSettings.playerSpeed);
            this.redbird.angle = 0;
        }else if (this.cursorKeys.down.isDown) {
            this.redbird.setVelocityY(globalSettings.playerSpeed);
        }else {
            this.redbird.setVelocityY(0);
        }
    }

    spawnBlueberries(){
        this.Blueberries = this.add.group({
            key: 'blueberry',
            repeat: 9
        });
        this.Blueberries.children.iterate(function (child){
            child.setX(Math.random()*(config.width-32)+32);
            child.setY(Math.random()*(config.height-32)+32);
        });
    }
}