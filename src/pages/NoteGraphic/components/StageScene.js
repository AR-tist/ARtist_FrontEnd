import Phaser from 'phaser';
import { NoteGenerator } from "./NoteGenerator";

var example = { // json형식 예시
    "title" : "twinkletwinkle", // 제목 및 기본 정보
    // "event" : [2,1,2,1],    // 동시에 시작하는 note 수
    "notes" : [
      {
        "note" : 0,     // 음
        "startAt" : 0,  // 시작 시간 
        "endAt" : 30    // 끝 시간
      },
      {
        "note" : 4, 
        "startAt" : 0,
        "endAt" : 70
      },
      {
        "note" : 0,
        "startAt" : 40,
        "endAt" : 70
      },
      {
        "note" : 0,
        "startAt" : 80,
        "endAt" : 150
      },
      {
        "note" : 7,
        "startAt" : 80,
        "endAt" : 110
      },{
        "note" : 7,
        "startAt" : 120,
        "endAt" : 150
      }
    ]
  }

export default class StageScene extends Phaser.Scene {

    constructor(){
        super('StageScene'); // 식별자
    }

    // preload(){ 
    // }
    create(){   // 생성
        const {x, y, width, height} = this.cameras.main;
        this.cameras.main.setBackgroundColor('#4488aa')

        this.noteGraphic = new NoteGenerator(this, width, height, example.notes);

    }
    update(time, delta){   // 화면 갱신

        this.noteGraphic.goDown();
    }

}