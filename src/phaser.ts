import * as Phaser from "phaser";

class Demo extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  constructor() {
    super({
      key: "demo"
    });
  }

  preload() {
    this.load.image("block", "block.webp");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.image(400, 300, "block");
    this.input.setPollAlways();
  }

  update(time: number, delta: number) {
    this.player.y = this.input.activePointer.worldY;
    this.player.x = this.input.activePointer.worldX;
  }
}

const initialize = (canvas: HTMLCanvasElement) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: "#125555",
    physics: {
      default: "arcade",
      arcade: {
        debug: true
      }
    },
    width: 800,
    height: 600,
    canvas: canvas,
    scene: Demo
  };

  return new Phaser.Game(config);
};

export default initialize;
