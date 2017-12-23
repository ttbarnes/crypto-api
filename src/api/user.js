import request from 'request';
import resource from 'resource-router-middleware';

export default () => resource({

  id: 'user',

  /** POST / - Create a new user */
  create({ body }, res) {
    console.log('user create... ', body);
    // const newUser = new User({
    //   username: req.body.username,
    //   password: req.body.password
    // });
    // return newUser.save((err) => {
    //   if (err) {
    //     res.status(400).send({ success: false, message: 'Error creating new user' });
    //   }
    //   res.json({ success: true, message: 'Successful created a new user' });
    // });

  },

});
