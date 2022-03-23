import Phaser, { Physics } from 'phaser';
import logoImg from './assets/logo.png';
import wizardImg from './assets/wizard.png';
import wizardJson from './assets/wizard.json';
import bgImg from './assets/background_layer_3.png';
import paintingImg from './assets/painting-dark-blue.jpg';
import skyImg from './assets/dark-sky-game.png';
import oakwoodImg from './assets/oakwood.png'
import gameJson from './assets/game.json';
// import gameTmx from './assets/game.tmx';

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
        this.load.image('sky', skyImg);
        
        this.load.image('tiles', oakwoodImg);
        this.load.tilemapTiledJSON('tilemap', gameJson)
        // this.load.tilemapImpact('tilemap', gameTmx)
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
        // this.bg = this.add.tileSprite(0, 0, 800, 800, 'sky').setOrigin(0, 0);
        // this.trees = this.add.tileSprite(0, 0, 800, 180, 'trees').setOrigin(0, 0);
        
        
        const map = this.make.tilemap({key: 'tilemap'})
        const tileset = map.addTilesetImage('oakwood', 'tiles')

        const ground = map.createLayer('Tile Layer 1', tileset)
        ground.setCollisionByProperty({ collides: true})
        
        this.matter.world.convertTilemapLayer(ground)
        
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('wizard', { prefix: 'idle00', start: 0, end: 5, suffix: '.png'}),
            frameRate: 8,
            repeat: -1
        });
        this.cameras.main.scrollY = -120
        var wizard = this.matter.add.sprite(60, 250);   
        // wizard.setSizeToFrame() // this might work check later
        // wizard.setDisplayOrigin(12, 2)

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
    width: 1200,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: MyGame
    
};

const game = new Phaser.Game(config);
