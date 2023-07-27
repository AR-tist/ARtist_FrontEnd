import NotePlayPage from "./pages/NotePlay/NotePlayPage"
import MidiListPage from "./pages/MidiList/MidiListPage"
import MidiPlayPage from "./pages/MidiPlay/MidiPlayPage"
import { Routes, Route } from "react-router-dom"
import { history } from "./utils/history"
import { useEffect } from "react";
const App = () => {
    useEffect(() => {
        return history.listen((location) => {
            if (history.action === "POP") {
                const canvas = document.getElementsByTagName("canvas")
                if (canvas[0]) {
                    canvas[0].remove()
                }
            }
        });
    }, [])
    return (
        <Routes>
            <Route path="/" element={<MidiListPage />} />
            <Route path="/play/:id" element={<NotePlayPage />} />
            <Route path="/midi/:id" element={<MidiPlayPage />} />
        </Routes>
    )
}

export default App