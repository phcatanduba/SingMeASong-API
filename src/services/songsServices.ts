import * as songsRepositories from '../repositories/songsRepositories';
import joi from 'joi';

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

export async function hasId(id: number) {
    const result = await songsRepositories.id(id);
    if (!(result.length === 0)) {
        return false;
    } else {
        return true;
    }
}

export async function hasThisSong(name: string, link: string) {
    const resultName = await songsRepositories.name(name);
    const resultLink = await songsRepositories.link(link);
    const has = resultName.length !== 0 || resultLink.length !== 0;

    return has;
}

export function isValid(name: string, youtubeLink: string) {
    const songSchema = joi.object().keys({
        name: joi.string().required(),
        youtubeLink: joi
            .string()
            .pattern(
                /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
            )
            .required(),
    });
    const { error } = songSchema.validate({ name, youtubeLink });
    if (error) {
        return false;
    } else {
        return true;
    }
}
