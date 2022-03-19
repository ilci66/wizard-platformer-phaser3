import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import wizardImg from './assets/wizard.png';
import wizardJson from './assets/wizard.json';
import bgImg from './assets/background_layer_3.png';
import paintingImg from './assets/painting-dark-blue.jpg';
import skyImg from './assets/dark-sky-game.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.image('logo', logoImg);
        this.load.atlas('wizard', wizardImg, wizardJson);
        this.load.image('trees', bgImg);
        this.load.image('painting', paintingImg);
        this.load.image('sky', skyImg)
    }
    
    create ()
    {   
        // I was using the code above for my game but
        // found this code online that strethes my background
        // let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg')
        // let scaleX = this.cameras.main.width / image.width
        // let scaleY = this.cameras.main.height / image.height
        // let scale = Math.max(scaleX, scaleY)
        // image.setScale(scale).setScrollFactor(0)

        // let background = this.add.image(400, 16, 'bg').setOrigin(0, 0);
        // let paintingBackground = this.add.image(0, 0, 'painting').setOrigin(0, 0);
        this.bg = this.add.tileSprite(0, 0, 800, 800, 'sky').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, 800, 180, 'trees').setOrigin(0, 0);
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('wizard', { prefix: 'idle00', start: 0, end: 5, suffix: '.png'}),
            frameRate: 8,
            repeat: -1
        });
        var wizard = this.add.sprite(100, 100);
        wizard.play('idle')
    }
    update ()
    {
        // background.tilePosition.x += 0.5; 
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
