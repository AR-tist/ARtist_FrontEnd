import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Song from './components/Song';
import UploadPopup from './components/UploadPopup';
import './MidiListPage.css';

const MidiListPage = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [midiList, setMidiList] = useState([]);

    useEffect(() => {
        fetchMidiList();
    }, []);

    const fetchMidiList = () => {
        axios
          .get('http://13.125.173.158:4444/list')
          .then(response => {
            setMidiList(response.data);
        })
        .catch(error => {
            console.error('Error fetching MIDI list:', error);
        });
    };

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
            
            {midiList.map((midi, index) => (
                <div className="song-container" key={index}>
                    <Song title={midi.title} />
                </div>
            ))}

            {isPopupVisible && <UploadPopup onClose={handleClosePopup} />}

        </>
    );

};

export default MidiListPage;