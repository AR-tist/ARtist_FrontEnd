import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhoneWsbaseURL } from "../../../utils/axios";

const ConnectPhone = () => {
  const [serverStatus, setServerStatus] = useState("Stopped");
  const [ws, setWs] = useState(null);

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

    // // Move onmessage event handling inside connect function
    // newWs.onmessage = (e) => {
    //   // a message was received
    //   console.log(e);
    // };
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
          color: "#EDECEC",
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

      <div>
        {/* Display the current server status */}
        <p>Server Status: {serverStatus}</p>
      </div>
    </div>
  );
};

export default ConnectPhone;
