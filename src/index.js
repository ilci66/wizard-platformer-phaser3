import Phaser, { Physics } from 'phaser';
import logoImg from './assets/logo.png';
import wizardImg from './assets/wizard.png';
import wizardJson from './assets/wizard.json';
import bgImg from './assets/background_layer_3.png';
import paintingImg from './assets/painting-dark-blue.jpg';
import skyImg from './assets/dark-sky-game.png';
import oakwoodImg from './assets/oakwood.png'
import gameJson from './assets/game.json';

class MyGame extends Phaser.Scene {
  // cursor;
  constructor() {
    super('game');
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload () {
    this.load.atlas('wizard', wizardImg, wizardJson);
    this.load.image('trees', bgImg);
    this.load.image('painting', paintingImg);
    this.load.image('sky', skyImg);
    
    this.load.image('tiles', oakwoodImg);
    this.load.tilemapTiledJSON('tilemap', gameJson)
  }
  
  create () {   
    this.createWizardAnimation();

    const map = this.make.tilemap({key: 'tilemap'})
    const tileset = map.addTilesetImage('oakwood', 'tiles')

    const ground = map.createLayer('Tile Layer 1', tileset)
    ground.setCollisionByProperty({ collides: true})
    
    this.matter.world.convertTilemapLayer(ground)
    

    this.cameras.main.scrollY = -120
    

    this.wizard = this.matter.add.sprite(60, 250, 'wizard')
      .setFixedRotation()
      .setScale(0.7)
      .setRectangle(60, 70)
      .play('idle')
  }

  createWizardAnimation() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('wizard', { prefix: 'idle00', start: 0, end: 5, suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'run-left',
      frames: this.anims.generateFrameNames('wizard', { prefix: 'runleft00', start: 0, end: 7, suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'run-right',
      frames: this.anims.generateFrameNames('wizard', { prefix: 'run00', start: 0, end: 7, suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    });
  }
  update () {
    const speed = 2;

    if (this.cursors.left.isDown){
      console.log("left is down")
      this.wizard.play('run-left')
      this.wizard.setVelocityX(-speed)
    }
    else if (this.cursors.up.isDown){
      console.log("up is down")
      if(this.wizard.isTouchingGroud){

        this.wizard.setVelocityY(-speed)
      }
    }
    else if (this.cursors.down.isDown){
      console.log("down is down")
    }
    else if (this.cursors.right.isDown){
      console.log("right is down")
      this.wizard.play('run-right')
      this.wizard.setVelocityX(speed)
    }
    else {
      // this.wizard.setVelocityX(0)
      // this.wizard.play('idle')
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 600,
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
