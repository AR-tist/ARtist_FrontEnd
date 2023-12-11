import React, { useState } from "react";
import Participant from "./components/Participant";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../store/slices/midi/midiAction";
import axiosInstance from "./../../utils/axios";
import { fileToMidi } from "./../../utils/Utils";
import { setMidi } from "./../../store/slices/midi/midiAction";
import axios from "axios";
import { setOngoingFalse } from "../../store/slices/room/roomAction";
import Modal from "react-modal";

const Room = () => {
  let { room_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_instance = useSelector((state) => state.user.user_instance);
  const room = useSelector((state) => state.room.room);
  const phoneSocket = useSelector((state) => state.user.user_instance.phoneSocket);

  const [liked, setLiked] = useState(false); // 좋아요 버튼의 상태를 저장

  const handleLikeClick = () => {
    setLiked(!liked); // 버튼을 클릭할 때마다 liked 상태를 토글
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedMode, setSelectedMode] = useState(""); // 선택된 모드 상태 추가

  // 모드 설정 함수
  const handleModeSelect = (selected) => {
    setSelectedMode(selected);
    setModalIsOpen(false); // 모달 닫기
  };

  useEffect(() => {
    if (room.error_code !== 0) {
      dispatch(setLoading(false));
      if (room.error_code === 1) alert("방이 없습니다.");
      else if (room.error_code === 2) alert("방장이 방을 나갔습니다.");
      navigate("/");
    } else if (room.ongoing_code === 2) {
      const fullDownloadUrl = `${axiosInstance.getUri()}${
        room.music_instance.download_url
      }`;

      console.log("fullDownloadUrl", fullDownloadUrl);
      dispatch(setLoading(true));
      axios({
        method: "get",
        url: fullDownloadUrl,
        responseType: "blob",
      }).then(async (res) => {
        const midi = await fileToMidi(res.data);
        dispatch(setMidi(midi));
        dispatch(setOngoingFalse());
        dispatch(setLoading(false));
        navigate("/graphic");
      });
    } else if (room.room_id !== room_id) {
      console.log("room_id", room_id);
      dispatch(setLoading(true));

      // CreateRoom(props.filename, true, loadCookie(), 1234, 0);
      // dispatch({ type: 'socket/connect', payload: { filename, is_host, nickname, user_id, device } });
      dispatch({
        type: "socket/connect",
        payload: {
          room_id,
          nickname: user_instance.nickname,
          user_id: user_instance.user_id,
          device: user_instance.device,
        },
      });
    } else {
      dispatch(setLoading(false));
    }

    console.log("phoneSocket", phoneSocket);
  }, [room]);

  useEffect(() => {
    return () => {
      const path = window.location.href.split("/");
      if (path[path.length - 1] !== "graphic") {
        dispatch({ type: "socket/disconnect" });
        dispatch(setLoading(false));
      }
    };
  }, []);

  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(window.location.href).then(
        () => {
          alert("초대 링크가 클립보드에 복사되었습니다.");
        },
        () => {
          alert("초대 링크 복사에 실패했습니다.");
        }
      );
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
  }

  return (
    <>
      <Header />
      <Layout>
        <div id="app" className="container" style={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ fontSize: "25px" }}>{room.host_nickname}의 방</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                style={{
                  width: "70px",
                  height: "25px",
                  color: "white",
                  backgroundColor: "#39d446",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "50px",
                }}
                onClick={() => {
                  dispatch({ type: "socket/host_play" });
                }}
              >
                PLAY
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                }}
                onClick={() => setModalIsOpen(true)}
              >
                <img
                  src="../img/설정아이콘.png"
                  alt="플레이_모드_설정"
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                  }}
                />
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                  content: {
                    width: "450px",
                    height: "280px",
                    borderRadius: "10px",
                    background: "#fff",
                    boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      fontSize: "20px",
                      textAlign: "center",
                      color: "#000",
                      marginBottom: "20px",
                    }}
                  >
                    연습 모드
                  </p>
                  <div>
                    <button
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        background: "#fff",
                        boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
                        fontSize: "18px",
                        textAlign: "center",
                        color: "#000",
                        cursor: "pointer",
                      }}
                      onClick={() => handleModeSelect("연습 모드 - 왼손")}
                    >
                      왼손
                    </button>

                    <button
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        background: "#fff",
                        boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
                        fontSize: "18px",
                        textAlign: "center",
                        color: "#000",
                        cursor: "pointer",
                        marginLeft: "20px",
                      }}
                      onClick={() => handleModeSelect("연습 모드 - 오른손")}
                    >
                      오른손
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      fontSize: "20px",
                      textAlign: "center",
                      color: "#000",
                      marginBottom: "20px",
                    }}
                  >
                    연주 모드
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        background: "#fff",
                        boxShadow: "0px 2px 10px 0 rgba(0,0,0,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        textAlign: "center",
                        color: "#000",
                        cursor: "pointer",
                      }}
                      onClick={() => handleModeSelect("연주 모드 - 양손")}
                    >
                      양손
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{}}>
              <img
                src="../img/하입보이앨범커버.jpg"
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
                    {room.music_instance.title}
                  </h2>

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      color: "#505050",
                    }}
                  >
                    {room.music_instance.poster}
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
                          ? "../img/좋아요누른버튼.png"
                          : "../img/좋아요버튼.png"
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
                  {room.music_instance.music_length}
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
                onClick={() => {
                  copyToClipboard();
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.entries(room.guests).map(([key, value]) => {
            return (
              <Participant
                profileImage="../img/프로필2.jpg"
                nickname={value.nickname}
                equipment="AR Piano"
                statusColor="#FE4949"
                mode={selectedMode}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default Room;
