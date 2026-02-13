# Google Photos Storage Finder

### Overview

This script automates interaction with Google Photos by analyzing images to identify which ones are using storage space in your Google account. It automatically navigates through your photos and logs those that occupy storage (displayed as "Saved (X MB)" instead of just "Saved").

### Features

- **Automated Navigation:** Automatically clicks through images on Google Photos using the "Next Photo" button.
- **Storage Detection:** Identifies images that use storage space versus those that don't.
- **Data Collection:** Collects file names and sizes of images using storage.
- **Console Logging:** Outputs results to the browser's developer console every 20 images.
- **Progress Tracking:** Shows real-time progress with image count and storage status.

### Requirements

- **Browser:** Chrome, Firefox, or any browser that supports Tampermonkey.
- **Tampermonkey:** A userscript manager is required to run this script. Install it from [Tampermonkey's official website](https://www.tampermonkey.net/).

### Installation

1. Install Tampermonkey in your browser.
2. Create a new script in Tampermonkey.
3. Copy and paste the provided script into the editor.
4. Save the script.

### How It Works

The script analyzes the storage information for each photo:

- **✓ OK:** Photos showing just "Saved" without file size (no storage used)
- **⚠️ STORAGE USED:** Photos showing "Saved (X MB/KB/GB)" (storage used)

### Customization

#### Language

The script is written for the **French** version of Google Photos. If your interface is in another language, modify these selectors:

- `aria-label^="Afficher la photo suivante"` → Change to your language's "Show next photo"
- `"Sauvegardé"` → Change to your language's "Saved"
- `"Taille du fichier"` → Change to your language's "File size"

#### Adjustable Parameters

```javascript
const MAX_ATTEMPTS = 5000; // Maximum number of images to process
const DELAY_BETWEEN_PHOTOS = 1500; // Delay in ms (adjust for your internet speed)
const DISPLAY_EVERY = 20; // Show results every X images
```

### Usage

1. Open Google Photos in your browser and navigate to any photo.
2. Open the browser console (F12 or Right-click → Inspect → Console).
3. **Important:** Check "Preserve log" in the console settings to keep all output.
4. The script will start automatically.
5. Watch the console for:
   - Real-time progress updates
   - Storage usage alerts
   - Complete results every 20 images

### Console Commands

- `displayStorageResults()` - Manually display current results at any time
- `imagesWithStorage` - View the complete array of images using storage

### Output Format

The script provides two formats:

1. **Human-readable list:**

   ```
   1. IMG_001.jpg - 5.2 MB
   2. VID_002.mp4 - 12.8 MB
   ```

2. **JSON format** (for easy copying/processing):
   ```json
   [
     {
       "name": "IMG_001.jpg",
       "size": "5.2 MB"
     },
     {
       "name": "VID_002.mp4",
       "size": "12.8 MB"
     }
   ]
   ```

### Example Console Output

```
🔍 Starting search for images using storage...
⏱️  Delay between photos: 1500ms
📊 Displaying list every 20 images
💡 Type 'displayStorageResults()' to view results

✓ Google Photos interface loaded

✓  [1] OK: 20260130_161423.jpg (no storage)
✓  [2] OK: 20260130_120021.mp4 (no storage)
⚠️  [3] STORAGE USED: 20260213_204956.jpg (5.1 MB)
...

╔═══════════════════════════════════════════════════════════╗
║        RESULTS: Images using storage space               ║
╚═══════════════════════════════════════════════════════════╝
Photos analyzed: 20
Total found: 1 image(s) with storage

1. 20260213_204956.jpg - 5.1 MB
```

### Stopping the Script

The script automatically stops when:

- It reaches the last photo (no more "Next" button)
- It processes 5000 images (safety limit)
- You can also manually stop it by reloading the page

### Troubleshooting

**Script doesn't start:**

- Ensure you're on a photo view (not gallery view)
- Check that Tampermonkey is enabled
- Refresh the page

**Missing images:**

- Increase `DELAY_BETWEEN_PHOTOS` if your internet is slow
- Check console for error messages

**Wrong language detected:**

- Update the language-specific selectors as mentioned in Customization

### Notes

- **Console Logging:** Keep the browser console open to see output.
- **Preserve Logs:** Enable "Preserve log" in console settings to keep all data.
- **Performance:** The script includes safety limits to prevent infinite loops.
- **Rate Limiting:** Google Photos may slow down if you process too many images too quickly.

### Privacy & Safety

- This script runs **locally** in your browser
- No data is sent to external servers
- All analysis happens on your computer
- The script only reads DOM elements, it doesn't modify your photos

### Disclaimer

This script is provided as-is without any warranty. Use it at your own risk. While the script only reads information and navigates through photos, automated interactions with websites should always be tested carefully. The author is not responsible for any issues that may arise from using this script.

### License

MIT License - Feel free to modify and share

### Contributing

Issues and pull requests are welcome! Please ensure any modifications maintain compatibility with the latest Google Photos interface.

### Version History

- **v2.1** - Added storage space detection, improved storage detection
- **v1.0** - Initial release with basic navigation
