function setCookies() {
  const name = $('#username').val();
  const area = $('#userarea').val();
  if (name && area) {
    document.cookie = `username=${name}`;
    document.cookie = `userarea=${area}`;
  }
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function showWelcome() {
  const name = getCookie('username');
  const area = getCookie('userarea');
  if (name && area) {
    $('#welcome').html(`Bienvenido, <strong>${name}</strong> (Área: ${area})`);
  }
}

function generateProduct() {
  setCookies();
  const name = $('#productName').val().trim();
  const features = $('#productFeatures').val().trim();
  const audience = $('#productAudience').val().trim();

  if (!name || !features) return alert('Por favor completa el nombre y las características del producto.');

  $('#loading').show();

  const idea = `${name}. Características: ${features}. Público: ${audience}`;

  // Paso 1: Llamar a API externa en Render
  $.ajax({
    url: 'https://product-catalog-api-urhs.onrender.com/generate',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ idea }),
    success: function (imgResponse) {
      const imageUrl = imgResponse.imageUrl;

      $.ajax({
        url: 'https://product-catalog-api-urhs.onrender.com/describe',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ features }),
        success: function (textResponse) {
          const description = textResponse.description;
          saveProduct(name, description, imageUrl);
          renderCatalog();
          $('#loading').hide();
          $('#productName').val('');
          $('#productFeatures').val('');
          $('#productAudience').val('');
        },
        error: function () {
          alert('Error al generar descripción.');
          $('#loading').hide();
        }
      });
    },
    error: function () {
      alert('Error al generar imagen.');
      $('#loading').hide();
    }
  });
}

function saveProduct(name, description, imageUrl) {
  let catalog = JSON.parse(localStorage.getItem('catalog')) || [];
  catalog.push({ id: Date.now(), name, description, imageUrl });
  localStorage.setItem('catalog', JSON.stringify(catalog));

  let count = parseInt(sessionStorage.getItem('productCount') || '0');
  sessionStorage.setItem('productCount', count + 1);
}

function deleteProduct(id) {
  let catalog = JSON.parse(localStorage.getItem('catalog')) || [];
  catalog = catalog.filter(item => item.id !== id);
  localStorage.setItem('catalog', JSON.stringify(catalog));
  renderCatalog();
}

function renderCatalog() {
  const data = JSON.parse(localStorage.getItem('catalog')) || [];
  $('#catalog').html('');
  data.forEach(item => {
    $('#catalog').append(`
      <div class="card">
        <div>
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="${item.name}">
          <p>${item.description}</p>
        </div>
        <div class="card-footer">
          <button onclick="deleteProduct(${item.id})">Eliminar</button>
        </div>
      </div>
    `);
  });
}

$(document).ready(function () {
  showWelcome();
  renderCatalog();
});