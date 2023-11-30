import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const EquipmentChangePage = () => {
  const nickname = useSelector((state) => state.user.name);

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
            marginBottom: "45px",
            marginLeft: "350px",
          }}
        >
          <h1 style={{ fontSize: "25px" }}>장비 변경</h1>
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
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "250px",
              }}
            >
              <img
                src="./img/장비_휴대폰.png"
                alt="장비_휴대폰"
                style={{
                  float: "left",
                  width: "200px",
                  height: "200px",
                }}
              />
              <h5 style={{ fontSize: "20px" }}>휴대폰</h5>
            </div>
            <button
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
                src="./img/장비_연결하기.png"
                alt="장비_연결하기"
                style={{
                  float: "left",
                  width: "150px",
                  height: "30px",
                  marginLeft: "50px",
                }}
              />
            </button>
          </div>
          <div
            className="Keyboard"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "50px",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "250px",
              }}
            >
              <img
                src="./img/장비_키보드.png"
                alt="장비_키보드"
                style={{
                  float: "left",
                  width: "200px",
                  height: "200px",
                }}
              />
              <h5 style={{ fontSize: "20px" }}>키보드</h5>
            </div>
            <button
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
                src="./img/장비_연결하기.png"
                alt="장비_연결하기"
                style={{
                  float: "left",
                  width: "150px",
                  height: "30px",
                  marginLeft: "50px",
                }}
              />
            </button>
          </div>
          <div
            className="Piano"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "50px",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "250px",
              }}
            >
              <img
                src="./img/장비_피아노.png"
                alt="장비_피아노"
                style={{
                  float: "left",
                  width: "200px",
                  height: "200px",
                }}
              />
              <h5 style={{ fontSize: "20px" }}>피아노</h5>
            </div>
            <button
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
                src="./img/장비_연결하기.png"
                alt="장비_연결하기"
                style={{
                  float: "left",
                  width: "150px",
                  height: "30px",
                  marginLeft: "50px",
                }}
              />
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "120px",
            marginBottom: "45px",
            marginLeft: "350px",
            width: "700px",
          }}
        >
          <h1 style={{ fontSize: "25px", marginBottom: "10px" }}>
            현재 연결된 장비
          </h1>
          <div
            style={{
              border: "1px solid black",
              width: "850px",
              display: "flex",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "250px",
                marginTop: "20px",
                marginLeft: "20px",
                marginBottom: "20px",
              }}
            >
              <img
                src="./img/장비_휴대폰.png"
                alt="장비_휴대폰"
                style={{
                  float: "left",
                  width: "200px",
                  height: "200px",
                }}
              />
              <h5 style={{ fontSize: "20px" }}>휴대폰</h5>
            </div>
            <div
              style={{
                marginTop: "40px",
                marginLeft: "40px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ marginBottom: "20px" }}>galaxy s23</h3>

              <h3>IP : ???.???.???</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentChangePage;
