var globalSettings = {
    playerSpeed: 200,
}

var config = {
	width: 750,
	height: 750,
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