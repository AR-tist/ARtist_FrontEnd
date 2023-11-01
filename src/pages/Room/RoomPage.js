import React, { useState } from "react";
import Participants from "./components/Participants";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const Room = () => {
  const nickname = useSelector((state) => state.user.name);

  const [liked, setLiked] = useState(false); // 좋아요 버튼의 상태를 저장

  const handleLikeClick = () => {
    setLiked(!liked); // 버튼을 클릭할 때마다 liked 상태를 토글
  };

  return (
    <>
      <Header user={nickname} />
      <Layout>
        <div id="app" className="container" style={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              marginBottom: "45px",
            }}
          >
            <h1 style={{ fontSize: "25px" }}>푸른고양이82의 방</h1>
            <button
              style={{
                width: "70px",
                height: "25px",
                color: "white",
                backgroundColor: "#39d446",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              PLAY
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{}}>
              <img
                src="./img/하입보이앨범커버.jpg"
                alt="앨범 커버"
                style={{
                  float: "left",
                  marginRight: "20px",
                  width: "200px",
                  height: "200px",
                }}
              />

              <div style={{ display: "flex" }}>
                <div style={{}}>
                  <h2
                    style={{
                      marginTop: "1px",
                      marginBottom: "1px",
                      fontSize: "28px",
                    }}
                  >
                    사건의 지평선
                  </h2>

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      color: "#505050",
                    }}
                  >
                    우는애벌레32
                  </p>
                  <button
                    className="like-button"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }}
                    onClick={handleLikeClick} // 클릭 이벤트에 핸들러 함수를 연결
                  >
                    <img
                      className="like-img"
                      src={
                        liked
                          ? "./img/좋아요누른버튼.png"
                          : "./img/좋아요버튼.png"
                      }
                      alt="좋아요 버튼"
                      style={{
                        marginTop: "10px",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </button>
                </div>
              </div>

              <div style={{ marginTop: "80px" }}>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#505050",
                    display: "inline-block",
                  }}
                >
                  곡 길이
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#505050",
                    display: "inline-block",
                    marginLeft: "5px",
                  }}
                >
                  04:12
                </p>
              </div>
            </div>

            <div style={{}}>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#AEAEAE",
                  cursor: "pointer",
                }}
              >
                초대 링크
              </button>
              <button
                style={{
                  marginLeft: "20px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#AEAEAE",
                  cursor: "pointer",
                }}
              >
                곡 변경하기
              </button>
            </div>
          </div>
        </div>
        <Participants />
      </Layout>
    </>
  );
};

export default Room;
