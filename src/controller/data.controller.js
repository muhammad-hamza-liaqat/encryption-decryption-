const SimpleCrypto = require('simple-crypto-js');
const { encryptMessage, decryptMessage } = require('../utils/simpleCrypto');
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
        return res.status(200).json({ statusCode: 201, message: "success", data: encryptedMessage });

    } catch (error) {
        console.error("internal error:", error);
        return res.status(500).json({ message: "internal server error", error: error.message })
    }
}

const decryptFunction = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "encrypted text message is required" })
    }
    try {
        const decryptedMessage = decryptMessage(text);
        return res.status(200).json({ statusCode: 201, message: "success", data: decryptedMessage });

    } catch (error) {
        console.error("internal error", error);
        return res.status(500).json({ message: "internal server error", error: error.message });
    }

}



module.exports = {
    defaultFunction,
    encryptFunction,
    decryptFunction
}
