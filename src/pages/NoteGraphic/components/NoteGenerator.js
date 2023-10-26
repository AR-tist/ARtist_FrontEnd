import Phaser from 'phaser';
import { now } from 'tone';
import ex from './images/ex.png';
// import { LightEffector } from "./LightEffector";

export class NoteGenerator {
    constructor(scene, width, height, notes, start_idx = 1, last_idx = 4, timeDivision) {

        this.noteArray = [];
        this.speed = parseFloat(timeDivision) / 200.0 *2;
        this.timerCount = 0;

        // collider용 라인 생성
        this.nowPressLine = scene.add.rectangle(
            0, // x 
            height * 0.8, // y
            width, // width
            1,    // height
            0xFF6347    // color
            )
            .setDepth(1)
            .setOrigin(0,0);
        scene.physics.add.existing(this.nowPressLine);

        // 미디 사각형 생성
        notes.forEach(n=>{
            this.noteArray.push(new NoteRectangle(n.note, n.startAt, n.endAt, scene, width, height,
                start_idx, last_idx, timeDivision, this.nowPressLine, this.effector));
        });
        console.log(this.noteArray);

        scene.time.addEvent({
            delay: 10, // 시간 단위 ms
            callback: () => this.playTimer(), // delay 주기마다 수행할 로직
            callbackScope: this, // callback 범위
            loop: true, // 반복 여부
        });

        // 이펙터 불러오기
        // this.lightEffector = new LightEffector(this);
        
        // 이펙터 생성
        this.effector = scene.add.particles(ex);

    }

    playTimer() {
        
        this.timerCount += 10;
        // console.log(this.timerCount);
    }

    goDown() {  // physics 붙일 수 있게 돼서 setVelocityY로 대체 가능

        this.noteArray.forEach(n=>{
            if (n.startAt <= this.timerCount) {
                n.graphic.y += this.speed;
            }
            // console.log(n.startAt);
        });
    }

    // setEffector(x, y) {
    //     this.lightEffector.shine(x, y);
    // }
}

export class NoteRectangle {
    constructor(note, startAt, endAt, scene, width, height, start_idx, last_idx, timeDivision, nowPressLine, effector) {

        this.startAt = startAt;
        this.endAt = endAt;
        // console.log(startAt, endAt);
        /* 노트 편집 */
        // 1. 너무 긴 사각형 줄이기
        // const max = timeDivision * 0.5;    // 온음표 시간까지 자르면 좋겠는데...
        // if (this.endAt - this.startAt > max) {
        //     this.endAt = max
        // }
        // 2. 다음 음 시작 전에 자르기
        // -> 계속 눌러야 하는 거랑 끊어야 하는 거를 구분하기 - 실패함
        // -> 왼손 오른손 명확히 구분할 방법도...

        const num = last_idx;
        if (num + start_idx > 10) {
            num = num - start_idx;
        }
        let s_w = width / num / 7;  // 사각형의 폭
        const length = (endAt - startAt) * parseFloat(timeDivision) / 3200.0 *2;  // 사각형의 길이
        const octave = Math.floor(note / 12) - start_idx;   // 옥타브
        let pos = note % 12;    // 음에 따른 위치
        const blackNote = [1, 3, 6, 8, 10];
        let depth = 0;    // 하얀 건반: 0, 검은 건반: 1 (검은 건반이 위로 가도록)
        
        if (blackNote.includes(pos))    // 샵이라면
        {
            pos = (octave * 7 * s_w) + ((Math.floor(pos/2)+1) * s_w) - s_w / 4;
            s_w /= 2;
            depth = 1;  // 검은 건반이 위로
        }
        else
        {
            if (pos === 0) { pos = octave * 7 * s_w; }
            else if (pos < 5) {
                pos = (octave * 7 * s_w) + ((pos/2) * s_w);
            }
            else { 
                pos = (octave * 7 * s_w) + ((Math.floor(pos/2)+1) * s_w);
            }
        }

        // (사각형 버전. graphic으로 변경됨)
        // this.rect = scene.add.rectangle(
        //     pos, // x 
        //     -length, // y
        //     s_w, // width
        //     length,    // height
        //     0x4488aa    // color
        //     )
        //     .setDepth(1)
        //     .setOrigin(0,0);

        const line = 2;

        this.graphic = scene.add.graphics().setDepth(depth);
        // this.graphic.lineStyle(line, 0x616380, 1.0);
        this.graphic.lineGradientStyle(line, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF,
            0.0, 0.0, 1.0, 1.0);
        // this.graphic.fillStyle(0xFFFFFF, 1.0);
        this.graphic.fillGradientStyle(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF,
            0.0, 0.0, 1.0, 1.0);
        this.graphic.fillRect(pos, -length-line, s_w, length);
        this.graphic.strokeRect(
            pos + 1,
            -length-1, 
            s_w - line, 
            length - line
            );

        // 충돌 감지 추가
        scene.physics.add.existing(this.graphic);
        scene.physics.add.overlap(this.graphic, nowPressLine, this.checkCollision);

        // this.effector = effector;
        // this.effectX = pos;
        // this.effectY = height * 0.8 - 10;
        // this.effectW = s_w;
        // this.effectH = 10;
        // this.scene = scene;
    }

    // 충돌(overlap) 감지 함수
    checkCollision(graphic, nowPressLine) {
        // graphic.destroy();   // test(작동은 함)
        // this.effectTest.setFillStyle(0xEE82EE);  // x
        // this.effectTest.setDepth(4); // x

        // 아래 다 실패
        // this.scene.setEffector(graphic.x, graphic.y);
        // this.scene.lightEffector.shine(100, 100);

            // const effect = this.effector.createEmitter({
            //     frame:5,
            //     blendMode:Phaser.BlendModes.SCREEN,
            //     x:100, y:100,
            //     frequency:0,
            //     alpha:{start:1, end:0, ease:'Cubic.easeIn'},
            //     scale:{start:0.1, end:0.75, ease:'Cubic.easeOut'}
            // });
            // effect.shine();
        }
    // }

    // 이펙트 생성 함수 (실패)
    // addEffectRect() {
    //     this.effectTest = this.scene.add.rectangle(
    //         this.effectX, // x 
    //         this.effectY, // y
    //         this.effectW, // width
    //         this.effectH,    // height
    //         0xffffff    // color
    //         )
    //         .setDepth(1)
    //         .setOrigin(0,0);
    // }

}