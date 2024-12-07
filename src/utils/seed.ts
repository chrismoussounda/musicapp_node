import { DataSource } from 'typeorm';
import { Playlist } from '../entities/Playlist';
import { Song } from '../entities/Song';
import { datasource } from '../data-source';

export async function seedDatabase() {
  if (process.env.NODE_ENV === 'production') return;
  await datasource.synchronize(true);
  // const existingPlaylists = await Playlist.count();
  // if (existingPlaylists > 0) return;
  // await Playlist.delete({});

  // Create Playlists
  const chillPlaylist = new Playlist();
  chillPlaylist.title = 'Chill Vibes';
  chillPlaylist.description = 'Relaxing tracks to unwind';
  // chillPlaylist.coverUrl = "https://example.com/chill-playlist.jpg";

  const partyPlaylist = new Playlist();
  partyPlaylist.title = 'Party Hits';
  partyPlaylist.description = 'Get the party started';
  // partyPlaylist.coverUrl = "https://example.com/party-playlist.jpg";

  // Chill Playlist Songs
  const chillSongs = [
    {
      title: 'Sunset Melody',
      artist: 'Ambient Waves',
      album: 'Tranquil Horizons',
      duration: 240,
      // url: "https://example.com/sunset-melody.mp3",
      // coverUrl: "https://example.com/sunset-melody-cover.jpg"
    },
    {
      title: 'Ocean Breeze',
      artist: 'Coastal Sounds',
      album: 'Relaxation',
      duration: 210,
      // url: "https://example.com/ocean-breeze.mp3",
      // coverUrl: "https://example.com/ocean-breeze-cover.jpg"
    },
    {
      title: 'Mountain Whispers',
      artist: "Nature's Symphony",
      album: 'Calm Echoes',
      duration: 255,
      // url: "https://example.com/mountain-whispers.mp3",
      // coverUrl: "https://example.com/mountain-whispers-cover.jpg"
    },
    {
      title: 'Zen Garden',
      artist: 'Meditative Tones',
      album: 'Inner Peace',
      duration: 280,
      // url: "https://example.com/zen-garden.mp3",
      // coverUrl: "https://example.com/zen-garden-cover.jpg"
    },
    {
      title: 'Soft Rainfall',
      artist: 'Ambient Echoes',
      album: 'Natural Sounds',
      duration: 225,
      // url: "https://example.com/soft-rainfall.mp3",
      // coverUrl: "https://example.com/soft-rainfall-cover.jpg"
    },
    {
      title: 'Moonlight Serenade',
      artist: 'Night Melodies',
      album: 'Evening Calm',
      duration: 265,
      // url: "https://example.com/moonlight-serenade.mp3",
      // coverUrl: "https://example.com/moonlight-serenade-cover.jpg"
    },
  ];

  // Party Playlist Songs
  const partySongs = [
    {
      title: 'Dance Floor Anthem',
      artist: 'Electric Beats',
      album: 'Party Starters',
      duration: 192,
      // url: "https://example.com/dance-floor-anthem.mp3",
      // coverUrl: "https://example.com/dance-floor-anthem-cover.jpg"
    },
    {
      title: 'Neon Lights',
      artist: 'Synth Waves',
      album: 'Night Pulse',
      duration: 210,
      // url: "https://example.com/neon-lights.mp3",
      // coverUrl: "https://example.com/neon-lights-cover.jpg"
    },
    {
      title: 'Bass Drop',
      artist: 'Rhythm Kings',
      album: 'Club Bangers',
      duration: 185,
      // url: "https://example.com/bass-drop.mp3",
      // coverUrl: "https://example.com/bass-drop-cover.jpg"
    },
    {
      title: 'Midnight Groove',
      artist: 'Urban Beats',
      album: 'Street Sounds',
      duration: 220,
      // url: "https://example.com/midnight-groove.mp3",
      // coverUrl: "https://example.com/midnight-groove-cover.jpg"
    },
    {
      title: 'Electric Fever',
      artist: 'Techno Tribe',
      album: 'Rave Culture',
      duration: 198,
      // url: "https://example.com/electric-fever.mp3",
      // coverUrl: "https://example.com/electric-fever-cover.jpg"
    },
    {
      title: 'Party All Night',
      artist: 'Disco Fever',
      album: 'Non-Stop Dance',
      duration: 235,
      // url: "https://example.com/party-all-night.mp3",
      // coverUrl: "https://example.com/party-all-night-cover.jpg"
    },
  ];

  // Create and save songs for Chill Playlist
  const chillPlaylistSongs = chillSongs.map((songData) => {
    const song = new Song();
    Object.assign(song, songData);
    return song;
  });

  // Create and save songs for Party Playlist
  const partyPlaylistSongs = partySongs.map((songData) => {
    const song = new Song();
    Object.assign(song, songData);
    return song;
  });

  // Save playlists and songs
  const songs = await Song.save([...chillPlaylistSongs, ...partyPlaylistSongs]);

  // Randomly select 6 songs from the existing songs
  const randomSongs = songs.sort(() => Math.random() - 0.5).slice(0, 6);

  // Add the random songs to the playlists
  chillPlaylist.songs = randomSongs.slice(0, 3);
  partyPlaylist.songs = randomSongs.slice(3, 6);

  await Playlist.save([chillPlaylist, partyPlaylist]);

  console.log('Database seeded successfully!');
}
