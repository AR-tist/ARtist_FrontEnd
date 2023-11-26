import { Actions } from './roomSlice';



export const setRoom = (room) => {
    return (dispatch) => {
        dispatch(Actions.setRoom({ room: room }));
    }
}

export const setOngoingFalse = () => {
    return (dispatch) => {
        dispatch(Actions.setOngoingFalse());
    }
}
