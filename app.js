const express = require('express');
const compression = require('compression');
const AppError = require('./utils/appError');
const resourceRouter = require('./routes/resourceRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require ('path')

const globalErrorHandler = require('./controllers/errorController');

const metaRouter = require('./routes/metaRoutes');

const htmlToJson = require('html-to-json');
const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const corsOptions = {
  origin: ['http://localhost:3000', /\.localhost\$/],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
};
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use(cors(corsOptions));

// app.options('*', cors());

app.use(express.json({ limit: '10kb' }));

app.use(compression());

app.use('/api/v1/tags', metaRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/resources', resourceRouter);



app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'))

  app.get('*',(req,res)=>res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html')))
}

app.use(globalErrorHandler);

module.exports = app;
