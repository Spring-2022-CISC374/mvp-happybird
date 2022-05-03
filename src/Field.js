

class Field extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    
    create() {

        this.cameras.main.setBounds(0, 0, globalSettings.worldWidth, globalSettings.worldHeight);
        this.physics.world.setBounds(0, 0, globalSettings.worldWidth, globalSettings.worldHeight);

        this.background = this.add.image(0,0,"background2");
        this.background.displayWidth = globalSettings.worldWidth;
        this.background.displayHeight = globalSettings.worldHeight;
        this.background.setDisplayOrigin(0,0);
        this.add.text(20, 20, "Use the arrow keys to move the bird.", {fill: 'white'});
        this.add.text(20, 40, "Press space to interact with objects.");
        this.blueberryscore = this.add.text(config.width-250,65, "+10");
        this.blueberryscore.visible = false;
        this.birdseedscore = this.add.text(config.width-250,65, "+5");
        this.birdseedscore.visible = false;
        this.appleseedscore = this.add.text(config.width-250,65, "-5");
        this.appleseedscore.visible = false;
        this.health = 1;
        this.healthAmount = this.add.text(config.width-250, 5, "Health: " + this.health + " / 100");
        this.healthAmount.fixedToCamera = true;
        this.inventory = 0;
        this.inventoryAmount = this.add.text(config.width-250, 50, "Sticks: " + this.inventory);
        
        this.nest = this.physics.add.sprite(Math.random()*(config.width-64)+64, Math.random()*(config.width-64)+64, "nest");

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //set arrays of food items and sticks to spawn
        this.Blueberries = this.physics.add.group({key: 'blueberry', repeat: 9});
        this.BirdSeed = this.physics.add.group({key: 'birdseed', repeat: 9});
        this.AppleSeed = this.physics.add.group({key: 'appleseed', repeat: 9});
        this.Stick2 = this.physics.add.group({key: "stick2", repeat: 9});

        //set bird and speech bubble
        this.redbird = this.physics.add.sprite(config.width/2, config.height/2, "redbird");
        this.redbird.setCollideWorldBounds(true);
        this.redbird.setScale(2, 2);
        this.cameras.main.startFollow(this.redbird);
        this.speechBubble = this.add.text(this.redbird.x+20, this.redbird.y-20, "");

        

        this.spawnBlueberries();
        this.spawnBirdSeed();
        this.spawnAppleSeed();
        this.spawnStick2();

        this.hpBar = this.makeHealthBar();

        this.physics.add.overlap(this.redbird, this.Blueberries, this.blueBerryCollision, null, this);
        this.physics.add.overlap(this.redbird, this.BirdSeed, this.BirdSeedCollision, null, this);
        this.physics.add.overlap(this.redbird, this.AppleSeed, this.AppleSeedCollision, null, this);
        this.physics.add.overlap(this.redbird, this.Stick2, this.StickCollision, null, this);
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

        this.Blueberries.children.iterate(function (child){
            child.setX(Math.random()*(globalSettings.worldWidth-64)+64);
            child.setY(Math.random()*(globalSettings.worldHeight-64)+64);
        });
    }

    spawnBirdSeed(){

        this.BirdSeed.children.iterate(function (child){
            child.setX(Math.random()*(globalSettings.worldWidth-64)+64);
            child.setY(Math.random()*(globalSettings.worldHeight-64)+64);
        });
    }

    spawnAppleSeed(){

        this.AppleSeed.children.iterate(function (child){
            child.setX(Math.random()*(globalSettings.worldWidth-64)+64);
            child.setY(Math.random()*(globalSettings.worldHeight-64)+64);
        });
    }

    spawnStick2(){
        this.Stick2.children.iterate(function (child){
            child.setX(Math.random()*(globalSettings.worldWidth-64)+64);
            child.setY(Math.random()*(globalSettings.worldHeight-64)+64);
        });
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

    blueBerryCollision(bird, blueberry){
        if(this.spaceBar.isDown){
            blueberry.destroy();
            this.health += 10;
            this.updateHealth(this.health);
            this.blueberryscore.visible = true;
        }
    }

    BirdSeedCollision(bird, seed){
        if(this.spaceBar.isDown){
            seed.destroy();
            this.health += 5;
            this.updateHealth(this.health);
        }
    }

    AppleSeedCollision(bird, appleSeed){
        if(this.spaceBar.isDown){
            appleSeed.destroy();
            this.health -= 5;
            this.updateHealth(this.health);
        }
    }

    StickCollision(bird, stick){
        if(this.spaceBar.isDown){
            if(this.inventory == 3){
                this.speechBubble.setPosition(bird.x+20, bird.y-20);
                this.speechBubble.setText("My inventory is full!");
            }
            if(this.inventory < 3){
                stick.destroy();
                this.inventory += 1;
                this.updateInventory(this.inventory);
            }
        }
    }
}