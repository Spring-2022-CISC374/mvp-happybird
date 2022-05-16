var globalSettings = {
	playerSpeed: 250,
	worldWidth: 1920*2,
    worldHeight: 1080*2,
}

var config = {
	width: 1600,
	height: 900,
	backgroundColor: 0x39c647,
	scene: [Title, Field, Sleep],
	physics: {
		default: "arcade",
		arcade:{
			debug: false
		}
	}
}
var Game = new Phaser.Game(config);