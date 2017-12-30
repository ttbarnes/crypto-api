import crypto from 'crypto';
import { updateUserKeys } from './user';

// http://lollyrock.com/articles/nodejs-encryption/

const algorithm = 'aes-256-ctr';
const pword = process.env.KEYS_ENCRYPT_SECRET;

export const decrypt = (str) => {
  var decipher = crypto.createDecipher(algorithm, pword)
  var dec = decipher.update(str, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}

function pocKeys(req, res) {
  // todo: auth check
  function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, pword)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  const encrypted = {
    key: encrypt(req.body.apiKey),
    secret: encrypt(req.body.apiSecret)
  };

  const encrypObj = {
    userId: req.body.userId,
    exchange: req.body.exchange,
    key: encrypted.key,
    secret: encrypted.secret
  };

  return updateUserKeys(req, res, encrypObj);
}

export default pocKeys;
