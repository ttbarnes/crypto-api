import resource from 'resource-router-middleware';
import bittrex from 'node-bittrex-api';


// due to bittrex verification delays we have to mock
const MOCK_RESPONSE = {
  "success": true,
  "message": "",
  "result": [
      {
      "Currency": "TEST_COIN",
      "Balance": 0.00000000,
      "Available": 0.00000000,
      "Pending": 0.00000000,
      "CryptoAddress": "DLxcEt3AatMyr2NTatzjsfHNoB9NT62HiF",
      "Requested": false,
      "Uuid": null

    },
    {
      "Currency": "BTC",
      "Balance": 14.21549076,
      "Available": 14.21549076,
      "Pending": 0.00000000,
      "CryptoAddress": "1Mrcdr6715hjda34pdXuLqXcju6qgwHA31",
      "Requested": false,
      "Uuid": null
    }
  ]
};

export default () => resource({

  id: 'pocBittrex',

  index(req, res) {
    const queryKey = req.query.key;
    const querySecret = req.query.secret;

    bittrex.options({
      'apikey': queryKey,
      'apisecret': querySecret
    });

    return bittrex.getbalances((data, err) => {
      if (err) {
        return console.error(err);
      }
      // res.json(data);
      res.json(MOCK_RESPONSE);
    });

  }

});
