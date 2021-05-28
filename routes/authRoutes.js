const express = require("express");
const authController = require('../controllers/authController.js')

const Router = express.Router();

Router.get('/signup', authController.signup_get);

Router.post('/signup', authController.signup_post);

Router.get('/login', authController.login_get);

Router.post('/login', authController.login_post);

Router.get('/logout', authController.logout_get);

module.exports = Router;