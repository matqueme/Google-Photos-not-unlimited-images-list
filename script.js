// ==UserScript==
// @name        Google Photos - Find images using storage
// @namespace   http://tampermonkey.net/
// @version     2.1
// @description Find images that use storage space
// @author      matqueme
// @match       https://photos.google.com/*
// @grant       none
// ==/UserScript==

(function () {
    "use strict";

    const imagesWithStorage = [];
    let attempts = 0;
    const MAX_ATTEMPTS = 5000; // Safety limit
    const DELAY_BETWEEN_PHOTOS = 1500; // ms
    const DISPLAY_EVERY = 20; // Display every 20 images

    function extractFileName() {
        // Search for the file name
        const fileNameElements = document.querySelectorAll('.R9U8ab');
        for (let elem of fileNameElements) {
            const text = elem.textContent.trim();
            if (text.match(/\.(jpg|jpeg|png|mp4|gif|webp)$/i)) {
                return text;
            }
        }
        return null;
    }

    function checkStorage() {
        // Search for "Saved" element with file size
        const savedElements = document.querySelectorAll('.R9U8ab');
        
        for (let elem of savedElements) {
            const text = elem.textContent.trim();
            
            // Check if it's "Saved (X MB)" or "Saved (X KB)"
            if (text.match(/^Sauvegardé\s*\([\d,]+\s*(Mo|Ko|Go)\)$/i)) {
                return {
                    uses: true,
                    size: text.match(/\((.*?)\)/)[1]
                };
            }
            
            // Check if it's just "Saved" without size
            if (text === "Sauvegardé") {
                // Verify there's no size in the spans
                const parent = elem.closest('.rCexAf');
                if (parent) {
                    const spans = parent.querySelectorAll('.sprMUb');
                    for (let span of spans) {
                        if (span.getAttribute('aria-label')?.includes('Taille du fichier')) {
                            return {
                                uses: true,
                                size: span.textContent.trim()
                            };
                        }
                    }
                }
                
                // No size found = no storage used
                return { uses: false };
            }
        }
        
        return null;
    }

    function searchAndClick() {
        attempts++;
        
        if (attempts > MAX_ATTEMPTS) {
            console.log("=== END: Maximum number of attempts reached ===");
            displayResults();
            return;
        }

        // Extract file name
        const fileName = extractFileName();
        
        if (!fileName) {
            console.log(`[${attempts}] File name not found, moving to next...`);
            clickNext();
            return;
        }

        // Check storage
        const storageInfo = checkStorage();
        
        if (!storageInfo) {
            console.log(`[${attempts}] ${fileName} - Storage info not found`);
            clickNext();
            return;
        }

        if (storageInfo.uses) {
            // This image uses storage space!
            if (!imagesWithStorage.find(img => img.name === fileName)) {
                imagesWithStorage.push({
                    name: fileName,
                    size: storageInfo.size
                });
                console.log(`⚠️  [${attempts}] STORAGE USED: ${fileName} (${storageInfo.size})`);
            }
        } else {
            console.log(`✓  [${attempts}] OK: ${fileName} (no storage)`);
        }

        // Display list every 20 images (even if empty)
        if (attempts % DISPLAY_EVERY === 0) {
            displayResults();
        }

        clickNext();
    }

    function clickNext() {
        const button = document.querySelector('[aria-label^="Afficher la photo suivante"]');
        
        if (button) {
            button.click();
            setTimeout(searchAndClick, DELAY_BETWEEN_PHOTOS);
        } else {
            console.log("=== END: No more next button ===");
            displayResults();
        }
    }

    function displayResults() {
        console.log("\n");
        console.log("╔═══════════════════════════════════════════════════════════╗");
        console.log("║        RESULTS: Images using storage space               ║");
        console.log("╚═══════════════════════════════════════════════════════════╝");
        console.log(`Photos analyzed: ${attempts}`);
        console.log(`Total found: ${imagesWithStorage.length} image(s) with storage\n`);
        
        if (imagesWithStorage.length > 0) {
            imagesWithStorage.forEach((img, index) => {
                console.log(`${index + 1}. ${img.name} - ${img.size}`);
            });
            
            console.log("\n--- To copy the list (JSON format) ---");
            console.log(JSON.stringify(imagesWithStorage, null, 2));
        } else {
            console.log("✓ No images using storage for now!");
        }
        console.log("\n");
    }

    function start() {
        console.log("🔍 Starting search for images using storage...");
        console.log("⏱️  Delay between photos: " + DELAY_BETWEEN_PHOTOS + "ms");
        console.log("📊 Displaying list every " + DISPLAY_EVERY + " images");
        console.log("Press Ctrl+C in console to stop\n");
        
        const observer = new MutationObserver((mutations, obs) => {
            const firstImage = document.querySelector('.R9U8ab');
            if (firstImage) {
                obs.disconnect();
                console.log("✓ Google Photos interface loaded");
                setTimeout(searchAndClick, 2000);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Command to manually display results
    window.displayStorageResults = displayResults;
    console.log("💡 Type 'displayStorageResults()' to view results");

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
