import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { TestService } from '../services/TestService';
import { TestMongoService } from '../services/TestMongoService';
const app = express();
app.use(helmet());
app.use(cors());

const router = express.Router();

router.get('/helloWorld', (req, res) => {
	res.status(200).send({ message: 'Hello, world' });
});

router.get('/test', (req, res, next) => {
	const service = new TestService();
	service
		.test()
		.then(result => res.status(200).send(result))
		.catch(next);
});

router.get('/test/mongo/:user', (req, res, next) => {
	const { user } = req.params;
	const service = new TestMongoService();

	service
		.run(user)
		.then(result => res.status(200).send(result))
		.catch(next);
});

//404 Not Found
app.use((req, res) => {
	res.status(404);
	res.render('error', {
	  param: {
		status: 404,
		message: 'not found'
	  },
	});
});

module.exports = router;