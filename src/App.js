import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import MidiParser from 'midi-parser-js';
import NoteDisplay from './features/note/NoteDisplay';

import * as Tone from 'tone';

import inxtoNote from './features/note/inxtoNote';

function App() {
  const [note, setNote] = React.useState(new Array(128).fill(false));
  const [midi, setMidi] = React.useState(null);
  const timer = React.useRef([]);
  const synth = React.useRef(null);

  // 컴포넌트가 렌더링될 때 Tone.js 객체를 생성한다.
  React.useEffect(() => {
    synth.current = new Tone.Sampler({
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
        synth.current.triggerAttackRelease(["C5"], 0.05);
      }
    }).toDestination();

  }, [])


  // 입력된 노트에 대해 활성화, 소리 재생을 결정하여 실행함.
  const action = (inx, activate) => {
    setNote((note) => {
      if (activate) synth.current.triggerAttack(inxtoNote[inx]);
      else synth.current.triggerRelease(inxtoNote[inx]);

      note[inx] = activate;
      return [...note];
    }
    );
  }

  // 타이머를 생성하는 함수, TimerID를 timer.current에 저장한다.
  const createTimer = (callback, time) => {
    let id = setTimeout(callback, time);
    timer.current.push(id);
  }

  // 업로드된 MIDI 파일을 BASE64로 받은 다음, MIDI 파일을 파싱한다. 그리고 결과를 setMidi로 저장한다.
  const clickEvent = () => {
    let reader = new FileReader();
    reader.readAsDataURL(ref.current.files[0]);
    reader.onload = () => {
      let result = MidiParser.Base64(reader.result)
      console.log(result);
      setMidi(result);
    }
  }

  // 올바른 트랙을 찾는 함수
  const extarctEvent = (tracks) => {
    let valid_index = 0;
    if (tracks.length === 1) return 0;
    tracks.forEach((e, i) => {
      if (valid_index !== 0) return;
      e.event.forEach((e2, i2) => {
        if (e2.type === 8 || e2.type === 9) {
          valid_index = i;
          return;
        }
      })
    })
    return valid_index;
  }

  // MIDI 파일을 재생하는 함수
  const play = () => {
    if (midi === null) return;
    console.log(extarctEvent(midi.track));
    let track = midi.track[extarctEvent(midi.track)].event;

    let time = []
    // 각 이벤트의 시간을 계산한다.
    track.forEach((e, i) => {
      if (e.type !== 8 && e.type !== 9) return;
      if (time.length === 0) time.push(e.deltaTime);
      else
        time.push(time[time.length - 1] + e.deltaTime * midi.timeDivision / 105.2);
    })
    console.log(time);

    // 각 이벤트의 시간에 맞춰 타이머를 생성한다.
    let iter = 0;
    track.forEach((e, i) => {

      if (e.type !== 8 && e.type !== 9) return;
      createTimer(() => {
        time += e.deltaTime;
        action(e.data[0], e.type === 9 ? true : false);
      }, time[iter]);
      iter++;
    })

  }

  // 재생을 중지하는 함수
  const stop = () => {
    timer.current.forEach((e) => {
      clearTimeout(e);
    })
    synth.current.releaseAll();
    setNote(
      note.map((n, i) => {
        return false;
      })
    );
  }
  const ref = React.useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <input type="file" ref={ref}></input>
        <button onClick={clickEvent}>midi</button>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
        <NoteDisplay note={note} />
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
