// ==UserScript==
// @name         Search images
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Search the DOM for an element and click a button based on what it finds
// @author       matqueme
// @match        https://photos.google.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  //not the best way but the easier to dev
  //it display in the console dev (don't forget to keep the console log active in parameter)
  const elementsTrouves = [];

  function rechercherEtClicker() {

    const bouton = document.querySelector('[aria-label^="Afficher la photo suivante"]') //change the aria-label if it's not in french
    if (
      document.querySelector('[aria-label^="Nom du fichier"]').textContent ==
      "" //Add last image name
    ) {
      console.log(elementsTrouves)
      return
    } else {
      const element = document.querySelector('[aria-label^="Taille du fichier"]')
      if (element) {       
        elementsTrouves.push(
          document.querySelector('[aria-label^="Nom du fichier"]').textContent,
        );
        console.log(elementsTrouves)
      } 
      if (bouton) {
        bouton.click()
        
        setTimeout(() => {
          rechercherEtClicker();
        }, 1250); // Adjust delay according to your network

      }
    }
  }

  window.addEventListener("load", rechercherEtClicker);
})();
