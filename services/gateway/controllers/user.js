import crypto from 'crypto';
import { createSession } from '../middlewares/authorizations.js';
import * as userQueries from '../queries/userQueries.js';
import { sessions } from '../middlewares/authorizations.js'

export const UserRoleId = {
  ADMIN: 'Admin',
  PARENT: 'Parent',
  TERAPEFT: 'Terapeft'
}

export const registerUser = async (req, res, next) => {
  try {
    const { user_name, password, first_name, last_name, phone, user_role_id } = req.body;
    if (!user_name) {
      return res.status(400).send('Invalid User Name');
    }
    let salt = '';
    let passwordHash = '';
    if (password) {
      salt = crypto.randomBytes(32).toString('hex');
      const sha256 = crypto.createHash('sha256');
      passwordHash = sha256.update(password + salt).digest('hex');
    }
    await userQueries.insertUser(user_name, salt, passwordHash, first_name, last_name, phone, user_role_id)
    return res.status(200).send({
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.toString());
  }
}

export const getUserRole = async (req, res, next) => {
  try {
    const data = await userQueries.getUserRole();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.toString());
  }
}

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await userQueries.getUserByUserName(userName);

    const sha256 = crypto.createHash('sha256');
    const password_hash = sha256.update(password + user.password_salt).digest('hex');
    if (password_hash == user.password_hash) {

      const userData = {
        userName: user.user_name,
        firstName: user.first_name,
        lastName: user.last_name,
        tel: user.tel,
        userRole: user.role_name
      }
      req.session.user = userData;
      const sessionData = req.session;
      await createSession(sessionData);

      res.status(200).json({ message: 'Login successful', userData });
    } else {
      res.status(401).send('Incorrect User name or password')
    }

  } catch (error) {
    if (error.message === 'noUser') {
      return res.status(401).send('Incorrect User name or password')
    }
    console.log(error);
    return res.status(400).send(error.toString());
  }
}

export const whoAmi = async (req, res, next) => {
  // const userName = req.session.user.userName;
  // const user = await userQueries.getUserByUserName(userName);

  try {
    res.status(200).json(req.session.user);
  } catch (error) {
    console.log(error);
    res.status(401).send(error.toString());
  }
}

export const logout = async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    req.session.destroy(err => {
      if (err) {
        res.status(400).json({ message: 'Unable to logout' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
        const existingSessions = sessions.sessions;
        const filterSessions = existingSessions.filter(x => x.id !== sessionId);
        sessions.sessions = filterSessions;
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const data = await userQueries.getAllUsers();
    res.status(200).json(data);

  } catch (error) {
    res.status(400).send(error.toString());

  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id, user_name, first_name, last_name, phone, user_role_id } = req.body;
    if (!id || !user_name) {
      res.status(400).send('Invalid User Name');
    }
    await userQueries.updateUser(id, user_name, first_name, last_name, phone, user_role_id)
    res.status(200).send({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    await userQueries.deleteUser(id);
    return res.status(200).send({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.toString());
  }
}

