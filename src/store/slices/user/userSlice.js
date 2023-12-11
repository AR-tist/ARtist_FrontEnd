import { createSlice } from "@reduxjs/toolkit";
import Client from "../../../models/Client";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_instance: new Client({}),
    },

    reducers: {
        setnickname(state, action) {
            state.user_instance.nickname = action.payload.nickname;
        },
        setdevice(state, action) {
            state.user_instance.device = action.payload.device;
        },
        setphoneSocket(state, action) {
            state.user_instance.phoneSocket = action.payload.phoneSocket;
        },
    },

});

export const Actions = userSlice.actions;

export default userSlice;
