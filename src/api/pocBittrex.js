import request from 'request';
import resource from 'resource-router-middleware';
import bittrex from 'node-bittrex-api';


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
      res.json(data);
    });

  }

});
