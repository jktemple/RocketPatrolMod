class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, direction) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   
        this.points = pointValue;   
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.direction = direction;
        if(direction <= 0){
            this.setFlipX(true);
        }
        this.reset();
    }


    update() {
        this.moveSpeed = game.settings.spaceshipSpeed;
        if(this.direction > 0){
            this.x -= this.moveSpeed;
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        } else{
            this.x += this.moveSpeed;
            if(this.x >= game.config.width) {
                this.reset();
            }
        }
    }

    reset() {
        if(this.direction > 0){
            this.x = game.config.width;
        } else {
            this.x = 0;
        }
    }
}