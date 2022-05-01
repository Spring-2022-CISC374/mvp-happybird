var globalSettings = {
    playerSpeed: 200,
}

var config = {
	width: 1600,
	height: 900,
	backgroundColor: 0x39c647,
	scene: [Title, Field],
	physics: {
		default: "arcade",
		arcade:{
			debug: false
		}
	}
}
var happyBirdGame = new Phaser.Game(config);