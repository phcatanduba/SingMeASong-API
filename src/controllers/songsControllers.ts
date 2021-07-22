import { Request, Response } from 'express';
import * as songsRepositories from '../repositories/songsRepositories';
import * as songsServices from '../services/songsServices';

export async function recommend(req: Request, res: Response) {
    const { name, youtubeLink } = req.body;
    if (!name || !youtubeLink) {
        res.sendStatus(400);
    } else {
        try {
            await songsRepositories.insert(name, youtubeLink);
            res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

export async function vote(req: Request, res: Response, option: string) {
    const id: number = parseInt(req.params.id);
    if (!id) {
        res.sendStatus(400);
    } else {
        try {
            await songsRepositories.vote(id, option);
            res.sendStatus(201);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

export function random(req: Request, res: Response) {
    try {
        const song = songsServices.randomByStatus();

        res.send(song);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
