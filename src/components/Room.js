import Client from "./Client";
import Music from "./Music";

class Room {
    constructor(room_id, host_id) {
        this.room_id = room_id;
        this.host_id = host_id;
        this.music_instance = new Music();
        this.invite_url = null;
        this.guests = {};
    }

    getRoom_id() {
        return this.room_id;
    }

    getHost_id() {
        return this.host_id;
    }

    getMusic_instance() {
        return this.music_instance;
    }

    getInvite_url() {
        return this.invite_url;
    }

    getGuests() {
        return this.guests;
    }
}

export default Room;
