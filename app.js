const express = require('express')
const mqtt = require('mqtt')
const { exec } = require('child_process');
const fs = require('fs')
const app = express()
let port1 = 3001

 const { SerialPort } = require("serialport");
 const port = new SerialPort({ path: "/dev/ttyAMA0", baudRate: 2000000});
 const { ReadlineParser } = require("@serialport/parser-readline");
 const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));



const client = mqtt.connect('mqtt://localhost');

// Connect to the broker
client.on('connect', () => {
console.log('Publisher connect to MQTT broker');

// Subscribe to the topic
client.subscribe('livestokeGateway', (err) => {
if(!err){
console.log('Subscribed to the topic');

}else{
console.log('Subscribe Failed', err);
}

});

});

// Handle incomming message
client.on('message', (topic, message) => {
console.log(`Received message on topic '${topic}': ${message.toString()}`);

});


async function connectSerialPort() {
    try {
        parser.on("data", async (data) => {
            console.log("Data from port Device=====>", data);
	client.publish('livestokeServer', data);
});
    } catch (error) {
        console.log(error, 'error from my side app')
    }
}

// this one is commented for i am not using uart 
 connectSerialPort();

app.listen(port1, () => {
    console.log(`Server is running on ${port1}`);
	require("./firefoxOpen")();

})