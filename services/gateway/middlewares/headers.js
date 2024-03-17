export default function (req, res, next) {
  // Remove header
  res.removeHeader('X-Powered-By');

  // Cors settings
  let origin = req.headers.origin;
  let originString = Array.isArray(req.headers.origin) ? req.headers.origin[0] : req.headers.origin;

  if (global.config.server.allow_origins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', originString);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}