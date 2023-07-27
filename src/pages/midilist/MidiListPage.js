import React, { useState, useEffect } from 'react';
import Song from './components/Song';
import UploadPopup from './components/UploadPopup';
import './MidiListPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMidi, fetchMidiList } from '../../store/slices/midi/midiAcition';

const MidiListPage = () => {
    const dispatch = useDispatch();
    const midiList = useSelector(state => state.midi.midiList);
    const test = useSelector(state => state.midi.midi);
    const [isPopupVisible, setPopupVisible] = useState(false);;

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
            <div className="upload-button">
                <button onClick={handleUploadClick} style={{ position: 'fixed', top: 0, right: 0 }}>
                    업로드
                </button>
            </div>
            {test}
            {midiList.map((midi, index) => (
                <div className="song-container" key={index}>
                    <Song title={midi.title} downloadUrl={midi.downloadUrl} />
                </div>
            ))}

            {isPopupVisible && <UploadPopup onClose={handleClosePopup} />}

        </>
    );

};

export default MidiListPage;