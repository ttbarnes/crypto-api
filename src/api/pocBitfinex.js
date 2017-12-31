import request from 'request';
import resource from 'resource-router-middleware';
import crypto from 'crypto';

const BITFINEX_BASE_URL = 'https://api.bitfinex.com';
const BITFINEX_BALANCES_URL = '/v1/balances';

export default () => resource({

  id: 'pocBitfinex',

  /** GET / - List all entities */
  index(req, res) {
    const queryKey = req.query.key;
    const querySecret = req.query.secret;

    const nonce = Date.now().toString()
    const completeURL = BITFINEX_BASE_URL + BITFINEX_BALANCES_URL;
    const body = {
      request: BITFINEX_BALANCES_URL,
      nonce
    };
    const payload = new Buffer(JSON.stringify(body))
      .toString('base64')

    const signature = crypto
      .createHmac('sha384', querySecret)
      .update(payload)
      .digest('hex')

    const options = {
      url: completeURL,
      headers: {
        'X-BFX-APIKEY': queryKey,
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: JSON.stringify(body)
    }
    return request(BITFINEX_BASE_URL + BITFINEX_BALANCES_URL, options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);
        return res.json(parsedBody);
      }
    })
  }

});
