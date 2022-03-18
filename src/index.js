import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import wizardImg from './assets/wizard.png';
import wizardJson from './assets/wizard.json';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.atlas('wizard', wizardImg, wizardJson);
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('wizard', { prefix: 'idle00', start: 0, end: 5, suffix: '.png'}),
            frameRate: 8,
            repeat: -1
        });
        var wizard = this.add.sprite(100, 100);
        wizard.play('idle')
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
