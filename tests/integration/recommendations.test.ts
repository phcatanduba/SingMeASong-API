import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database';
import faker from 'faker';
import * as songFactory from './factories/songFactory';

beforeEach(async () => {
    await connection.query('TRUNCATE songs RESTART IDENTITY');
});

afterAll(async () => {
    connection.end();
});

/*-------------------------------------------------------------------------------------------------*/

describe('POST /recommendations', () => {
    it('should answer with status 201', async () => {
        const response = await supertest(app).post('/recommendations').send({
            name: faker.name.title(),
            youtubeLink: 'https://www.youtube.com/watch?v=RjC8qDkLET8',
        });
        expect(response.status).toEqual(201);
    });
});

describe('POST /recommendations', () => {
    it('should answer with status 400', async () => {
        const response = await supertest(app).post('/recommendations').send({
            name: faker.name.title(),
            youtubeLink: 'https://www.google.com/',
        });
        expect(response.status).toEqual(400);
    });
});

describe('POST /recommendations', () => {
    it('should answer with status 409', async () => {
        await songFactory.insert(
            faker.name.title(),
            'https://www.youtube.com/watch?v=RjC8qDkLET8'
        );
        const response = await supertest(app).post('/recommendations').send({
            name: faker.name.title(),
            youtubeLink: 'https://www.youtube.com/watch?v=RjC8qDkLET8',
        });
        expect(response.status).toEqual(409);
    });
});

/*-------------------------------------------------------------------------------------------------*/

describe('POST /recommendations/:id/upvote', () => {
    it('should answer with status 201', async () => {
        await songFactory.insert(
            faker.name.title(),
            'https://www.youtube.com/watch?v=RjC8qDkLET8'
        );
        const response = await supertest(app).post('/recommendations/1/upvote');
        expect(response.status).toEqual(201);
    });
});

describe('POST /recommendations/:id/upvote', () => {
    it('should answer with status 400', async () => {
        const response = await supertest(app).post('/recommendations/1/upvote');
        expect(response.status).toEqual(400);
    });
});

/*-------------------------------------------------------------------------------------------------*/

describe('POST /recommendations/:id/downvote', () => {
    it('should answer with status 201', async () => {
        await songFactory.insert(
            faker.name.title(),
            'https://www.youtube.com/watch?v=RjC8qDkLET8'
        );
        const response = await supertest(app).post(
            '/recommendations/1/downvote'
        );
        expect(response.status).toEqual(201);
    });
});

describe('POST /recommendations/:id/downvote', () => {
    it('should answer with status 400', async () => {
        const response = await supertest(app).post(
            '/recommendations/1/downvote'
        );
        expect(response.status).toEqual(400);
    });
});

/*-------------------------------------------------------------------------------------------------*/

describe('GET /recommendations/random', () => {
    it('should answer with status an object', async () => {
        await songFactory.insert(
            faker.name.title(),
            'https://www.youtube.com/watch?v=RjC8qDkLET8'
        );
        const response = await supertest(app).get('/recommendations/random');
        const bool =
            response.body.hasOwnProperty('id') &&
            response.body.hasOwnProperty('name') &&
            response.body.hasOwnProperty('youtubeLink') &&
            response.body.hasOwnProperty('score');
        expect(bool).toEqual(true);
    });
});

describe('GET /recommendations/random', () => {
    it('should answer with status 404', async () => {
        const response = await supertest(app).get('/recommendations/random');
        expect(response.status).toEqual(404);
    });
});

/*-------------------------------------------------------------------------------------------------*/

describe('GET /recommendations/top/:amount', () => {
    it('should answer with status an object[]', async () => {
        await songFactory.insert(
            faker.name.title(),
            'https://www.youtube.com/watch?v=RjC8qDkLET8'
        );
        const response = await supertest(app).get('/recommendations/top/2');
        const bool =
            response.body[0].hasOwnProperty('id') &&
            response.body[0].hasOwnProperty('name') &&
            response.body[0].hasOwnProperty('youtubeLink') &&
            response.body[0].hasOwnProperty('score');
        expect(bool).toEqual(true);
    });
});

describe('GET /recommendations/top/:amount', () => {
    it('should answer with a void array', async () => {
        const response = await supertest(app).get('/recommendations/top/1');
        expect(response.body.length).toEqual(0);
    });
});
