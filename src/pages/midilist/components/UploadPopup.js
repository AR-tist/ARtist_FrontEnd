import React, { useState } from 'react';
import Modal from 'react-modal';

import axiosInstance from './../../../utils/axios';

import { useDispatch } from 'react-redux';
import { fetchMidiList } from '../../../store/slices/midi/midiAction';

import * as mm from '@magenta/music/es6';

import './UploadPopup.css';
import YoutubeUploadModal from './YoutubeUploadModal';


// react-modal에 대한 앱 요소 설정
Modal.setAppElement('#root'); // 루트 요소의 ID가 'root'라고 가정합니다


const UploadPopup = ({ onClose }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    
    const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
    const [youtubeLink, setYoutubeLink] = useState('');

    const handleYoutubeUpload = link => {
        console.log('Uploading YouTube link:', link);
        onClose(); // YouTube modal 닫기
    };

    const [isDragging, setIsDragging] = useState(false);
    const [draggedFile, setDraggedFile] = useState(null);

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
            uploadMIDI(file, title)
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

    const handleDragOver = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    const handleDragEnter = event => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragLeave = event => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
    };
    
    const handleDrop = event => {
        event.preventDefault();
        event.stopPropagation();
    
        setIsDragging(false);
    
        const droppedFile = event.dataTransfer.files[0];
        setDraggedFile(droppedFile);
        setFile(droppedFile);
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'absolute',
                    top: '50%', // modal을 수직으로 중앙 배치
                    left: '50%', // modal을 수평으로 중앙 배치
                    transform: 'translate(-50%, -50%)', // Centering trick
                    width: '30%',
                    height: '50%',
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

            <button className="close-button" onClick={handleCancel} >
                X
            </button>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                <h3 className="file-Upload">File Upload</h3>

                <input className="enter-title" type="text" value={title} onChange={handleTitleChange} 
                    placeholder="노래 제목을 입력하세요"
                />

                <div
                    className={`drop-zone ${isDragging ? 'drag-over' : ''}`}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {draggedFile ? (
                        <p>File: {draggedFile.name}</p>
                    ) : (
                        <>
                        <div className="DragAndDrop-container">
                            <img className='DragAndDrop-img' src="img\파일업로드이미지.png"/>
                            <p>Drag and drop the file</p>
                        </div>
                        </>
                    )}
                </div>
                
                <div className="upload-button-container">
                    <button className="MIDI-Upload" onClick={() => handleUpload('MIDI')} >
                        MIDI Upload
                    </button>
                    
                    <button className="MP3-Upload" onClick={() => handleUpload('MP3')}>
                        MP3 Upload
                    </button>
                </div>

                <button className="goto-youtube-Upload-button" onClick={() => setIsYoutubeModalOpen(true)}>
                    Go to upload a YouTube link →
                </button>
                
                <YoutubeUploadModal
                    isOpen={isYoutubeModalOpen}
                    onClose={() => setIsYoutubeModalOpen(false)}
                    handleYoutubeUpload={handleYoutubeUpload}
                />

            </div>

        </Modal>
    );
};

export default UploadPopup;
