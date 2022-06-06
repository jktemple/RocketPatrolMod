// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, moveSpeed, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = moveSpeed;
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
    }

    update() {
        //console.log("mouseX = " + mouse.position.x/1 + " rocketX = " + this.x);
        if(!this.isFiring) {
                if(mouse.position.x < this.x  && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                    if(this.x < mouse.position.x){
                        this.x = mouse.position.x;
                    }
                } else if (mouse.position.x >= this.x && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                    if(this.x > mouse.position.x){
                        this.x = mouse.position.x;
                    }
                }
        }
        
        if((mouse.leftButtonDown() || mouse.rightButtonDown()) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
            console.log("Fired");
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
