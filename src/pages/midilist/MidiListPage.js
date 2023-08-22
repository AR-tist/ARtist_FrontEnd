import React, { useState, useEffect } from 'react';
import Song from './components/Song';
import Header from './components/Header';
import UploadPopup from './components/UploadPopup';
import './MidiListPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMidiList } from '../../store/slices/midi/midiAction';

const MidiListPage = () => {
    const dispatch = useDispatch();
    const midiList = useSelector(state => state.midi.midiList);
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
        <Header></Header>

            <div className="body">

                <button className="home-button">
                    <img className="home-img" src="img\artist_logo흰색.png" alt="홈" />
                </button>
                <button className="mypage-button">
                    <img className="mypage-img" src="img\마이페이지흰색.png" alt="마이페이지" />
                </button>
                <button className="menu-button">
                    <img className="menu-img" src="img\메뉴흰색.png" alt="메뉴" />
                </button>

                <div className="Mytrack">
                    <h2>My Tracks</h2>

                    <button className="upload-button" onClick={handleUploadClick}>
                        <img className="upload-img" src="img\업로드버튼흰색.png" alt="업로드" />
                    </button>
                </div>

                <div className="track-group">
                    <div className='selected-song-information'>
                        <img className='selected-song-img' src="img\세븐앨범커버.jpg" alt="업로드" />
                    </div>

                    <div className="track">
                        <div className="top-bar">
                            <h5 className="n"> 번호</h5>
                            <h5 className="s"> 곡 </h5>
                            <h5 className="p" > 재생 다운로드 삭제</h5>
                        </div>

                        {midiList.map((midi, index) => (
                            <div className="song-container" key={index}>
                                <Song title={midi.title} downloadUrl={midi.downloadUrl} />
                            </div>
                        ))}
                    </div>
                </div>




                {isPopupVisible && <UploadPopup onClose={handleClosePopup} />}
            </div>
        </>
    );
};

export default MidiListPage;