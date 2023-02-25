const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const fileMiddleware = require('../middlewares/file');

const router = express.Router();

router.post('/signup', fileMiddleware.single('photo'), async (req, res) => {
  const { email, name, password, dateOfBirth, sex } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name,
      photo: req.file.originalname,
      password: hashedPass,
      dateOfBirth,
      sex,
    });
    req.session.userSession = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      photo: newUser.photo,
      dateOfBirth: newUser.dateOfBirth,
      sex: newUser.sex,
    };
    res.json(req.session.userSession);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const currUser = await User.findOne({ where: { email } });
    const compare = await bcrypt.compare(password, currUser.password);
    console.log(currUser, compare);
    if (compare) {
      req.session.userSession = {
        id: currUser.id,
        email: currUser.email,
        name: currUser.name,
        photo: currUser.photo,
        dateOfBirth: currUser.dateOfBirth,
        sex: currUser.sex,
      };
      res.json(req.session.userSession);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
