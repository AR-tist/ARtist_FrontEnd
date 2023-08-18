import Phaser from 'phaser';

export class NoteGenerator {
    constructor(scene, width, height, notes, start_idx = 1, last_idx = 4, timeDivision) {

        this.noteArray = [];
        this.speed = parseFloat(timeDivision) / 157.0;
        this.timerCount = 0;

        notes.forEach(n=>{
            this.noteArray.push(new NoteRectangle(n.note, n.startAt, n.endAt, scene, width, height,
                start_idx, last_idx, timeDivision));
        });
        console.log(this.noteArray);

        scene.time.addEvent({
            delay: 10, // 시간 단위 ms
            callback: () => this.playTimer(), // delay 주기마다 수행할 로직
            callbackScope: this, // callback 범위
            loop: true, // 반복 여부
        });
    }

    playTimer() {
        
        this.timerCount += 10;
        // console.log(this.timerCount);
    }

    goDown() {

        this.noteArray.forEach(n=>{
            if (n.startAt <= this.timerCount) {
                n.graphic.y += this.speed;
            }
            // console.log(n.startAt);
        });
    }

}

export class NoteRectangle {
    constructor(note, startAt, endAt, scene, width, height, start_idx, last_idx, timeDivision) {

        this.startAt = startAt;
        this.endAt = endAt;

        const num = last_idx;
        if (num + start_idx > 10) {
            num = num - start_idx;
        }
        let s_w = width / num / 7;  // 사각형의 폭
        const length = (endAt - startAt) * parseFloat(timeDivision) / 2750.0;  // 사각형의 길이
        const octave = Math.floor(note / 12) - start_idx;   // 옥타브
        let pos = note % 12;    // 음에 따른 위치
        const blackNote = [1, 3, 6, 8, 10];
        // console.log(octave);
        // console.log(pos);

        if (blackNote.includes(pos))    // 샵이라면
        {
            pos = (octave * 7 * s_w) + ((Math.floor(pos/2)+1) * s_w) - s_w / 4;
            s_w /= 2;
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

        this.graphic = scene.add.graphics().setDepth(1);
        this.graphic.lineStyle(line, 0x4488aa, 1.0);
        this.graphic.fillStyle(0xFFFFFF, 1.0);
        this.graphic.fillRect(pos, -length-1, s_w, length);
        this.graphic.strokeRect(
            pos + line,
            -length-1, 
            s_w - line*2, 
            length - line
            );

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