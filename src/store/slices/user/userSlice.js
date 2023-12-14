import { createSlice } from "@reduxjs/toolkit";
import Client from "../../../models/Client";
import cookie from 'react-cookies';


const userSlice = createSlice({
    name: "user",
    initialState: {
        user_instance: cookie.load('user_instance') ? cookie.load('user_instance') : new Client({}),
    },

    reducers: {
        setnickname(state, action) {
            state.user_instance.nickname = action.payload.nickname;
        },

        setClient(state, action) {
            state.user_instance = action.payload.user_instance;
        }
    },


});

export const Actions = userSlice.actions;

export default userSlice;
