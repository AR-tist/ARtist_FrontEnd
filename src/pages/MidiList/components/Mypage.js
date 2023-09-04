const Mypage = () => {
  return (
    <>
      <div
        id="wrap"
        class="wrap mypage"
        style={{
          height: "100vh",
          backgroundColor: "#ffffff",
        }}
      >
        <header
          class="header"
          role="banner"
          style={{
            position: "relative",
            display: "table-cell",
            width: "395px",
            backgroundColor: "#fff",
            boxShadow: "5px 1px 8px 0 rgba(0,0,0,.06)",
            borderLeft: "1px solid rgba(0,0,0,.08)",
            verticalAlign: "top",
            zIndex: "1",
          }}
        >
          <div class="header_left">
            <div
              class="gnb_area"
              style={{
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h1 style={{ paddingLeft: "20px" }}>마이페이지</h1>
            </div>
            <div
              class="profile_area"
              style={{
                display: "block",
                padding: "100px 39px 20px",
                textAlign: "center",
              }}
            >
              <div
                class="profile_inner"
                style={{ width: "100%", margin: "0 auto" }}
              >
                {/* 프로필 이미지 */}
                <img
                  className="Profile-img"
                  src="img\프로필.png"
                  alt="프로필 이미지"
                  width="34"
                  height="34"
                  style={{
                    width: "112px",
                    height: "112px",
                    borderRadius: "50%",
                    boxShadow: "0 3px 6px 0 rgba(29,34,53,.08)",
                    verticalAlign: "top",
                    border: "0",
                  }}
                />

                <div class="profile" style={{ padding: "15px 0 40px" }}>
                  <p
                    class="username"
                    style={{
                      fontSize: "26px",
                      fontWeight: "700",
                      lineHeight: "32px",
                    }}
                  >
                    닉네임
                  </p>
                  <p
                    class="usercode"
                    style={{
                      fontSize: "15px",
                      lineHeight: "19px",
                      color: "#929294",
                    }}
                  >
                    #23232323
                  </p>
                </div>
              </div>
            </div>
            <div id="header_left_inner" style={{ padding: "0 40px" }}>
              <div
                class="left_menu"
                role="menu"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <button
                  className="left-menu-button"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxSahdow: "none",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  기본 정보
                </button>

                <button
                  className="left-menu-button"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxSahdow: "none",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  뭐하지
                </button>

                <button
                  className="left-menu-button"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    boxSahdow: "none",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  뭐하지
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Mypage;
