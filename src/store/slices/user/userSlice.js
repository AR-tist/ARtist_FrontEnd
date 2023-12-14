import { createSlice } from "@reduxjs/toolkit";
import Client from "../../../models/Client";
import cookie from 'react-cookies';
import { v4 as uuidv4 } from "uuid";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_instance: new Client({ id: uuidv4(), name: '익명', value: 0 }),
    },

    reducers: {
        setnickname(state, action) {
            state.user_instance.nickname = action.payload.nickname;
            cookie.save('user_instance', state.user_instance);
        },

        setClient(state, action) {
            state.user_instance = action.payload.user_instance;
            cookie.save('user_instance', state.user_instance);
        }
    },


});

export const Actions = userSlice.actions;

export default userSlice;
