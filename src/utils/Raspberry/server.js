import { logger } from "../../../index.js";

export const startupSocketIO = (io) => {
    try {

        let iotDevices = new Map()
        let rooms = new Map()
        io.on('connection', (socket) => {
            let address = socket.handshake.address;
            console.log("New client connection established...", address);
            socket.on("pi-cam-init", (data) => {
                console.log("Camera " + data + " is now online!");
                if (!iotDevices.has(data)) {
                    // Camera socket will join a room given by the id
                    let roomName = "room" + data;
                    socket.join(roomName);

                    // Add camera client to a room map for easier maintaining
                    if (rooms.has(roomName)) {
                        rooms.get(roomName).set(socket.id, socket);
                    } else {
                        rooms.set(roomName, new Map().set(socket.id, socket));
                    }

                    // Add camera client to a map for easier maintaining
                    iotDevices.set(data, socket);

                } else if (iotDevices.get(data) !== socket) {
                    console.log("Camera socket different from map, Adding the new socket into the map.");
                    let roomName = "room" + data;
                    iotDevices.get(data).leave(roomName);
                    socket.join(roomName);
                    iotDevices.set(data, socket);
                }

                // Add camera client to a map for easier maintaining
                iotDevices.set(data, socket);
            })
            socket.on("pi-video-stream", (data, res) => {
                let roomName = "room" + data;
                socket.to(roomName).emit("consumer-receive-feed", res);
            });
            socket.on("consumer-start-viewing", (data, res) => {
                console.log("Start stream from client " + address + " on pi camera ", data);
                let roomName = "room" + data;

                let camera;
                if (iotDevices.has(data)) {
                    socket.join(roomName);

                    // Add web client to a room map for easier maintaining
                    if (rooms.has(roomName)) {
                        rooms.get(roomName).set(socket.id, socket);
                    } else {
                        rooms.set(roomName, new Map().set(socket.id, socket));
                    }

                    camera = iotDevices.get(data);
                    camera.emit("new-consumer", socket.id, () => {
                        console.log("New Consumer has joined " + data + " stream");
                    });

                    res("Connect to " + camera.id + " steam");

                } else {
                    res("Camera is not online");
                }
            });

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
            socket.on("pi-disconnect", (data, res) => {
                console.log("Disconnect (socket) from pi camera " + address);
                let roomName = "room" + data;

                // Check room connected clients & remove the all clients
                if (rooms.has(roomName)) {
                    rooms.delete(roomName);
                }

                // Broadcast offline status to all clients
                socket.to(roomName).emit("pi-terminate-broadcast");

                res("Pi camera disconnected from server.")
            });
        });
    } catch (error) {
        console.log(error, 'error');
        logger.error(`Error from function ${startupSocketIO}`, { stack: err.stack })
    }


}