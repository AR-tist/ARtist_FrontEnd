import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Header.css";
import Mypage from "./Mypage";

const Header = ({ toggleSidebar }) => {
  const [isMypageVisible, setIsMypageVisible] = useState(false);

  const toggleMypage = () => {
    setIsMypageVisible(!isMypageVisible);
  };

  return (
    <>
      <header
        data-v-d712cb68
        id="header"
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          width: "100%",
          height: "95px",
          backgroundColor: "#fff",
        }}
      >
        <div
          data-v-d712cb68
          className="header_inner"
          style={{
            WebkitBoxSizing: "border-box",
            boxSizing: "border-box",
            WebkitBoxPack: "justify",
            MsFlexPack: "justify",
            justifyContent: "space-between",
            height: "96px",
            padding: "10px 80px 0",
            display: "flex",
            WebkitBoxAlign: "center",
            MsFlexAlign: "center",
            alignItems: "center",
            position: "relative",
            minWidth: "955px",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          <div
            data-v-d712cb68
            className="header--left"
            style={{
              display: "flex",
              WebkitBoxAlign: "center",
              MsFlexAlign: "center",
              alignItems: "center",
              minWidth: "534px",
            }}
          >
            <div data-v-d712cb68 className="flo_bi">
              <button
                className="home-button"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <img
                  className="home-img"
                  src="img\artist_logo회색.png"
                  alt="홈"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
            <fieldset
              data-v-d712cb68
              className="flo_search"
              style={{
                position: "relative",
                WebkitBoxSizing: "border-box",
                boxSizing: "border-box",
                width: "350px",
                height: "32px",
                padding: "0 30px 0 42px",
                verticalAlign: "middle",
                border: "1px solid #d2d2d2",
                borderRadius: "17px",
                marginLeft: "500px",
              }}
            >
              <img
                className="search-img"
                src="img\검색회색.png"
                alt="검색"
                style={{
                  backgroundPosition: "-242px -632px",
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  content: "",
                  WebkitTransform: "translateY(-50%)",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                id="searchKeywordInput"
                type="text"
                placeholder="검색어를 입력하세요."
                autoComplete="new-password"
                spellCheck="false"
                autoCorrect="off"
                autoCapitalize="off"
                className="iptxt"
              />
            </fieldset>
          </div>
          <div
            data-v-d712cb68
            role="navigation"
            className="snb_w header--right"
            style={{
              minWidth: "240px",
              marginLeft: "24px",
              display: "flex",
              WebkitBoxAlign: "center",
              alignItems: "center",
            }}
          >
            <div
              data-v-d712cb68
              className="header__link"
              style={{ marginLeft: "0", fontSize: "13px" }}
            >
              <button
                onClick={toggleMypage}
                style={{
                  color: "#8c8c8c",
                  textDecoration: "none",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                마이페이지
              </button>
            </div>
            <div
              data-v-d712cb68
              className="header__link"
              style={{ marginLeft: "25px", fontSize: "13px" }}
            >
              <button
                onClick={toggleSidebar}
                style={{
                  color: "#8c8c8c",
                  textDecoration: "none",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                메뉴
              </button>
            </div>
          </div>
        </div>
        {isMypageVisible && <Mypage />}
      </header>
    </>
  );
};
Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
