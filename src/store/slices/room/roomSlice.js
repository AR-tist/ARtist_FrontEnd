import { createSlice } from "@reduxjs/toolkit";
import Room from "../../../models/Room";

const roomSlice = createSlice({
    name: "room",
    initialState: {
        room: new Room({}),
        start: false
    },

    reducers: {
        setRoom(state, action) {
            state.room = action.payload.room;
        },

        setOngoingFalse(state, action) {
            state.room.ongoing_code = 0;
            console.log('ongoing false')
        },
        setOngoingCode(state, action) {
            const room = { ...state.room };
            room.ongoing_code = action.payload.code;
            state.room = { ...room };
        },
        setStart(state, action) {
            state.start = action.payload.start;
        }
    },
});

export const Actions = roomSlice.actions;

export default roomSlice;
