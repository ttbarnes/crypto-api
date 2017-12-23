import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import poc from './poc';
import pocBittrex from './pocBittrex';
import pocGdax from './pocGdax';
import { load, update } from './user';

// TODO: get all routes using api.route
// like user/*
// instead of resource middleware

export default ({ config, db }) => {
	let api = Router();

	// api.use('/facets', facets({ config, db }));

	api.use('/poc', poc())

	api.use('/poc/bittrex', pocBittrex());

	api.use('/poc/gdax', pocGdax());

	api.route('/user/:userId')
		.put(update)

	// Load user when API with userId route parameter is hit
	api.param('userId', load);

	return api;
}
