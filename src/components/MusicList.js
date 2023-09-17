import {
  setLoading,
  setMidi,
  fetchMidiList,
} from "../store/slices/midi/midiAction";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axios"; // Fixed typo in import path
import { useDispatch } from "react-redux";
import axios from "axios";
import { fileToMidi } from "../utils/Utils";

// Import the images
import img1 from "./img/곡_기본_이미지_1.png";
import img2 from "./img/곡_기본_이미지_2.png";
import img3 from "./img/곡_기본_이미지_3.jpg";
import img4 from "./img/곡_기본_이미지_4.jpg";
import img5 from "./img/곡_기본_이미지_5.png";
import img6 from "./img/곡_기본_이미지_6.png";
import img7 from "./img/곡_기본_이미지_7.png";
import img8 from "./img/곡_기본_이미지_8.jpg";
import img9 from "./img/곡_기본_이미지_9.png";
import img10 from "./img/곡_기본_이미지_10.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const Row = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [randomImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );
  const randomImage = images[randomImageIndex];

  const midiLoad = async (dest) => {
    const fullDownloadUrl = `${axiosInstance.getUri()}${props.downloadUrl}`;
    dispatch(setLoading(true));
    axios({
      method: "get",
      url: fullDownloadUrl,
      responseType: "blob",
    }).then(async (res) => {
      dispatch(setLoading(false));
      const midi = await fileToMidi(res.data);
      dispatch(setMidi(midi));
      navigate(dest);
    });
  };

  const midiPlay = async () => {
    midiLoad(`/midi/${1}`);
  };

  const handlePlay = () => {
    // Play 로직 작성
    midiLoad(`/graphic/${1}`);
  };

  const handleDownload = () => {
    // Download 로직 작성
    if (props.downloadUrl) {
      const fullDownloadUrl = `${axiosInstance.getUri()}${props.downloadUrl}`;
      window.open(fullDownloadUrl);
    } else {
      console.error("Download URL is not available.");
    }
  };

  const handleDelete = () => {
    console.log(`${axiosInstance.getUri()}${props.deleteUrl}`);
    axiosInstance
      .delete(`${axiosInstance.getUri()}${props.deleteUrl}`)
      .then((res) => {
        console.log(res);
        dispatch(fetchMidiList());
      });
  };

  const moreButtonStyle = {
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#333",
    width: "100%",
    height: "40px",
    padding: "10px 16px",
    fontSize: "14px",
    textAlign: "left",
    display: "block",
  };
  return (
    <tr>
      <td
        style={{
          fontSize: "15px",
          fontWeight: "700",
          color: "#333",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        {props.rank + 1}
      </td>
      <td
        style={{
          paddingLeft: "20px",
          textAlign: "left",
          position: "relative",
          height: "84px",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <div
          style={{
            position: "relative",
            minWidth: "210px",
            maxWidth: "520px",
            height: "60px",
            paddingRight: "28px",
            paddingLeft: "80px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "60px",
              height: "60px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                verticalAlign: "top",
                borderRadius: "4px",
              }}
              alt="이미지"
              src={randomImage}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: "130px",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: "15px", color: "#333", fontWeight: "400" }}>
                {props.title}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  flex: "0 1 auto",
                  paddingTop: "6px",
                  fontSize: "13px",
                  color: "#969696",
                }}
              >
                {props.subtitle ? props.subtitle : "Songs"}
              </p>
            </div>
          </div>
        </div>
      </td>
      <td
        style={{
          position: "relative",
          fontSize: "15px",
          color: "#333",
          textAlign: "left",
          height: "84px",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <span
          style={{
            display: "block",
            position: "relative",
            minWidth: "100px",
            width: "196px",
            fontSize: "15px",
            color: "#333",
          }}
        >
          {props.poster ? props.poster : "나그네"}
        </span>
      </td>
      <td
        style={{
          minWidth: "80px",
          fontSize: "15px",
          fontWeight: "400",
          color: "#333",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        {props.views ? props.views : "0"}
      </td>
      <td
        style={{
          minWidth: "80px",
          fontSize: "15px",
          fontWeight: "400",
          color: "#333",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        {props.like ? props.like : "0"}
      </td>
      <td
        style={{
          minWidth: "50px",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "transparent",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}
          onClick={handlePlay}
        >
          <img
            src="img\재생버튼.png"
            alt="업로드"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>
      </td>
      <td
        style={{
          minWidth: "50px",
          position: "relative",
          height: "84px",
          textAlign: "center",
          borderBottom: "1px solid #f6f6f6",
        }}
      >
        <button
          style={{
            cursor: "pointer",
            backgroundColor: "transparent",
            color: "transparent",
            whiteSpace: "nowrap",
            verticalAlign: "middle",
          }}
          onClick={(event) => {
            event.stopPropagation();
            props.index === props.moreIndex
              ? props.setMoreIndex(-1)
              : props.setMoreIndex(props.index);
          }}
        >
          <img
            src="img\재생버튼.png"
            alt="업로드"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>
        {props.moreIndex === props.index && (
          <div
            style={{
              position: "absolute",
              top: "66px",
              right: "0",
              zIndex: "11",
              width: "200px",
              padding: "10px 0",
              background: "#fff",
              borderRadius: "5px",
              boxShadow: "0 4px 20px 0 rgba(0,0,0,.1)",
            }}
          >
            <button style={moreButtonStyle} onClick={midiPlay}>
              MIDI 재생
            </button>
            <button style={moreButtonStyle} onClick={handleDownload}>
              다운로드
            </button>
            <button style={moreButtonStyle} onClick={handleDelete}>
              삭제
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const MusicList = ({ midiList }) => {
  console.log(midiList);
  const [moreIndex, setMoreIndex] = useState(-1);
  const th = {
    whiteSpace: "nowrap",
    height: "39px",
    fontSize: "13px",
    fontWeight: "400",
    color: "#a0a0a0",
    borderTop: "1px solid #ebebeb",
    borderBottom: "1px solid #ebebeb",
    padding: "0",
    margin: "0",
  };
  return (
    <div
      style={{
        padding: "0",
        margin: "0",
        border: "0",
      }}
      onClick={() => {
        setMoreIndex(-1);
      }}
    >
      <table
        style={{
          width: "auto",
          minWidth: "100%",
          maxWidth: "none",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col width="42" data-cell="순위"></col>
          <col width="*" data-cell="곡/설명"></col>
          <col width="250" data-cell="업로더"></col>
          <col width="65" data-cell="플레이수"></col>
          <col width="65" data-cell="좋아요"></col>
          <col width="65" data-cell="재생"></col>
          <col width="65" data-cell="더보기"></col>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" style={th}>
              순위
            </th>
            <th
              scope="col"
              style={{ ...th, ...{ paddingLeft: "20px", textAlign: "left" } }}
            >
              곡/설명
            </th>
            <th
              scope="col"
              style={{ ...th, ...{ paddingLeft: "5px", textAlign: "left" } }}
            >
              업로더
            </th>
            <th scope="col" style={th}>
              플레이수
            </th>
            <th scope="col" style={th}>
              좋아요
            </th>
            <th scope="col" style={th}>
              재생
            </th>
            <th scope="col" style={th}>
              더보기
            </th>
          </tr>
        </thead>
        <tbody>
          {midiList.map((midi, index) => (
            <Row
              key={index}
              index={index}
              rank={index}
              title={midi.title}
              downloadUrl={midi.downloadUrl}
              deleteUrl={midi.downloadUrl}
              moreIndex={moreIndex}
              setMoreIndex={setMoreIndex}
              imgurl={undefined}
              subtitle={midi.subtitle}
              poster={midi.poster}
              like={midi.like}
              views={midi.views}
              music_lenght={midi.music_lenght}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MusicList;
