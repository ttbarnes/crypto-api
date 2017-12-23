import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import poc from './poc';
import pocBittrex from './pocBittrex';
import pocGdax from './pocGdax';
import user from './user';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.use('/poc', poc());

	api.use('/poc/bittrex', pocBittrex());

	api.use('/poc/gdax', pocGdax());

	api.use('/user', user());

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
