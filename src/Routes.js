import NotePlayPage from "./pages/NotePlay/NotePlayPage"
import MidiListPage from "./pages/MidiList/MidiListPage"
import MidiPlayPage from "./pages/MidiPlay/MidiPlayPage"
import NoteGraphicPage from "./pages/NoteGraphic/NoteGraphicPage"
import { Routes, Route } from "react-router-dom"
import ConvertPage from "./pages/Convert/ConvertPage"

import { useSelector } from "react-redux"
import Loading from "./components/loading/loading"
import PianoWSPage from "./pages/PianoWSPage"
const App = () => {
    const loading = useSelector(state => state.midi.loading)

    return <>
        <Routes>
            <Route path="/" element={<MidiListPage />} />
            <Route path="/play/:id" element={<NotePlayPage />} />
            <Route path="/midi/:id" element={<MidiPlayPage />} />
            <Route path="/graphic/:id" element={<NoteGraphicPage />} />
            <Route path="/convert" element={<ConvertPage />} />
            <Route path="/piano-socket" element={<PianoWSPage />} />
            <Route path="*" element={<h1>찾을 수 없는 페이지입니다.</h1>} />
        </Routes>
        <Loading loading={loading} />
    </>
}

export default App