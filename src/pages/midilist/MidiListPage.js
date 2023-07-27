import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Song from './components/Song';
import UploadPopup from './components/UploadPopup';
import './MidiListPage.css';

const MidiListPage = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    // const [midiList, setMidiList] = useState([]);

    // useEffect(() => {
    //     fetchMidiList();
    // }, []);

    // const fetchMidiList = () => {
    //     axios 
    //       .get('/list')
    //       .then(response => {
    //         setMidiList(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching MIDI list:', error);
    //     });
    // };

    const handleUploadClick = () => {
        setPopupVisible(true); // 팝업 창 열기
    };

    const handleClosePopup = () => {
        setPopupVisible(false); // 팝업 창 닫기
    };

    return (
        <>
            <div className="upload-button">
                <button onClick={handleUploadClick} style={{ position: 'fixed', top: 0, right: 0 }}>
                    업로드
                </button>
            </div>
            
            <div className="song-container">
                <Song title="제목 1" />
            </div>
            <div className="song-container">
                <Song title="제목 2" />
            </div>
            <div className="song-container">
                <Song title="제목 3" />
            </div>

            {isPopupVisible && <UploadPopup onClose={handleClosePopup} />}

        </>
    );

};

export default MidiListPage;