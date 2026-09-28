console.log("funciona");
const url = 'https://jsonplaceholder.typicode.com/users';

function peticionFetch() {
  fetch(url)
    .then(response => response.json())
    .then(result => console.log("Resultado Fetch:", result))
    .catch(e => console.log(`Error capturado:  ${e.message}`));
}

async function peticionAsyncAwait() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log("Resultado Async/Await:", result);
  } catch (err) {
    return console.log(`Manejo interno del error. Error original: ${err.message}`);
  }
}


function peticionCallback(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(new Error(`Error de red con status ${xhr.status}`), null);
      }
    }
  };
  
  xhr.send();
}

peticionFetch();

peticionAsyncAwait();

peticionCallback(url, function (err, data) {
  if (err) return console.log(err.message);
  console.log("Resultado Callback:", data);
});