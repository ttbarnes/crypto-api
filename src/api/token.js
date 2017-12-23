import jwt from 'jsonwebtoken';
import User from '../models/user';
const JWT_SECRET = 'asdfafljn12lk3m12lk31io23jdsion12o';

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
    const decoded = jwt.verify(token, JWT_SECRET);
    return User.findOne({
      username: decoded._doc.username
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ errorCheckingToken: true });
      }
      if (user) {
        return res.status(200).send({ success: true });
      }
      return err;
    });
  }
  console.log('---check token doing return...');
  return res.status(403).send({ success: false, message: 'No token provided' });
}
