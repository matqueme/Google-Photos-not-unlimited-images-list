### Overview
The script is designed to automate interaction with Google Photos by searching the DOM for specific elements and automatically clicking buttons based on the search results. This script was developed to streamline the process of navigating through images and recording specific information (like file names) without manual intervention.

### Features
- **Automated Navigation:** Automatically clicks through images on Google Photos using the "Next Photo" button.
- **Data Extraction:** Collects and logs the file names of the images it processes.
- **Console Logging:** Outputs the collected file names to the browser's developer console.

### Requirements
- **Browser:** Chrome, Firefox, or any other browser that supports Tampermonkey.
- **Tampermonkey:** A userscript manager is required to run this script. It can be installed from [Tampermonkey's official website](https://www.tampermonkey.net/).

### Installation
1. Install Tampermonkey in your browser.
2. Create a new script in Tampermonkey.
3. Copy and paste the provided script into the editor.
4. Save the script.

### Customization
- **Language:** The script is written assuming the interface is in French. If your Google Photos interface is in another language, you may need to modify the `aria-label` attributes in the script to match the language used on your interface.
- **Delay Adjustment:** The delay between actions is set to 1250 milliseconds. This can be adjusted in the `setTimeout()` function to better fit your internet speed or system performance.
- **Change your last image name** The last image name need to be insert to check when stop the code and logging the last array with all the names of the files.

### Usage
1. Open Google Photos in your browser.
2. Start the Tampermonkey script.
3. Watch the console (F12 or right-click and select "Inspect" > "Console") for the logged file names as the script navigates through the images.

### Notes
- **Console Logging:** Ensure that the browser console is open to see the output. The script does not provide any on-page UI or alerts.
- **Error Handling:** If the script encounters an issue (e.g., an element is not found), it will log the `elementsTrouves` array and stop.

### Disclaimer
This script is provided as-is without any warranty. Use it at your own risk. Be mindful that automating interactions with websites can sometimes lead to unexpected results, so always test the script in a controlled environment before using it broadly.
