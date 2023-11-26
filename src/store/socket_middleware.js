import Room from '../models/Room'
import { wsbaseURL } from '../utils/axios'
import { setRoom } from './slices/room/roomAction'



export const socketMiddleware = (socket) => (params) => (next) => (action) => {
    const { dispatch, getState } = params
    const { type } = action


    switch (type) {
        case 'socket/connect':
            if (socket.isConnected()) {
                return next(action)
            }

            const payload = action.payload
            console.log(payload)

            let queryPath = `?filename=${payload.filename}&nickname=${payload.nickname}&user_id=${payload.user_id}&device=${payload.device}`;
            if (payload.room_id !== undefined) {
                queryPath = `?room_id=${payload.room_id}&nickname=${payload.nickname}&user_id=${payload.user_id}&device=${payload.device}`;
            }
            socket.connect(`${wsbaseURL}${queryPath}`)


            socket.on('open', () => {
                console.log('WebSocket connection opened');
            })
            socket.on('message', (event) => {

                console.log('WebSocket message received:', event);
                const data = JSON.parse(event.data);

                if (data.type === 'connect') {
                    if (payload.room_id === undefined) {
                        data.data.ongoing = true;
                    }
                    dispatch(setRoom(new Room(data.data)));
                }
                else if (data.type === 'join' || data.type === 'disconnect') {
                    dispatch(setRoom(new Room(data.data)));
                }
            })
            socket.on('close', () => {
                console.log('WebSocket connection closed');
            })
            break

        case 'socket/disconnect':
            socket.disconnect()
            break

        default:
            break
    }

    return next(action)
}