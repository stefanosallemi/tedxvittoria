// URL della cartella su Google Drive
var folderUrl = 'https://drive.google.com/drive/folders/119nmPQxOtKuEq_cQZTMh2qaFpcQMcR0U';

// Ottenere l'ID della cartella dal URL
var folderId = folderUrl.split('/').pop();

// Ottenere i file nella cartella utilizzando la richiesta AJAX
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.googleapis.com/drive/v3/files?q=%27' + folderId + '%27+in+parents', true);
xhr.setRequestHeader('Authorization', 'Bearer ' + 100474976011654202261); // Assicurati di sostituire ACCESS_TOKEN con un token di accesso valido
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    var files = response.files;
    renderPhotos(files);
  } else if (xhr.readyState === 4) {
    console.error('Errore durante il recupero dei file:', xhr.status);
  }
};
xhr.send();

// Renderizzare le foto nel sito
function renderPhotos(files) {
  var galleryContainer = document.getElementById('gallery'); // ID dell'elemento HTML in cui visualizzare le foto

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var photoId = file.id;
    var photoName = file.name;

    // Creazione dell'elemento immagine
    var imgElement = document.createElement('img');
    imgElement.src = 'https://drive.google.com/uc?export=view&id=' + photoId;
    imgElement.alt = photoName;

    // Aggiunta dell'immagine al contenitore della galleria
    galleryContainer.appendChild(imgElement);
  }
}
