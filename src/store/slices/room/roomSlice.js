import { createSlice } from "@reduxjs/toolkit";
import Room from "../../../models/Room";

const roomSlice = createSlice({
    name: "room",
    initialState: {
        room: new Room({}),
    },

    reducers: {
        setRoom(state, action) {
            state.room = action.payload.room;
        },

        setOngoingFalse(state, action) {
            state.room.ongoing = false;
        }
    },
});

export const Actions = roomSlice.actions;

export default roomSlice;
