import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import accountRoutes from './routes/account';
import userRoutes from './routes/user';
import recipeRoutes from './routes/recipe';

const app = express();
const port = 3030;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET, POST, DELETE"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/account', accountRoutes);
app.use('/user', userRoutes);
app.use('/recipe', recipeRoutes);

app.get('/', (req, res) => {
	res.send('Recept App API, User, TODO\n');
});

http.createServer(app).listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});