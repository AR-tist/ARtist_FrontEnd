import React, { useState } from 'react';
import Modal from 'react-modal';

import axiosInstance from './../../../utils/axios';

import { useDispatch } from 'react-redux';
import { fetchMidiList } from '../../../store/slices/midi/midiAction';

import * as mm from '@magenta/music/es6';


// react-modal에 대한 앱 요소 설정
Modal.setAppElement('#root'); // 루트 요소의 ID가 'root'라고 가정합니다


const UploadPopup = ({ onClose }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [youtube, setYoutube] = useState('');

    const uploadMIDI = (file, title) => {
        console.log('Uploading MIDI file...');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        axiosInstance.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Upload successful:', response.data);
                dispatch(fetchMidiList());
            })
            .catch(error => {
                console.error('Upload failed:', error);
            });
    }

    const handleUpload = fileType => {
        if (fileType === 'MIDI') {
            console.log(file)
            // uploadMIDI(file, title)
        }
        else if (fileType === 'MP3') {
            const model = new mm.OnsetsAndFrames('https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni');
            model.initialize().then(() => {
                model.transcribeFromAudioFile(file).then((ns) => {
                    const midiData = mm.sequenceProtoToMidi(ns);
                    const blob = new Blob([midiData], { type: 'audio/mid' });


                    let fileName = title
                    fileName = fileName.replace('.', '_')
                    fileName += '.mid'


                    console.log(new File([blob], fileName, { type: 'audio/mid' }));
                    uploadMIDI(new File([blob], fileName, { type: 'audio/mid' }), title);
                });
            });

            /* worker 사용 
            // 나중에 Worker 여러 번되면 useMemo로 최적화
            // const worker = new Worker(new URL('./Mp3ToMidi.js', import.meta.url));
            // worker.postMessage(file);
            // worker.onmessage = (e) => {
            //     console.log('호출 페이지 - ', e.data);
            // };
            console.log(file);
            const objectURL = URL.createObjectURL(file);
            // let reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = () => {
            //     console.log(reader.result);
            //     console.log(reader.result.replace('/', '%2F'))
            window.open(`http://localhost:3000/convert?url=${encodeURIComponent(objectURL)}`, '_blank');
            // }
            // const model = new mm.OnsetsAndFrames('https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni');
            // await model.initialize()
            // const ns = await model.transcribeFromAudioFile(file);
            // const midiData = mm.sequenceProtoToMidi(ns);
            // console.log(midiData);*/
        }
        else if (fileType === 'YOUTUBE') {
        }
        else {
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

    const handleYoutubeChange = event => {
        const value = event.target.value;
        setYoutube(value);
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCancel}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(15, 15, 15, 0.79)',
                },
                content: {
                    position: 'absolute',
                    top: '60px',
                    left: '35%',
                    width: '30%',
                    height: '80%',
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                },
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
                <input
                    type="text"
                    value={title}
                    onChange={handleYoutubeChange}
                    placeholder="유튜브 링크를 입력하세요"
                    style={{ marginBottom: '10px' }}
                />
                <button onClick={() => handleUpload('YOUTUBE')}>유튜브 업로드</button>
            </div>
            <button onClick={handleCancel} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px' }}>
                X
            </button>
        </Modal>
    );
};

export default UploadPopup;
