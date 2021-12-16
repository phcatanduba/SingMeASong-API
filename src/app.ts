import express from 'express';
import cors from 'cors';
import "reflect-metadata"
import connection from './database';
import * as songsControllers from './controllers/songsControllers';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('OK!');
});

app.post('/recommendations', songsControllers.recommend);

app.post('/recommendations/:id/upvote', (req, res) => {
    songsControllers.vote(req, res, 'upvote');
});

app.post('/recommendations/:id/downvote', (req, res) => {
    songsControllers.vote(req, res, 'downvote');
});

app.get('/recommendations/random', songsControllers.random);

app.get('/recommendations/top/:amount', songsControllers.mostScored);

export async function init() {
    await connection()
}

export default app;
