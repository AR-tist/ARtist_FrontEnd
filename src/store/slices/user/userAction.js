import { Actions } from './userSlice';


export const setNickname = (nickname) => {
    return (dispatch) => {
        dispatch(Actions.setnickname({ nickname: nickname }));
    }
}
