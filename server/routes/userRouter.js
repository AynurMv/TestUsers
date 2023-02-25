const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const fileMiddleware = require('../middlewares/file');

const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.session?.userId;
  res.json({ userId });
});

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
    if (compare) {
      req.session.userId = currUser.id;
      req.session.userName = currUser.name;
      req.session.userSession = currUser.email;
      res.json({ name: currUser.name });
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
