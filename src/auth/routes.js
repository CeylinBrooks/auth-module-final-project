'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');


// ========================= Routes ========================

authRouter.post('/signup/new', (req, res) => {
  res.render('../../views/pages/credentials/signup.ejs');
});

authRouter.post('/signup', async (req, res, next) => {
    console.log('THIS IS THE SERVER SIDE OBJECT', req.body);
    try {
    console.log('its getting interesting==============', req.body);
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.cookie("token", output.token);
    res.status(201).json(output.user);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin/new', (req, res) => {
  res.render('../../views/pages/credentials/signin.ejs');
});


authRouter.post("/signin", basicAuth, (req, res, next) => {

  const user = {
    user: req.user,
    token: req.user.token,
  };

  res.cookie("token", user.token);
  res.status(200).json(user.user);
});

// test if cookie is getting sent thu req.cookies
authRouter.get('/cookies',(req,res)=>{
  let x = req.cookies;
  res.status(200).send(x);
})


authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {

    const users = await User.find({});
    const list = users.map((user) => user.username);
    res.status(200).json(list);
  }
);

module.exports = authRouter;
