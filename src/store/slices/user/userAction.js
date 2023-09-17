import { Actions } from './midiSlice';


export const setName = (name) => {
    return (dispatch) => {
        dispatch(Actions.setmidi({ name: name }));
    }
}