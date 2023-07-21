import * as Tone from 'tone';
import { inxtoNoteW } from '../../../utils/tone';
import { getKey } from '../../../utils/Utils';;
export class Keyboard {
    constructor(scene, width, height) {
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
        let num = 4
        let { s_w, s_h } = { s_w: width / num / 7, s_h: height * 0.2 }

        for (let j = 0; j < num; j++) {
            for (let i = 0; i < 7; i++) {
                console.log(i * s_w)
                this.w_notes.push(new NoteP(scene, j * 7 * s_w + i * s_w + s_w / 2, height - s_h / 2, s_w, s_h, 0xffffff, { b_width: 4, b_color: 0x000000 }))
            }
            for (let i = 0; i < 6; i++) {
                if (i === 2) continue;
                this.b_notes.push(scene.add.rectangle(j * 7 * s_w + i * s_w + s_w, height - s_h * 0.75, s_w / 2, s_h / 2, 0x000000));
            }
        }
        this.start_idx = 7;
        this.octave = 4;
    }
    setInput(document) {
        document.addEventListener('keydown', (event) => {
            if (this.tone.loaded !== true) return;
            const key = getKey(event.key);
            if (key === 'a') this.pushNote(this.start_idx);
            else if (key === 's') this.pushNote(this.start_idx + 1);
            else if (key === 'd') this.pushNote(this.start_idx + 2);
            else if (key === 'f') this.pushNote(this.start_idx + 3);
            else if (key === 'g') this.pushNote(this.start_idx + 4);
            else if (key === 'h') this.pushNote(this.start_idx + 5);
            else if (key === 'j') this.pushNote(this.start_idx + 6);
            else if (key === 'k') this.pushNote(this.start_idx + 7);
            else if (key === 'l') this.pushNote(this.start_idx + 8);
            else if (key === ';') this.pushNote(this.start_idx + 9);
            else if (key === "'") this.pushNote(this.start_idx + 10);
        });
        document.addEventListener('keyup', (event) => {
            if (this.tone.loaded !== true) return;
            const key = getKey(event.key);

            if (key === 'a') this.releaseNote(this.start_idx);
            else if (key === 's') this.releaseNote(this.start_idx + 1);
            else if (key === 'd') this.releaseNote(this.start_idx + 2);
            else if (key === 'f') this.releaseNote(this.start_idx + 3);
            else if (key === 'g') this.releaseNote(this.start_idx + 4);
            else if (key === 'h') this.releaseNote(this.start_idx + 5);
            else if (key === 'j') this.releaseNote(this.start_idx + 6);
            else if (key === 'k') this.releaseNote(this.start_idx + 7);
            else if (key === 'l') this.releaseNote(this.start_idx + 8);
            else if (key === ';') this.releaseNote(this.start_idx + 9);
            else if (key === "'") this.releaseNote(this.start_idx + 10);
        });
    }

    pushNote(idx, mode = 0) {
        if (mode === 0) {
            this.w_notes[idx].getRect().setFillStyle(0xaaaaaa);
            idx = idx + this.octave * 7;
            this.tone.triggerAttackRelease([inxtoNoteW[idx]]);
        }
    }
    releaseNote(idx, mode = 0) {
        if (mode === 0) {
            this.w_notes[idx].getRect().setFillStyle(0xffffff);
            idx = idx + this.octave * 7;
            this.tone.triggerRelease([inxtoNoteW[idx]]);
        }
    }
}

export class NoteP {
    constructor(scene, x, y, width, height, color, board_attr) {
        this.rect = scene.add.rectangle(x, y, width, height, color);
        this.board = scene.add.graphics();

        const { b_width, b_color } = board_attr;
        this.board.lineStyle(b_width, b_color)
        this.board.strokeRect(x - width / 2, y - height / 2, width, height)

    }

    getRect() {
        return this.rect;
    }
}