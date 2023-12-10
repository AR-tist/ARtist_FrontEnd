import React, { useState } from "react";
import { setPhoneWsbaseURL, getPhoneWsbaseURL } from "../../../utils/axios";

const ConnectPhone = () => {
  const [serverStatus, setServerStatus] = useState("Stopped");

  const Connecting = () => {
    const ip_address = document.getElementById("ip_address").value;
    const ws = new WebSocket("ws://" + ip_address + ":4439");
    console.log("ws", ws);

    ws.onopen = () => {
      // connection opened
      console.log("connected");
      ws.send("ready"); // send a message
      setServerStatus("Running"); // Update server status in React state
    };

    // Handle other WebSocket events here if needed (onmessage, onclose, etc.)
  };

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
          Connecting();
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

      <div>
        {/* Display the current server status */}
        <p>Server Status: {serverStatus}</p>
      </div>
    </div>
  );
};

export default ConnectPhone;
