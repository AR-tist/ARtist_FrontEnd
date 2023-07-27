import { Actions } from './midiSlice';
import axiosInstance from '../../../utils/axios';
import { useDispatch } from 'react-redux';

export const fetchMidiList = () => {
    return (dispatch) => {
        axiosInstance
            .get('/list')
            .then(response => {
                dispatch(Actions.setmidilist({ midilist: response.data }));
            })
            .catch(error => {
                console.error('Error fetching MIDI list:', error);
            });
    }
};

export const fetchMidi = (id) => {
    return (dispatch) => {
        dispatch(Actions.setmidi({ midi: id }));
    };
}