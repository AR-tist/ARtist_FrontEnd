import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import NoEquipment from "./components/NoEquipment";
import ConnectPhone from "./components/ConnectPhone";
import { useSelector } from "react-redux";

const EquipmentChangePage = () => {
  const nickname = useSelector((state) => state.user.name);
  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };
  // ip 주소를 입력해 웹소켓을 연결합니다.
  
  return (
    <>
      <Header user={nickname} />
      <Layout></Layout>

      <div id="app" className="container" style={{}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            marginBottom: "70px",
            marginLeft: "360px",
          }}
        >
          <h1 style={{ fontSize: "26px" }}>장비 연결하기</h1>
        </div>

        <div
          className="EquipmentList"
          style={{ display: "flex", marginLeft: "350px" }}
        >
          <div
            className="Phone"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              onClick={() => handleButtonClick(1)}
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src="./img/휴대폰연결하기.png"
                alt="장비_휴대폰"
                style={{
                  float: "left",
                  width: "283px",
                  height: "343px",
                }}
              />
            </button>
          </div>

          <div
            className="keyboard"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
            }}
          >
            <button
              onClick={() => handleButtonClick(2)}
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src="./img/키보드연결하기.png"
                alt="장비_키보드"
                style={{
                  float: "left",
                  width: "283px",
                  height: "343px",
                }}
              />
            </button>
          </div>

          <div
            className="piano"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
            }}
          >
            <button
              onClick={() => handleButtonClick(3)}
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src="./img/피아노연결하기.png"
                alt="장비_피아노"
                style={{
                  float: "left",
                  width: "283px",
                  height: "343px",
                }}
              />
            </button>
          </div>
        </div>
        <div>
          {selectedButton === 1 && <ConnectPhone />}
          {selectedButton === 2 && <NoEquipment />}
          {selectedButton === 3 && <NoEquipment />}
        </div>
        
      </div>

      <div style={{ width: "381px", height: "706px" }}>
        <div
          style={{
            width: "381px",
            height: "706px",
            position: "absolute",
            left: "1388.5px",
            top: "183.5px",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
          }}
        ></div>
        <img
          src="./img/인포아이콘.png"
          style={{
            width: "58px",
            height: "56px",
            position: "absolute",
            left: "1549.5px",
            top: "508.5px",
            objectFit: "cover",
          }}
        />
      </div>
    </>
  );
};

export default EquipmentChangePage;
