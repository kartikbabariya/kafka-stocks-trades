# kafka-stocks-trades
🚀 Stock Trading Data Processing with Kafka 🚀

### README

## Kafka Setup Using Docker

This guide helps you set up Apache Kafka and Zookeeper using Docker containers. Follow these steps to get Kafka up and running.

### Prerequisites

Ensure Docker is installed on your system. You can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Step-by-Step Instructions

#### 1. Start Zookeeper Container

To start a Zookeeper container and expose port 2181, run:

```sh
docker run -p 2181:2181 zookeeper
```

#### 2. Start Kafka Container

Ensure Zookeeper is running before starting Kafka. Replace `<PRIVATE_IP>` with your actual private IP address and run:

```sh
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

### Example

If your private IP address is `192.168.0.84`, use:

```sh
# Start Zookeeper
docker run -p 2181:2181 zookeeper

# Start Kafka
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=192.168.0.84:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.0.84:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

### Running the Project Files

1. **Clone the Repository**:

   ```sh
   git clone <GitHub_Repository_URL>
   cd <repository_directory>
   ```

2. **Install Dependencies**:

   ```sh
   npm install
   ```

3. **Run the Producer**:

   ```sh
   node producer.js
   ```

4. **Run the Consumers**:

   - **Consumer Group 1** (two instances):

     ```sh
     node consumer.js consumer-1
     ```

   - **Consumer Group 2** (one instance):

     ```sh
     node consumer.js consumer-2
     ```

### Conclusion

By following these steps, you will have Kafka and Zookeeper running in Docker containers and can run the provided producer and consumer files to simulate stock trading data processing. 

For more details and to contribute, visit the GitHub repository [here](GitHub_Link).

Happy coding!
