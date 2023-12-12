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

        // Extract numeric values using regular expressions
        const match = dataString.match(/x : (.*), y : (.*)/);

        if (match) {
          const x = parseFloat(match[1]);
          const y = parseFloat(match[2]);

          // Map coordinates from -1 to 1 to the custom range (0 to 120 for x and 0 to 60 for y)
          const mappedX = (x + 1) * 240; // Map -1 to 1 to 0 to 120
          const mappedY = (y + 1) * 120; // Map -1 to 1 to 0 to 60

          setHandCoordinates({ x: mappedX, y: mappedY });

          console.log("message received:", mappedX, mappedY);

           // Draw the coordinates on the canvas
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');

          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw a dot at the mapped coordinates
          context.fillStyle = 'blue';
          context.beginPath();
          context.arc(mappedX, mappedY, 5, 0, 2 * Math.PI);
          context.fill();
        }else{
          console.log("message received:", dataString);
        }
       
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
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
