import NotePlayPage from "./pages/NotePlay/NotePlayPage"
import MidiListPage from "./pages/MidiList/MidiListPage"
import MidiPlayPage from "./pages/MidiPlay/MidiPlayPage"
import { Routes, Route } from "react-router-dom"
import { history } from "./utils/history"
import { useEffect } from "react";
import ConvertPage from "./pages/Convert/ConvertPage"

import { useSelector } from "react-redux"
import Loading from "./components/loading/loading"
const App = () => {
    const loading = useSelector(state => state.midi.loading)

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
    return <>
        <Routes>
            <Route path="/" element={<MidiListPage />} />
            <Route path="/play/:id" element={<NotePlayPage />} />
            <Route path="/midi/:id" element={<MidiPlayPage />} />
            <Route path="/convert" element={<ConvertPage />} />
            <Route path="*" element={<h1>찾을 수 없는 페이지입니다.</h1>} />
        </Routes>
        <Loading loading={loading} />
    </>
}

export default App