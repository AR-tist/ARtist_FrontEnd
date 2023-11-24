const device = {
    keyboard: 0,
    midi: 1,
    phone: 2
};
Object.freeze(device);

class Client {
    constructor(user_id, nickName, selectedDevice) {
        this.user_id = user_id;
        this.userNickname = nickName;
        this.selectedDevice = selectedDevice;        
    }

    getUser_id() {
        return this.user_id;
    }
    getNickName(){
        return this.userNickname;
    }
    getSelectedDevice() {
        return this.selectedDevice;
    }

}

export default Client;
