import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import accountRoutes from './routes/account';
import userRoutes from './routes/user';
import recipeRoutes from './routes/recipe';
import commentRoutes from './routes/comment';

const app = express();
const port = 3030;

app.use((req, res, next) => {

    var allowedDomains = ['http://localhost:3030', 'http://127.0.0.1:3030', 'http://localhost:3000', 'http://127.0.0.1:3000'];
    var origin = req.headers.origin;
    if (allowedDomains.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(bodyParser.json());

app.use('/account', accountRoutes);
app.use('/user', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/comment', commentRoutes);

app.get('/', (req, res) => {
    res.send('Recept App API, User, TODO\n');
});

http.createServer(app).listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});