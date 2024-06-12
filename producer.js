const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  try {
    console.log("Connecting Producer...");
    await producer.connect();
    console.log("Producer Connected Successfully");

    rl.setPrompt("> ");
    rl.prompt();

    // Handle user input from the command line
    rl.on("line", async (line) => {
      try {
        const [tradeType, quantity, price] = line.split(" ");
        if (!tradeType || !quantity || !price) {
          console.error("Please provide trade type,  quantity, and price.");
          rl.prompt();
          return;
        }

        // Determine the partition based on trade type
        let partition;
        switch (tradeType.toLowerCase()) {
          case "buy":
            partition = 0;
            break;
          case "sell":
            partition = 1;
            break;
          default:
            console.error("Invalid trade type. Please use 'buy' or 'sell'.");
            rl.prompt();
            return;
        }

        // Send message to Kafka topic
        await producer.send({
          topic: "stock-trades",
          messages: [
            {
              partition,
              key: tradeType,
              value: JSON.stringify({
                quantity,
                price,
                timestamp: new Date().toISOString(),
              }),
            },
          ],
        });
        console.log(
          `Sent ${tradeType} order of (${quantity} shares at $${price}).`
        );
      } catch (error) {
        console.error("Failed to send message:", error);
      }
      rl.prompt();
    }).on("close", async () => {
      try {
        await producer.disconnect();
        console.log("Producer Disconnected Successfully");
      } catch (error) {
        console.error("Failed to disconnect producer:", error);
      }
    });
  } catch (error) {
    console.error("Failed to connect producer:", error);
    process.exit(1); // Exit the process with an error code
  }
}

init();
