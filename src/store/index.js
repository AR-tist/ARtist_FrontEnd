import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./slices/example/exampleSlice";
import midiSlice from "./slices/midi/midiSlice";
import userSlice from "./slices/user/userSlice";

const store = configureStore({
    reducer: { example: exampleSlice.reducer, midi: midiSlice.reducer, user: userSlice.reducer },

});

export default store;
