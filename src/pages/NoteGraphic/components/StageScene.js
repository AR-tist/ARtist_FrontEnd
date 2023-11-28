import Phaser from 'phaser';
import { NoteGenerator } from "./NoteGenerator";
import { Keyboard } from "./keyboard";
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { extarctEvent } from '../../../utils/Utils';
import { useDispatch } from 'react-redux';

const StageScene = () => {
  const game = useRef(null);
  const midiFile = useSelector(state => state.midi.midi);
  const start = useSelector(state => state.room.start);
  const dispatch = useDispatch();
  const piano_instance = useRef(null);


  console.log(midiFile);

  const keydown = useSelector(state => state.room.keydown);
  const keyup = useSelector(state => state.room.keyup);

  function preload() { }

  function create() {
    const { x, y, width, height } = this.cameras.main;
    this.cameras.main.setBackgroundColor('#27283B')

    const track = midiFile.track[extarctEvent(midiFile.track)].event;

    let time = 0;
    let pre_notes = {}
    track.forEach((e, i) => {
      if (e.type !== 8 && e.type !== 9) return;
      if (e.type === 9) {
        if (pre_notes[e.data[0]] === undefined)
          pre_notes[e.data[0]] = []
        pre_notes[e.data[0]].push({ "note": e.data[0], "startAt": time });
      } else {
        pre_notes[e.data[0]][pre_notes[e.data[0]].length - 1]["endAt"] = time;
      }
      time += e.deltaTime * midiFile.timeDivision / 105.2;
    })

    let notes = [];
    for (let key in pre_notes) {
      pre_notes[key].forEach(e => {
        notes.push(e);
      })
    }
    console.log(notes);

    this.noteGraphic = new NoteGenerator(this, width, height, notes, 2, 7, midiFile.timeDivision);

    // Piano Section
    piano_instance.current = new Keyboard(this, width, height, 2, 7);
    piano_instance.current.setInput(document);
    // event listener for keyboard
    const keydown_event = (event) => {
      if (event.repeat) return;
      if (piano_instance.current.tone.loaded !== true) return;
      dispatch({ type: 'socket/keyDown', payload: { key: event.key, octave: piano_instance.current.octave, start_idx: piano_instance.start_idx } });
    }

    const keyup_event = (event) => {
      if (event.repeat) return;
      if (piano_instance.current.tone.loaded !== true) return;
      dispatch({ type: 'socket/keyUp', payload: { key: event.key, octave: piano_instance.current.octave, start_idx: piano_instance.start_idx } });
    }

    document.removeEventListener('keydown', keydown_event);
    document.removeEventListener('keyup', keyup_event);

    document.addEventListener('keydown', keydown_event);
    document.addEventListener('keyup', keyup_event);

    // ====================

    this.timerCount = 0;
    this.isPaused = false;

    dispatch({ type: 'socket/imready' });

    // timer
    this.time.addEvent({
      delay: 10, // 시간 단위 ms
      callback: () => this.timerCount += 10, // delay 주기마다 수행할 로직
      callbackScope: this, // callback 범위
      loop: true, // 반복 여부
    });

    // pause 버튼
    const pauseButton = this.add.text(window.innerWidth * window.devicePixelRatio - 100, 50, 'Pause', { fill: '#fff' });
    pauseButton.setInteractive();

    this.temp = 0;
    this.clickCount = 0; //temp
    pauseButton.on('pointerup', function () {
      this.clickCount += 1;
      if (this.clickCount % 2) {
        this.temp = this.timerCount;
        this.isPaused = true;
        this.rec = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5).setDepth(4);
      }
      else {
        this.timerCount = this.temp;
        this.isPaused = false;
        this.rec.destroy();
      }
    }, this)


  }

  function update(time, delta) {
    if (this.isPaused && start) {
    }
    else {
      this.noteGraphic.goDown();
    }
  }

  useEffect(() => {
    if (piano_instance.current === null) return;
    piano_instance.current.handleKey(keydown.key, 'down', keydown.octave, keydown.start_idx);

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
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: width,
        height: height,
      },
      scene: {
        preload,
        create,
        update
      }
    }
    const _game = new Phaser.Game(config);

    game.current = _game;



    return () => {
      if (_game.scene && _game.scene.keys && _game.scene.keys.default && _game.scene.keys.default.piano) {
        _game.scene.keys.default.piano.destroy();
      }

      _game.destroy(true);
      game.current = undefined;


    };
  }, []);

  return null;
}

export default StageScene;
