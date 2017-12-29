import crypto from 'crypto';
import { updateUserKeys } from './user';

// http://lollyrock.com/articles/nodejs-encryption/

function pocKeys(req, res) {

  const algorithm = 'aes-256-ctr';
  const pword = process.env.KEYS_ENCRYPT_SECRET;

  function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, pword)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, pword)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }

  const encrypted = encrypt("hello world");

  const tempNewKeys = {
    "key": "testKey",
    "exchange": "test",
    "secret": "testSecret",
    "userId": "5a45733812dd6707fb580f3e"
  }

  return updateUserKeys(req, res, tempNewKeys);
}

export default pocKeys;
