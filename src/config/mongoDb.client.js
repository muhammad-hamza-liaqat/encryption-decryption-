const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db(process.env.DB_NAME);

        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = { connectDB, client };
