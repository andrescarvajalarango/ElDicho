"use client";

import Link from "next/link";
import { CurrentUser, logout } from "@/lib/auth";

interface HeaderProps {
  onCreateClick: () => void;
  currentUser: CurrentUser | null;
}

export default function Header({ onCreateClick, currentUser }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                MejorDicho!
              </h1>
              <p className="text-xs text-gray-400 -mt-0.5 hidden sm:block">
                Cultura popular de Colombia
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser ? (
              <>
                <button
                  onClick={onCreateClick}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline">Nuevo dicho</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 hidden md:block">{currentUser.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer px-2 py-1"
                    title="Cerrar sesion"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Iniciar sesion
                </Link>
                <Link
                  href="/registro"
                  className="px-3 sm:px-4 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-sm"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
