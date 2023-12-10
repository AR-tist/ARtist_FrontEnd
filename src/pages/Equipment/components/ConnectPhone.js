import React, { useState, useEffect } from "react";

const ConnectPhone = () => {
  const [serverStatus, setServerStatus] = useState("Stopped");
  const [ws, setWs] = useState(null);

  const connect = () => {
    const ip_address = document.getElementById("ip_address").value;
    const newWs = new WebSocket("ws://" + ip_address + ":4439");
    setWs(newWs);

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
      // a message was received
      console.log(e);
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
      <input
        type="text"
        id="ip_address"
        placeholder="IP 주소를 입력해주세요."
        style={{
          width: "300px",
          height: "50px",
          position: "absolute",
          left: "668px",
          top: "650px",
          fontSize: "24px",
          fontWeight: "500",
          textAlign: "left",
          color: "#000",
        }}
      />
      <button
        onClick={() => {
          connect();
        }}
        style={{
          width: "300px",
          height: "50px",
          position: "absolute",
          left: "668px",
          top: "736px",
          fontSize: "24px",
          fontWeight: "500",
          textAlign: "left",
          color: "#000",
        }}
      >
        연결하기
      </button>

      <button
        onClick={() => {
          // Disconnect logic is now handled in the cleanup function of useEffect
        }}
        style={{
          width: "300px",
          height: "50px",
          position: "absolute",
          left: "668px",
          top: "792px", // Adjusted the top position
          fontSize: "24px",
          fontWeight: "500",
          textAlign: "left",
          color: "#000",
        }}
      >
        연결 끊기
      </button>

      <div>
        {/* Display the current server status */}
        <p>Server Status: {serverStatus}</p>
      </div>
    </div>
  );
};

export default ConnectPhone;
