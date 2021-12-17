import { getRepository } from "typeorm"
import Song from "../entities/Song"
import axios from 'axios'
import joi from 'joi';

export async function getRandomly() {
    let songs = await getRepository(Song).find()
    let randomIndex = Math.floor(Math.random() * (songs.length))
    
    return songs[randomIndex]
}

export async function hasThisSong(name: string, youtubeLink: string) {
    let song = await getRepository(Song).find( {where: {name, youtubeLink} })
    if (song.length == 1)  {
        return true
    }

    return false
}

export async function mostScored(amount: number) {
    let songs = await getRepository(Song).find({take: 10, order: {score: "DESC"}})
    return songs
}

export async function vote(id: number, option: string) {
    let song = await getRepository(Song).findOne( {where: {id}})
    song.score++
    await getRepository(Song).save(song)
}

export async function hasId(id: number) {
    let song = await getRepository(Song).find( { where: {id} } )
    if (song.length == 1) {
        return true
    }

    return false
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

export async function postATweet(text: string) {
    const promise = axios.post("https://api.twitter.com/2/tweets", {
        text: text
    }, {
        headers: {
        Authorization: process.env.OAuth
        }
    })

    promise.then((e) => {
        console.log("tweetado")
    })

    promise.catch((e) => {
        console.log(e)
    })
}
