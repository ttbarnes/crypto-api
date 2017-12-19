import request from 'request';
import resource from 'resource-router-middleware';
import crypto from 'crypto';

export default () => resource({

  id: 'poc',

  /** GET / - List all entities */
  index({ params }, res) {
    const baseUrl = 'https://api.bitfinex.com'

    const url = '/v1/balances'
    const nonce = Date.now().toString()
    const completeURL = baseUrl + url
    const body = {
      request: url,
      nonce
    }
    const payload = new Buffer(JSON.stringify(body))
      .toString('base64')

    const signature = crypto
      .createHmac('sha384', process.env.BITFINEX_API_SECRET)
      .update(payload)
      .digest('hex')

    const options = {
      url: completeURL,
      headers: {
        'X-BFX-APIKEY': process.env.BITFINEX_API_KEY,
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: JSON.stringify(body)
    }

    return request('https://api.bitfinex.com/v1/balances', options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);
        res.json(parsedBody);
      }
    })
  }

});
