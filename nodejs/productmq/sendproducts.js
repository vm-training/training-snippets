/*
Create json file with 10 records in “productcolor.json”. It should contain productid and set different colours in it. e.g. 
[{productid: 1, colour:’red’},{productid:2, colour:’blue’}]

Create product json from https://dummyjson.com/products and set colour for each product from the “productcolour.json”
Create two queues 

Reorder queue
If stock of product is less than 50 send productid and color in reorder queue
Download image
Provide image json in downloadimage queue
*/

const axios = require("axios")
const fs = require("fs")
const amqp = require("amqplib")

const finalProductData = []
axios.get('https://dummyjson.com/products?limit=10')
    .then((response) => {
        const productcolorData = fs.readFileSync('./productcolor.json')
        const productcolorJSON = JSON.parse(productcolorData)
        const productcolormap = []
        productcolorJSON.forEach(product => {
            productcolormap[product.productid] = product.color
        });


        response.data.products.forEach(pdata => {
            pdata['color'] = productcolormap[pdata.id]
            finalProductData.push(pdata)
        });

        return finalProductData
    })
    .then(() => {
        connect()
    })

async function connect() {
    try {
        const connection = await amqp.connect('amqps://tyjfkqxg:4kKwp-BdZpvki-IQ72rzSBTz527hPs9G@campbell.lmq.cloudamqp.com/tyjfkqxg')
        // const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel()

        const reorderresult = await channel.assertQueue('reorder')
        // Prepare reorderdata
        var reorderdata = []
        finalProductData.forEach(pdata => {
            if (pdata.stock < 50)
                reorderdata.push({ id: pdata.id, color: pdata.color, stock: pdata.stock })
        });

        channel.sendToQueue('reorder', Buffer.from(JSON.stringify(reorderdata)))
        console.log(`Reorder Message published ${reorderdata}`)

        const downloadimaeresult = await channel.assertQueue('download')
        // Prepare downloadimage
        var downloaddata = []
        finalProductData.forEach(pdata => {
            pdata.images.forEach(pimg => {
                downloaddata.push({ pimg })
            })
        });

        channel.sendToQueue('download', Buffer.from(JSON.stringify(downloaddata)))
        console.log(`Download Message published ${downloaddata}`)

    }
    catch (err) {
        console.log(`Error: ${err}`)
    }
}
