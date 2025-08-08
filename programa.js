// Crear el mapa
const mapa = L.map('mapa').setView([4.5981, -74.0760], 15);

// Agregar capa base
const capaBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});
capaBase.addTo(mapa);

// Cargar el archivo GPX
const ruta = new L.GPX("gpx/ruta.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        endIconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
    }
}).on('loaded', function(e) {
    mapa.fitBounds(e.target.getBounds());
}).addTo(mapa);

// Marcadores con imágenes georreferenciadas
const imagenes = [
    {
        lat: 4.5981,
        lon: -74.0760,
        archivo: "imagenes/plaza_bolivar.jpg",
        descripcion: "Plaza de Bolívar, Bogotá"
    },
    // Puedes agregar más imágenes aquí
];

// Agregar marcadores al mapa
imagenes.forEach(img => {
    const marcador = L.marker([img.lat, img.lon]).addTo(mapa);
    marcador.bindPopup(`
        <strong>${img.descripcion}</strong><br/>
        <img src="${img.archivo}" alt="${img.descripcion}" />
    `);
});

// Control de escala
L.control.scale().addTo(mapa);
