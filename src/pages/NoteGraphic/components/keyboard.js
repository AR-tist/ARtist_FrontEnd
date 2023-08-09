import * as Tone from 'tone';
import { inxtoNoteW, inxtoNoteB } from '../../../utils/tone';
import { getKey } from '../../../utils/Utils';;
export class Keyboard {
    constructor(scene, width, height, start_idx = 1, last_idx = 4) {
        this.tone = new Tone.Sampler({
            urls: {
                A0: "A0.mp3",
                C1: "C1.mp3",
                "D#1": "Ds1.mp3",
                "F#1": "Fs1.mp3",
                A1: "A1.mp3",
                C2: "C2.mp3",
                "D#2": "Ds2.mp3",
                "F#2": "Fs2.mp3",
                A2: "A2.mp3",
                C3: "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                A3: "A3.mp3",
                C4: "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                A4: "A4.mp3",
                C5: "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                A5: "A5.mp3",
                C6: "C6.mp3",
                "D#6": "Ds6.mp3",
                "F#6": "Fs6.mp3",
                A6: "A6.mp3",
                C7: "C7.mp3",
                "D#7": "Ds7.mp3",
                "F#7": "Fs7.mp3",
                A7: "A7.mp3",
                C8: "C8.mp3"
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
            onload: () => {
                console.log("loaded");
                this.tone.triggerAttackRelease(["C5"], 0.05);
            }
        }).toDestination();

        this.w_notes = [];
        this.b_notes = []
        this.octave = 0;
        this.start_idx = start_idx;
        this.num = last_idx;
        if (this.num > 10) this.num = 10;
        if (this.num + this.start_idx > 10) this.num = this.num - this.start_idx;
        let { s_w, s_h } = { s_w: width / this.num / 7, s_h: height * 0.2 }

        for (let j = 0; j < this.num; j++) {
            for (let i = 0; i < 7; i++) {
                console.log(i * s_w)
                this.w_notes.push(new NoteP(scene, j * 7 * s_w + i * s_w + s_w / 2, height - s_h / 2, s_w, s_h, 0xffffff, { b_width: 4, b_color: 0x000000 }))
            }
            for (let i = 0; i < 6; i++) {
                if (i === 2) continue;
                this.b_notes.push(scene.add.rectangle(j * 7 * s_w + i * s_w + s_w, height - s_h * 0.75, s_w / 2, s_h / 2, 0x000000)
                    .setDepth(2));

            }
        }
    }

    setInput(document) {
        document.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (this.tone.loaded !== true) return;
            const key = getKey(event.key);
            if (key === 'a') this.pushNote(0);
            else if (key === 's') this.pushNote(1);
            else if (key === 'd') this.pushNote(2);
            else if (key === 'f') this.pushNote(3);
            else if (key === 'g') this.pushNote(4);
            else if (key === 'h') this.pushNote(5);
            else if (key === 'j') this.pushNote(6);
            else if (key === 'k') this.pushNote(7);
            else if (key === 'l') this.pushNote(8);
            else if (key === ';') this.pushNote(9);
            else if (key === "'") this.pushNote(10);
            else if (key === "w") this.pushNote(0, 1);
            else if (key === "e") this.pushNote(1, 1);
            else if (key === "t") this.pushNote(2, 1);
            else if (key === "y") this.pushNote(3, 1);
            else if (key === "u") this.pushNote(4, 1);
            else if (key === "o") this.pushNote(5, 1);
            else if (key === "p") this.pushNote(6, 1);
            else if (key === 'x' && this.octave < this.num - 1) this.octave += 1;
            else if (key === 'z' && this.octave > 0) this.octave -= 1;
        });
        document.addEventListener('keyup', (event) => {
            if (event.repeat) return;
            if (this.tone.loaded !== true) return;
            const key = getKey(event.key);

            if (key === 'a') this.releaseNote(0);
            else if (key === 's') this.releaseNote(1);
            else if (key === 'd') this.releaseNote(2);
            else if (key === 'f') this.releaseNote(3);
            else if (key === 'g') this.releaseNote(4);
            else if (key === 'h') this.releaseNote(5);
            else if (key === 'j') this.releaseNote(6);
            else if (key === 'k') this.releaseNote(7);
            else if (key === 'l') this.releaseNote(8);
            else if (key === ';') this.releaseNote(9);
            else if (key === "'") this.releaseNote(10);
            else if (key === "w") this.releaseNote(0, 1);
            else if (key === "e") this.releaseNote(1, 1);
            else if (key === "t") this.releaseNote(2, 1);
            else if (key === "y") this.releaseNote(3, 1);
            else if (key === "u") this.releaseNote(4, 1);
            else if (key === "o") this.releaseNote(5, 1);
            else if (key === "p") this.releaseNote(6, 1);
        });
    }

    pushNote(idx, mode = 0) {

        if (mode === 0) {
            if (idx + (this.octave + this.start_idx) * 7 >= 10 * 7) return
            this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xaaaaaa);
            idx = idx + (this.octave + this.start_idx > 8 ? 8 : this.octave + this.start_idx) * 7;
            this.tone.triggerAttack([inxtoNoteW[idx]]);
        }
        else {
            if (idx + (this.octave + this.start_idx) * 7 >= 10 * 7 - 2) return
            this.b_notes[idx + (this.octave) * 5].setFillStyle(0x333333);
            idx = idx + (this.octave + this.start_idx > 8 ? 8 : this.octave + this.start_idx) * 5;
            this.tone.triggerAttack([inxtoNoteB[idx]]);
        }
    }
    releaseNote(idx, mode = 0) {
        if (mode === 0) {
            if (idx + (this.octave + this.start_idx) * 7 >= 10 * 7) return
            this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xffffff);
            idx = idx + (this.octave + this.start_idx > 8 ? 8 : this.octave + this.start_idx) * 7;
            this.tone.triggerRelease([inxtoNoteW[idx]]);
        }
        else {
            if (idx + (this.octave + this.start_idx) * 7 >= 10 * 7 - 2) return
            console.log(this.b_notes[idx + (this.octave) * 5])
            this.b_notes[idx + (this.octave) * 5].setFillStyle(0x000000);
            idx = idx + (this.octave + this.start_idx > 8 ? 8 : this.octave + this.start_idx) * 5;
            this.tone.triggerRelease([inxtoNoteB[idx]]);
        }
    }
}

export class NoteP {
    constructor(scene, x, y, width, height, color, board_attr) {
        this.rect = scene.add.rectangle(x, y, width, height, color)
            .setDepth(2);
        this.board = scene.add.graphics()
            .setDepth(3);

        const { b_width, b_color } = board_attr;
        this.board.lineStyle(b_width, b_color)
        this.board.strokeRect(x - width / 2, y - height / 2, width, height)
    }

    getRect() {
        return this.rect;
    }
}