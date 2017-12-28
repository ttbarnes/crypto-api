import jwt from 'jsonwebtoken';
import User from '../models/user';

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};

export function checkToken(req, res) {
  const token = getToken(req.headers);
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return User.findOne({
      username: decoded.data.username
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ errorCheckingToken: true });
      }
      if (user) {
        const resUserObj = {
          _id: decoded.data._id,
          username: decoded.data.username,
          keys: decoded.data.keys
        };
        return res.status(200).send({ success: true, resUserObj });
      }
      return err;
    });
  }
  return res.status(403).send({ success: false, message: 'No token provided' });
}
