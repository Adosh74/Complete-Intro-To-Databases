const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const mongoConnectionString = 'mongodb://localhost:27017';

async function init () {
    const client = new MongoClient(mongoConnectionString, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('adoption');
    const collection = db.collection('pets');

    app.get('/pets', async (req, res) => {
        const result = await collection.find().toArray();
        res.json(result);
    });

    app.get('/get', async (req, res) => {
        const pets = await collection.find({
            $text: {
                $search: req.query.search
            }
        },
        {
            _id: 0,
        } 
    )
    .limit(10)
    .sort({
        score: {
            $meta: 'textScore'
        }
    })
    .toArray();

    res.status(200).json({
        status: 'success',
        pets
    });

    })

    app.use(express.static('./static'))

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

init();