import { Actions } from './userSlice';


export const setName = (name) => {
    return (dispatch) => {
        dispatch(Actions.setname({ name: name }));
    }
}