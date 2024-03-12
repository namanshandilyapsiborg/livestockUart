// // import io from "socket.io-client"
// // import { StreamCamera, Codec, Flip, SensorMode, StillCamera } from "pi-camera-connect"
// // const socket = io.connect(`http://xxx.xxx.xxx.xxx:${process.env.PORT}/iot`);
// // import v4l2camera from "v4l2camera"
// // import { webusb, getDeviceList } from 'usb';
// // import { logger } from "../../../index.js";
// // import pkg from "livecam"
// // const livecam = require('livecam')
// // Open the camera (replace /dev/video0 with the actual device)
// // const camera = new v4l2camera.Camera('/dev/video0')
// //This code will used to detect camera for  raspberry pi original camera
// // const streamCamera = new StreamCamera({
// //     codec: Codec.MJPEG,
// //     flip: Flip.Vertical,
// //     sensorMode: SensorMode.Mode6
// // });


// // fs.writeFileSync("still-image.jpg", image);

// // socket.on('connect', () => {
// //     socket.sendBuffer = [];
// //     socket.emit("pi-cam-init", "Cam-1");
// //     console.log("Connected to the server!" + socket.id);
// // })

// // socket.on('new-consumer', (data) => {
// //     console.log(data + ' has join the stream');
// // });

// // socket.on('consumer-left', (data) => {
// //     console.log(data + ' has left the stream');
// // });

// // streamCamera.on('frame', (data) => {
// //     console.log(data, 'data 1111111111');
// //     socket.binary(true).emit('pi-video-stream', 'Cam-1', "data:image/jpeg;base64," + data.toString("base64"));
// // });


// // export const cameraStartCapture = async () => {
// //     try {
// //         const data = await streamCamera.startCapture();

// //     } catch (error) {
// //         logger.error(`Error from function ${cameraStartCapture}`, { stack: error.stack })

// //     }
// // }

// // async function cameraStopCapture() {
// //     try {
// //         const data = await streamCamera.stopCapture();


// //     } catch (error) {
// //         logger.error(`Error from function ${cameraStopCapture}`, { stack: error.stack })

// //     }
// // }

// // cameraStartCapture().then(() => {
// //     console.log('Camera is now capturing');
// // });
// // cameraStopCapture().then(() => {
// //     console.log('Camera stop capturing');
// // });

// // export const startUsbCameraStreaming = async () => {
// //     try {
// //         const devices = await webusb.getDevices();

// //         // await camera.start();

// //         // Capture a frame and handle it
// //         await camera.capture(function (success) {
// //             if (success) {
// //                 // Process the captured frame
// //                 const frame = camera.toRGB();
// //                 console.log(frame, 'frame from my side');

// //                 // Do something with the frame data
// //             }

// //             // Capture the next frame
// //             camera.capture();
// //         });
// //     } catch (error) {
// //         logger.error(`Error from function ${usbDetectionCamera}`, { stack: error.stack })

// //     }
// // }

// startUsbLiveStreaming = async () => {
//     try {
//         console.log(new livecam, 'new livecam checking');
//         const web_cam = new livecam({
//             'ui_addr': '10.5.50.155',
//             'ui_port': '3001',
//             'broadcast_addr': '10.5.50.155',
//             'broadcast_port': '3002',
//             'gst_tcp_addr': '10.5.50.155',
//             'gst_tcp_port': '3003',
//             'start': function () {
//                 console.log(`web cam `);
//             }, 'webcam': {

//                 // should frames be converted to grayscale (default : false)
//                 'grayscale': true,

//                 // should width of the frame be resized (default : 0)
//                 // provide 0 to match webcam input
//                 'width': 800,

//                 // should height of the frame be resized (default : 0)
//                 // provide 0 to match webcam input
//                 'height': 600,

//                 // should a fake source be used instead of an actual webcam
//                 // suitable for debugging and development (default : false)
//                 'fake': false,

//                 // framerate of the feed (default : 0)
//                 // provide 0 to match webcam input
//                 'framerate': 25
//             }
//         })
//         await web_cam.broadcast();
//         console.log(`10.5.50.155:6002`);
//     } catch (error) {
//         console.log(error, 'error');
//         logger.error(`Error from function ${checkUsbDevices}`, { stack: error.stack })

//     }
// }
// module.exports = { startUsbLiveStreaming }