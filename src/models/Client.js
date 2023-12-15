import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
const device = {
    keyboard: 0,
    midi: 1,
    phone: 2
};
Object.freeze(device);

const random_nick_1 = [
    '푸른',
    '초록',
    '노란',
    '보라',
    '주황',
    '하늘',
    '분홍',
    '연두',
]
const random_nick_2 = [
    '고양이',
    '강아지',
    '사자',
    '호랑이',
    '코끼리',
    '사슴',
    '여우',
    '곰',
    '토끼',
    '늑대',
    '기린',
    '코뿔소',
    '악어',
]
class Client {
    constructor({ user_id, nickname, device, play_mode }) {
        var user_instance = cookie.load('user_instance');
        if (user_instance === undefined) {
            this.user_id = user_id || uuidv4();
            this.nickname = nickname || random_nick_1[Math.floor(Math.random() * random_nick_1.length)] + random_nick_2[Math.floor(Math.random() * random_nick_2.length)] + Math.floor(Math.random() * 100);
            this.device = device || 0;
            this.play_mode = play_mode || 0;
            cookie.save('user_instance', this);
        }
        else {
            this.user_id = user_instance.user_id;
            this.nickname = user_instance.nickname;
            this.device = user_instance.device;
            this.play_mode = user_instance.play_mode;
        }
    }

}

export default Client;
