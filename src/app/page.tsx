import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">MejorDicho!</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                Iniciar sesion
              </Link>
              <Link
                href="/registro"
                className="px-4 sm:px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-sm"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cultura colombiana viva
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Toda la cultura de Colombia
            <span className="block text-amber-500">en un solo lugar</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-500 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Dichos, recetas de la abuela, juegos tipicos y mas. Descubre, comparte y
            preserva las tradiciones que nos hacen colombianos. Desde La Guajira hasta
            el Amazonas, cada departamento tiene su propia voz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/registro"
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-md text-center"
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/feed"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors border border-gray-200 text-center"
            >
              Explorar dichos
            </Link>
          </div>
        </div>
      </section>

      {/* Dicho destacado */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-12 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"></div>
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif text-gray-800 italic leading-relaxed mb-4">
            A papaya puesta, papaya partida
          </blockquote>
          <p className="text-gray-500 mb-2 text-sm sm:text-base">Si das oportunidad, alguien la aprovechara</p>
          <span className="inline-flex items-center gap-1.5 text-sm text-amber-600 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Antioquia
          </span>
        </div>
      </section>

      {/* Categorias culturales */}
      <section className="bg-white border-y border-gray-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Explora nuestra cultura
            </h3>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Una plataforma pensada para que las tradiciones colombianas nunca se pierdan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Dichos */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 border border-amber-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Dichos y Refranes</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                La sabiduria popular que ha pasado de generacion en generacion. Desde &ldquo;A papaya puesta...&rdquo; hasta los refranes de tu abuela.
              </p>
              <Link href="/feed" className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium mt-3 hover:text-amber-700">
                Explorar dichos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Recetas */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-5 sm:p-6 border border-red-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Recetas de la Abuela</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Las recetas que se cocinan con amor y tradicion. Desde la bandeja paisa hasta el sancocho costeno.
              </p>
              <span className="inline-flex items-center gap-1 text-red-400 text-sm font-medium mt-3">
                Proximamente
              </span>
            </div>

            {/* Juegos */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 sm:p-6 border border-green-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Juegos Tipicos</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Rana, tejo, yoyo, canicas y mas. Los juegos que nos hicieron felices en la calle del barrio.
              </p>
              <span className="inline-flex items-center gap-1 text-green-400 text-sm font-medium mt-3">
                Proximamente
              </span>
            </div>

            {/* Musica y tradiciones */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 sm:p-6 border border-purple-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Musica y Tradiciones</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Cumbia, vallenato, bambuco y mas. Las tradiciones que nos hacen bailar y celebrar juntos.
              </p>
              <span className="inline-flex items-center gap-1 text-purple-400 text-sm font-medium mt-3">
                Proximamente
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Como funciona MejorDicho!
          </h3>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Tres pasos para empezar a preservar nuestra cultura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Explora el mapa</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Navega por el mapa interactivo de Colombia y descubre las tradiciones
              de cada uno de los 33 departamentos.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Comparte tradiciones</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Publica dichos, recetas, juegos y tradiciones que aprendiste
              de tus abuelos. Cada aporte preserva nuestra cultura.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Conecta con otros</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dale like, comenta y comparte con la comunidad.
              La cultura colombiana se vive entre todos.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-gray-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-1">33</div>
              <div className="text-xs sm:text-sm text-gray-500">Departamentos</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-1">6</div>
              <div className="text-xs sm:text-sm text-gray-500">Regiones</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-1">40+</div>
              <div className="text-xs sm:text-sm text-gray-500">Dichos populares</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-gray-500">Colombiano</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
            Unete a MejorDicho!
          </h3>
          <p className="text-amber-100 mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base">
            Registrate y empieza a compartir la cultura de tu region.
            Entre todos preservamos lo que nos hace colombianos.
          </p>
          <Link
            href="/registro"
            className="inline-block px-8 py-3.5 bg-white text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors shadow-md"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="font-bold text-gray-800">MejorDicho!</span>
            </div>
            <p className="text-sm text-gray-400">
              Preservando la cultura popular de Colombia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
