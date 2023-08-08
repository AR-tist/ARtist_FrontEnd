import { setLoading, setMidi } from '../../../store/slices/midi/midiAction';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import axiosInstance from '../../../utils/axios';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fileToMidi } from '../../../utils/Utils';

const Song = ({ title, downloadUrl }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const midiLoad = async (dest) => {
    const fullDownloadUrl = `${axiosInstance.getUri()}${downloadUrl}`;
    dispatch(setLoading(true));
    axios({
      method: 'get',
      url: fullDownloadUrl,
      responseType: 'blob',
    }).then(async (res) => {
      const midi = await fileToMidi(res.data);
      dispatch(setMidi(midi));
      dispatch(setLoading(false));
      navigate(dest);
    });
  }


  const midiPlay = async () => {
    midiLoad(`/midi/${1}`);
  }

  const handlePlay = () => {
    // Play 로직 작성
    midiLoad(`/play/${1}`);
  };

  const handleDownload = () => {
    // Download 로직 작성
    if (downloadUrl) {
      const fullDownloadUrl = `${axiosInstance.getUri()}${downloadUrl}`;
      window.open(fullDownloadUrl);
    } else {
      console.error('Download URL is not available.');
    }
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

// Define prop types
Song.propTypes = {
  title: PropTypes.string.isRequired,
  downloadUrl: PropTypes.string, // downloadUrl prop는 optional
};

export default Song;