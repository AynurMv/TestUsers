const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const fileMiddleware = require('../middlewares/file');

const router = express.Router();

router.put('/', fileMiddleware.single('photo'), async (req, res) => {
  const { email, name, password, dateOfBirth, sex } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const editingUser = await User.findByPk(req.session.userSession.id);
    editingUser.email = email;
    editingUser.name = name;
    if (req.file?.originalname) editingUser.photo = req.file.originalname;
    editingUser.dateOfBirth = dateOfBirth;
    editingUser.sex = sex;
    editingUser.password = hashedPass;
    await editingUser.save();
    req.session.userSession = {
      id: editingUser.id,
      email: editingUser.email,
      name: editingUser.name,
      photo: editingUser.photo,
      dateOfBirth: editingUser.dateOfBirth,
      sex: editingUser.sex,
    };
    res.json(req.session.userSession);
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/signup', fileMiddleware.single('photo'), async (req, res) => {
  const { email, name, password, dateOfBirth, sex } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        photo: req.file.originalname,
        password: hashedPass,
        dateOfBirth,
        sex,
      },
    });
    if (!created) {
      return res.status(401).send('Email is already in use');
    }
    req.session.userSession = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      photo: newUser.photo,
      dateOfBirth: newUser.dateOfBirth,
      sex: newUser.sex,
    };
    return res.json(req.session.userSession);
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
      req.session.userSession = {
        id: currUser.id,
        email: currUser.email,
        name: currUser.name,
        photo: currUser.photo,
        dateOfBirth: currUser.dateOfBirth,
        sex: currUser.sex,
      };
    }
    res.json(req.session.userSession);
    res.sendStatus(401);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
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
