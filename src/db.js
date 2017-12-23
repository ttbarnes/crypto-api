require('dotenv').config();
import mongoose from 'mongoose';

Promise = require('bluebird'); // eslint-disable-line
mongoose.Promise = Promise; // eslint-disable-line

const DB_URL = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@ds131137.mlab.com:31137/crypto-dev`

export default callback => {
	mongoose.connect(DB_URL, {
			useMongoClient: true,
			server: { socketOptions: { keepAlive: 1 } }
	});
	mongoose.connection.on('error', () => {
		throw new Error('Unable to connect to database.');
	});
	callback();
}
