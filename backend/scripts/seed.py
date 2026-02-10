"""Seed script to populate the database with initial data."""

import asyncio
import random
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

# We import models to register them, but we'll use the classes directly
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import Base
from app.core.security import hash_password
from app.models.user import User
from app.models.departamento import Departamento
from app.models.dicho import Dicho
from app.models.interactions import Like, Comment

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite+aiosqlite:///./eldicho.db")

DEPARTAMENTOS = [
    # Andina
    ("Antioquia", "ANT", "Andina"),
    ("Boyacá", "BOY", "Andina"),
    ("Caldas", "CAL", "Andina"),
    ("Cauca", "CAU", "Andina"),
    ("Cundinamarca", "CUN", "Andina"),
    ("Huila", "HUI", "Andina"),
    ("Nariño", "NAR", "Andina"),
    ("Norte de Santander", "NSA", "Andina"),
    ("Quindío", "QUI", "Andina"),
    ("Risaralda", "RIS", "Andina"),
    ("Santander", "SAN", "Andina"),
    ("Tolima", "TOL", "Andina"),
    ("Valle del Cauca", "VAC", "Andina"),
    ("Bogotá D.C.", "BOG", "Andina"),
    # Caribe
    ("Atlántico", "ATL", "Caribe"),
    ("Bolívar", "BOL", "Caribe"),
    ("Cesar", "CES", "Caribe"),
    ("Córdoba", "COR", "Caribe"),
    ("La Guajira", "LAG", "Caribe"),
    ("Magdalena", "MAG", "Caribe"),
    ("Sucre", "SUC", "Caribe"),
    # Pacífica
    ("Chocó", "CHO", "Pacífica"),
    # Orinoquía
    ("Arauca", "ARA", "Orinoquía"),
    ("Casanare", "CAS", "Orinoquía"),
    ("Meta", "MET", "Orinoquía"),
    ("Vichada", "VID", "Orinoquía"),
    # Amazonía
    ("Amazonas", "AMA", "Amazonía"),
    ("Caquetá", "CAQ", "Amazonía"),
    ("Guainía", "GUA", "Amazonía"),
    ("Guaviare", "GUV", "Amazonía"),
    ("Putumayo", "PUT", "Amazonía"),
    ("Vaupés", "VAU", "Amazonía"),
    # Insular
    ("San Andrés y Providencia", "SAP", "Insular"),
]

USERS = [
    ("juancho_paisa", "Juan Carlos Gómez", "juancho@example.com", "Antioquia"),
    ("la_costena", "María del Carmen", "maria@example.com", "Atlántico"),
    ("el_cachaco", "Andrés Felipe Rojas", "andres@example.com", "Bogotá D.C."),
    ("la_valluna", "Carolina Valencia", "carolina@example.com", "Valle del Cauca"),
    ("el_santandereano", "Pedro Luis Mantilla", "pedro@example.com", "Santander"),
    ("la_opita", "Luz Dary Trujillo", "luz@example.com", "Huila"),
    ("el_llanero", "Jorge Eliécer Parra", "jorge@example.com", "Meta"),
    ("la_narinense", "Sandra Patricia Jurado", "sandra@example.com", "Nariño"),
]

DICHOS = [
    ("A papaya puesta, papaya partida", "Si das oportunidad, alguien la aprovechará", "ANT"),
    ("El que no arriesga un huevo, no tiene un pollo", "Hay que tomar riesgos para lograr cosas", "ANT"),
    ("Más perdido que el hijo de Limón", "Estar muy desubicado", "ANT"),
    ("Cali es Cali, lo demás es loma", "Expresión de orgullo caleño", "VAC"),
    ("No dar papaya", "No dar ventaja ni oportunidad al otro", "VAC"),
    ("Camarón que se duerme se lo lleva la corriente", "El descuido trae consecuencias", "ATL"),
    ("El que mucho abarca, poco aprieta", "No se puede hacer todo a la vez", "BOG"),
    ("A caballo regalado no se le mira el colmillo", "No criticar lo que te regalan", "BOG"),
    ("Barriga llena, corazón contento", "La comida satisface el alma", "BOY"),
    ("En tierra de ciegos, el tuerto es rey", "Entre los incapaces, el mediocre sobresale", "SAN"),
    ("Más vale pájaro en mano que cien volando", "Lo seguro vale más que lo incierto", "CUN"),
    ("Loro viejo no aprende a hablar", "Es difícil cambiar las costumbres", "TOL"),
    ("Al que madruga, Dios le ayuda", "La disciplina trae recompensas", "HUI"),
    ("Del dicho al hecho hay mucho trecho", "Es más fácil decir que hacer", "NAR"),
    ("Cría cuervos y te sacarán los ojos", "La ingratitud de quienes uno ayuda", "CAU"),
    ("No hay mal que dure cien años", "Todo problema tiene fin", "ATL"),
    ("El que nace pa' tamal, del cielo le caen las hojas", "El destino siempre se cumple", "BOL"),
    ("Genio y figura hasta la sepultura", "La personalidad no cambia", "MAG"),
    ("Perro que ladra no muerde", "Quien amenaza mucho no actúa", "CES"),
    ("Más sabe el diablo por viejo que por diablo", "La experiencia es la mejor maestra", "NSA"),
    ("Quien con lobos anda, a aullar aprende", "Las compañías influyen en uno", "RIS"),
    ("A falta de pan, buenas son tortas", "Conformarse con lo que hay", "QUI"),
    ("Agua que no has de beber, déjala correr", "No meterse en lo que no le importa", "CAL"),
    ("El que peca y reza, empata", "Justificar los errores con buenas acciones", "SUC"),
    ("Dime con quién andas y te diré quién eres", "Las amistades definen a la persona", "COR"),
    ("No hay peor ciego que el que no quiere ver", "La terquedad ante la evidencia", "LAG"),
    ("El llano es pa' quien lo camina", "Las cosas se ganan con esfuerzo", "MET"),
    ("Cuando el río suena, piedras lleva", "Los rumores suelen tener fundamento", "ARA"),
    ("El que es perico, donde quiera es verde", "El talento se demuestra en cualquier lugar", "CAS"),
    ("La selva enseña lo que la ciudad olvida", "La naturaleza guarda sabiduría perdida", "AMA"),
    ("Del ahogado, el sombrero", "Sacar provecho de una mala situación", "CAQ"),
    ("No todo lo que brilla es oro", "Las apariencias engañan", "CHO"),
    ("El que siembra, recoge", "El esfuerzo siempre da frutos", "PUT"),
    ("Por la boca muere el pez", "Hablar de más trae problemas", "GUV"),
    ("En boca cerrada no entran moscas", "Es mejor callar a veces", "GUA"),
    ("El vivo vive del bobo", "Los astutos se aprovechan de los ingenuos", "VAU"),
    ("Isla que no se cuida, el mar se la lleva", "Hay que proteger lo que se tiene", "SAP"),
    ("Al mal tiempo, buena cara", "Enfrentar la adversidad con optimismo", "BOG"),
    ("Ojos que no ven, corazón que no siente", "La ignorancia puede ser alivio", "ANT"),
    ("El que ríe de último, ríe mejor", "La paciencia trae victoria", "VAC"),
    ("A mal paso, darle prisa", "Los malos momentos hay que superarlos rápido", "VID"),
]

COMMENT_TEXTS = [
    "¡Así mismo es! Mi abuela siempre decía eso.",
    "Jajaja, muy cierto parce.",
    "Este dicho es la pura verdad.",
    "En mi tierra se dice parecido.",
    "Mi mamá me lo repetía todos los días.",
    "Qué bonito, no lo conocía.",
    "¡Eso es muy de por allá! Me encanta.",
    "La sabiduría popular nunca falla.",
    "Este me lo sé desde chiquito.",
    "¡Buenísimo! Lo voy a usar más seguido.",
]


async def seed():
    engine = create_async_engine(DATABASE_URL, echo=False)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with session_factory() as session:
        # Create departamentos
        dept_map: dict[str, str] = {}
        for name, code, region in DEPARTAMENTOS:
            dept_id = str(uuid.uuid4())
            dept = Departamento(id=dept_id, name=name, code=code, region=region)
            session.add(dept)
            dept_map[code] = dept_id
        await session.flush()

        # Create users
        user_ids: list[str] = []
        password = hash_password("ElDicho2024!")
        for username, name, email, region in USERS:
            user_id = str(uuid.uuid4())
            u = User(
                id=user_id,
                username=username,
                email=email,
                password_hash=password,
                name=name,
                region=region,
            )
            session.add(u)
            user_ids.append(user_id)
        await session.flush()

        # Create dichos
        dicho_ids: list[str] = []
        base_time = datetime.now(timezone.utc) - timedelta(hours=len(DICHOS) * 3)
        for i, (text, meaning, dept_code) in enumerate(DICHOS):
            dicho_id = str(uuid.uuid4())
            d = Dicho(
                id=dicho_id,
                text=text,
                meaning=meaning,
                user_id=random.choice(user_ids),
                departamento_id=dept_map[dept_code],
                created_at=base_time + timedelta(hours=i * 3, minutes=random.randint(0, 59)),
            )
            session.add(d)
            dicho_ids.append(dicho_id)
        await session.flush()

        # Create likes
        for dicho_id in dicho_ids:
            likers = random.sample(user_ids, k=random.randint(1, min(5, len(user_ids))))
            for uid in likers:
                session.add(Like(id=str(uuid.uuid4()), user_id=uid, dicho_id=dicho_id))
        await session.flush()

        # Create comments
        for dicho_id in dicho_ids:
            if random.random() < 0.6:
                num_comments = random.randint(1, 3)
                for _ in range(num_comments):
                    session.add(
                        Comment(
                            id=str(uuid.uuid4()),
                            text=random.choice(COMMENT_TEXTS),
                            user_id=random.choice(user_ids),
                            dicho_id=dicho_id,
                        )
                    )
        await session.flush()

        await session.commit()

    await engine.dispose()
    print(f"Seed completado: {len(DEPARTAMENTOS)} departamentos, {len(USERS)} usuarios, {len(DICHOS)} dichos")
    print("Contraseña de todos los usuarios de prueba: ElDicho2024!")


if __name__ == "__main__":
    asyncio.run(seed())
