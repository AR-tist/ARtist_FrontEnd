import React, { useState } from "react";
import Participant from "./components/Participant";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { setLoading } from "../../store/slices/midi/midiAction";

const Room = () => {
  let { room_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_instance = useSelector((state) => state.user.user_instance);
  const room = useSelector((state) => state.room.room);

  const [liked, setLiked] = useState(false); // 좋아요 버튼의 상태를 저장

  const handleLikeClick = () => {
    setLiked(!liked); // 버튼을 클릭할 때마다 liked 상태를 토글
  };

  useEffect(() => {
    if (room.error_code !== 0) {
      dispatch(setLoading(false));
      if (room.error_code === 1) alert("방이 없습니다.");
      else if (room.error_code === 2) alert("방장이 방을 나갔습니다.");
      navigate("/");

    }
    else if (room.room_id !== room_id) {
      console.log("room_id", room_id);
      dispatch(setLoading(true));

      // CreateRoom(props.filename, true, loadCookie(), 1234, 0);
      // dispatch({ type: 'socket/connect', payload: { filename, is_host, nickname, user_id, device } });
      dispatch({ type: "socket/connect", payload: { room_id, nickname: user_instance.nickname, user_id: user_instance.user_id, device: user_instance.device } });

    } else {
      dispatch(setLoading(false));
    }

  }, [room]);

  useEffect(() => {
    return () => {
      dispatch({ type: "socket/disconnect" });
      dispatch(setLoading(false));
    }
  }, []);

  return (
    <>
      <Header />
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
            <h1 style={{ fontSize: "25px" }}>{room.host_nickname}의 방</h1>
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
        {Object.entries(room.guests).map(([key, value]) => {
          return <Participant profileImage="../img/프로필2.jpg"
            nickname={value.nickname}
            equipment="AR Piano"
            statusColor="#FE4949" />;
        })}
      </Layout>
    </>
  );
};

export default Room;
