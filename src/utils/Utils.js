import MidiParser from 'midi-parser-js';
import { Inko } from 'inko';
// 업로드된 MIDI 파일을 BASE64로 받은 다음, MIDI 파일을 파싱한다. 그리고 결과를 setMidi로 저장한다.
export const fileToMidi = (fileURL) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileURL); // ref.current.files[0]
        reader.onload = () => {
            const result = MidiParser.Base64(reader.result);
            resolve(result);
        }
        reader.onerror = reject;
    })
}

// 모델 결과 midiData를 
export function uint8ArrayToBase64(uint8Array) {
    let binary = '';
    const length = uint8Array.length;

    for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }

    return btoa(binary);
}

// 올바른 트랙을 찾는 함수
export const extarctEvent = (tracks) => {
    let valid_index = 0;
    if (tracks.length === 1) return 0;
    tracks.forEach((e, i) => {
        if (valid_index !== 0) return;
        e.event.forEach((e2, i2) => {
            if (e2.type === 8 || e2.type === 9) {
                valid_index = i;
                return;
            }
        })
    })
    return valid_index;
}


export const isKor = (str) => {
    return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(str);
}

export const getKey = (str) => {
    let key = '';
    if (isKor(str)) {
        const inko = new Inko();
        key = inko.ko2en(str);
    } else
        key = str.toLowerCase();
    return key;
}