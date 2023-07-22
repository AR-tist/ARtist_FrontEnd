import NotePlayPage from "./pages/NotePlay/NotePlayPage"
import MidiListPage from "./pages/midilist/MidiListPage"
import MidiPlayPage from "./pages/MidiPlay/MidiPlayPage"
import { Routes, Route } from "react-router-dom"

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MidiListPage />} />
            <Route path="/play/:id" element={<NotePlayPage />} />
            <Route path="/midi/:id" element={<MidiPlayPage />} />
        </Routes>
    )
}

export default App