# Development Server with Auto-Reload

This project now includes a custom development server with automatic file watching and server reloading for improved development workflow.

## Features

- **Auto-reload**: Automatically restarts the HTTP server when files change
- **File watching**: Monitors `.html`, `.js`, `.css`, `.json`, and `.md` files
- **Graceful shutdown**: Handles Ctrl+C properly
- **Debounced reloads**: Prevents excessive restarts (1-second minimum between reloads)
- **Process management**: Automatically restarts if the server dies unexpectedly

## Usage

### Quick Start

```bash
# Start the development server with auto-reload
npm run dev:server
```

### Alternative Commands

```bash
# Start development server directly
python3 scripts/dev-server.py

# Start basic HTTP server (no auto-reload)
npm run serve
# or
python3 -m http.server 8080
```

## How It Works

1. **Initial Start**: Launches `python3 -m http.server 8080` in the project root
2. **File Watching**: Uses `watchdog` to monitor file system changes
3. **Smart Reloading**: Only reloads for relevant file types
4. **Process Management**: Gracefully terminates and restarts the server process

## Server Details

- **URL**: http://localhost:8080
- **Port**: 8080 (same as your existing setup)
- **Root Directory**: Project root (serves `index.html` by default)
- **File Types Watched**: `.html`, `.js`, `.css`, `.json`, `.md`

## Development Workflow

1. Start the development server: `npm run dev:server`
2. Open http://localhost:8080 in your browser
3. Edit your files (HTML, JS, CSS, etc.)
4. The server automatically restarts when you save changes
5. Refresh your browser to see the updates

## Stopping the Server

- Press `Ctrl+C` in the terminal where the server is running
- Or kill the process: `pkill -f "dev-server.py"`

## Requirements

- Python 3.9+ (you have 3.9.11 ✅)
- `watchdog` package (automatically installed)

## Troubleshooting

### Server Won't Start
```bash
# Check if port 8080 is already in use
lsof -i :8080

# Kill any existing servers
pkill -f "http.server"
pkill -f "dev-server.py"
```

### Watchdog Not Installed
```bash
python3 -m pip install --user watchdog
```

### Path Issues
The script automatically changes to the project root directory, so it should work from anywhere in the project.

## Integration with Existing Workflow

This development server is designed to work alongside your existing tools:

- **Cache Busting**: Works with your `update-version.cjs` system
- **Testing**: Compatible with Playwright and Vitest
- **Build Process**: Doesn't interfere with Vite or Tailwind CSS builds
- **Deployment**: Uses the same static file structure as your production setup

## Performance Notes

- **Reload Delay**: 1-second minimum between reloads prevents excessive restarts
- **File Filtering**: Only watches relevant file types to reduce overhead
- **Process Cleanup**: Properly terminates processes to prevent resource leaks

## Future Enhancements

Potential improvements for the development server:

- **Browser Auto-Refresh**: Add WebSocket-based browser refresh
- **Build Integration**: Automatically run `npm run version:update` on changes
- **Selective Watching**: Configure which directories/files to watch
- **Hot Module Replacement**: For faster development cycles
