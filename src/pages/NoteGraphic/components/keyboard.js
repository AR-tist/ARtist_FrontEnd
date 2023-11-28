import * as Tone from 'tone';
import { inxtoNoteW, inxtoNoteB } from '../../../utils/tone';

Tone.context.lookAhead = 0;

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
                this.tone.triggerAttackRelease(["C5"], 0.05);
            }
        }).toDestination();

        this.w_notes = [];
        this.b_notes = [];
        this.octave = 0;
        this.start_idx = start_idx;
        this.num = last_idx;
        if (this.num > 10) this.num = 10;
        if (this.num + this.start_idx > 10) {
            this.num = this.num - this.start_idx;
        }

        let { s_w, s_h } = { s_w: width / this.num / 7, s_h: height * 0.2 };

        for (let j = 0; j < this.num; j++) {
            for (let i = 0; i < 7; i++) {
                this.w_notes.push(new NoteP(scene, j * 7 * s_w + i * s_w + s_w / 2, height - s_h / 2, s_w, s_h, 0xffffff, { b_width: 2, b_color: 0x000000 }));
            }
            for (let i = 0; i < 6; i++) {
                if (i === 2) continue;
                this.b_notes.push(scene.add.rectangle(j * 7 * s_w + i * s_w + s_w, height - s_h * 0.75, s_w / 2, s_h / 2, 0x000000).setDepth(2));
            }
        }
        this.boundKeydown = this.onKeydown.bind(this);
        this.boundKeyup = this.onKeyup.bind(this);
    }

    setInput(document) {
        // 기존 이벤트 리스너를 제거
        document.removeEventListener('keydown', this.boundKeydown);
        document.removeEventListener('keyup', this.boundKeyup);

        document.addEventListener('keydown', this.boundKeydown);
        document.addEventListener('keyup', this.boundKeyup);
    }

    onKeydown(event) {
        if (event.repeat) return;
        if (this.tone.loaded !== true) return;
        this.handleKey(event.key, 'down', this.octave, this.start_idx);
    }

    onKeyup(event) {
        if (event.repeat) return;
        if (this.tone.loaded !== true) return;
        if (event.key === 'x' & this.octave < this.num - 1) {
            for (let idx = 0; idx < 7; idx++)
                this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xffffff);
            this.octave += 1
            return
        }
        if (event.key === 'z' && this.octave > 0) {
            for (let idx = 0; idx < 7; idx++)
                this.w_notes[idx + (this.octave) * 7].getRect().setFillStyle(0xffffff);
            this.octave -= 1
            return
        }
        this.handleKey(event.key, 'up', this.octave, this.start_idx);
    }

    handleKey(key, action, octave = 0, start_idx = 1) {
        let noteIdx;
        let mode = 0;
        switch (key) {
            case 'a': noteIdx = 0; break;
            case 's': noteIdx = 1; break;
            case 'd': noteIdx = 2; break;
            case 'f': noteIdx = 3; break;
            case 'g': noteIdx = 4; break;
            case 'h': noteIdx = 5; break;
            case 'j': noteIdx = 6; break;
            case 'k': noteIdx = 7; break;
            case 'l': noteIdx = 8; break;
            case ';': noteIdx = 9; break;
            case "'": noteIdx = 10; break;
            case 'w': noteIdx = 0; mode = 1; break;
            case 'e': noteIdx = 1; mode = 1; break;
            case 't': noteIdx = 2; mode = 1; break;
            case 'y': noteIdx = 3; mode = 1; break;
            case 'u': noteIdx = 4; mode = 1; break;
            case 'o': noteIdx = 5; mode = 1; break;
            case 'p': noteIdx = 6; mode = 1; break;
            default: return;
        }

        if (action === 'down') {
            this.pushNote(noteIdx, mode, octave, start_idx);
        } else if (action === 'up') {
            this.releaseNote(noteIdx, mode, octave, start_idx);
        }
    }

    pushNote(idx, mode = 0, octave, start_idx) {
        if (mode === 0) {
            console.log('%d %d %d', octave, start_idx, idx)
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7) return
            this.w_notes[idx + (octave) * 7].getRect().setFillStyle(0xaaaaaa);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 7;
            this.tone.triggerAttack([inxtoNoteW[idx]]);
        } else {
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7 - 2) return
            this.b_notes[idx + (octave) * 5].setFillStyle(0x333333);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 5;
            this.tone.triggerAttack([inxtoNoteB[idx]]);
        }
    }

    releaseNote(idx, mode = 0, octave, start_idx) {
        if (mode === 0) {
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7) return
            this.w_notes[idx + (octave) * 7].getRect().setFillStyle(0xffffff);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 7;
            this.tone.triggerRelease([inxtoNoteW[idx]]);
        } else {
            if (idx + (octave + start_idx) * 7 >= (start_idx + this.num) * 7 - 2) return
            this.b_notes[idx + (octave) * 5].setFillStyle(0x000000);
            idx = idx + (octave + start_idx > 8 ? 8 : octave + start_idx) * 5;
            this.tone.triggerRelease([inxtoNoteB[idx]]);
        }
    }

    destroy() {
        // Tone.Sampler 인스턴스 해제
        this.tone.dispose();

        // 이벤트 리스너 제거
        if (this.boundKeydown) {
            document.removeEventListener('keydown', this.boundKeydown);
        }

        if (this.boundKeyup) {
            document.removeEventListener('keyup', this.boundKeyup);
        }

        // Phaser 객체들도 제거 
        for (const note of this.w_notes) {
            note.getRect().destroy();
        }

        for (const note of this.b_notes) {
            note.destroy();
        }

        this.w_notes = [];
        this.b_notes = [];
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


