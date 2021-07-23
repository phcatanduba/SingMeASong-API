import connection from '../../../src/database';

export async function insert(name: string, youtubeLink: string) {
    await connection.query(
        'INSERT INTO songs (name, "youtubeLink", score) VALUES ($1, $2, 0)',
        [name, youtubeLink]
    );
}
