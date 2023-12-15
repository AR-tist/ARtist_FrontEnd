import React, { useState } from "react";
import cookie from "react-cookies";

const Participant = ({ profileImage, nickname, equipment, statusColor }) => {
  const user_instance = cookie.load("user_instance");

  return (
    <div style={{ marginTop: "50px", marginRight: "110px" }}>
      <div
        style={{
          width: "400px",
          backgroundColor: "#FAFAFA",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={profileImage}
            alt="앨범 커버"
            style={{
              float: "left",
              marginRight: "20px",
              width: "80px",
              height: "80px",
              borderRadius: "15px",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
          <div>
            <h3 style={{ marginTop: "10px" }}>{nickname}</h3>
            <p style={{ marginTop: "10px", color: "#BBBBBB" }}>{equipment}</p>
            <p style={{ marginTop: "5px", color: "#BBBBBB" }}>
              {(() => {
                switch (user_instance.play_mode) {
                  case 0:
                    return "연주 모드 - 기본";
                  case 1:
                    return "연습 모드 - 소프라노";
                  case 2:
                    return "연습 모드 - 알토";
                  default:
                    return "Unknown play mode";
                }
              })()}
            </p>
          </div>

          <button
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: statusColor,
              border: "none",
              borderRadius: "50%",
              marginTop: "10px",
              marginLeft: "150px",
              position: "absolute",
              top: "1px",
              left: "225px",
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Participant;
