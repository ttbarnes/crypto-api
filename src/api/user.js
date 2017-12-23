import resource from 'resource-router-middleware';
import User from '../models/user';

export default () => resource({

  id: 'user',

  /** POST / - Create a new user */
  create({ body }, res) {
    const newUser = new User({
      username: body.username,
      password: body.password
    });
    return newUser.save((err) => {
      if (err) {
        return res.status(400).send({ success: false, message: 'Cannot create new user - probably exists' });
      }
      return res.json({ success: true, message: 'Successful created a new user' });
    });
  },

});
