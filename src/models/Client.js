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
        if (user_id === undefined) {
            user_id = cookie.load('user_id');
            if (user_id === undefined) {
                user_id = uuidv4();
                cookie.save('user_id', user_id);
            }
        }
        if (nickname === undefined) {
            nickname = cookie.load('nickname');
            if (nickname === undefined) {
                nickname = '익명';
                cookie.save('nickname', nickname);
            }
        }

        this.user_id = user_id || '';
        this.nickname = nickname || '';
        this.device = device || '';
        this.phoneSocket = null;
    }

}

export default Client;
