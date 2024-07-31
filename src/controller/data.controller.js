const SimpleCrypto = require('simple-crypto-js');
const { encryptMessage } = require('../utils/simpleCrypto');
const encryptionKey = process.env.ENCRYPTION_KEY;

const defaultFunction = async (req, res) => {
    res.end("A nodeJs application!");
}
const encryptFunction = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }
    try {
        const encryptedMessage = encryptMessage(message);
        return res.status(200).json({ encryptedMessage });

    } catch (error) {
        console.error("internal error:", error);
        return res.status(500).json({ message: "internal server error", error: error.message })
    }
}



module.exports = {
    defaultFunction,
    encryptFunction
}
