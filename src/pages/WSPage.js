import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false); // 웹소켓 연결 상태 추가
  const [receivedMessages, setReceivedMessages] = useState([]); // 받은 메시지 배열 추가

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage('');
    }
  };

  const setupWebSocket = () => {
    const newSocket = new WebSocket('ws://172.16.230.14:4439');

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setSocket(newSocket);
      setConnected(true); // 연결 상태 업데이트
    };

    newSocket.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log('Received message:', receivedMessage);
      // 수신된 메시지를 처리합니다.
      setReceivedMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed.');
      // 연결이 종료되면 필요한 작업을 수행합니다.
      setConnected(false); // 연결 상태 업데이트
    };
  };

  useEffect(() => {
    setupWebSocket();
  }, []); 

  return (
    <div>
      <div>
        {connected ? (
          <p>WebSocket connected</p>
        ) : (
          <p>WebSocket not connected</p>
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
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
