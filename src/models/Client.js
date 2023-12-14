import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
const device = {
    keyboard: 0,
    midi: 1,
    phone: 2
};
Object.freeze(device);

class Client {
    constructor({ user_id, nickname, device }) {
        var user_instance = cookie.load('user_instance');
        if (user_instance === undefined) {
            this.user_id = user_id || uuidv4();
            this.nickname = nickname || '익명';
            this.device = device || 0;
            cookie.save('user_instance', this);
        }
        else {
            this.user_id = user_instance.user_id;
            this.nickname = user_instance.nickname;
            this.device = user_instance.device;
        }
    }

}

export default Client;
