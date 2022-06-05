let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
//Points breakdown
//Randomize each spaceship's movement direction at the start of each play (5)
//Implement the speed increase that happens after 30 seconds in the original game (5)



let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLEFT, keyRIGHT;