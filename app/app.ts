import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
require('dotenv').config();

//Express
const app = express();
app.use(helmet());
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const mongodb_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/';

const router = require('./routes/');
app.use('/', router);

app.listen(port);
console.log('listen on port ' + port);

//MongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const options = {
	useUnifiedTopology : true,
	useNewUrlParser : true
}
mongoose.connect(`${mongodb_url}asset_manager`, options);
mongoose.connection.on('error', function(err: any) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});