import * as songsRepositories from '../repositories/songsRepositories';

export async function randomByStatus() {
    let result: object[];
    if (Math.random() > 0.7) {
        result = await songsRepositories.randomByStatus('underrated');
    } else {
        result = await songsRepositories.randomByStatus('overrated');
    }
    if (result.length === 0) {
        result = await songsRepositories.randomByStatus();
    }
    return random(result);
}

function random(songs: object[]) {
    const index = Math.floor(Math.random() * songs.length);
    return songs[index];
}
