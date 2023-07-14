import React from 'react';
import { useNavigate } from 'react-router-dom';

const Song = ({ title }) => {
  const navigate = useNavigate();
  const midiPlay = () => {
    navigate(`/midi/${1}`);
  }

  const handlePlay = () => {
    // Play 로직 작성
    navigate(`/play/${1}`);
  };

  const handleDownload = () => {
    // Download 로직 작성
  };

  const handleDelete = () => {
    // Delete 로직 작성
  };

  return (
    <>
      <h3>{title}</h3>
      <div className="button-group">
        <button onClick={midiPlay}>MIDI</button>
        <button onClick={handlePlay}>재생</button>
        <button onClick={handleDownload}>다운로드</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </>
  );
};

export default Song;