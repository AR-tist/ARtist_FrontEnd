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
        <div className="EquipmentList" style={{}}>
          <div
            className="Phone"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="./img/장비_휴대폰.png"
              alt="장비_휴대폰"
              style={{
                marginLeft: "350px",
                float: "left",
                width: "200px",
                height: "200px",
              }}
            />
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
                  marginLeft: "375px",
                  float: "left",
                  width: "150px",
                  height: "30px",
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
          <div style={{ border: "1px solid black" }}>
            <img
              src="./img/장비_휴대폰.png"
              alt="장비_휴대폰"
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginBottom: "20px",
                float: "left",
                width: "200px",
                height: "200px",
              }}
            />
            <div
              style={{
                marginTop: "20px",
                marginLeft: "240px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>galaxy s23</h3>

              <h3>IP : ???.???.???</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentChangePage;
