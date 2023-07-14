import { createSlice } from "@reduxjs/toolkit";

const midiSlice = createSlice({
    name: "midi",
    initialState: {
        midiFile: null,
        midi: null,
        timer: [],
    },

    reducers: {
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
