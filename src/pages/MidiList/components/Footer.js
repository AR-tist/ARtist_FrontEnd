import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        role="contentinfo"
        class
        style={{
          display: "block",
          position: "relative",
          marginTop: "60px",
          clear: "both",
          background: "#fff",
          borderTop: "1px solid #e0e1e5",
          paddingTop: "32px",
        }}
      >
        <div
          class="footer_inner"
          style={{ maxWidth: "1440px", padding: 0, margin: "0 auto" }}
        >
          <div
            class="flo_fnb"
            style={{
              display: "flex",
              paddingBottom: "20px",
              marginBottom: "20px",
              overflow: "hidden",
              fontSize: "13px",
            }}
          >
            <ul
              class="footer_title"
              style={{ fontWeight: 700, width: "191px" }}
            >
              <li>
                <a href="" class>
                  고객센터
                </a>
              </li>
              <li>
                <a href="" class>
                  공지사항
                </a>
              </li>
            </ul>
            <ul>
              <li
                class="footer_title"
                style={{ fontWeight: 700, width: "191px" }}
              >
                AR-tist 서비스
              </li>
              <li>
                <a href="" class>
                  서비스 소개
                </a>
              </li>
            </ul>

            <ul>
              <li
                class="footer_title"
                style={{ fontWeight: 700, width: "191px" }}
              >
                기업 정보
              </li>
              <li>
                <a href="" class>
                  회사 소개
                </a>
              </li>
            </ul>
            <ul>
              <li
                class="footer_title"
                style={{ fontWeight: 700, width: "191px" }}
              >
                문의
              </li>
              <li>
                <a href="" class>
                  마케팅 광고 제휴 문의
                </a>
              </li>
              <li>
                <a href="" class>
                  서비스 이용 문의
                </a>
              </li>
              <li>
                <a href="" class>
                  음원 유통 문의
                </a>
              </li>
            </ul>
          </div>
          <div class="policy_area">
            <ul>
              <li>
                <a href="" class target="_blank">
                  이용약관
                </a>
              </li>
              <li>
                <a href="" class target="_blank">
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <a href="" class target="_blank">
                  사업자정보 확인
                </a>
              </li>
            </ul>
          </div>
          <address>
            <div class="inner" style={{ marginLeft: "-8px" }}>
              <div class="address_top">
                <span> 김지원 변상연 이아영 이준엽 정민규 </span>
              </div>
              <div class="address_bottom">
                <span> 경기도 성남시 수정구 복정동 산55-12 </span>
              </div>
            </div>
          </address>
          <p
            class="copyright"
            style={{
              paddingTop: "16px",
              paddingBottom: "0",
              fontSize: "11px",
              color: "#8e8e93",
            }}
          >
            <span style={{ paddingRight: "10px" }}>가천대학교</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
