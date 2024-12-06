import { Request, Response } from "express";
import { Song } from "../entities/Song";
import { Playlist } from "../entities/Playlist";
import { CreateSongDto } from "../dtos";

export class SongController {
  static async createSong(req: Request, res: Response): Promise<void> {
    try {
      const { playlistId, ...songData } = req.body as CreateSongDto;

      const playlist = await Playlist.findOne({
        where: { id: playlistId },
      });

      if (!playlist) {
        throw new Error("404|Playlist not found");
      }

      const song = Song.create({ ...songData, playlist }).save();

      res.status(201).json(song);
    } catch (error: any) {
      const [code, message] = error.message.split("|");
      const isHttpError = code === "404";
      res.status(isHttpError ? 404 : 500).json({
        message: isHttpError ? message : "Error creating song",
        error: isHttpError ? undefined : error,
      });
    }
  }

  static async getAllSongs(req: Request, res: Response): Promise<void> {
    try {
      const songs = await Song.find({ relations: ["playlist"] });
      res.json(songs);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching songs", error });
    }
  }

  static async getSongById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const song = await Song.findOne({
        where: { id },
        relations: ["playlist"],
      });

      if (!song) {
        throw new Error("404|Song not found");
      }

      res.json(song);
    } catch (error: any) {
      const [code, message] = error.message.split("|");
      const isHttpError = code === "404";
      res.status(isHttpError ? 404 : 500).json({
        message: isHttpError ? message : "Error fetching song",
        error: isHttpError ? undefined : error,
      });
    }
  }

  static async updateSong(req: Request, res: Response): Promise<void> {
    try {
      let song = await Song.findOne({
        where: { id: parseInt(req.params.id) },
      });

      if (!song) {
        throw new Error("404|Song not found");
      }

      Object.assign(song, req.body);
      song = await song.save();

      res.json(song);
    } catch (error: any) {
      const [code, message] = error.message.split("|");
      const isHttpError = code === "404";
      res.status(isHttpError ? 404 : 500).json({
        message: isHttpError ? message : "Error updating song",
        error: isHttpError ? undefined : error,
      });
    }
  }

  static async deleteSong(req: Request, res: Response): Promise<void> {
    try {
      const result = await Song.delete(req.params.id);

      if (result.affected === 0) {
        throw new Error("404|Song not found");
      }

      res.json({ message: "Song deleted successfully" });
    } catch (error: any) {
      const [code, message] = error.message.split("|");
      const isHttpError = code === "404";
      res.status(isHttpError ? 404 : 500).json({
        message: isHttpError ? message : "Error deleting song",
        error: isHttpError ? undefined : error,
      });
    }
  }
}
