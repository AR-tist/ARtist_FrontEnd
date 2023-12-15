import Phaser from 'phaser';
import { NoteGenerator } from "./NoteGenerator";
import { Keyboard } from "./keyboard";
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { extarctEvent, assignLh } from '../../../utils/Utils';
import { useDispatch } from 'react-redux';
import { onebyoneMIDI } from '../../../utils/Utils';
import { setStart } from '../../../store/slices/room/roomAction';
import { getPhoneWsbaseURL } from '../../../utils/axios';
import cookie from 'react-cookies';

const StageScene = () => {
  const game = useRef(null);
  const midiFile = useSelector(state => state.midi.midi);
  const _start = useSelector(state => state.room.start);
  const dispatch = useDispatch();
  const piano_instance = useRef(null);
  const start = useRef(new Date().getTime());
  const isPaused = useRef(true);
  const user_instance = cookie.load('user_instance');

  const phoneSocket = getPhoneWsbaseURL();
  // try {
  //   const dataString = e.data;
  //   const tag = dataString.split("!", 2);
  //   const data = tag[1];
  //   console.log(tag[1]);

  //   switch (tag[0]) {
  //     case "0":
  //       drawHand(data);
  //       break;
  //     case "1":
  //       console.log(data);
  //       break;
  //     default:
  //       console.log("unknown tag");
  //       break;
  //   }
  // } catch (error) { }

  phoneSocket.onmessage = (e) => {
    try {
      const dataString = e.data;
      // console.log(e);
      const tag = dataString.split("!", 2);
      const data = tag[1];
      // console.log(tag);
      // console.log(data);
      switch (tag[0]) {
        case "0":
          const data_split = data.split("?", 3);

          const hand = data_split[0].trim();
          const xPoints = JSON.parse(data_split[1].trim());
          const yPoints = JSON.parse(data_split[2].trim());

          for (let i = 0; i < 5; i++) {
            piano_instance.current.setHandPosition(hand, i, xPoints[i], yPoints[i]);
          }
          break;
        case "1":

          const dataSplit = data.split("?", 3);
          const handLH = dataSplit[0].trim();
          const pushNote = JSON.parse(dataSplit[1].trim());

          // 만약pushNote가 0,1,2,3,4가 아니면 return
          if (pushNote < 0 || pushNote > 4) return;

          console.log(dataSplit);
          if (dataSplit[2].trim() === "0")
            piano_instance.current.pushNoteAR(handLH, pushNote);
          else
            piano_instance.current.releaseNoteAR(handLH, pushNote);
          break;
        default:
          console.log("unknown tag");
          break;
      }

    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }

  const keydown_event = (event) => {
    if (event.repeat) return;
    if (piano_instance.current.tone.loaded !== true) return;
    const key = event.key.charCodeAt(0);
    dispatch({ type: 'socket/keyDown', payload: { key: key, octave: piano_instance.current.octave, start_idx: piano_instance.start_idx } });
  }

  const keyup_event = (event) => {
    if (event.repeat) return;
    if (piano_instance.current.tone.loaded !== true) return;
    const key = event.key.charCodeAt(0);
    dispatch({ type: 'socket/keyUp', payload: { key: key, octave: piano_instance.current.octave, start_idx: piano_instance.start_idx } });
  }

  console.log(midiFile);
  const device = useSelector(state => state.user.user_instance.device);
  console.log(phoneSocket);

  const keydown = useSelector(state => state.room.keydown);
  const keyup = useSelector(state => state.room.keyup);

  function preload() { }

  function create() {
    dispatch(setStart(0));
    const { x, y, width, height } = this.cameras.main;
    // const width = 2000;
    // const height = 1000;

    this.cameras.main.setBackgroundColor('#27283B')

    // const track = midiFile.track[extarctEvent(midiFile.track)].event;

    let _track = onebyoneMIDI(midiFile.track[extarctEvent(midiFile.track)].event);
    const track = assignLh(_track);
    console.log(track);

    let time = 0;
    let pre_notes = {}
    track.forEach((e, i) => {
      if (e.type !== 8 && e.type !== 9) return;
      if (e.type === 9) {
        if (pre_notes[e.data[0]] === undefined)
          pre_notes[e.data[0]] = []
        pre_notes[e.data[0]].push({ "note": e.data[0], "startAt": time, "lh": e.lh });
      } else {
        pre_notes[e.data[0]][pre_notes[e.data[0]].length - 1]["endAt"] = time;
      }
      time += e.deltaTime * midiFile.timeDivision / 96.3;
    })

    let notes = [];
    for (let key in pre_notes) {
      pre_notes[key].forEach(e => {
        notes.push(e);
      })
    }
    console.log(notes);
    console.log(user_instance.device);

    this.noteGraphic = new NoteGenerator(this, width, height, notes, 2, 7, midiFile.timeDivision);
    // Piano Section
    piano_instance.current = new Keyboard(this, width, height, 2, 7);
    piano_instance.current.setInput(document);

    document.addEventListener('keydown', keydown_event);
    document.addEventListener('keyup', keyup_event);

    // ====================


    dispatch({ type: 'socket/imready' });

    // // timer
    // this.time.addEvent({
    //   delay: 1, // 시간 단위 ms
    //   callback: () => this.timerCount += 1, // delay 주기마다 수행할 로직
    //   callbackScope: this, // callback 범위
    //   loop: true, // 반복 여부
    // });

    // pause 버튼
    const pauseButton = this.add.text(window.innerWidth * window.devicePixelRatio - 100, 50, 'Pause', { fill: '#fff' });
    pauseButton.setInteractive();

    this.temp = 0;
    this.clickCount = 0; //temp
    pauseButton.on('pointerup', function () {
      this.clickCount += 1;
      if (this.clickCount % 2) {
        // this.temp = this.timerCount;
        isPaused.current = true;
        this.rec = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5).setDepth(4);
      }
      else {
        // this.timerCount = this.temp;
        isPaused.current = false;
        this.rec.destroy();
      }
    }, this)


  }

  function update(time, delta) {
    if (isPaused.current) return;
    this.noteGraphic.goDown(start.current);

  }

  useEffect(() => {
    if (_start === 0) return;
    start.current = _start + 1000;
    isPaused.current = false;
    console.log(new Date().getTime());
    console.log(start.current);
  }, [_start]);

  // let users = [];
  // let user_idx = -1;

  // 여기에 keydown.user_id 를 통해서 구별하시면 됩니다.
  useEffect(() => {
    if (piano_instance.current === null) return;
    piano_instance.current.handleKey(keydown.key, 'down', keydown.octave, keydown.start_idx, keydown.user_id);

  }, [keydown]);

  useEffect(() => {
    if (piano_instance.current === null) return;
    piano_instance.current.handleKey(keyup.key, 'up', keyup.octave, keyup.start_idx);
  }, [keyup]);


  useEffect(() => {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;
    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        }
      },
      scale: {
        mode: Phaser.Scale.AUTO,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: width,
        height: height,
      },
      scene: {
        preload,
        create,
        update
      },
      fps: {
        target: 60,
        forceSetTimeOut: true
      }
    }
    const _game = new Phaser.Game(config);

    game.current = _game;



    return () => {
      if (_game.scene && _game.scene.keys && _game.scene.keys.default && _game.scene.keys.default.piano) {
        _game.scene.keys.default.piano.destroy();
      }


      document.removeEventListener('keydown', keydown_event);
      document.removeEventListener('keyup', keyup_event);

      piano_instance.current.removeInput(document)
      piano_instance.current.destroy()
      piano_instance.current = null;
      _game.destroy(true);
      game.current = undefined;



    };
  }, []);

  return null;
}

export default StageScene;
