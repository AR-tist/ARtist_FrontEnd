import Phaser from 'phaser';
import { now } from 'tone';
import ex from './images/ex.png';

export class NoteGenerator {
    constructor(scene, width, height, notes, start_idx = 1, last_idx = 4, timeDivision) {

        this.scene = scene;
        this.noteArray = [];

        // this.speed = parseFloat(timeDivision) / 157.0 * 2;
        // 위에서 아래까지 내려오는 시간 2초
        this.tempo = 1.5;

        this.speed = height * 0.8 / this.tempo / 60;

        // press collider용 라인 생성
        this.nowPressLine = scene.add.rectangle(
            0, // x 
            height * 0.88, // y
            width, // width
            1,    // height
            0xFF6347    // color
        )
            .setDepth(1)
            .setOrigin(0, 0);
        scene.physics.add.existing(this.nowPressLine);

        // destroy collider용 라인 생성
        this.destroyLine = scene.add.rectangle(
            0, // x 
            height * 0.88 + timeDivision * 1.8, // y
            width, // width
            1,    // height
            0xFF6347    // color
        )
            .setDepth(1)
            .setOrigin(0, 0);
        scene.physics.add.existing(this.destroyLine);

        // 미디 사각형 생성
        notes.forEach(n => {
            this.noteArray.push(new NoteRectangle(n.note, n.startAt, n.endAt, scene, width, height,
                start_idx, last_idx, timeDivision, this.nowPressLine, this.destroyLine, this.tempo));
        });
        console.log(this.noteArray);
    }

    goDown(timerCount) {

        const currentTime = new Date().getTime() - timerCount;
        if (currentTime < 0) return;
        this.noteArray.forEach(n => {
            if (n.startAt <= currentTime) {
                n.graphic.y += this.speed;
                n.basic.y += this.speed;
                n.pressed.y += this.speed;
            }
            // console.log(n.startAt);
        });
    }

}

export class NoteRectangle {
    constructor(note, startAt, endAt, scene, width, height, start_idx, last_idx, timeDivision, nowPressLine, destroyLine, tempo) {

        this.startAt = startAt;
        this.endAt = endAt;
        // console.log(startAt, endAt);

        const num = last_idx;
        if (num + start_idx > 10) {
            num = num - start_idx;
        }
        let s_w = width / num / 7;  // 사각형의 폭
        // let length = (endAt - startAt) * parseFloat(timeDivision) / 2750.0 * 2;  // 사각형의 길이
        // let length = (endAt - startAt) * parseFloat(timeDivision) / 500;  // 사각형의 길이
        let length = (endAt - startAt) * height * 0.8 / tempo / 1000
        const octave = Math.floor(note / 12) - start_idx;   // 옥타브
        let pos = note % 12;    // 음에 따른 위치
        const blackNote = [1, 3, 6, 8, 10];
        let depth = 0;    // 하얀 건반: 0, 검은 건반: 1 (검은 건반이 위로 가도록)

        // 너무 긴 사각형 줄이기
        const max = timeDivision * 1.8;
        if (length > max) {
            length = max;
        }

        if (blackNote.includes(pos))    // 샵이라면
        {
            pos = (octave * 7 * s_w) + ((Math.floor(pos / 2) + 1) * s_w) - s_w / 4;
            s_w /= 2;
            depth = 1;  // 검은 건반이 위로
        }
        else {
            if (pos === 0) { pos = octave * 7 * s_w; }
            else if (pos < 5) {
                pos = (octave * 7 * s_w) + ((pos / 2) * s_w);
            }
            else {
                pos = (octave * 7 * s_w) + ((Math.floor(pos / 2) + 1) * s_w);
            }
        }

        const line = 2; // 테두리 두께

        /* pressed: nowPressLine을 지나면 이것만 보임(보라색 그라데이션) */
        this.pressed = scene.add.graphics().setDepth(depth);
        this.pressed.lineGradientStyle(line, 0x8470FF, 0x8470FF, 0x8A2BE2, 0x8A2BE2,
            0.1, 0.1, 0.7, 0.7);
        this.pressed.fillGradientStyle(0x8470FF, 0x8470FF, 0x8A2BE2, 0x8A2BE2,
            0.1, 0.1, 0.7, 0.7);
        this.pressed.fillRect(pos, -length - line, s_w, length);
        this.pressed.strokeRect(
            pos + 1,
            -length - 1,
            s_w - line,
            length - line
        );

        /* graphic: note별 길이에 맞는 사각형(흰색 그라데이션) */
        this.graphic = scene.add.graphics().setDepth(depth);
        this.graphic.lineGradientStyle(line, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF,
            0.05, 0.05, 0.7, 0.7);
        this.graphic.fillGradientStyle(0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF,
            0.05, 0.05, 0.7, 0.7);
        this.graphic.fillRect(pos, -length - line, s_w, length);
        this.graphic.strokeRect(
            pos + 1,
            -length - 1,
            s_w - line,
            length - line
        );

        /* basic: 기본 크기 사각형(흰색) */
        const basicLength = 12;
        this.basic = scene.add.graphics().setDepth(depth);
        this.basic.lineGradientStyle(line, 0xFFFFFF, 0xFFFFFF, 0x8470FF, 0x8470FF,
            0.5, 0.5, 1.0, 1.0);
        this.basic.fillStyle(0xFFFFFF, 1.0);
        this.basic.fillRect(pos, -basicLength - line, s_w, basicLength);
        this.basic.strokeRect(
            pos + 1,
            -basicLength - 2,
            s_w - line,
            basicLength - line + 1
        );


        // 충돌 감지 추가
        scene.physics.add.existing(this.graphic);
        scene.physics.add.existing(this.basic);
        scene.physics.add.existing(this.pressed);
        scene.physics.add.overlap(this.graphic, nowPressLine, this.checkPressed);
        scene.physics.add.overlap(this.basic, destroyLine, this.checkOutOfScreen);
        scene.physics.add.overlap(this.pressed, destroyLine, this.checkOutOfScreen);
    }

    /* 충돌(overlap) 감지 함수들 */
    // 눌릴 때 (흰색 그라데이션만 사라짐)
    checkPressed(a, nowPressLine) {
        a.destroy();
    }
    // 사라질 때
    checkOutOfScreen(a, destroyLine) {
        a.destroy();
    }
}