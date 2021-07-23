import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database';
import faker from 'faker';
import * as songFactory from './factories/songFactory';

beforeEach(async () => {
    await connection.query('DELETE FROM songs');
});

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
