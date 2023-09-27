import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "TypeYourName82",
    },

    reducers: {
        setname(state, action) {
            state.name = action.payload.name;
        },
    },
});

export const Actions = userSlice.actions;

export default userSlice;
