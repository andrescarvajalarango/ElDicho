const departments = [
  { code: 'ANT', name: 'Antioquia', lat: 6.2518, lng: -75.5636, color: '#0ea5e9' },
  { code: 'ATL', name: 'Atlántico', lat: 10.9639, lng: -74.7964, color: '#22c55e' },
  { code: 'BOL', name: 'Bolívar', lat: 10.3997, lng: -75.5144, color: '#f59e0b' },
  { code: 'DC', name: 'Bogotá D.C.', lat: 4.711, lng: -74.0721, color: '#6366f1' },
  { code: 'MAG', name: 'Magdalena', lat: 11.2408, lng: -74.199, color: '#a855f7' },
  { code: 'VAL', name: 'Valle del Cauca', lat: 3.4516, lng: -76.532, color: '#06b6d4' },
  { code: 'CAU', name: 'Cauca', lat: 2.4448, lng: -76.6147, color: '#ef4444' },
  { code: 'NAR', name: 'Nariño', lat: 1.2059, lng: -77.2859, color: '#8b5cf6' },
  { code: 'SAN', name: 'Santander', lat: 7.1254, lng: -73.1198, color: '#84cc16' },
  { code: 'CES', name: 'Cesar', lat: 10.4764, lng: -73.2532, color: '#fb7185' }
];

const initialProverbs = [
  {
    id: crypto.randomUUID(),
    departmentCode: 'ANT',
    text: 'El que tiene tienda que la atienda.',
    author: 'Abuela paisa',
    tags: ['trabajo', 'responsabilidad']
  },
  {
    id: crypto.randomUUID(),
    departmentCode: 'VAL',
    text: 'Camarón que se duerme se lo lleva la corriente.',
    author: 'Tíos en Cali',
    tags: ['advertencia', 'tiempo']
  },
  {
    id: crypto.randomUUID(),
    departmentCode: 'DC',
    text: 'No hay mal que por bien no venga.',
    author: 'Vecinos bogotanos',
    tags: ['optimismo']
  },
  {
    id: crypto.randomUUID(),
    departmentCode: 'ATL',
    text: 'El que no oye consejo no llega a viejo.',
    author: 'Tía barranquillera',
    tags: ['familia', 'sabiduría']
  },
  {
    id: crypto.randomUUID(),
    departmentCode: 'SAN',
    text: "A cada guaricha le llega su arepa e' huevo.",
    author: 'Santandereano orgulloso',
    tags: ['humor', 'amor']
  },
  {
    id: crypto.randomUUID(),
    departmentCode: 'NAR',
    text: 'Donde manda capitán no manda marinero.',
    author: 'Familia de Pasto',
    tags: ['jerarquía', 'trabajo']
  },
  {
    id: crypto.randomUUID(),
    departmentCode: 'MAG',
    text: 'Al que madruga se le regala la brisa de la Sierra.',
    author: 'Samario',
    tags: ['amanecer', 'costa']
  }
];

let proverbs = [...initialProverbs];
let selectedDepartment = null;
let markers = [];

const map = L.map('map').setView([4.5, -74.1], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function drawMarkers() {
  markers.forEach((m) => m.remove());
  markers = departments.map((dept) => {
    const marker = L.circleMarker([dept.lat, dept.lng], {
      radius: selectedDepartment === dept.code ? 12 : 9,
      color: dept.color,
      weight: selectedDepartment === dept.code ? 4 : 2,
      fillColor: dept.color,
      fillOpacity: 0.8
    })
      .addTo(map)
      .bindPopup(`<strong>${dept.name}</strong>`)
      .on('click', () => selectDepartment(dept.code));
    return marker;
  });
}

function renderLegend() {
  const legend = document.getElementById('departmentLegend');
  legend.innerHTML = '';
  departments.forEach((dept) => {
    const button = document.createElement('button');
    button.innerHTML = `<span class="dot" style="background:${dept.color}"></span>${dept.name}`;
    if (selectedDepartment === dept.code) button.classList.add('active');
    button.addEventListener('click', () => selectDepartment(dept.code));
    legend.appendChild(button);
  });
}

function renderDepartmentSelect() {
  const select = document.getElementById('departmentSelect');
  select.innerHTML = '<option value="">Selecciona un departamento</option>';
  departments.forEach((dept) => {
    const option = document.createElement('option');
    option.value = dept.code;
    option.textContent = dept.name;
    select.appendChild(option);
  });
}

function renderProverbs() {
  const list = document.getElementById('proverbList');
  list.innerHTML = '';
  const filtered = selectedDepartment
    ? proverbs.filter((p) => p.departmentCode === selectedDepartment)
    : proverbs;

  const title = document.getElementById('feedTitle');
  const departmentName = departments.find((d) => d.code === selectedDepartment)?.name;
  title.textContent = selectedDepartment
    ? `Refranes de ${departmentName}`
    : 'Refranes de todo Colombia';

  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Aún no hay refranes publicados para esta región. ¡Sé el primero en compartir uno!';
    empty.className = 'help';
    list.appendChild(empty);
    return;
  }

  filtered.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card';

    const header = document.createElement('div');
    header.className = 'card-header';
    const deptName = departments.find((d) => d.code === p.departmentCode)?.name || 'Colombia';
    header.innerHTML = `<span>${deptName}</span><span>${p.author || 'Anónimo'}</span>`;

    const text = document.createElement('h3');
    text.textContent = p.text;

    const tags = document.createElement('div');
    tags.className = 'tag-list';
    p.tags.forEach((tag) => {
      const badge = document.createElement('span');
      badge.className = 'tag';
      badge.textContent = `#${tag}`;
      tags.appendChild(badge);
    });

    card.appendChild(header);
    card.appendChild(text);
    card.appendChild(tags);
    list.appendChild(card);
  });
}

function selectDepartment(code) {
  selectedDepartment = code;
  drawMarkers();
  renderLegend();
  renderProverbs();
  document.getElementById('clearFilter').style.display = 'inline-flex';
}

function clearFilter() {
  selectedDepartment = null;
  drawMarkers();
  renderLegend();
  renderProverbs();
  document.getElementById('clearFilter').style.display = 'none';
}

document.getElementById('clearFilter').addEventListener('click', clearFilter);

function handleForm() {
  const form = document.getElementById('proverbForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const textEl = document.getElementById('textInput');
    const authorEl = document.getElementById('authorInput');
    const departmentEl = document.getElementById('departmentSelect');
    const tagsEl = document.getElementById('tagsInput');

    const text = textEl.value.trim();
    const author = authorEl.value.trim();
    const departmentCode = departmentEl.value;
    const tagsRaw = tagsEl.value;

    if (!departmentCode || !text) return;

    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProverb = {
      id: crypto.randomUUID(),
      departmentCode,
      text,
      author: author || 'Anónimo',
      tags: tags.length ? tags : ['popular']
    };

    proverbs = [newProverb, ...proverbs];
    renderProverbs();
    form.reset();
    departmentEl.value = '';
  });
}

renderDepartmentSelect();
renderLegend();
renderProverbs();
drawMarkers();
handleForm();
