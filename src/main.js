let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
//Points breakdown
//Randomize each spaceship's movement direction at the start of each play (5)
//Implement the speed increase that happens after 30 seconds in the original game (5)
//Create 4 new explosion SFX and randomize which one plays on impact (10)
//Display the time remaining (in seconds) on the screen (10)
//Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)

let scoreConfig;
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLEFT, keyRIGHT;