# Music Player Backend

## 🎵 Project Overview

A robust, type-safe backend for a music player application built with TypeScript, Express, and TypeORM.

## 🚀 Features

- RESTful API for Playlist and Song management
- Comprehensive input validation
- SQLite database integration
- TypeScript-powered type safety
- Flexible and extensible design

## 📦 Technology Stack

- **Language**: TypeScript
- **Web Framework**: Express.js
- **ORM**: TypeORM
- **Database**: SQLite
- **Validation**: class-validator
- **Transformation**: class-transformer

## To-Do

1. **CRUD Operations**: Ensure Update and Delete actions are fully implemented and tested for songs and playlists.
2. **Error Handling**: Enhance error handling mechanisms throughout the API.
3. **Performance Optimization**: Optimize database queries and improve performance.
4. **Testing**: Add unit and integration tests to ensure API reliability.
5. **Documentation**: Improve API documentation for better developer understanding.
6. **Refactoring**: Review and refactor code for better readability and maintainability.
7. **Database Management**: Implement migration scripts and version control for database schema changes.

## 🔧 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## 🛠 Installation

1. Clone the repository

```bash
git clone https://github.com/chrismoussounda/music-app-backend.git
cd music-app-backend
```

2. Install dependencies

```bash
npm install
```

## 📜 Available Scripts

- `npm run dev`: Start development server with hot-reloading
- `npm start`: Run production build
- `npm run build`: Compile TypeScript to JavaScript

## 🌐 API Endpoints

### Playlists

- `GET /playlists`: Retrieve all playlists
- `GET /playlists/:id`: Retrieve a specific playlist
- `POST /playlists`: Create a new playlist
- `PATCH /playlists/:id`: Update an existing playlist
- `DELETE /playlists/:id`: Delete a playlist

### Songs

- `GET /songs`: Retrieve all songs
- `GET /songs/:id`: Retrieve a specific song
- `POST /songs`: Create a new song
- `PATCH /songs/:id`: Update an existing song
- `DELETE /songs/:id`: Delete a song

## 🔒 Validation

- Input validation using class-validator
- Strict type checking
- Whitelisting of properties
- Detailed error messages

## 📝 Configuration

- Database configuration in TypeORM
- Environment variables support
- Flexible middleware for request validation

## 🗺 Project Structure

```
src/
├── controllers/
├── dtos/
├── entities/
├── middlewares/
├── routes/
└── types/
```

## 🚧 Future Roadmap

- [ ] User authentication
- [ ] Advanced search and filtering
- [ ] Pagination support
- [ ] More complex relationship management
- [ ] Comprehensive logging
- [ ] Performance Optimization
- [ ] File Upload
- [ ] Cloud storage integration
- [ ] Advanced Analytics
- [ ] Documentation
- [ ] Testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

MIT License

## 🛡️ Error Handling

- Consistent error response format
- HTTP status codes for different scenarios
- Detailed validation error messages

## 📊 Performance

- Efficient database queries
- Minimal overhead validation
- Optimized TypeScript compilation

## 💡 Key Design Principles

- Modularity
- Type safety
- Separation of concerns
- Extensibility

## 📈 Hosting

### Development

- Run in development mode:
  ```bash
  npm run dev
  ```

### Production

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```

### Environment Variables

- `PORT`: Server port (default: 3001)
- `DATABASE_TYPE`: Database type (default: sqlite)
- `DATABASE_URL`: Path to the database (default: ./musicdb.sqlite)
- `NODE_ENV`: Environment mode (development/production)

### Deployment

Can be deployed on any Node.js hosting platform supporting TypeScript
