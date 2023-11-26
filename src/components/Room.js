import Client from "./Client";
import Music from "./Music";

class Room {
    constructor(room_id, host_nickname, host_id, music_instance,invite_url, guests) {
        this.room_id = room_id;
        this.host_nickname = host_nickname;
        this.host_id = host_id;
        this.music_instance = music_instance;
        this.invite_url = invite_url;
        this.guests = guests;
    }

    getRoom_id() {
        return this.room_id;
    }

    getHost_nickname(){
        return this.host_nickname;
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
