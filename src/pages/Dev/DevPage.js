import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { setLoading, setMidi } from "../../store/slices/midi/midiAction";
import axios from "axios";
import { fileToMidi } from "../../utils/Utils";
import { extarctEvent } from "../../utils/Utils";
import { onebyoneMIDI } from "../../utils/Utils";

const DevPage = () => {
    const dispatch = useDispatch();
    const midi = useRef(null);
    const track = useRef(null);

    useEffect(() => {
        const fullDownloadUrl = 'http://13.124.50.132:8000/midi/download/사건의 지평선-1701236189.27549.mid';

        console.log("fullDownloadUrl", fullDownloadUrl);
        dispatch(setLoading(true));
        axios({
            method: "get",
            url: fullDownloadUrl,
            responseType: "blob",
        }).then(async (res) => {
            dispatch(setLoading(false));
            midi.current = await fileToMidi(res.data);
            track.current = midi.current.track[extarctEvent(midi.current.track)].event;
            console.log(track.current);
        });
    }, []);

    const buttonEvent = () => {
        const _track = onebyoneMIDI(track.current);

        console.log(_track);

        let time = 0;
        let pre_notes = {}

        // track.current.forEach((e, i) => {
        //     if (e.type !== 8 && e.type !== 9) return;
        //     if (e.type === 9) {
        //         if (pre_notes[e.data[0]] === undefined)
        //             pre_notes[e.data[0]] = []
        //         pre_notes[e.data[0]].push({ "note": e.data[0], "startAt": time });
        //     } else {
        //         pre_notes[e.data[0]][pre_notes[e.data[0]].length - 1]["endAt"] = time;
        //     }
        //     time += e.deltaTime * midi.current.timeDivision / 105.2;

        // })

        // console.log(pre_notes);
    }
    return (
        <div>
            <h1>DevPage</h1>
            <button onClick={buttonEvent}>button</button>
        </div>
    );
};

export default DevPage;