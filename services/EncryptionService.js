var crypto = require("crypto");

var EncryptionService = {
    encryptionAlgorithm: 'aes-128-cbc',
    encryptionKey: 'filipicaris',
    IV_LENGTH:16,

    encryptText(plainText) {
        let iv = crypto.randomBytes(this.IV_LENGTH);
        const hash = crypto.createHash("sha1");
        hash.update(this.encryptionKey);
        let key = hash.digest().slice(0, 16);
        let cipher = crypto.createCipheriv(this.encryptionAlgorithm, key, iv);
        return cipher.update(plainText);
    },

    decryptText(encryptedText) {
        let iv = crypto.randomBytes(this.IV_LENGTH);
        const hash = crypto.createHash("sha1");
        hash.update(this.encryptionKey);
        let key = hash.digest().slice(0, 16);
        let decipher = crypto.createDecipheriv(this.encryptionAlgorithm, key, iv);
        return decipher.update(encryptedText);
    },

    createHashMD5(text){
        return crypto.createHash('md5').update(text).digest("hex");
    }
}

module.exports = EncryptionService;