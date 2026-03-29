import './App.css'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  Map,
  Presentation,
  Scale,
  Sparkles,
} from 'lucide-react'

const meta = {
  materia: 'Aspectos legales y sociales de la informática',
  unidad: 'Unidad 7: Derechos de autor',
}

const integrantes = ['Rafael García', 'Lorena Gomez', 'Nicolás García', 'Facundo Domínguez', 'Valentin Fernández']

const temasData = [
  { id: 1, titulo: 'Propiedad intelectual', icono: '💡' },
  { id: 2, titulo: 'Dominios', icono: '🌐' },
  { id: 3, titulo: 'Patentes', icono: '🔬' },
  { id: 4, titulo: 'Derecho de marcas', icono: '™️' },
]

const rutas = {
  presentacion: '/archivos/presentacion/presentacion.pdf',
  tema: (id) => `/archivos/temas/Tema${id}.pdf`,
  mapa: (id) => `/archivos/mapas-mentales/Mapa${id}.pdf`,
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1a12] via-[#0f1420] to-[#1a0d14] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-[500px] w-[500px] rounded-full bg-rose-500/15 blur-3xl" />
      </div>
      {children}
    </div>
  )
}

function NavBar({ onBack, title }) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
            <Scale size={18} className="text-emerald-300" />
          </div>
          <p className="text-sm font-semibold text-white">{title}</p>
        </div>
      </div>
    </div>
  )
}

function PdfViewer({ src, label }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
            <FileText size={18} className="text-emerald-300" />
          </div>
          <p className="text-sm font-bold text-white">{label}</p>
        </div>
        <a
          href={src}
          download
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-2 text-sm font-bold text-black transition hover:from-emerald-300"
        >
          <Download size={16} />
          Descargar
        </a>
      </div>
      <iframe className="h-[560px] w-full bg-black" src={`${src}#view=FitH`} title={label} />
    </div>
  )
}

function HomeScreen({ onNavigate }) {
  return (
    <>
      <div className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                <Scale size={16} className="text-emerald-300" />
                <span className="text-xs font-bold tracking-wider text-emerald-200">
                  {meta.unidad.toUpperCase()}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Material de exposición
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-300">
                {meta.materia}. Todo el contenido organizado y listo para descargar.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                  <GraduationCap size={20} className="text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-emerald-300">INTEGRANTES</p>
                  <p className="text-sm font-bold text-white">Grupo Unidad 7</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {integrantes.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => onNavigate('presentacion')}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-6 text-left transition hover:-translate-y-1 hover:border-emerald-500/30"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                <Presentation size={20} className="text-emerald-300" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Presentación</h3>
              <p className="mt-2 text-sm text-zinc-400">Ver y descargar la presentación grupal</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
                <Sparkles size={14} className="text-emerald-300" />
                Abrir
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('temas-list')}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-6 text-left transition hover:-translate-y-1 hover:border-rose-500/30"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10">
                <BookOpen size={20} className="text-rose-300" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Temas</h3>
              <p className="mt-2 text-sm text-zinc-400">Acceder a los 4 temas del trabajo</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
                <Sparkles size={14} className="text-rose-300" />
                Abrir
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('mapas-list')}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent p-6 text-left transition hover:-translate-y-1 hover:border-amber-500/30"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
                <Map size={20} className="text-amber-300" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Mapas mentales</h3>
              <p className="mt-2 text-sm text-zinc-400">Visualizar los mapas de cada tema</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
                <Sparkles size={14} className="text-amber-300" />
                Abrir
              </div>
            </div>
          </button>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-zinc-500">
          {integrantes.join(' · ')} · {meta.materia} · {meta.unidad}
        </div>
      </footer>
    </>
  )
}

function PresentacionScreen({ onBack }) {
  return (
    <>
      <NavBar onBack={onBack} title="Presentación" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-wider text-emerald-400">PRESENTACIÓN GRUPAL</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Material de exposición</h2>
        </div>
        <PdfViewer src={rutas.presentacion} label="Presentación" />
      </main>
    </>
  )
}

function TemasListScreen({ onBack, onSelectTema }) {
  return (
    <>
      <NavBar onBack={onBack} title="Temas" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-wider text-rose-400">CONTENIDO</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Seleccioná un tema</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {temasData.map((tema) => (
            <button
              key={tema.id}
              type="button"
              onClick={() => onSelectTema(tema.id)}
              className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-rose-500/30 hover:bg-white/[0.05]"
            >
              <span className="text-3xl">{tema.icono}</span>
              <div>
                <p className="text-sm font-bold text-white">Tema {tema.id}</p>
                <p className="text-sm text-zinc-400">{tema.titulo}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  )
}

function TemaDetailScreen({ onBack, temaId, onVolverALista }) {
  const tema = temasData.find((t) => t.id === temaId)
  if (!tema) return null

  return (
    <>
      <div className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={onVolverALista}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Volver a temas
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tema.icono}</span>
            <p className="text-sm font-semibold text-white">Tema {tema.id}</p>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-wider text-rose-400">TEMA {tema.id}</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{tema.icono} {tema.titulo}</h2>
        </div>
        <PdfViewer src={rutas.tema(tema.id)} label={`Tema ${tema.id}: ${tema.titulo}`} />
      </main>
    </>
  )
}

function MapasListScreen({ onBack, onSelectMapa }) {
  return (
    <>
      <NavBar onBack={onBack} title="Mapas mentales" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-wider text-amber-400">MAPAS MENTALES</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Seleccioná un mapa</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {temasData.map((tema) => (
            <button
              key={tema.id}
              type="button"
              onClick={() => onSelectMapa(tema.id)}
              className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-amber-500/30 hover:bg-white/[0.05]"
            >
              <span className="text-3xl">🧠</span>
              <div>
                <p className="text-sm font-bold text-white">Mapa {tema.id}</p>
                <p className="text-sm text-zinc-400">{tema.titulo}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  )
}

function MapaDetailScreen({ onBack, mapaId, onVolverALista }) {
  const tema = temasData.find((t) => t.id === mapaId)
  if (!tema) return null

  return (
    <>
      <div className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={onVolverALista}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Volver a mapas
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            <p className="text-sm font-semibold text-white">Mapa {tema.id}</p>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-wider text-amber-400">MAPA MENTAL {tema.id}</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{tema.titulo}</h2>
        </div>
        <PdfViewer src={rutas.mapa(tema.id)} label={`Mapa ${tema.id}: ${tema.titulo}`} />
      </main>
    </>
  )
}

function App() {
  const [pantalla, setPantalla] = useState('home')
  const [temaSeleccionado, setTemaSeleccionado] = useState(null)
  const [mapaSeleccionado, setMapaSeleccionado] = useState(null)

  const irAHome = () => {
    setPantalla('home')
    setTemaSeleccionado(null)
    setMapaSeleccionado(null)
  }

  return (
    <Shell>
      <motion.div
        key={pantalla}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {pantalla === 'home' && <HomeScreen onNavigate={setPantalla} />}

        {pantalla === 'presentacion' && <PresentacionScreen onBack={irAHome} />}

        {pantalla === 'temas-list' && (
          <TemasListScreen
            onBack={irAHome}
            onSelectTema={(id) => {
              setTemaSeleccionado(id)
              setPantalla('tema-detail')
            }}
          />
        )}

        {pantalla === 'tema-detail' && temaSeleccionado && (
          <TemaDetailScreen
            onBack={irAHome}
            temaId={temaSeleccionado}
            onVolverALista={() => {
              setTemaSeleccionado(null)
              setPantalla('temas-list')
            }}
          />
        )}

        {pantalla === 'mapas-list' && (
          <MapasListScreen
            onBack={irAHome}
            onSelectMapa={(id) => {
              setMapaSeleccionado(id)
              setPantalla('mapa-detail')
            }}
          />
        )}

        {pantalla === 'mapa-detail' && mapaSeleccionado && (
          <MapaDetailScreen
            onBack={irAHome}
            mapaId={mapaSeleccionado}
            onVolverALista={() => {
              setMapaSeleccionado(null)
              setPantalla('mapas-list')
            }}
          />
        )}
      </motion.div>
    </Shell>
  )
}

export default App
