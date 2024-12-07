import { Router } from "express";
import { PlaylistController } from "../controllers/PlaylistController";
import { SongController } from "../controllers/SongController";
import { validateBody } from "../middlewares/validateBody";
import {
  CreatePlaylistDto,
  CreateSongDto,
  UpdatePlaylistDto,
  UpdateSongDto,
} from "../dtos";

const router = Router();

// Playlist Routes
router.post(
  "/playlists",
  validateBody(CreatePlaylistDto),
  PlaylistController.createPlaylist
);
router.get("/playlists", PlaylistController.getAllPlaylists);
router.get("/playlists/:id([0-9]+)", PlaylistController.getPlaylistById);
router.patch(
  "/playlists/:id([0-9]+)",
  validateBody(UpdatePlaylistDto),
  PlaylistController.updatePlaylist
);
router.delete("/playlists/:id([0-9]+)", PlaylistController.deletePlaylist);

// Song Routes
router.post("/songs", validateBody(CreateSongDto), SongController.createSong);
router.get("/songs", SongController.getAllSongs);
router.get("/songs/:id([0-9]+)", SongController.getSongById);
router.patch(
  "/songs/:id([0-9]+)",
  validateBody(UpdateSongDto),
  SongController.updateSong
);
router.delete("/songs/:id([0-9]+)", SongController.deleteSong);

export default router;
