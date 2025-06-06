# ShoreSquad 🌊

Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

## About

ShoreSquad is a Progressive Web App that mobilizes young people to clean beaches, using weather and maps for easy planning and social features to make eco-action fun and connected.

## Features

- **Real-time Weather Updates** 🌤️
  - Check beach conditions
  - Plan cleanup events around optimal weather
  - Get notifications for ideal cleanup times

- **Interactive Maps** 🗺️
  - Find nearby beach cleanup events
  - Create and share new cleanup locations
  - Track cleaned areas and impact zones

- **Squad Hub** 👥
  - Join or create cleanup crews
  - Connect with eco-warriors
  - Share achievements and impact stats

## Tech Stack

- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- JavaScript (ES6+)
- Progressive Web App (PWA) capabilities
- Service Workers for offline functionality

## Getting Started

1. Clone the repository
```powershell
git clone [your-repo-url]
```

2. Open the project folder
```powershell
cd ShoreSquad
```

3. Launch with Live Server:

   **Option 1: Using VS Code**
   - Install the "Live Server" extension (ritwickdey.liveserver)
   - Right-click on `index.html` and select "Open with Live Server"
   - Your default browser will open automatically at `http://localhost:5500`

   **Option 2: Using NPX**
   ```powershell
   npx live-server . --port=5500
   ```

4. Using the App
   - The site will automatically reload when you make changes
   - To stop the server: 
     - VS Code: Click the "Port: 5500" button in the status bar
     - Terminal: Press `Ctrl+C`
   - For PWA features:
     - Look for the install prompt in your browser
     - Enable notifications when prompted for cleanup alerts
     - Test offline functionality by disabling network in DevTools

## Development

### Project Structure
```
ShoreSquad/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── README.md          # Documentation
├── css/
│   └── styles.css     # Styles
├── js/
│   └── app.js         # Main JavaScript
└── images/            # Icons and images
    ├── icon-192.png   # PWA icon
    └── icon-512.png   # PWA icon
```

### Color Palette
- Primary: `#00A9A5` (Turquoise - representing clean oceans)
- Secondary: `#FF7E54` (Coral - energetic, calls to action)
- Accent: `#FFD449` (Sun Yellow - positive, optimistic)
- Background: `#F0F7F7` (Light Ocean - clean, fresh)
- Text: `#2C3E50` (Deep Blue - readable, professional)

### Development Tips

#### Live Server Usage
- Port: Default is 5500 (configurable)
- Root: Serves from project root directory
- Hot Reload: Automatic on save
- Browser Support: Works with all modern browsers
- Network Access: Available on local network via your IP
- HTTPS: Supports `https://localhost:5500` for PWA testing

#### Debugging
- Use Chrome DevTools for PWA testing
- Check Application tab for Service Worker status
- Use Network tab to test offline functionality
- Lighthouse available for PWA score

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Weather API integration
- [ ] Google Maps integration
- [ ] User authentication
- [ ] Push notifications for events
- [ ] Squad chat features
- [ ] Impact tracking dashboard
- [ ] Social media sharing

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [@yoursocial](https://twitter.com/yoursocial)

Project Link: [https://github.com/yourusername/shoresquad](https://github.com/yourusername/shoresquad)

---

Made with 💙 for cleaner beaches
#   S h o r e S q u a d  
 