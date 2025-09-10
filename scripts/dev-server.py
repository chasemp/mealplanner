#!/usr/bin/env python3
"""
Development server with auto-reload for MealPlanner
Watches for file changes and restarts the HTTP server automatically
"""

import os
import sys
import time
import signal
import subprocess
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class ReloadHandler(FileSystemEventHandler):
    """Handler for file system events that triggers server reload"""
    
    def __init__(self, server_process_holder):
        self.server_process = server_process_holder
        self.last_reload = 0
        self.reload_delay = 1  # Minimum seconds between reloads
        
    def on_modified(self, event):
        if event.is_directory:
            return
            
        # Only reload for relevant file types
        relevant_extensions = {'.html', '.js', '.css', '.json', '.md'}
        file_path = Path(event.src_path)
        
        if file_path.suffix.lower() in relevant_extensions:
            current_time = time.time()
            if current_time - self.last_reload > self.reload_delay:
                print(f"📝 File changed: {file_path.name}")
                self.restart_server()
                self.last_reload = current_time
    
    def restart_server(self):
        """Restart the HTTP server"""
        if self.server_process['process']:
            print("🔄 Restarting server...")
            self.server_process['process'].terminate()
            try:
                self.server_process['process'].wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.server_process['process'].kill()
        
        # Start new server process
        self.server_process['process'] = subprocess.Popen(
            ['python3', '-m', 'http.server', '8080'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print("✅ Server restarted on http://localhost:8080")

def main():
    """Main function to start the development server with auto-reload"""
    
    # Ensure we're in the project root
    project_root = Path(__file__).parent.parent
    os.chdir(project_root)
    
    print("🚀 Starting MealPlanner Development Server with Auto-Reload")
    print("📂 Watching directory:", project_root.absolute())
    print("🌐 Server URL: http://localhost:8080")
    print("⏹️  Press Ctrl+C to stop")
    print("-" * 50)
    
    # Server process holder (mutable reference)
    server_process = {'process': None}
    
    # Start initial server
    server_process['process'] = subprocess.Popen(
        ['python3', '-m', 'http.server', '8080'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    print("✅ Initial server started")
    
    # Set up file watcher
    event_handler = ReloadHandler(server_process)
    observer = Observer()
    
    # Watch the entire project directory
    observer.schedule(event_handler, str(project_root), recursive=True)
    observer.start()
    
    def signal_handler(sig, frame):
        """Handle Ctrl+C gracefully"""
        print("\n🛑 Shutting down development server...")
        observer.stop()
        if server_process['process']:
            server_process['process'].terminate()
        sys.exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
            
            # Check if server process died unexpectedly
            if server_process['process'] and server_process['process'].poll() is not None:
                print("⚠️  Server process died, restarting...")
                event_handler.restart_server()
                
    except KeyboardInterrupt:
        signal_handler(None, None)
    finally:
        observer.stop()
        observer.join()

if __name__ == "__main__":
    main()
