const async = require('async');
const express = require('express');
const app = express();
const r = require('rethinkdb');
const bodyParser = require('body-parser');

const config = require(__dirname + '/config.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Single page
app.get('/', function(req, res) {
  let bundleSrc;
  if (config.env === 'development') {
    bundleSrc = 'http://localhost:8081/bundle.js';
  } else {
    bundleSrc = '/dist/bundle.js';
  }
  res.render('index', { bundleSrc });
});

//Route to get docs from DB


//Route to post to DB
app.post('/new', function (req, res, next) {
  const entry = req.body.data.payload;
  entry.createdAt = r.now();
  r.table('entries').insert(entry, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
    if (err) {
      return next(err);
    }
      res.json(result.changes[0].new_val);
  });
});


// Handle any server errors
function handleError(res) {
  return function(error) {
    res.status(500).send({error: error.message});
  }
}

// Store the db connection and start listening on a port.
function startExpress(connection) {
  app._rdbConn = connection;
  app.listen(config.express.port);
  console.log('Listening on port ' + config.express.port);
}

// Conenct to db, create table if need be, start express
async.waterfall([
  function connect(callback) {
    r.connect(config.rethinkdb, callback);
  },
  function createDatabase(connection, callback) {
    //Create the database if needed.
    r.dbList().contains(config.rethinkdb.db).do(function(containsDb) {
      return r.branch(
        containsDb,
        {created: 0},
        r.dbCreate(config.rethinkdb.db)
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createTable(connection, callback) {
    //Create the table if needed.
    r.tableList().contains('entries').do(function(containsTable) {
      return r.branch(
        containsTable,
        {created: 0},
        r.tableCreate('entries')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createIndex(connection, callback) {
    //Create the index if needed.
    r.table('entries').indexList().contains('createdAt').do(function(hasIndex) {
      return r.branch(
        hasIndex,
        {created: 0},
        r.table('entries').indexCreate('createdAt')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function waitForIndex(connection, callback) {
    //Wait for the index to be ready.
    r.table('entries').indexWait('createdAt').run(connection, function(err, result) {
      callback(err, connection);
    });
  }
], function(err, connection) {
  if(err) {
    console.error(err);
    process.exit(1);
    return;
  }

  startExpress(connection);
});
