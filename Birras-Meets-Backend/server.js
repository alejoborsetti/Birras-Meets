'use strict'
const cors = require('cors')
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
const nodemailer = require("nodemailer");
// init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors())

app.use('/api', router);

authRoutes(router);
router.get('/', (req, res) => {
  res.send('Hello from home');
});
app.use(router);
app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));

// Appointments

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./appointments/config');
const MongoClient = require('mongodb').MongoClient;

var indexRouter = require('./appointments/routes/index');
var usersRouter = require('./appointments/routes/users');

MongoClient.connect(`mongodb://${config.dbHost}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(client => {
    const db = client.db(config.dbName);
    const collection = db.collection(config.dbCollection);
    app.locals[config.dbCollection] = collection;
  })
  .catch(error => {
    console.log(error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  req.collection = collection;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Nodemailer

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'alejoborsetti@gmail.com',
        pass: 'rfyroeodytwnllze',
    }
  });

  let mailOptions = {
    from: '"Birras Meets"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Reunión de Birras Meets", // Subject line
    html: `<h4>Reunión creada exitosamente.</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
