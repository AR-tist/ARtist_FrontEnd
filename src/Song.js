import React from 'react';

const Song = ({ title }) => {
  const handlePlay = () => {
    // Play 로직 작성
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
        <button onClick={handlePlay}>재생</button>
        <button onClick={handleDownload}>다운로드</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </>
  );
};

export default Song;