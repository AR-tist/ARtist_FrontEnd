import Phaser from 'phaser';
import { NoteGenerator } from "./NoteGenerator";
import { Keyboard } from "./keyboard";

var example = { // json형식 예시
  "title": "twinkletwinkle", // 제목 및 기본 정보
  "notes": [
    {
      "note": 7,     // 음
      "startAt": 0,  // 시작 시간 
      "endAt": 90    // 끝 시간
    },
    {
      "note": 9,
      "startAt": 0,
      "endAt": 190
    },
    {
      "note": 7,
      "startAt": 100,
      "endAt": 190
    },
    {
      "note": 7,
      "startAt": 200,
      "endAt": 390
    },
    {
      "note": 11,
      "startAt": 200,
      "endAt": 290
    },
    {
      "note": 11,
      "startAt": 300,
      "endAt": 390
    },
    {
      "note": 12,
      "startAt": 400,
      "endAt": 490
    },
    {
      "note": 3,
      "startAt": 400,
      "endAt": 590
    },
    {
      "note": 12,
      "startAt": 500,
      "endAt": 590
    },
    {
      "note": 11,
      "startAt": 600,
      "endAt": 790
    },
    {
      "note": 7,
      "startAt": 600,
      "endAt": 790
    }
  ]
}

export default class StageScene extends Phaser.Scene {

  constructor() {
    super('StageScene'); // 식별자
  }

  // preload(){ 
  // }
  create() {   // 생성
    const { x, y, width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#f5f5f5')

    // note 불러오기
    this.noteGraphic = new NoteGenerator(this, width, height, example.notes);

    // 키보드 불러오기
    let piano = new Keyboard(this, width, height);
    piano.setInput(document);

  }
  update(time, delta) {   // 화면 갱신

    this.noteGraphic.goDown();
  }

}