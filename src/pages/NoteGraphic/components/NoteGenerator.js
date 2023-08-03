// import { inxtoNote } from '../../../utils/tone';    // 음 숫자 가져오기
import Phaser from 'phaser';

export class NoteGenerator {
    constructor(scene, width, height, notes) {

        this.noteArray = [];
        this.speed = 2 *1.5;
        this.timerCount = 0;

        notes.forEach(n=>{
            this.noteArray.push(new NoteRectangle(n.note, n.startAt, n.endAt, scene, width, height));
        });
        // console.log(this.noteArray);

        scene.time.addEvent({
            delay: 10, // 시간 단위 ms
            callback: () => this.playTimer(), // delay 주기마다 수행할 로직
            callbackScope: this, // callback 범위
            loop: true, // 반복 여부
        });
    }

    playTimer() {
        
        this.timerCount += 1 *1.5;
        // console.log(this.timerCount);
    }

    goDown() {

        this.noteArray.forEach(n=>{
            if (n.startAt <= this.timerCount) {
                n.rect.y += this.speed;
            }
            // console.log(n.startAt);
        });
    }

}

export class NoteRectangle {
    constructor(note, startAt, endAt, scene, width, height) {

        this.startAt = startAt;
        this.endAt = endAt;

        let num = 4;
        let s_w = width / num / 7;  // 사각형의 폭
        const length = (endAt - startAt) * 1.21;  // 사각형의 길이

        this.rect = scene.add.rectangle(
            (note) * s_w, // x 
            -length, // y
            s_w, // width
            length,    // height
            0x4488aa    // color
            )
            .setDepth(1)
            .setOrigin(0,0);

    }
    // getRect() {
    //     return this.rect;
    // }

//      this.scene.physics.add.overlap(rect, piano, this.checkCollision);  // 충돌 판정
    // 충돌 감지 함수
//     checkCollision(rect, piano) {
//         rect.gameObject.destroy();
//     }

}