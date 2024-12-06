import { Request, Response } from "express";
import { Playlist } from "../entities/Playlist";
import { CreatePlaylistDto } from "../dtos";

export class PlaylistController {
  static async createPlaylist(req: Request, res: Response): Promise<void> {
    try {
      const createPlalistDto = req.body as CreatePlaylistDto;
      const playlist = await Playlist.create({ ...createPlalistDto }).save();
      res.status(201).json(playlist);
    } catch (error) {
      res.status(500).json({ message: "Error creating playlist", error });
    }
  }

  static async getAllPlaylists(req: Request, res: Response): Promise<void> {
    try {
      const playlists = await Playlist.find({ relations: ["songs"] });
      res.json(playlists);
    } catch (error) {
      res.status(500).json({ message: "Error fetching playlists", error });
    }
  }

  static async getPlaylistById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const playlist = await Playlist.findOne({
        where: { id },
        relations: ["songs"],
      });

      if (!playlist) throw new Error("404|Playlist not found");

      res.json(playlist);
    } catch (error: any) {
      const [code, message] = error.message.split("|");
      const isHttpError = code === "404";
      res.status(isHttpError ? 404 : 500).json({
        message: isHttpError ? message : "Error fetching playlist",
        error: isHttpError ? undefined : error,
      });
    }
  }

  static async updatePlaylist(req: Request, res: Response) {
    try {
      let playlist = await Playlist.findOne({
        where: { id: parseInt(req.params.id) },
      });

      if (!playlist) {
        throw new Error("404|Playlist not found");
      }

      Object.assign(playlist, req.body);

      playlist = await playlist.save();

      res.json(playlist);
    } catch (error) {
      res.status(500).json({ message: "Error updating playlist", error });
    }
  }

  static async deletePlaylist(req: Request, res: Response): Promise<void> {
    try {
      const result = await Playlist.delete(req.params.id);

      if (result.affected === 0) {
        throw new Error("404|Playlist not found");
      }

      res.json({ message: "Playlist deleted successfully" });
    } catch (error: any) {
      const [code, message] = error.message.split("|");
      const isHttpError = code === "404";
      res.status(isHttpError ? 404 : 500).json({
        message: isHttpError ? message : "Error deleting playlist",
        error: isHttpError ? undefined : error,
      });
    }
  }
}
