import React from "react";

const device = {
    keyboard: "keyboard",
    midi: "midi",
    vr: "vr"
};
Object.freeze(device);

class Client {
    constructor(user_id, selectedDevice, connectionID) {
        this.user_id = user_id;
        this.selectedDevice = selectedDevice;
        this.connectionID = connectionID;

    }

    getUser_id() {
        return this.user_id;
    }

    getSelectedDevice() {
        return this.selectedDevice;
    }

    getConnectionID() {
        return this.connectionID;
    }
}

export default Client;
