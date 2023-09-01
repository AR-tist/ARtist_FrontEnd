import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [pianoSocket, setPianoSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [receivedPianoMessages, setReceivedPianoMessages] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (pianoSocket && pianoSocket.readyState === WebSocket.OPEN) {
      pianoSocket.send(message);
      setMessage('');
    }
  };

  const setupPianoWebSocket = () => {
    const newPianoSocket = new WebSocket('ws://172.16.230.14:4439');

    newPianoSocket.onopen = () => {
      console.log('Piano WebSocket connection established.');
      setPianoSocket(newPianoSocket);
      setConnected(true);
    };

    newPianoSocket.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log('Received Piano message:', receivedMessage);
      setReceivedPianoMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    newPianoSocket.onclose = () => {
      console.log('Piano WebSocket connection closed.');
      setConnected(false);
    };
  };

  useEffect(() => {
    setupPianoWebSocket();
  }, []);

  return (
    <div>
      <div>
        {connected ? (
          <p>Piano WebSocket connected</p>
        ) : (
          <p>Piano WebSocket not connected</p>
        )}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Enter your message"
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
      <div>
        <h2>Received Piano Messages:</h2>
        <ul>
          {receivedPianoMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
