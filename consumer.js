const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({
    topics: ["stock-trades"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      const { stockSymbol, quantity, price, timestamp } = JSON.parse(value);

      console.log(`Consumer-1 [${topic}]: PART:${partition}:`);
      console.log(`Trade Type: ${message.key.toString().toUpperCase()}`);
      console.log(`Quantity: ${quantity}`);
      console.log(`Price: $${price}`);
      console.log(`Timestamp: ${new Date(timestamp).toLocaleString()}`);
      console.log("------------------------------------");
    },
  });
}

init();
