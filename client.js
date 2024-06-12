const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "stock-trades-app",
  brokers: ["<PRIVATE-IP>:9092"],
});
