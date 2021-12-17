import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Song from '../entities/Song';
import * as songsServices from '../services/songsServices';

interface SongRecommendation {
    name: string;
    youtubeLink: string;
}

export async function recommend(req: Request, res: Response) {
    const { name, youtubeLink }: SongRecommendation = req.body;
    const hasThisSong = await songsServices.hasThisSong(name, youtubeLink);
    const isValid = songsServices.isValid(name, youtubeLink);

    if (!name || !youtubeLink || !isValid) {
        res.sendStatus(400);
    } else if (hasThisSong) {
        res.sendStatus(409);
    } else {
        try {
            await getRepository(Song).insert({name, youtubeLink});
            await songsServices.postATweet(youtubeLink)
            res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

export async function vote(req: Request, res: Response, option: string) {
    const id: number = parseInt(req.params.id);
    const hasId = await songsServices.hasId(id);

    if (!id || hasId) {
        res.sendStatus(400);
    } else {
        try {
            await songsServices.vote(id, option);
            res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

export async function random(req: Request, res: Response) {
    try {
        const song = await songsServices.getRandomly();
        if (!song?.hasOwnProperty('name')) {
            res.sendStatus(404);
        } else {
            res.send(song);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function mostScored(req: Request, res: Response) {
    const amount: number = parseInt(req.params.amount);
    if (!amount) {
        res.sendStatus(400);
    }
    try {
        const result: object[] = await songsServices.mostScored(amount);
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
