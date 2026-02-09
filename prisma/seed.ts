import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
const adapter = new PrismaLibSql({
  url: `file:${dbPath}`,
});
const prisma = new PrismaClient({ adapter });

const DEPARTAMENTOS = [
  { code: "AMA", name: "Amazonas", region: "Amazonia" },
  { code: "ANT", name: "Antioquia", region: "Andina" },
  { code: "ARA", name: "Arauca", region: "Orinoquia" },
  { code: "ATL", name: "Atlantico", region: "Caribe" },
  { code: "BOL", name: "Bolivar", region: "Caribe" },
  { code: "BOY", name: "Boyaca", region: "Andina" },
  { code: "CAL", name: "Caldas", region: "Andina" },
  { code: "CAQ", name: "Caqueta", region: "Amazonia" },
  { code: "CAS", name: "Casanare", region: "Orinoquia" },
  { code: "CAU", name: "Cauca", region: "Andina" },
  { code: "CES", name: "Cesar", region: "Caribe" },
  { code: "CHO", name: "Choco", region: "Pacifica" },
  { code: "COR", name: "Cordoba", region: "Caribe" },
  { code: "CUN", name: "Cundinamarca", region: "Andina" },
  { code: "GUA", name: "Guainia", region: "Amazonia" },
  { code: "GUV", name: "Guaviare", region: "Amazonia" },
  { code: "HUI", name: "Huila", region: "Andina" },
  { code: "LAG", name: "La Guajira", region: "Caribe" },
  { code: "MAG", name: "Magdalena", region: "Caribe" },
  { code: "MET", name: "Meta", region: "Orinoquia" },
  { code: "NAR", name: "Narino", region: "Andina" },
  { code: "NSA", name: "Norte de Santander", region: "Andina" },
  { code: "PUT", name: "Putumayo", region: "Amazonia" },
  { code: "QUI", name: "Quindio", region: "Andina" },
  { code: "RIS", name: "Risaralda", region: "Andina" },
  { code: "SAP", name: "San Andres y Providencia", region: "Insular" },
  { code: "SAN", name: "Santander", region: "Andina" },
  { code: "SUC", name: "Sucre", region: "Caribe" },
  { code: "TOL", name: "Tolima", region: "Andina" },
  { code: "VAC", name: "Valle del Cauca", region: "Andina" },
  { code: "VAU", name: "Vaupes", region: "Amazonia" },
  { code: "VID", name: "Vichada", region: "Orinoquia" },
  { code: "BOG", name: "Bogota D.C.", region: "Andina" },
];

const USERS = [
  { username: "juancho_paisa", name: "Juan Carlos Gomez", bio: "Amante de la cultura antioquena", region: "Antioquia" },
  { username: "la_costena", name: "Maria del Carmen", bio: "Barranquillera de corazon", region: "Atlantico" },
  { username: "el_cachaco", name: "Andres Felipe Rojas", bio: "Bogotano orgulloso", region: "Bogota D.C." },
  { username: "la_valluna", name: "Carolina Valencia", bio: "Cali es Cali, lo demas es loma", region: "Valle del Cauca" },
  { username: "el_santandereano", name: "Pedro Luis Mantilla", bio: "De Bucaramanga pal mundo", region: "Santander" },
  { username: "la_opita", name: "Luz Dary Trujillo", bio: "Del Huila con sabor", region: "Huila" },
  { username: "el_llanero", name: "Jorge Eliecer Parra", bio: "De los llanos orientales", region: "Meta" },
  { username: "la_narinense", name: "Sandra Patricia Jurado", bio: "Pastusa de nacimiento", region: "Narino" },
];

const DICHOS = [
  { text: "A papaya puesta, papaya partida", meaning: "Si das la oportunidad, alguien la va a aprovechar", deptCode: "ANT", userIdx: 0, author: "Tradicion oral antioquena" },
  { text: "El que no arriesga un huevo, no tiene un pollo", meaning: "Hay que arriesgarse para lograr cosas grandes", deptCode: "ANT", userIdx: 0 },
  { text: "Mas vale pajaro en mano que cien volando", meaning: "Es mejor asegurar lo que ya tienes que perseguir lo incierto", deptCode: "ANT", userIdx: 0, author: "Refran popular" },
  { text: "El vivo vive del bobo y el bobo de su trabajo", meaning: "Los astutos se aprovechan de los ingenuos", deptCode: "ANT", userIdx: 0 },
  { text: "El que nacio pa martillo, del cielo le caen los clavos", meaning: "Cada quien tiene su destino", deptCode: "ATL", userIdx: 1 },
  { text: "Camaron que se duerme se lo lleva la corriente", meaning: "El que se descuida pierde oportunidades", deptCode: "ATL", userIdx: 1, author: "Tradicion caribena" },
  { text: "No hay mal que dure cien anos ni cuerpo que lo resista", meaning: "Todo problema tiene fin, nada es eterno", deptCode: "BOL", userIdx: 1 },
  { text: "Mas sabe el diablo por viejo que por diablo", meaning: "La experiencia da mas sabiduria que la astucia", deptCode: "BOG", userIdx: 2 },
  { text: "En tierra de ciegos, el tuerto es rey", meaning: "Entre personas sin conocimiento, el que sabe un poco destaca", deptCode: "BOG", userIdx: 2, author: "Refran popular" },
  { text: "El que mucho abarca poco aprieta", meaning: "Quien intenta hacer demasiadas cosas a la vez no hace bien ninguna", deptCode: "CUN", userIdx: 2 },
  { text: "A falta de pan, buenas son tortas", meaning: "Cuando no se puede tener lo ideal, hay que conformarse con lo que hay", deptCode: "BOG", userIdx: 2 },
  { text: "Cali es Cali, lo demas es loma", meaning: "Expresion de orgullo caleno que resalta la ciudad como la mejor", deptCode: "VAC", userIdx: 3, author: "Dicho caleno" },
  { text: "El que no llora no mama", meaning: "Hay que pedir y expresarse para obtener lo que se quiere", deptCode: "VAC", userIdx: 3 },
  { text: "Donde manda capitan no manda marinero", meaning: "Hay que respetar la autoridad de quien esta a cargo", deptCode: "VAC", userIdx: 3 },
  { text: "Al que le van a dar le guardan", meaning: "Lo que es para uno nadie se lo quita", deptCode: "SAN", userIdx: 4 },
  { text: "Perro que ladra no muerde", meaning: "El que amenaza mucho rara vez cumple sus amenazas", deptCode: "SAN", userIdx: 4, author: "Tradicion oral" },
  { text: "Cria cuervos y te sacaran los ojos", meaning: "Si educas mal a alguien, podria volverse en tu contra", deptCode: "SAN", userIdx: 4 },
  { text: "Al que madruga Dios le ayuda", meaning: "El esfuerzo y la diligencia traen buenos resultados", deptCode: "HUI", userIdx: 5, author: "Refran popular" },
  { text: "Arbol que nace torcido jamas su tronco endereza", meaning: "Las malas costumbres adquiridas desde temprano son dificiles de corregir", deptCode: "HUI", userIdx: 5 },
  { text: "El que tiene tienda que la atienda y sino que la venda", meaning: "Hay que ser responsable con lo que se tiene", deptCode: "MET", userIdx: 6, author: "Dicho llanero" },
  { text: "No por mucho madrugar amanece mas temprano", meaning: "La prisa no adelanta los resultados", deptCode: "MET", userIdx: 6 },
  { text: "De gota en gota se llena la copa", meaning: "Con constancia y paciencia se logran grandes cosas", deptCode: "NAR", userIdx: 7 },
  { text: "Zapatero a tus zapatos", meaning: "Cada quien debe dedicarse a lo que sabe hacer", deptCode: "NAR", userIdx: 7, author: "Refran popular" },
  { text: "Agua que no has de beber, dejala correr", meaning: "No te metas en asuntos que no te incumben", deptCode: "BOY", userIdx: 2 },
  { text: "En boca cerrada no entran moscas", meaning: "A veces es mejor guardar silencio para evitar problemas", deptCode: "BOY", userIdx: 2 },
  { text: "Dime con quien andas y te dire quien eres", meaning: "Las companias reflejan como es una persona", deptCode: "CAL", userIdx: 0, author: "Tradicion cafetera" },
  { text: "Del dicho al hecho hay mucho trecho", meaning: "Es mas facil decir que hacer", deptCode: "QUI", userIdx: 0 },
  { text: "El que come callado come dos veces", meaning: "El que actua discretamente puede beneficiarse mas", deptCode: "TOL", userIdx: 5 },
  { text: "Loro viejo no aprende a hablar", meaning: "Es dificil cambiar habitos arraigados", deptCode: "COR", userIdx: 1 },
  { text: "La mula no era arisca, la hicieron", meaning: "Las malas experiencias hacen desconfiada a la gente", deptCode: "CES", userIdx: 1, author: "Dicho vallenato" },
  { text: "El rio suena porque piedras lleva", meaning: "Cuando hay rumores, algo de verdad hay detras", deptCode: "CHO", userIdx: 3 },
  { text: "A caballo regalado no se le mira el colmillo", meaning: "No se debe criticar lo que se recibe como regalo", deptCode: "RIS", userIdx: 0, author: "Refran popular" },
  { text: "El que siembra vientos cosecha tempestades", meaning: "Quien hace mal, recibira consecuencias peores", deptCode: "CAU", userIdx: 3 },
  { text: "Genio y figura hasta la sepultura", meaning: "La naturaleza de una persona no cambia facilmente", deptCode: "NSA", userIdx: 4 },
  { text: "Cuando el rio suena, piedras lleva", meaning: "Si hay rumores, probablemente hay algo de cierto", deptCode: "LAG", userIdx: 1, author: "Tradicion wayuu" },
  { text: "El pez grande se come al chiquito", meaning: "El mas fuerte siempre se impone sobre el mas debil", deptCode: "MAG", userIdx: 1 },
  { text: "Gallina vieja da buen caldo", meaning: "La experiencia tiene un valor irremplazable", deptCode: "SUC", userIdx: 1 },
  { text: "No hay peor ciego que el que no quiere ver", meaning: "El que se niega a aceptar la realidad no tiene remedio", deptCode: "CAS", userIdx: 6 },
  { text: "Al mal tiempo, buena cara", meaning: "Hay que enfrentar los problemas con optimismo", deptCode: "CAQ", userIdx: 5 },
  { text: "Mas vale tarde que nunca", meaning: "Es mejor hacer algo tarde que no hacerlo", deptCode: "PUT", userIdx: 7 },
  { text: "La selva ensena lo que la ciudad olvida", meaning: "La naturaleza guarda sabiduria que la vida moderna ha perdido", deptCode: "AMA", userIdx: 6, author: "Sabiduria amazonica", isAnonymous: true },
];

const COMMENTS_TEXT = [
  "Muy cierto, mi abuela siempre decia eso!",
  "Clasico colombiano, nunca pasa de moda",
  "Este me lo se desde chiquito",
  "Pura sabiduria de nuestros abuelos",
  "En mi pueblo lo dicen diferente pero el significado es el mismo",
  "Este dicho me recuerda a mi tierra",
  "Asi mismito es!",
  "Mi mama me lo repetia todos los dias",
  "Sabiduria pura!",
  "Este no lo conocia, que bueno!",
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.share.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.dicho.deleteMany();
  await prisma.departamento.deleteMany();
  await prisma.user.deleteMany();
  console.log("Cleared existing data");

  // Insert departamentos
  const departamentos = await Promise.all(
    DEPARTAMENTOS.map(dept =>
      prisma.departamento.create({ data: dept })
    )
  );
  console.log(`Created ${departamentos.length} departamentos`);

  // Insert users
  const users = await Promise.all(
    USERS.map(user =>
      prisma.user.create({ data: user })
    )
  );
  console.log(`Created ${users.length} users`);

  // Insert dichos
  const now = Date.now();
  const dichos = await Promise.all(
    DICHOS.map(async (d, i) => {
      const dept = departamentos.find(dep => dep.code === d.deptCode);
      const user = users[d.userIdx];
      const hoursAgo = i * 3 + Math.floor(Math.random() * 5);
      const createdAt = new Date(now - hoursAgo * 60 * 60 * 1000);

      return prisma.dicho.create({
        data: {
          text: d.text,
          meaning: d.meaning,
          author: d.author,
          isAnonymous: d.isAnonymous || false,
          userId: user.id,
          departamentoId: dept!.id,
          createdAt,
        },
      });
    })
  );
  console.log(`Created ${dichos.length} dichos`);

  // Add likes and comments
  for (const dicho of dichos) {
    const shuffled = [...users].sort(() => Math.random() - 0.5);
    const likeCount = Math.floor(Math.random() * 5) + 1;

    // Add likes
    for (let i = 0; i < Math.min(likeCount, shuffled.length); i++) {
      try {
        await prisma.like.create({
          data: {
            userId: shuffled[i].id,
            dichoId: dicho.id,
          },
        });
      } catch {
        // ignore duplicates
      }
    }

    // Add comments
    if (Math.random() > 0.4) {
      const user = shuffled[Math.floor(Math.random() * shuffled.length)];
      await prisma.comment.create({
        data: {
          text: COMMENTS_TEXT[Math.floor(Math.random() * COMMENTS_TEXT.length)],
          userId: user.id,
          dichoId: dicho.id,
        },
      });
    }
  }

  console.log("Added likes and comments");
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
