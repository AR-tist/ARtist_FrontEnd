import { useParams } from "react-router-dom";
import Piano from './components/piano';

const NotePlayPage = () => {
    let { midiId } = useParams();

    return (<Piano></Piano>);
};

export default NotePlayPage;