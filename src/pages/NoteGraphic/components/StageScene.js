import Phaser from 'phaser';
import { NoteGenerator } from "./NoteGenerator";
// import { LightEffector } from "./LightEffector";
import { Keyboard } from "./keyboard";
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { extarctEvent } from '../../../utils/Utils';

const StageScene = () => {
  const game = useRef(null);
  const midiFile = useSelector(state => state.midi.midi);
  console.log(midiFile);

  function preload() {}

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
    this.piano = new Keyboard(this, width, height, 2, 7);
    this.piano.setInput(document);
  }

  function update(time, delta) {
    this.noteGraphic.goDown();
  }

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
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
        mode: Phaser.Scale.FIT,
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
