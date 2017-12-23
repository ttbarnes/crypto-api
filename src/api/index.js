import { version } from '../../package.json';
import { Router } from 'express';
import passport from 'passport';
import poc from './poc';
import pocBittrex from './pocBittrex';
import pocGdax from './pocGdax';
import login from './auth';
import { checkToken } from './token';
import {
	load,
	create,
	update 
} from './user';

// TODO: get all routes using api.route
// like user/*
// instead of resource middleware

export default ({ config, db }) => {
	let api = Router();

	api.use('/poc', poc())

	api.use('/poc/bittrex', pocBittrex());

	api.use('/poc/gdax', pocGdax());

	// POST create new user
	api.route('/user')
		.post(create);

	// PUT update user
	api.route('/user/:userId')
		.put(passport.authenticate('jwt', { session: false }), (req, res, next) => {
			update(req, res, next);
		});

	// PUT user auth/token check
	api.route('/auth')
		.post(checkToken);

	// POST user login
	api.route('/auth/login')
		.post(login);

	// load user when route param is hit
	api.param('userId', load);

	return api;
}
