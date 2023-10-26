import React, { useState } from "react";
import UploadPopup from "./UploadPopup.js";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

const Header = (props) => {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleUploadClick = () => {
    setPopupVisible(true); // 팝업 창 열기
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // 팝업 창 닫기
  };

  const setCookie = () => {
    let tempNickname = document.getElementById("nickname_input").value;
    if (tempNickname == "") {
      tempNickname = document.getElementById("nickname_input").placeholder;
    }
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7일 후 만료
    cookie.save("nickname", tempNickname, {
      path: "/",
      expires,
      // secure : true,
      // httpOnly : true
    });

    document.getElementById("nickname_input").placeholder = tempNickname;
    alert('Your nickname "' + tempNickname + '" is saved as a cookie.');
  };

  function loadCookie() {
    return cookie.load("nickname")
      ? cookie.load("nickname")
      : "TypeYourNickname";
  }

  const navigateToWholeSong = () => {
    navigate("/whole-song"); // 전체 곡 페이지로 전환
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAutoKeywordVisible, setAutoKeywordVisible] = useState(false);

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    // 입력값이 있을 때만 auto_keyword_area를 보이도록 설정
    setAutoKeywordVisible(keyword.length > 0);
  };

  return (
    <>
      <header
        id="header"
        class="header"
        style={{
          width: "225px",
          left: "0",
          transform: "none",
          position: "fixed",
          top: "0",
          bottom: "0px",
          borderRight: "1px solid #f5f5f5",
          zIndex: "30",
          backgroundColor: "#fff",
          paddingLeft: "60px",
        }}
      >
        <h1 class="logo_wrap">
          <button
            className="logo-button"
            style={{
              backgroundPosition: "-255px -321px",
              // width: "114px",
              // height: "20px",
              display: "block",
              // paddingTop: "20px",
              margin: "37px 10px 5px 20px",
              backgroundColor: "transparent",
              border: "none",
              boxSahdow: "none",
              fontSize: "35px",
              fontWeight: "700",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            ARtist
          </button>
        </h1>
        <div
          class="menu_wrap"
          style={{
            top: "73px",
            right: "0",
            bottom: "0",
            left: "0",
            padding: "30px 16px 0 24px",
            overflowY: "auto",
          }}
        >
          <div
            class="profile_area"
            style={{
              width: "177px",
              border: "1px solid hsla(0, 0%, 100%, 0.1)",
              borderWidth: "1px 0",
            }}
          >
            <input
              id="nickname_input"
              type="text"
              placeholder={loadCookie()}
              maxlength="15"
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "18px",
                width: "172px",
                marginLeft: "0",
                fontWeight: "400",
              }}
            />
          </div>
          <div
            class="search_area"
            style={{
              width: "177px",
              position: "relative",
              marginTop: "20px",
              borderRadius: "4px",
            }}
          >
            <span
              class="input_area"
              style={{ position: "relative", display: "block" }}
            >
              <input
                type="search"
                role="combobox"
                id="search_keyword"
                aria-expanded="false"
                title="검색창"
                placeholder="음악 검색하기"
                autoComplete="off"
                class="input_search"
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  wordBreak: "break-all",
                  padding: "10px 36px 10px 44px",
                  width: "100%",
                  height: "35px",
                  border: "0",
                  backgroundColor: "#ededed",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  letterSpacing: "-0.3px",
                  color: "#000",
                }}
                onChange={handleInputChange} // 입력값이 변경될 때마다 호출됨
              ></input>
              <span
                class="icon_search"
                style={{
                  backgroundPosition: "-228px -606px",
                  width: "15px",
                  height: "15px",
                  position: "absolute",
                  top: "10px",
                  left: "13px",
                }}
              >
                <img
                  className="search-img"
                  src="img\검색회색.png"
                  alt="검색"
                  style={{
                    width: "20px",
                    height: "20px",
                    position: "absolute",
                    top: "50%",
                    WebkitTransform: "translateY(-50%)",
                    transform: "translateY(-50%)",
                  }}
                />
              </span>
            </span>

            {isAutoKeywordVisible && (
              <div
                class="auto_keyword_area"
                style={{
                  zIndex: "20",
                  left: "85px",
                  position: "fixed",
                  width: "400px",
                  padding: "9px 0 8px",
                  marginTop: "1px",
                  borderRadius: "4px",
                  backgroundColor: "#ededed",
                }}
              >
                <ui
                  role="listbox"
                  class="keyword_list"
                  style={{
                    display: "block",
                    marginBlockStart: "1em",
                    marginBlockEnd: "1em",
                    paddingInlineStart: "40px",
                  }}
                >
                  <li
                    role="presentation"
                    class="keyword_list_item"
                    style={{ listStyle: "none" }}
                  >
                    <a
                      role="option"
                      aria-selected="false"
                      class="auto_keyword"
                      style={{}}
                    >
                      {" "}
                      검색어{" "}
                    </a>
                  </li>
                </ui>
              </div>
            )}
          </div>

          <div class="menu_area">
            <button
              className="nickname-change-button"
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "15px",
                fontWeight: "300",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={setCookie}
            >
              닉네임 변경
            </button>
            <button
              className="upload-button"
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "15px",
                fontWeight: "300",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={handleUploadClick}
            >
              업로드 하기
            </button>
            {isPopupVisible && <UploadPopup onClose={handleClosePopup} />}
            <button
              className="entire-song-button"
              style={{
                display: "block",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "15px",
                fontWeight: "300",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={navigateToWholeSong}
            >
              전체 업로드 곡 보기 {">"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
