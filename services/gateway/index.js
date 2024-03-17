// import httpContext from 'express-http-context';
import express from 'express';
import passport from 'passport';
import headersMiddleware from './middlewares/headers.js';

import config from './services/config.js';
import router from './routes/index.js';
import session from 'express-session';

const app = express();

// Health check
app.get('/health', function (req, res) {
  res.status(200).send();
});

app.use(headersMiddleware);
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
    // cookie: { ...config.session }
  })
);

app.use(express.json());

// app.use(cookieParser('your-secret-key'));
app.use(passport.initialize());
app.use(passport.session());
app.use(router)

app.listen(config.server.port, function () {
  console.log(`Gateway listening on port ${config.server.port}!`);
});

export default app;