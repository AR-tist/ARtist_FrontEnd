import React, { useState, useEffect } from "react";
import Song from "./components/Song";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadPopup from "./components/UploadPopup";
import "./MidiListPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMidiList } from "../../store/slices/midi/midiAction";

const MidiListPage = () => {
  const dispatch = useDispatch();
  const midiList = useSelector((state) => state.midi.midiList);
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchMidiList());
  }, []);

  const handleUploadClick = () => {
    setPopupVisible(true); // 팝업 창 열기
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // 팝업 창 닫기
  };

  return (
    <>
      <div id="app" class style={{ overflow: "hidden", paddingBottom: "80px" }}>
        <Header></Header>
        <div
          id="wrap"
          style={{
            width: "100%",
            minWidth: "955px",
            maxWidth: "1600px",
            height: "100%",
            margin: "0 auto",
          }}
        >
          <section
            id="main"
            role="main"
            class="section_home w955"
            style={{ width: "955px", paddingRight: "80px" }}
          >
            <div
              class="section_inner"
              style={{
                paddingTop: "10px",
                minWidth: "800px",
                maxWidth: "1600px",
                paddingTop: "50px",
                margin: "0 auto",
              }}
            >
              <div>
                <section
                  data-v-35151064
                  class="curation-content"
                  is-swiper="true"
                  wrapper-class
                  style={{ marginTop: "60px" }}
                >
                  <div
                    data-v-35151064
                    class="curation-content__header"
                    style={{
                      display: "flex",
                      flexDirection: "column", // 아이템들을 세로로 정렬
                      justifyContent: "center", // 아이템들을 수직 방향으로 가운데 정렬
                      alignItems: "center",
                      WebkitBoxPack: "justify",
                      MsFlexPack: "justify",
                      justifyContent: "space-between",
                      marginLeft: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div data-v-35151064 class="curation-content__title">
                      <div
                        class="upload"
                        style={{ display: "flex", marginLeft: "800px" }}
                      >
                        <h3 data-v-35151064> My Tracks </h3>
                        <button
                          className="upload-button"
                          onClick={handleUploadClick}
                        >
                          <img
                            className="upload-img"
                            src="img\업로드버튼.png"
                            alt="업로드"
                            style={{
                              marginLeft: "20px",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                    <div
                      data-v-06565e30
                      data-v-35151064
                      class="paging-slide__navigator"
                      style={{
                        position: "relative",
                        display: "flex",
                        gap: "12px",
                        WebkitBoxAlign: "center",
                        MsFlexAlign: "center",
                        alignItems: "center",
                        WebkitBoxPack: "end",
                        MsFlexPack: "end",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div className="selected-song-information">
                        <img
                          className="selected-song-img"
                          src="img\하입보이앨범커버.jpg"
                          alt="업로드"
                        />
                      </div>

                      <div className="track">
                        <div
                          className="top-bar"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: "1px solid rgb(0, 0, 0)",
                            borderBottom: "1px solid rgb(0, 0, 0)",
                            marginTop: "50px",
                            marginLeft: "50px",
                            marginRight: "50px",
                          }}
                        >
                          <h5 className="n"> 번호</h5>
                          <h5 className="s"> 곡 </h5>
                          <h5 className="p"> 재생 다운로드 삭제</h5>
                        </div>

                        {midiList.map((midi, index) => (
                          <div className="song-container" key={index}>
                            <Song
                              title={midi.title}
                              downloadUrl={midi.downloadUrl}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {isPopupVisible && (
                      <UploadPopup onClose={handleClosePopup} />
                    )}
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MidiListPage;
