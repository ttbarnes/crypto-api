import { version } from '../../package.json';
import { Router } from 'express';
import passport from 'passport';
import poc from './poc';
import pocBittrex from './pocBittrex';
import pocGdax from './pocGdax';
import login from './auth';
import { checkToken } from './token';
import {
	create,
	update
} from './user';

// TODO: get all routes using api.route
// like user/*
// instead of resource middleware

export default ({ config, db }) => {
	let api = Router();

	// get balances
	api.use('/poc', poc())

  // get balances
	api.use('/poc/bittrex', pocBittrex());

	// get balances
	api.use('/poc/gdax', pocGdax());

	// POST create new user
	api.route('/user')
		.post(create);

	// PUT update user
	api.route('/user/:userId')
		.put(passport.authenticate('jwt', { session: false }), (req, res, next) => {
			update(req, res, next);
		});

	// POST user auth/token check, returns user data
	api.route('/auth')
		.post(checkToken);

	// POST user login
	api.route('/auth/login')
		.post(login);

	return api;
}
