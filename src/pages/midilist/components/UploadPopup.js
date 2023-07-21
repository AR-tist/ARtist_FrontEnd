import React, { useState } from 'react';
import Modal from 'react-modal';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4444';

const UploadPopup = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');

    const handleUpload = fileType => {
        if (fileType === 'MIDI') {
            console.log('Uploading MIDI file...');
    
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
    
            axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log('Upload successful:', response.data);
            })
            .catch(error => {
                console.error('Upload failed:', error);
            });
        } else {
            console.log('Invalid file type selected. Not uploading.');
        }
    
        onClose(); // 팝업 창 닫기
    };
    
    

    const handleCancel = () => {
        onClose(); // 팝업 창 닫기
    };

    const handleFileChange = event => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleTitleChange = event => {
        const titleValue = event.target.value;
        setTitle(titleValue);
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCancel}
            style={{
                // 스타일은 동일하게 유지
            }}
        >
            <h2>업로드 팝업 창</h2>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력하세요"
                    style={{ marginBottom: '10px' }}
                />
                <button onClick={() => handleUpload('MIDI')} style={{ marginBottom: '10px' }}>
                    MIDI 업로드
                </button>
                <button onClick={() => handleUpload('MP3')}>MP3 업로드</button>
            </div>
            <button onClick={handleCancel} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px' }}>
                X
            </button>
        </Modal>
    );
};

export default UploadPopup;
