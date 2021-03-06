class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('particle', './assets/orangeParticle.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 3).setOrigin(0.5, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, Phaser.Math.Between(-1, 1)).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, Phaser.Math.Between(-1, 1)).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, Phaser.Math.Between(-1, 1)).setOrigin(0,0);

        mouse = this.input.activePointer;

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.rocketDeath = this.add.particles('particle').createEmitter({
            x: 400,
            y: 400,
            speed: { min: -400, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.4, end: 0 },
            lifespan: 300,
            frequency: -1,
            quantity: 80
        }); 

        this.p1Score = 0;

        scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }


        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.timerRight = this.add.text(10*(borderUISize + borderPadding), borderUISize + borderPadding*2, game.settings.gameTimer/1000, timerConfig);
        this.timerRight.text = "Timer: " + game.settings.gameTimer/1000;
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        timerConfig.fixedWidth = 0;
      

        this.speedup = this.time.delayedCall(30000, () => {
            game.settings.spaceshipSpeed *= 1.5;
            console.log("speed up");
        }, null, this);
        this.currentTimeLeft = game.settings.gameTimer/1000;
        this.previousTime = game.getTime();
    
    }
    
    update(time, delta) {
        if(time-this.previousTime > 1000 && !this.gameOver){
            //console.log("time = " + time + " previousTime = " + this.previousTime);
            this.currentTimeLeft = this.currentTimeLeft - 1;
            //console.log("Current time left = " + this.currentTimeLeft);
            this.timerRight.text = "Timer: " + this.currentTimeLeft;
            this.previousTime = time;
        }
        if(this.gameOver && mouse.leftButtonDown()) {
            game.settings.spaceshipSpeed /= 1.5;
            this.scene.restart();
        }
        if(this.gameOver && mouse.rightButtonDown()) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;  // update tile sprite
        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
             this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }


       if(this.currentTimeLeft <= 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Left Click to Restart or Right Click to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             
        boom.on('animationcomplete', () => {   
            ship.reset();                         
            ship.alpha = 1;                       
            boom.destroy();                       
        });
        
        this.rocketDeath.setPosition(ship.x, ship.y);
        this.rocketDeath.explode();

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.currentTimeLeft += game.settings.addedTime;
        this.timerRight.text = "Timer: " + this.currentTimeLeft;
        this.previousTime = game.getTime();
        let rand = Phaser.Math.Between(0,4);
        if(rand < 1){
            this.sound.play('explosion1');
            console.log("explosion 1");
        } else if(rand < 2){
            this.sound.play('explosion2');
            console.log("explosion 2");
        } else if(rand < 3){
            this.sound.play('explosion3');
            console.log("explosion 3");
        } else {
            this.sound.play('explosion4');
            console.log("explosion 4");
        }
        
      }
}