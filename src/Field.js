

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
        this.tutorial = this.add.text(20, 20, "Instructions: \n Use the arrow keys to move the bird. \n Press space to interact with objects. \n Bring sticks to a nice nesting spot to build a nest! \n Try to get to full Health! \n\nPress enter to close this text box. ", {fill: 'white', backgroundColor: 'black'});
        this.health = 1;
        this.healthAmount = this.add.text(config.width-250, 5, "Health: " + this.health + " / 100", {fill: 'white', backgroundColor: 'black'});
        this.inventory = 0;
        this.inventoryAmount = this.add.text(config.width-250, 50, "Sticks: " + this.inventory, {fill: 'white', backgroundColor: 'black'});
        
        //set up nest
        this.nestArea = this.physics.add.sprite(Math.random()*(config.width-64)+64, Math.random()*(config.width-64)+64, "nestarea");
        this.nest = this.physics.add.sprite(this.nestArea.x, this.nestArea.y-10, "nest");
        this.nest.visible = false;
        this.nestPieces = 0;

        //define keys
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //set arrays of food items and sticks to spawn
        this.Blueberries = this.physics.add.group({key: 'blueberry', repeat: 9});
        this.BirdSeed = this.physics.add.group({key: 'birdseed', repeat: 9});
        this.AppleSeed = this.physics.add.group({key: 'appleseed', repeat: 9});
        this.Stick2 = this.physics.add.group({key: "stick2", repeat: 9});

        //set bird spawn and camera following
        this.redbird = this.physics.add.sprite(config.width/2, config.height/2, "redbird");
        this.redbird.setCollideWorldBounds(true);
        this.redbird.setScale(2, 2);
        this.cameras.main.startFollow(this.redbird);

        //speech bubble setup
        this.speechBubble = this.add.text(this.redbird.x-10, this.redbird.y-50, "");
        this.speechBubble.visible = false;
        this.winSpeechBubble = this.add.text(this.redbird.x-175, this.redbird.y-80, "Congratulations! My Health is full and my nest is built!", {fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: '#66ff00', fontSize: '32px'});
        this.winSpeechBubble.visible = false;

        //set up audio
        this.music = this.sound.add("natureSounds", {loop: true});
        this.collectStick = this.sound.add("collectStick", {loop: false});
        this.collectBS = this.sound.add("birdseedSound", {loop: false});
        this.collectBB = this.sound.add("blueberrySound", {loop: false});
        this.appleHit = this.sound.add("appleSeedSound", {loop: false});
        this.winSong = this.sound.add("win", {loop: false});

        this.spawnBlueberries();
        this.spawnBirdSeed();
        this.spawnAppleSeed();
        this.spawnStick2();

        this.hpBar = this.makeHealthBar();

        this.physics.add.overlap(this.redbird, this.Blueberries, this.blueBerryCollision, null, this);
        this.physics.add.overlap(this.redbird, this.BirdSeed, this.BirdSeedCollision, null, this);
        this.physics.add.overlap(this.redbird, this.AppleSeed, this.AppleSeedCollision, null, this);
        this.physics.add.overlap(this.redbird, this.Stick2, this.StickCollision, null, this);
        this.physics.add.overlap(this.redbird, this.nest, this.NestCollision, null, this);

        //make health bar and other hud elements scroll with camera
        this.hpBar.setScrollFactor(0);
        this.tutorial.setScrollFactor(0);
        this.healthAmount.setScrollFactor(0);
        this.inventoryAmount.setScrollFactor(0);

        //win condition (temp)
        this.nestBuilt = false;
        this.won = false;

        //play music
        this.music.play();
    }
    

    update() {
        this.closeTutorial();
        if(!this.won)
            this.moveBird();
        this.checkWin();
    }

    closeTutorial() {
        if (this.enter.isDown) {
            this.tutorial.visible = false;
        }
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
        this.moveSpeechBubbles();
    }

    moveSpeechBubbles() {
        this.speechBubble.x = this.redbird.x-10;
        this.speechBubble.y = this.redbird.y-50;
        this.winSpeechBubble.x = this.redbird.x-175;
        this.winSpeechBubble.y = this.redbird.y-80;
    }

    async checkWin() {
        if(this.health >= 100 && this.won == false && this.nestBuilt) {
            this.winSong.play();
            this.won = true;
            this.winSpeechBubble.visible = true;
            await new Promise(r => setTimeout(r, 5000));
            this.winSpeechBubble.visible = false;
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
        hpbar.scaleX = 1 / 100;
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

    /* credit to https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    for the sleep solution for the following functions */
    async blueBerryCollision(bird, blueberry){
        if(this.spaceBar.isDown){
            this.collectBB.play();
            blueberry.destroy();
            this.health += 10;
            this.updateHealth(this.health);
            this.speechBubble.setText("+10 Health!");
            this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'green'});
            this.speechBubble.visible = true;
            await new Promise(r => setTimeout(r, 2000));
            this.speechBubble.visible = false;
        }
        else{
            this.speechBubble.setText("Blueberry");
            this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'white'});
            this.speechBubble.visible = true;
            await new Promise(r => setTimeout(r, 1));
            this.speechBubble.visible = false;
        }
    }

    async BirdSeedCollision(bird, seed){
        if(this.spaceBar.isDown){
            this.collectBS.play();
            seed.destroy();
            this.health += 5;
            this.updateHealth(this.health);
            this.speechBubble.setText("+5 Health.");
            this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'yellow'});
            this.speechBubble.visible = true;
            await new Promise(r => setTimeout(r, 2000));
            this.speechBubble.visible = false;
        }
        else{
            this.speechBubble.setText("Birdseed");
            this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'white'});
            this.speechBubble.visible = true;
            await new Promise(r => setTimeout(r, 1));
            this.speechBubble.visible = false;
        }
    }

    async AppleSeedCollision(bird, appleSeed){
        if(this.spaceBar.isDown){
            this.appleHit.play();
            appleSeed.destroy();
            this.health -= 5;
            this.updateHealth(this.health);
            this.speechBubble.setText("-5 Health...");
            this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'red'});
            this.speechBubble.visible = true;
            await new Promise(r => setTimeout(r, 2000));
            this.speechBubble.visible = false;
        }
        else{
            this.speechBubble.setText("Apple Seeds");
            this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'white'});
            this.speechBubble.visible = true;
            await new Promise(r => setTimeout(r, 1));
            this.speechBubble.visible = false;
        }
    }

    async StickCollision(bird, stick){
        if(this.spaceBar.isDown){
            if(this.inventory == 3){
                this.speechBubble.setText("I can't hold more sticks!");
                this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'white'});
                this.speechBubble.visible = true;
                await new Promise(r => setTimeout(r, 2000));
                this.speechBubble.visible = false;
            }
            if(this.inventory < 3){
                this.collectStick.play();
                stick.destroy();
                this.inventory += 1;
                this.updateInventory(this.inventory);
            }
        }
    }

    async NestCollision(bird, nest) {
        if(this.nestPieces == 4)
            this.nestBuilt = true;
        if(this.spaceBar.isDown && this.inventory > 0){
            this.nest.visible = true;
            if (this.nestPieces < 4) {
                this.inventory -= 1;
                this.nestPieces += 1;
            }
            else {
                this.speechBubble.setText("My nest is already complete!");
                this.speechBubble.setStyle({fill: 'black', fontStyle: 'bold', strokeThickness: 3, stroke: 'white'});
                this.speechBubble.visible = true;
                await new Promise(r => setTimeout(r, 2000));
                this.speechBubble.visible = false;
            }
            this.nest.setFrame(this.nestPieces-1);
            this.updateInventory(this.inventory);
        }
    }
}