

class Field extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.add.text(20, 20, "Use the arrow keys to move the bird.");
        this.add.text(20, 40, "Press space to interact with objects.");
        this.health = 1;
        this.healthAmount = this.add.text(config.width-250, 5, "Health: " + this.health + " / 100");
        this.inventory = 0;
        this.inventoryAmount = this.add.text(config.width-250, 50, "Sticks: " + this.inventory);
        this.redbird = this.physics.add.sprite(config.width/2, config.height/2, "redbird");
        this.redbird.setCollideWorldBounds(true);
        this.redbird.setScale(2, 2);
        this.speechBubble = this.add.text(this.redbird.x+20, this.redbird.y-20, "");


        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //set array of food items to spawn
        this.Blueberries = this.physics.add.group({
            key: 'blueberry',
            repeat: 9
        });

        this.BirdSeed = this.add.group({
            key: 'birdseed',
            repeat: 9
        });

        this.AppleSeed = this.add.group({
            key: 'appleseed',
            repeat: 9
        });

        //set array of sticks to spawn

        this.Stick2 = this.add.group({
            key: "stick2",
            repeat: 9
        });

        this.spawnBlueberries();
        this.spawnBirdSeed();
        this.spawnAppleSeed();

        this.spawnStick2();

        this.hpBar = this.makeHealthBar();

        this.physics.add.collider(this.redbird, this.Blueberries, this.blueBerryCollision, null, this);
        this.physics.add.collider(this.redbird, this.BirdSeed);
        this.physics.add.collider(this.redbird, this.AppleSeed);
        this.physics.add.collider(this.redbird, this.Stick2);
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

    spawnBirdSeed(){

        this.BirdSeed.children.iterate(function (child){
            child.setX(Math.random()*(config.width-32)+32);
            child.setY(Math.random()*(config.height-32)+32);
        });
    }

    spawnAppleSeed(){

        this.AppleSeed.children.iterate(function (child){
            child.setX(Math.random()*(config.width-32)+32);
            child.setY(Math.random()*(config.height-32)+32);
        });
    }

    spawnStick2(){
        this.Stick2.children.iterate(function (child){
            child.setX(Math.random()*(config.width-32)+32);
            child.setY(Math.random()*(config.height-32)+32);
        });
    }

    interact(){
        var bird = this.redbird;
        var hp = this.health;
        var inv = this.inventory;
        var speech = this.speechBubble;
        var time = this.time;


        if(this.spaceBar.isDown) {
            /*this.Blueberries.children.iterate(function (child){
                if(child != null && child.x > (bird.x - 20) && child.x < (bird.x + 20) 
                    && child.y > (bird.y - 20) && child.y < (bird.y + 20)) {
                    child.destroy();
                    hp += 10;
                }
            });*/
            this.BirdSeed.children.iterate(function (child){
                if(child != null && child.x > (bird.x - 20) && child.x < (bird.x + 20) 
                    && child.y > (bird.y - 20) && child.y < (bird.y + 20)) {
                    child.destroy();
                    hp += 5;
                }    
            });
            this.AppleSeed.children.iterate(function (child){
                if(child != null && child.x > (bird.x - 20) && child.x < (bird.x + 20) 
                    && child.y > (bird.y - 20) && child.y < (bird.y + 20)) {
                    child.destroy();
                    hp -= 5;
                }    
            });
            this.Stick2.children.iterate(function (child){
                if(child != null && child.x > (bird.x - 20) && child.x < (bird.x + 20) 
                    && child.y > (bird.y - 20) && child.y < (bird.y + 20)) {
                        if(inv == 3){
                            speech.setPosition(bird.x+20, bird.y-20);
                            speech.setText("My inventory is full!");
                            //time.delayedCall(300, speech.setText(""));
                        }
                        if(inv < 3){
                            child.destroy();
                            inv += 1;
                        }

                }
            });
        }
        this.health = hp;
        this.updateHealth(hp);
        this.inventory = inv;
        this.updateInventory(inv);
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
            this.health = 100;
            this.healthAmount.setText("Health: " + 100 + " / 100"); 
        }
        else if(newHP < 1){
            this.hpBar.scaleX = 1 / 100;
            this.health = 1;
            this.healthAmount.setText("Health: " + 1 + " / 100"); 
        }
        else{
            this.hpBar.scaleX = newHP / 100;
            this.healthAmount.setText("Health: " + this.health + " / 100");
        }

    }

    updateInventory(newInv){
        this.inventory = newInv;
        this.inventoryAmount.setText("Sticks: " + this.inventory);
    }

    speak(text){
        this.speechBubble.setPosition(this.redbird.x+20, this.redbird.y-20);
        this.speechBubble.setText(text);
        scene.time.delayedCall(300, this.speechBubble.setText(""));
    }

    blueBerryCollision(bird, blueberry){
        if(this.spaceBar.isDown){
        blueberry.destroy();
        this.health += 10;
        this.updateHealth(this.health);
        }
    
}

}