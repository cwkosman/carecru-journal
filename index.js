const express = require('express');
const app = express();
const r = require('rethinkdb');

const config = require(__dirname + "/config.js");

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Single route
app.get('/', function(req, res) {
  let bundleSrc;
  if (config.env === 'development') {
    bundleSrc = 'http://localhost:8081/bundle.js';
  } else {
    bundleSrc = '/dist/bundle.js';
  }
  res.render('index', { bundleSrc });
});

// Middleware to open/close connection to the database
app.use(createConnection);
app.use(closeConnection);

function createConnection(req, res, next) {
    r.connect(config.rethinkdb).then(function(conn) {
        req._rdbConn = conn;
        next();
    }).error(handleError(res));
}


function closeConnection(req, res, next) {
    req._rdbConn.close();
}

// Handle any server errors
function handleError(res) {
    return function(error) {
        res.status(500).send({error: error.message});
    }
}

//Create tables/indexes then start express
r.connect(config.rethinkdb, function(err, conn) {
  if (err) {
    console.log('Could not open a connection to initialize the database');
    console.log(err.message);
    process.exit(1);
  }

  r.table('entries').indexWait('createdAt').run(conn).then(function(err, result) {
    console.log('Table is available, starting express...');
    startExpress();
  }).error(function(err) {
  // The database/table/index was not available, create them
  r.dbCreate(config.rethinkdb.db).run(conn).finally(function() {
    return r.tableCreate('entries').run(conn)
  }).finally(function() {
    r.table('entries').indexCreate('createdAt').run(conn);
  }).finally(function(result) {
    r.table('entries').indexWait('createdAt').run(conn)
  }).then(function(result) {
    console.log('Table available, starting express...');
    startExpress();
    conn.close();
  }).error(function(err) {
    if (err) {
      console.log('Could not wait for the completion of the indecies');
      console.log(err);
      process.exit(1);
    }
      console.log('Table available, starting express...');
      startExpress();
      conn.close();
    });
  });
});

function startExpress() {
    app.listen(config.express.port);
    console.log(`Listening on port ${config.express.port}`);
}
