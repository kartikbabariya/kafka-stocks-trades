const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic Of stock-trades");
  await admin.createTopics({
    topics: [
      {
        topic: "stock-trades",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [stock-trades]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();
