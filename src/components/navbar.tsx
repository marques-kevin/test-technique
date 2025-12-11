import * as React from "react";
import { Link } from "gatsby";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm shadow-slate-400/40 transition group-hover:scale-105 group-active:scale-95">
            <span className="text-lg font-semibold">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              Prettor
            </span>
            <span className="text-xs text-slate-500">Tech blog</span>
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link
            to="/"
            className="rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-slate-900"
            activeClassName="bg-slate-900 text-white hover:bg-slate-900"
          >
            Accueil
          </Link>
          <Link
            to="/blog/"
            className="rounded-full px-3 py-1 transition hover:bg-slate-100 hover:text-slate-900"
            activeClassName="bg-slate-900 text-white hover:bg-slate-900"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
};
