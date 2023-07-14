import Modal from 'react-modal';

const UploadPopup = ({ onClose }) => {
    const handleUpload = fileType => {
        // 업로드 처리 로직 작성
        console.log(`Uploading ${fileType} file...`);
        onClose(); // 팝업 창 닫기
    };

    const handleCancel = () => {
        onClose(); // 팝업 창 닫기
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
            }}
        >
            <h2>업로드 팝업 창</h2>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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