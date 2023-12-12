import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhoneWsbaseURL } from "../../../utils/axios";

const ConnectPhone = () => {
  const [serverStatus, setServerStatus] = useState("Stopped");
  const [ws, setWs] = useState(null);
  const [handCoordinates, setHandCoordinates] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  const connect = () => {
    const ip_address = document.getElementById("ip_address").value;
    const newWs = new WebSocket("ws://" + ip_address + ":4439");
    setWs(newWs);
    setPhoneWsbaseURL(newWs);

    newWs.onopen = () => {
      // connection opened
      console.log("connected");
      newWs.send("ready"); // send a message
      setServerStatus("Running"); // Update server status in React state
    };

    newWs.onerror = (error) => {
      console.error("WebSocket encountered an error:", error);
      // Handle the error as needed
      setServerStatus("Error"); // Update server status in React state
    };

    // Move onmessage event handling inside connect function
    newWs.onmessage = (e) => {
      try {
        const dataString = e.data;
        console.log(e);
    
        const dataString_split = dataString.split("?", 3);
    
        const hand = dataString_split[0].trim();
        const xPoints = JSON.parse(dataString_split[1].trim()); // Parse the string to an array
        const yPoints = JSON.parse(dataString_split[2].trim());
    
        // Draw the coordinates on the canvas
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        const colors = ['red', 'green', 'blue', 'orange', 'purple'];
        const colors2 = ['cyan', 'magenta', 'yellow', 'black', 'gray'];

        const selectedColors = hand === 1 ? colors : colors2;
        
        for (let i = 0; i < 5; i++) {
          const mappedX = (xPoints[i] + 1) * 240;
          const mappedY = (yPoints[i] + 1) * 120;
    
          // Draw a dot at the mapped coordinates with different colors
          context.fillStyle = selectedColors[i];
          context.beginPath();
          context.arc(mappedX, mappedY, 5, 0, 2 * Math.PI);
          context.fill();
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  };

  useEffect(() => {
    // Cleanup function to ensure proper disconnection
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
        console.log("disconnecting");
      }
      setServerStatus("Stopped"); // Update server status when disconnected
      
    };
  }, [ws]);

  // useEffect(() => {
  //       const dataString = "1? [0.015338495, -0.2171075, -0.16534102, -0.050892502, 0.16146241] ? [0.90428984, 0.65731287, 0.5149822, 0.4266714, 0.41745383]";

  //       // dataString을 처음 "," 기준 2개로 나눕니다.
  //       const dataString_split = dataString.split("?", 3);
  //       console.log(dataString_split[1]);

  //       const hand = dataString_split[0].trim();
  //       const xPoint = dataString_split[1].trim();
  //       const yPoint = dataString_split[2].trim();


  // },[]);
  return (
    <div>
      <h2
        style={{
          marginLeft: "360px",
          marginTop: "50px",
          fontSize: "24px",
        }}
      >
        현재 연결된 장비
      </h2>
      <div
        style={{
          width: "892px",
          height: "280px",
          position: "absolute",
          left: "359.5px",
          top: "609.5px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
        }}
      ></div>
      <img
        src="../img/장비_휴대폰.png"
        style={{
          width: "168px",
          height: "121px",
          position: "absolute",
          left: "443.5px",
          top: "689.5px",
          objectFit: "cover",
        }}
      />
      <input
        type="text"
        id="ip_address"
        placeholder="  IP 주소를 입력해주세요."
        style={{
          width: "400px",
          height: "50px",
          position: "absolute",
          left: "700px",
          top: "680px",
          fontSize: "18px",
          fontWeight: "500",
          textAlign: "left",
          color: "#000",
          border: "none",
          borderBottom: "2px solid #EDECEC",
        }}
      />
      <button
        onClick={() => {
          connect();
        }}
        style={{
          width: "404px",
          height: "48px",
          position: "absolute",
          left: "700px",
          top: "784px",
          fontSize: "20px",
          fontWeight: "550",
          textAlign: "center",
          color: "#636363",
          borderRadius: "30px",
          background: "#EDECEC",
        }}
      >
        연결하기
      </button>

      
        {/* Display the current server status */}
        <p
          style={
            {
              position: "absolute",
              left: "700px",
              top: "736px",
              fontSize: "24px",
              fontWeight: "500",
              textAlign: "left",
              color: "#000",
            }
          }>Server Status: {serverStatus}</p>

          <div
            style={
              {
                position: "absolute",
                left: "700px",
                top: "1200px",
              }
            }>
            <h1>Hand Tracking App</h1>
            <canvas
              ref={canvasRef}
              width={480}
              height={240}
              style={{ border: '1px solid black', marginTop: '10px' }}
            />
          </div>
      
    </div>
  );
};

export default ConnectPhone;
