import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import User from '../models/user';

const config = require('../../config/env');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {

  User.find({ username: req.body.username, password: req.body.username }, function(err, user) {
    if (err) {
      const errorAuth = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
      return next(errorAuth); 
    }
    const token = jwt.sign({
      username: user.username
    }, config.jwtSecret);
      
    return res.json({
      token,
      username: user.username
    });
  
    
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
