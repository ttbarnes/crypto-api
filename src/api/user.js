import User from '../models/user';

// Load user and append to req
export const load = (req, res, next, id) =>
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));

export const create = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  return newUser.save((err) => {
    if (err) {
      return res.status(400).send({ success: false, message: 'Cannot create new user - probably exists' });
    }
    return res.json({ success: true, message: 'Successful created a new user' });
  });
};

export const update = (req, res, next) => {
  const user = req.user;
  user.keys = req.body.keys;
  return user.save()
    .then(saved => res.json(saved))
    .catch(e => res.json({ error: true }));
};
