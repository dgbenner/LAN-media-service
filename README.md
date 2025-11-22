# DIY Media Server

A from-scratch implementation of a local network media server, built to understand how media streaming and DLNA protocols work under the hood. Think Plex or Jellyfin, but educational and customizable.

## Project Goal

Build a media server that runs on a local computer and streams video content to Apple TV using standard protocols (DLNA/UPnP). The focus is on learning how media servers work by implementing core functionality yourself, with Jellyfin as a reference for comparison.

## Why Build This?

- **Learn networking**: Local network discovery, HTTP streaming, protocol implementation
- **Understand media servers**: How do Plex/Jellyfin actually work?
- **Full control**: Customize organization, metadata, and features exactly how you want
- **Portfolio piece**: Demonstrates systems programming, networking, and API integration

## Features (Planned)

### Phase 1: Core Functionality
- [x] Project setup and planning
- [ ] File system scanner (recursively find video files)
- [ ] Basic HTTP server for file streaming
- [ ] Simple web interface for browsing library
- [ ] Local network access from other devices

### Phase 2: Media Library
- [ ] Metadata fetching (TMDB/OMDB API integration)
- [ ] Database for library management (SQLite)
- [ ] Poster and artwork downloading
- [ ] Movie/TV show organization

### Phase 3: Apple TV Integration
- [ ] DLNA/UPnP server implementation
- [ ] Network discovery/announcement
- [ ] Test with Infuse or Swiftfin on Apple TV
- [ ] Subtitle support

### Phase 4: Advanced Features (Maybe)
- [ ] Transcoding (convert formats on-the-fly)
- [ ] Multiple user profiles
- [ ] Watch history and resume playback
- [ ] Mobile web interface

## Architecture

```
┌─────────────────┐
│   Your Computer │
│                 │
│  ┌───────────┐  │
│  │  Media    │  │
│  │  Server   │  │
│  │           │  │
│  │ • Scanner │  │
│  │ • Metadata│  │
│  │ • DLNA    │  │
│  │ • Stream  │  │
│  └─────┬─────┘  │
└────────┼────────┘
         │
    Local Network
         │
┌────────┼────────┐
│   Apple TV      │
│                 │
│  ┌───────────┐  │
│  │  Infuse   │  │
│  │    or     │  │
│  │ Swiftfin  │  │
│  └───────────┘  │
└─────────────────┘
```

## Tech Stack (Proposed)

**Backend Options:**
- **Node.js + Express**: Great ecosystem for streaming, good DLNA libraries available
- **Python + Flask**: Excellent file handling, easy metadata scraping
- **Go**: Performance-focused, great for media streaming

**Key Libraries to Explore:**
- DLNA/UPnP: `upnp-mediaserver` (Node), `minidlna` concepts
- Metadata: TMDB API, OMDB API
- Video processing: `ffmpeg` (for transcoding if needed)
- Database: SQLite for simplicity

**Client:**
- Use existing apps (Infuse, Swiftfin) on Apple TV
- Web interface for computer/mobile browser

## How DLNA/UPnP Works (Learning Notes)

DLNA allows devices to discover and stream media over a local network:

1. **SSDP Discovery**: Server broadcasts its presence via multicast
2. **Device Description**: Client requests server capabilities (XML)
3. **Content Directory**: Server provides browsable media hierarchy
4. **Streaming**: Client requests media via HTTP URLs

Your server needs to:
- Implement SSDP for network discovery
- Serve device/service descriptions (XML)
- Provide a content directory service
- Stream media files over HTTP

## Getting Started

### Prerequisites
```bash
# Node.js version (if using Node)
node --version  # 18+ recommended

# Or Python version (if using Python)
python --version  # 3.9+ recommended
```

### Installation
```bash
# Clone the repo
git clone https://github.com/yourusername/diy-media-server.git
cd diy-media-server

# Install dependencies
npm install  # or pip install -r requirements.txt

# Configure media directories
cp config.example.json config.json
# Edit config.json to point to your media folders
```

### Running
```bash
npm start  # or python server.py

# Server will be available at:
# - Web UI: http://localhost:8096
# - DLNA: Discoverable on local network
```

## Project Structure (Proposed)

```
diy-media-server/
├── src/
│   ├── scanner/          # File system scanning
│   ├── metadata/         # TMDB/OMDB integration
│   ├── database/         # SQLite operations
│   ├── dlna/            # DLNA/UPnP implementation
│   ├── streaming/       # HTTP media streaming
│   └── server.js        # Main entry point
├── web/                 # Web interface
│   ├── index.html
│   └── styles.css
├── config.json          # Media paths, API keys
├── package.json
└── README.md
```

## Fallback: Jellyfin Setup

If building from scratch becomes overwhelming, Jellyfin is an excellent open-source alternative:

### Quick Jellyfin Setup
1. Download from [jellyfin.org](https://jellyfin.org/)
2. Install and run server
3. Point to media directories
4. Install Infuse or Swiftfin on Apple TV
5. Connect to server via local IP

**Why Jellyfin is Good Reference:**
- Open source - you can read the code
- Battle-tested DLNA implementation
- Shows what "production-ready" looks like
- Free alternative to Plex

## Learning Resources

**DLNA/UPnP Protocol:**
- [DLNA Overview](https://www.dlna.org/)
- [UPnP Device Architecture](http://upnp.org/specs/arch/UPnP-arch-DeviceArchitecture-v2.0.pdf)

**Media Streaming:**
- [HTTP Live Streaming (HLS) Basics](https://developer.apple.com/streaming/)
- FFmpeg documentation for transcoding

**APIs:**
- [TMDB API](https://developers.themoviedb.org/3) - Movie/TV metadata
- [OMDB API](http://www.omdbapi.com/) - Alternative metadata source

**Similar Projects to Study:**
- [Jellyfin](https://github.com/jellyfin/jellyfin) - Full-featured, study DLNA implementation
- [Streama](https://github.com/streamaserver/streama) - Simpler architecture
- [Dim](https://github.com/Dusk-Labs/dim) - Modern take in Rust

## Apple TV Client Options

You don't need to build a tvOS app! Use these existing apps:

**Infuse** (Recommended)
- Free tier works great
- Beautiful interface
- Best DLNA support
- Available on App Store

**Swiftfin**
- Official Jellyfin client
- Free and open source
- Works with any DLNA server
- Actively developed

**VLC**
- Classic option
- Works but less polished
- Good for testing

## Development Roadmap

### Milestone 1: Basic Streaming (Week 1-2)
- HTTP server serving video files
- File scanner finding media
- Web interface listing files
- Test: Can play video in browser

### Milestone 2: Metadata (Week 3-4)
- TMDB API integration
- Database for storing library
- Poster downloading
- Test: Library looks nice with covers

### Milestone 3: DLNA (Week 5-6)
- SSDP discovery implementation
- UPnP service descriptions
- Content directory service
- Test: Infuse can find and play from server

### Milestone 4: Polish (Week 7-8)
- Subtitle support
- Better organization
- Error handling
- Documentation

## Contributing

This is a learning project, but contributions welcome! Especially:
- Documentation improvements
- Bug fixes
- Protocol implementation help
- Testing on different devices

## License

MIT License - use this code however you want for learning.

## Acknowledgments

- Jellyfin team for showing what's possible
- DLNA/UPnP specs for the protocol foundation
- TMDB for free metadata API

---

**Status**: 🚧 In Development - Currently in planning phase

**Questions?** Open an issue or check the [wiki](wiki) for more detailed guides.
