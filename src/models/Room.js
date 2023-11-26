import Client from "./Client";
import Music from "./Music";

class Room {
    // 0 : 정상
    // 1 : 방이 없음
    // 2 : 호스트가 나감
    constructor({ room_id, host_nickname, host_id, music_instance, guests, ongoing, error_code }) {
        this.room_id = room_id || '';
        this.host_nickname = host_nickname || '';
        this.host_id = host_id || '';
        this.music_instance = music_instance || new Music({});
        this.guests = guests || [];
        this.ongoing = ongoing || false;
        this.error_code = error_code || 0;
    }

    setOngoing(ongoing) {
        this.ongoing = ongoing;
    }

    getRoom_id() {
        return this.room_id;
    }

    getHost_nickname() {
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
