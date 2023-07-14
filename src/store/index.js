import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./slices/example/exampleSlice";
import midiSlice from "./slices/midi/midiSlice";

const store = configureStore({
    reducer: { example: exampleSlice.reducer, midi: midiSlice.reducer },

});

export default store;
