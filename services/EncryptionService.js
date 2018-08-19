var crypto = require("crypto");

var EncryptionService = {
    encryptionAlgorithm: 'aes-256-ctr',
    encryptionKey: 'filipicaris',

    encryptText(plainText) {
        var cipher = crypto.createCipher(encryptionAlgorithm, encryptionKey)
        var encryptedText = cipher.update(plainText, 'utf8', 'hex')
        encryptedText += cipher.final('hex');
        return encryptedText;
    },

    decryptPass(encryptedText) {
        var decipher = crypto.createDecipher(encryptionAlgorithm, encryptionKey)
        var plainText = decipher.update(encryptedText, 'hex', 'utf8')
        plainText += decipher.final('utf8');
        return plainText;
    }
}

module.exports = EncryptionService;