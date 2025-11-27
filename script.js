const map = L.map('map').setView([4.711, -74.0721], 6.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const sayings = [
  {
    text: 'El que madruga, Dios lo ayuda.',
    location: [4.711, -74.0721],
    place: 'Bogotá',
  },
  {
    text: 'Camarón que se duerme se lo lleva la corriente.',
    location: [10.9685, -74.7813],
    place: 'Barranquilla',
  },
  {
    text: 'El que no arriesga un huevo no saca un pollo.',
    location: [6.2442, -75.5812],
    place: 'Medellín',
  },
  {
    text: 'Aquí no se da papaya.',
    location: [3.4516, -76.532],
    place: 'Cali',
  },
];

sayings.forEach(({ text, location, place }) => {
  L.marker(location).addTo(map).bindPopup(`<strong>${place}</strong><br>${text}`);
});
