const { User } = require('./../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const fs = require('fs');

// const User = db.user;

const sequelize = require('sequelize');
const transporter = require('../helper/Transporter');

const generateToken = async (result) => {
  let payload = {
    id: result?.id,
    role_id: result?.role_id,
  };

  return jwt.sign(payload, 'tweensta', {
    expiresIn: '1h',
  });
};

// const generateTable = async (req, res) => {
//   User.sync({ alter: true });
//   res.send();
// };

const getUser = async (email = '', username = '') => {
  return await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });

    console.log('test===>', req.user);

    if (!user) throw { message: 'user not found!', code: 400 };
    return res.status(200).send({
      success: true,
      message: 'get user success',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const userCreate = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log(req.body.username);

    // if (!username || !email || !password || !confirmPassword) throw { message: 'Fill all data', code: 400 };

    // Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number.
    // if (!password.match(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) throw { message: 'Pasword must be more than 8 characters', code: 400 };

    const isEmailExist = await getUser(email, username);

    if (isEmailExist) throw { message: 'username or email is already exists', code: 400 };

    if (password.length < 8) throw { message: 'Pasword must be more than 8 characters', code: 400 };

    if (password.search(/\d/) == -1) throw { message: 'Password at least have 1 number', code: 400 };

    if (password.search(/[A-Z]/) == -1) throw { message: 'Password at least have one uppercase char', code: 400 };

    if (password.search(/[!@#$%^&*]/) == -1) throw { message: 'Password at least have 1 special char (@,!,#, etc).', code: 400 };

    if (password != confirmPassword) throw { message: "Pasword doesn't match", code: 400 };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(role);
    let newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const result = await getUser(newUser.email, newUser.username);

    req.params.username = result.username;

    next();
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const sendVerifLink = async (req, res) => {
  try {
    const { username } = req.params;

    const result = await getUser('', username);
    console.log(result);
    if (result.verified) throw { message: 'Account Verified', code: 400 };

    const token = await generateToken(result);

    const data = fs.readFileSync('./email/emailRegistration.html', 'utf-8');
    //  async (err, data) => {
    const tempCompile = await Handlebars.compile(data);
    const tempResult = tempCompile({
      username: result.username,
      email: result.email,
      code: result.activationCode,
      link: `http://localhost:3000/activation?token=${token}`,
    });

    // if (result) {
    await transporter.sendMail({
      sender: 'sosmed',
      to: 'raymondchrisandy@gmail.com',
      subject: 'Verify Your Account',
      html: tempResult,
    });
    // }
    // result = avoidPassword(result);
    return res.status(201).send({
      success: true,
      message: 'Register Success! Please Check Your Email',
      data: result,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) throw { message: 'Fill all data', code: 400 };

    let result = await getUser(usernameOrEmail, usernameOrEmail);

    if (!result) throw { message: 'Invalid Credentials', code: 400 };
    console.log(usernameOrEmail, password, result);

    const isUserExists = await bcrypt.compare(password, result.password);

    if (!isUserExists) {
      //   const updateSuspend = await User.increment({ suspendCounter: 1 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

      //   console.log(updateSuspend[0][1], 'hello');

      //   result = await getUser(usernameOrEmail, usernameOrEmail);

      throw { message: 'Invalid Credentials', code: 400 };
    } else {
      const token = await generateToken(result);

      //   const updateSuspend = await User.update({ suspendCounter: 0 }, { where: { [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] } });

      //   result = await getUser(usernameOrEmail, usernameOrEmail);

      const { password, createdAt, updatedAt, ...showResult } = result.dataValues;

      return res.status(200).send({
        success: true,
        message: 'Login Success',
        data: showResult,
        token: token,
      });
    }
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const userId = req.user.id;

    let result = await User.findByPk(userId);

    if (!result) throw { message: 'Invalid Credentials', code: 400 };

    await User.update(
      {
        verified: true,
      },
      {
        where: {
          email: result.email,
        },
      }
    );

    result = await User.findByPk(req.user.id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });

    return res.status(200).send({
      success: true,
      message: 'User Verified',
      data: result,
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  userCreate,
  userLogin,
  getUserById,
  verifyUser,
  sendVerifLink,
};
