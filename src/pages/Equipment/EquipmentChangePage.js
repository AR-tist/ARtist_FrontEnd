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
        <p
          style={{
            position: "absolute",
            left: "668px",
            top: "736px",
            fontSize: "24px",
            fontWeight: "500",
            textAlign: "left",
            color: "#000",
          }}
        >
          현재 연결된 장비가 없습니다.
        </p>
        <img
          src="./img/연결장비없음.png"
          style={{
            width: "153px",
            height: "155px",
            position: "absolute",
            left: "418.5px",
            top: "672.5px",
            objectFit: "cover",
          }}
        />
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
