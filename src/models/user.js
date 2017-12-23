import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema; // eslint-disable-line no-unused-vars

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * Methods
 */
UserSchema.pre('save', function preSave(next){
  const user = this;
  if (!user) return next();
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
});

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
