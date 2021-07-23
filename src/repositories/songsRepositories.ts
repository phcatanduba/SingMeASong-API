import connection from '../database';

type Song = {
    id: number;
    name: string;
    youtubeLink: string;
    score: number;
}[];

export async function insert(name: string, youtubeLink: string) {
    const result = await connection.query(
        'INSERT INTO songs (name, "youtubeLink", score) VALUES ($1, $2, $3)',
        [name, youtubeLink, 0]
    );
}

export async function vote(id: number, option: string) {
    let result;

    if (option === 'upvote') {
        result = await connection.query(
            'UPDATE songs SET score = score + 1 WHERE id = $1',
            [id]
        );
    } else if (option === 'downvote') {
        result = await connection.query(
            'UPDATE songs SET score = score - 1 WHERE id = $1',
            [id]
        );
        await deleteNegativeScore();
    }
}

export async function randomByStatus(status: string | void): Promise<Song> {
    let result;

    if (status === 'underrated') {
        result = await connection.query('SELECT * FROM songs WHERE score < 11');
    } else if (status === 'overrated') {
        result = await connection.query('SELECT * FROM songs WHERE score > 10');
    } else {
        result = await connection.query('SELECT * FROM songs');
    }
    return result.rows;
}

export async function mostScored(amount: number): Promise<Song> {
    const result = await connection.query(
        'SELECT * FROM songs ORDER BY score DESC LIMIT $1',
        [amount]
    );
    return result.rows;
}

export async function id(id: number) {
    const result = await connection.query('SELECT * FROM songs WHERE id = $1', [
        id,
    ]);

    return result.rows;
}

export async function name(name: string) {
    const result = await connection.query(
        'SELECT * FROM songs WHERE name = $1',
        [name]
    );

    return result.rows;
}

export async function link(youtubeLink: string) {
    const result = await connection.query(
        'SELECT * FROM songs WHERE name = $1',
        [youtubeLink]
    );

    return result.rows;
}

async function deleteNegativeScore() {
    await connection.query('DELETE FROM songs WHERE score = -5');
}
