import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Navbar } from "../components/navbar";

const HomeTemplate: React.FC<PageProps> = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        {/* Hero section */}
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              Crédit immobilier simplifié
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Simulez votre prêt immobilier en quelques minutes.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Obtenez une première estimation de votre capacité d&apos;emprunt
              et de votre mensualité. Sans engagement, 100% en ligne, pensé pour
              vous aider à préparer votre projet sereinement.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm shadow-slate-200 ring-1 ring-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>
                  Simulation gratuite &amp; sans impact sur votre dossier
                </span>
              </div>
              <span>•</span>
              <span>Données chiffrées indicatives, non contractuelles.</span>
            </div>
          </div>

          {/* Fake simulator card */}
          <div
            id="simulator"
            className="rounded-3xl bg-white/90 p-5 shadow-lg shadow-slate-200/80 ring-1 ring-slate-100 backdrop-blur-sm sm:p-6 lg:p-7"
          >
            <h2 className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
              Simulateur express
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Renseignez quelques informations pour obtenir une première
              estimation.
            </p>

            <form
              className="mt-4 space-y-4 text-sm"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label
                  htmlFor="amount"
                  className="block text-xs font-medium text-slate-600"
                >
                  Montant du projet
                </label>
                <div className="mt-1 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
                  <input
                    id="amount"
                    type="number"
                    placeholder="300 000"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                  <span className="ml-2 text-xs font-medium text-slate-500">
                    €
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="income"
                    className="block text-xs font-medium text-slate-600"
                  >
                    Revenus mensuels nets
                  </label>
                  <div className="mt-1 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
                    <input
                      id="income"
                      type="number"
                      placeholder="4 500"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                    <span className="ml-2 text-xs font-medium text-slate-500">
                      €4/mois
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-xs font-medium text-slate-600"
                  >
                    Durée souhaitée
                  </label>
                  <div className="mt-1 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
                    <input
                      id="duration"
                      type="number"
                      placeholder="25"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                    <span className="ml-2 text-xs font-medium text-slate-500">
                      ans
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-slate-400/40 transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Calculer une estimation
              </button>

              <p className="text-[11px] leading-snug text-slate-500">
                Exemple indicatif basé sur des hypothèses de taux moyens. Pour
                une étude précise, rapprochez-vous d&apos;un expert.
              </p>
            </form>
          </div>
        </section>

        {/* Benefits section */}
        <section className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Pourquoi passer par un courtier en ligne ?
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white/80 p-5 shadow-sm shadow-slate-200 ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Visibilité
              </p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">
                Comparez plusieurs banques
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Accédez en un clin d&apos;œil à plusieurs offres de prêt et
                évitez de multiplier les rendez-vous en agence.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 p-5 shadow-sm shadow-slate-200 ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Sérénité
              </p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">
                Un accompagnement clair
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Des explications pédagogiques et des indicateurs simples pour
                comprendre votre capacité d&apos;emprunt et votre taux
                d&apos;endettement.
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 p-5 shadow-sm shadow-slate-200 ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Gain de temps
              </p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">
                Dossier optimisé
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Préparez un dossier solide dès le départ pour maximiser vos
                chances d&apos;obtenir un accord au meilleur taux.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-slate-900 px-5 py-6 text-slate-50 shadow-md shadow-slate-900/40 sm:flex-row sm:items-center sm:px-8 sm:py-7">
            <div>
              <h2 className="text-base font-semibold sm:text-lg">
                Prêt à affiner votre projet immobilier ?
              </h2>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                Lancez une première simulation pour mieux cadrer votre budget
                puis approfondissez avec un expert.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#simulator"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm shadow-emerald-400/40 transition hover:bg-emerald-400"
              >
                Faire une simulation
              </a>
              <a
                href="/blog/"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-50 transition hover:border-slate-200 hover:text-slate-900 hover:bg-slate-50"
              >
                Lire nos conseils
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeTemplate;

export const Head: HeadFC = () => (
  <>
    <title>Accueil</title>
    <meta
      name="description"
      content="Simulez votre prêt immobilier en quelques minutes."
    />
  </>
);
