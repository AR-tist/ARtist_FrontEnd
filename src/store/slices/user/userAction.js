import { Actions } from './userSlice';


export const setNickname = (nickname) => {
    return (dispatch) => {
        dispatch(Actions.setnickname({ nickname: nickname }));
    }
}

export const setClient = (user_instance) => {
    return (dispatch) => {
        dispatch(Actions.setClient({ user_instance: user_instance }));
    }
}