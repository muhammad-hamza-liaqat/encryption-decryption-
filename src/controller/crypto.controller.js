const { encryptObject, decryptObject } = require("../utils/cryptoJs");

const defaultFunction = async (req, res) => {
    res.end("A Node.js application!");
};

const encryptFunction = async (req, res) => {
    const { data } = req.body;
    if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'Data object is required.' });
    }
    try {
        console.log(data)
        const encryptedData = encryptObject(data);
        console.log(encryptedData)
        return res.status(201).json({ statusCode: 201, message: "Success", data: encryptedData });
    } catch (error) {
        console.error("Internal error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const decryptFunction = async (req, res) => {
    const { data } = req.body;
    if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: "Encrypted data object is required" });
    }
    try {
        console.log(data)
        const decryptedData = decryptObject(data);
        console.log(decryptedData)

        return res.status(200).json({ statusCode: 200, message: "Success", data: decryptedData });
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
