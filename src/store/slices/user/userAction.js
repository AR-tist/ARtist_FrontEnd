import { Actions } from './userSlice';


export const setNickname = (nickname) => {
    return (dispatch) => {
        dispatch(Actions.setnickname({ nickname: nickname }));
    }
}

export const setDevice = (device) => {
    return (dispatch) => {
        dispatch(Actions.setdevice({ device: device }));
    }
}

export const setPhoneSocket = (phoneSocket) => {
    return (dispatch) => {
        dispatch(Actions.setphoneSocket({ phoneSocket: phoneSocket }));
    }
}