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
    },

});

export const Actions = userSlice.actions;

export default userSlice;
