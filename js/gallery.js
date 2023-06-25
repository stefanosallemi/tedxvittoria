
  // URL della cartella di Google Drive
  var folderUrl = "https://drive.google.com/drive/folders/119nmPQxOtKuEq_cQZTMh2qaFpcQMcR0U";

  // Funzione per ottenere l'elenco delle immagini dalla cartella
  function getImagesFromFolder() {
    // Effettua una richiesta AJAX per ottenere il contenuto della cartella
    var xhr = new XMLHttpRequest();
    xhr.open("GET", folderUrl);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse il contenuto della risposta come HTML
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(xhr.responseText, "text/html");

        // Trova tutti gli elementi <a> che contengono le immagini
        var imageLinks = htmlDoc.querySelectorAll('a[target="_blank"]');

        // Itera attraverso gli elementi e aggiungi le immagini al div dell'immagine
        var imageGallery = document.getElementById("image-gallery");
        for (var i = 0; i < imageLinks.length; i++) {
          var imageSrc = imageLinks[i].href;
          var imgElement = document.createElement("img");
          imgElement.src = imageSrc;
          imageGallery.appendChild(imgElement);
        }
      }
    };
    xhr.send();
  }

  // Chiama la funzione per ottenere le immagini dalla cartella
  getImagesFromFolder();
