//TODO - remove babel dependencies, or get them working
// Node Modules
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var dotenv = require('dotenv');
// var passport = require('passport');
// var Auth0Strategy = require('passport-auth0');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

var session = require('express-session');
var sess = {
  secret: 'PLEASEDONTSTEALTHISITSVERYIMPORTANT',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

// Postgresql
const { Pool } = require('pg');
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

console.log('Pool created:', pool);

// Local Modules
const { StaticRouter } = require('./static_router');
const { DynamicRouter } = require('./dynamic_router');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  dotenv.config();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Authorization middleware. When used, the
  // Access Token must exist and be verified against
  // the Auth0 JSON Web Key Set
  const jwtCheck = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://bellum.us.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'http://www.mytine.io/',
    issuer: `https://bellum.us.auth0.com/`,
    algorithms: ['RS256']
  });

  // Setup routers - order matters. StaticRouter contains the final, "default", response block
  let dynamicRouter = new DynamicRouter(app, pool, jwtCheck);
  let staticRouter = new StaticRouter(app, pool, jwtCheck);

  app.listen(PORT, function () {
    console.log(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
