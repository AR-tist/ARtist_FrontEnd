import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "푸른고양이82",
    },

    reducers: {
        setname(state, action) {
            state.name = action.payload.name;
        },
    },
});

export const Actions = userSlice.actions;

export default userSlice;
