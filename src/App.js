import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import MidiParser from 'midi-parser-js';
import NoteDisplay from './features/note/NoteDisplay';

function App() {
  const [note, setNote] = React.useState(new Array(128).fill(false));
  const [midi, setMidi] = React.useState(null);
  const timer = React.useRef([]);
  const action = (inx, activate) => {
    setNote((note) => {
      note[inx] = activate;
      return [...note];
    }
    );
  }

  const createTimer = (callback, time) => {
    let id = setTimeout(callback, time);
    timer.current.push(id);
  }

  const clickEvent = () => {
    let reader = new FileReader();
    reader.readAsDataURL(ref.current.files[0]);
    reader.onload = () => {
      let result = MidiParser.Base64(reader.result)
      console.log(result);
      setMidi(result);
    }
  }

  const play = () => {
    if (midi === null) return;
    let track = midi.track[1].event;

    let time = []
    track.forEach((e, i) => {
      if (e.type !== 8 && e.type !== 9) return;
      if (time.length === 0) time.push(e.deltaTime);
      else
        time.push(time[time.length - 1] + e.deltaTime * midi.timeDivision / 50);
    })
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

  const stop = () => {
    timer.current.forEach((e) => {
      clearTimeout(e);
    })
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
