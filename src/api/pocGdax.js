import request from 'request';
import resource from 'resource-router-middleware';
import crypto from 'crypto';

// pending gdax account verification
// in order to continue building & testing this

export default () => resource({

  id: 'pocGdax',

  index(req, res) {
    const queryKey = req.query.key;
    const querySecret = req.query.secret;
    const timestamp = Date.now().toString();
    
    // const body = JSON.stringify({
    //   product_id: 'BTC-USD'
    // });

    const method = 'GET';

    const requestPath = '/accounts';

    // create the prehash string by concatenating required parts
    // const what = timestamp + method + requestPath + body;
    const what = timestamp + method + requestPath;

    // create a sha256 hmac with the secret
    const hmac = crypto.createHmac('sha256', queryKey);

    const signature = hmac.update(what).digest('base64');

    const options = {
      headers: {
        'CB-ACCESS-KEY': queryKey,
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-PASSPHRASE': '' // TBC
      }
    };

    return request('https://api.gdax.com/accounts', options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        // var parsedBody = JSON.parse(body);
        // return res.json(parsedBody);
        return res.json(body);
      }
      return res.json({ error: true })
    })
    


  }

});
