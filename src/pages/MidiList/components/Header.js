const Header = (props) => {
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
          paddingLeft: "60px"
        }}
      >
        <h1 class="logo_wrap">
          <button
            className="logo-button"
            style={{
              backgroundPosition: "-255px -321px",
              width: "114px",
              height: "20px",
              display: "block",
              paddingTop: "20px",
              margin: "27px 10px 26px 20px",
              backgroundColor: "transparent",
              border: "none",
              boxSahdow: "none",
              fontSize: "35px",
              fontWeight: "700",
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
            <h2
              style={{
                fontSize: "18px",
                marginLeft: "0",
                fontWeight: "400",
              }}
            >
              {props.user}
            </h2>
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
                autocomplete="off"
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
              }}
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
              }}
            >
              업로드 하기
            </button>
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
              }}
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
