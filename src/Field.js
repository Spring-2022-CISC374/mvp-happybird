

class Field extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.add.text(20, 20, "Use the arrow keys to move the bird.");
        this.add.text(20, 40, "Press space to interact with objects.");
        this.health = 1;
        this.healthAmount = this.add.text(config.width-250, 5, "Health: " + this.health + " / 100");
        this.redbird = this.physics.add.sprite(config.width/2, config.height/2, "redbird");
        this.redbird.setCollideWorldBounds(true);
        this.redbird.setScale(2, 2);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //set array of food items to spawn
        this.Blueberries = this.add.group({
            key: 'blueberry',
            repeat: 9
        });

        this.spawnBlueberries();
        this.hpBar = this.makeHealthBar();
    }

    update() {
        this.moveBird();
        this.interact();

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

        this.Blueberries.children.iterate(function (child){
            child.setX(Math.random()*(config.width-32)+32);
            child.setY(Math.random()*(config.height-32)+32);
        });
    }

    interact(){
        var bird = this.redbird;
        var hp = this.health;
        if(this.spaceBar.isDown) {
            this.Blueberries.children.iterate(function (child){
                if(child.x > (bird.x - 20) && child.x < (bird.x + 20) 
                    && child.y > (bird.y - 20) && child.y < (bird.y + 20)) {
                    child.angle += 90;
                    hp += 2;
                }
            });
        }
        this.health = hp;
        this.updateHealth(hp);
    }

    makeHealthBar(){
        let hpbar = this.add.graphics();
        hpbar.x = config.width - 250;
        hpbar.y = 20;
        hpbar.fillStyle(0xFF0000, 1);
        hpbar.fillRect(0,0,200,20);
        return hpbar;
    }

    updateHealth(newHP){
        if(newHP > 100){
            this.hpBar.scaleX = 1;
            this.healthAmount.setText("Health: " + 100 + " / 100");
        }
        else{
            this.hpBar.scaleX = newHP / 100;
            this.healthAmount.setText("Health: " + this.health + " / 100");
        }
    }
}