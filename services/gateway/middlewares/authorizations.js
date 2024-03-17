import { UserRoleId } from "../controllers/user.js";

export const sessions = {
  sessions: []
}

export const createSession = async sessionData => {
  const newSessionsArr = [...sessions.sessions];
  newSessionsArr.push({
    id: sessionData.id,
    user: sessionData.user
  });
  sessions.sessions = newSessionsArr;
};

export const checkSession = (req, res, next) => {
  const sessionId = req.session.id;
  const existingSessions = sessions.sessions;
  const sessionFilter = existingSessions.find(session => session.id === sessionId);

  if (sessionFilter) {
    req.session.user = sessionFilter.user;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorised' });
  }
};

export const authorizedRoles = (authorizedRoles) => {
  return function (req, res, next) {
    if (!req.session.user) {
      if (req.method == 'OPTIONS') {
        next();
      } else {
        res.status(403).json({ message: 'Unauthorised' });
      }
    } else {
      const userRole = req.session.user.userRole;
      if (userRole == UserRoleId.ADMIN) {
        next()
      } else {
        const canAccess = authorizedRoles.indexOf(userRole) !== -1;
        if (canAccess)
          next();
        else
          res.status(403).json({ message: 'Unauthorised' });

        // throw new Error();
      }
    }
  }
}
