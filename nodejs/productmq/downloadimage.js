const amqp = require("amqplib")
const fs = require("fs")

async function downloadImage(url, filepath) {

}
async function connect() {
    try {
        // const connection = await amqp.connect('amqp://localhost:5672')
        const connection = await amqp.connect('amqps://tyjfkqxg:4kKwp-BdZpvki-IQ72rzSBTz527hPs9G@campbell.lmq.cloudamqp.com/tyjfkqxg')
        const channel = await connection.createChannel()
        const result = await channel.assertQueue('download')
        channel.consume('download', (message) => {
            console.log(JSON.parse(message.content.toString()))
            channel.ack(message)
        })
    }
    catch (err) {
        console.log(`Error : ${err}`)
    }
}
connect()