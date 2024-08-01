const { doEncryption, doDecryption } = require("../utils/cryptoJs");

const defaultFunction = async (req, res) => {
    res.end("A Node.js application!");
};

const encryptFunction = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }
    try {
        const encryptedMessage = doEncryption(message);
        return res.status(201).json({ statusCode: 201, message: "Success", data: encryptedMessage });
    } catch (error) {
        console.error("Internal error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const decryptFunction = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Encrypted text message is required" });
    }
    try {
        const decryptedMessage = doDecryption(text);
        return res.status(200).json({ statusCode: 200, message: "Success", data: decryptedMessage });
    } catch (error) {
        console.error("Internal error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    defaultFunction,
    encryptFunction,
    decryptFunction
};
