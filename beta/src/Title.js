class Title extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.spritesheet("redbird", "assets/spritesheets/redbird.png", {
            frameWidth: 40,
            frameHeight: 36
        });

       this.load.image("background", "assets/sky.png");
       this.load.image("background2", "assets/map.png");
       this.load.spritesheet("blueberry", "assets/spritesheets/blueberry.png", {frameWidth: 64, frameHeight: 64});
       this.load.spritesheet("birdseed", "assets/spritesheets/birdseed.png", {frameWidth: 64, frameHeight: 64});
       this.load.spritesheet("appleseed", "assets/spritesheets/appleseed.png", {frameWidth: 64, frameHeight: 64});
       this.load.spritesheet("stick2", "assets/spritesheets/stick2.png", {frameWidth: 64, frameHeight: 64});
       this.load.spritesheet("nest", "assets/spritesheets/nest.png", {frameWidth: 62, frameHeight: 54});
       this.load.spritesheet("nestarea", "assets/spritesheets/nestarea.png", {frameWidth: 68, frameHeight: 64})
    }

    create() {
        this.add.text(config.width / 2 - 100, 100, "Happy Bird", { fontSize: "32px"});
        this.background = this.add.image(0,0,"background");
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        this.background.setOrigin(0,0);
        this.titleText = this.add.text(config.width / 2 - 210, 100, "Happy Bird",{fill: '#000', fontSize: '64px', strokeThickness: 5});
        this.startButton = this.add.text(config.width / 2 - 80, 400, "Click to start",{fill: '#000',backgroundColor: '#606060', fontStyle: 'bold'});
        this.startButton.setInteractive();
        this.input.on('gameobjectdown', this.start, this);
    }

    start() {
        this.scene.start("playGame");
    }
}