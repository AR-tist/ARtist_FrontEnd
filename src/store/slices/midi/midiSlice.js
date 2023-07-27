import { createSlice } from "@reduxjs/toolkit";

const midiSlice = createSlice({
    name: "midi",
    initialState: {
        midiList: [],
        midiFile: null,
        midi: null,
        timer: [],
    },

    reducers: {
        setmidilist(state, action) {
            state.midiList = action.payload.midilist;
        },
        setmidiFile(state, action) {
            state.midiFile = action.payload.midiFile;
        },
        setmidi(state, action) {
            state.midi = action.payload.midi;
        },

    },
});

export const Actions = midiSlice.actions;

export default midiSlice;
