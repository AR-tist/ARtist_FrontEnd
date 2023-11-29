import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { setLoading, setMidi } from "../../store/slices/midi/midiAction";
import axios from "axios";
import { fileToMidi } from "../../utils/Utils";
import { extarctEvent } from "../../utils/Utils";

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
        const onebyone = (track) => {
            const _track = [...track];
            // re-assign for modify track
            for (let idx = 0; idx < _track.length; idx++) {
                _track[idx] = Object.assign({}, _track[idx]);
            }

            // start idx의 끝나는 지점을 찾고 삭제
            const delete_end_event = (idx) => {
                let tmp_end_event = null;
                for (let i = idx + 1; i < _track.length; i++) {
                    if (_track[i].type === 8 && _track[i].data[0] === _track[idx].data[0]) {
                        // console.log('end', i, _track[i]);
                        tmp_end_event = Object.assign({}, _track[i]);
                        if (i + 1 < _track.length)
                            _track[i + 1].deltaTime = _track[i].deltaTime + _track[i + 1].deltaTime;
                        _track.splice(i, 1);
                        break
                    }
                }
                return tmp_end_event
            }

            // 같은 deltatime을 가진 start idx를 찾음
            const find_start_at_the_same_time = (idx) => {
                let start_idxs = [idx,]
                for (let i = idx + 1; i < _track.length; i++) {
                    if (_track[i].deltaTime !== 0 || _track[i].type !== 9) {
                        break
                    } else {
                        start_idxs.push(i)
                    }
                }
                return start_idxs
            }
            // 

            for (let idx = 0 < _track.length - 1; idx++;) {
                try {
                    if (_track[idx].type !== 9)
                        continue
                } catch (e) {
                    break // 끝까지 갔을 때
                }

                // 같이 시작되는 지점을 찾음
                const start_idxs = find_start_at_the_same_time(idx);

                // 해당 지점들의 끝나는 지점을 찾고 삭제
                const start_events = []
                for (let i = 0; i < start_idxs.length; i++) {
                    const tmp_end_event = delete_end_event(start_idxs[i]);
                    if (tmp_end_event === null) {
                        continue
                    }
                    if (i !== 0)
                        tmp_end_event.deltaTime = 0;
                    start_events.push(tmp_end_event);
                }

                // 다음 시작되는 지점 앞에 끝나는 지점을 삽입
                if (start_events.length === 0) continue
                for (let i = idx + start_events.length; i < _track.length; i++) {
                    if (_track[i].type === 9 && _track[i].deltaTime !== 0) {
                        // console.log('next start', i, _track[i]);
                        for (let j = 0; j < start_events.length; j++)
                            _track.splice(i + j, 0, start_events[j]);
                        break
                    }
                }
                idx += start_idxs.length;
            }
            return _track
        }
        const _track = onebyone(track.current);

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