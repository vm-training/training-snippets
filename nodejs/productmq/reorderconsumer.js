const amqp = require("amqplib")
const fs = require("fs")
async function connect() {
    try {
        // const connection = await amqp.connect('amqp://localhost:5672')
        const connection = await amqp.connect('amqps://tyjfkqxg:4kKwp-BdZpvki-IQ72rzSBTz527hPs9G@campbell.lmq.cloudamqp.com/tyjfkqxg')
        const channel = await connection.createChannel()
        const result = await channel.assertQueue('reorder')
        channel.consume('reorder', (message) => {
            var d = new Date()
            var today = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
            fs.writeFileSync("./reorderdata/" + today + ".txt", message.content)
            channel.ack(message)
        })
    }
    catch (err) {
        console.log(`Error : ${err}`)
    }
}
connect()