class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('explosion1', './assets/Explosion 1.wav');
        this.load.audio('explosion2', './assets/Explosion 2.wav');
        this.load.audio('explosion3', './assets/Explosion 3.wav');
        this.load.audio('explosion4', './assets/Explosion 4.wav');
        this.load.image('menu', './assets/Menu.png');
        this.load.image('particle', 'assets/orangeParticle.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        menuConfig.color = '#000';
        this.add.image(0,0,'menu').setOrigin(0,0);
       mouse = this.input.activePointer;
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (mouse.leftButtonDown()) {
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            addedTime: 4
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (mouse.rightButtonDown()) {
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000, 
            addedTime: 2   
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}