const mqtt = require('mqtt');
const Data = require('./models/Data');

module.exports = function () {
  const client = mqtt.connect({
    host: process.env.MQTT_BROKER,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    protocol: 'mqtts'
  });

  const topics = ['factory/laminator/temperature', 'factory/laminator/pressure', 'factory/laminator/speed'];

  client.on('connect', () => {
    console.log('MQTT connected');
    topics.forEach(topic => client.subscribe(topic));
  });

  client.on('message', async (topic, message) => {
    const value = parseFloat(message.toString());
    const data = new Data({ topic, value, timestamp: new Date() });
    await data.save();
  });
};