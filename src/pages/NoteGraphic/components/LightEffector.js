// 실패했지만 일단 남겨 둠
import Phaser from 'phaser';
import ex from './images/ex.png';

export class LightEffector {

    constructor(scene) {
        this.scene = scene;

        this.effector = scene.add.particles(ex);
    }

    shine(x, y) {
        const effect = this.effector.createEmitter({
            frame:5,
            blendMode:Phaser.BlendModes.SCREEN,
            x:x, y:y,
            frequency:0,
            alpha:{start:1, end:0, ease:'Cubic.easeIn'},
            scale:{start:0.1, end:0.75, ease:'Cubic.easeOut'}
        });
        effect.shine();
    }

}
