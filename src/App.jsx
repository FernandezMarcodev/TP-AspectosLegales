import './App.css'
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Home,
  Menu,
  X,
  BookOpen,
  Presentation,
  Gamepad2,
  Scale,
  QrCode,
} from 'lucide-react'

const meta = {
  materia: 'Aspectos legales y sociales de la informática',
  unidad: 'Unidad 7: Derechos de autor',
  institucion: 'Universidad Nacional',
}

// 6 integrantes con sus documentos
const integrantes = [
  {
    id: 1,
    nombre: 'Facundo Domínguez',
    tema: 'Propiedad Intelectual',
    descripcion: 'Concepto, protección del software, derechos morales y obras anónimas.',
    color: 'from-cyan-600 to-cyan-700',
    colorAccent: 'cyan',
  },
  {
    id: 2,
    nombre: 'Rafael García',
    tema: 'Propiedad Intelectual y Dominios',
    descripcion: 'Autoría, obras colectivas, dominios nacionales/estranjeros y registro.',
    color: 'from-blue-600 to-blue-700',
    colorAccent: 'blue',
  },
  {
    id: 3,
    nombre: 'Santiago Carrillo',
    tema: 'Patentes',
    descripcion: 'Patentes de invención, derechos del inventor y registración.',
    color: 'from-emerald-600 to-emerald-700',
    colorAccent: 'emerald',
  },
  {
    id: 4,
    nombre: 'Nicolás García',
    tema: 'Patentes',
    descripcion: 'Modelos de utilidad, caducidad, nulidad y sanciones.',
    color: 'from-slate-600 to-slate-700',
    colorAccent: 'slate',
  },
  {
    id: 5,
    nombre: 'Valentin Fernández',
    tema: 'Derecho de Marcas',
    descripcion: 'Concepto de marca, tipos, derechos y signos no registrables.',
    color: 'from-teal-600 to-teal-700',
    colorAccent: 'teal',
  },
  {
    id: 6,
    nombre: 'Lorena Gomez',
    tema: 'Derecho de Marcas',
    descripcion: 'Registro, renovación, protección notoria y extinción del derecho.',
    color: 'from-indigo-600 to-indigo-700',
    colorAccent: 'indigo',
  },
]

// Rutas con placeholders para que el usuario reemplace
const rutas = {
  guion: (id) => `/archivos/temas/Guion.tema${id}.pdf`,
  presentacion: (id) => `/archivos/presentacion/Presentacion.tema${id}.pdf`,
  mapa: (id) => `/archivos/mapas-mentales/MapaMental.tema${id}.png`,
  participacion: (id) => `/archivos/participacion/Participacion.tema${id}.pdf`,
}

async function descargarArchivo(url, filename) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error al descargar')
    const blob = await res.blob()
    const u = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = u
    a.download = filename || ''
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(u), 1500)
  } catch (err) {
    console.error('Descarga fallida', err)
    alert('No se pudo descargar el archivo')
  }
}

const roscoPassword = 'rosco2026'

// Definiciones para ROSCO
const roscoDatos = [
  { letra: 'A', definicion: 'Acción que otorga derechos sobre obras creadas', respuesta: 'Autoría' },
  { letra: 'B', definicion: 'Búsqueda de un nombre único en internet', respuesta: 'Dominio' },
  { letra: 'C', definicion: 'Conjunto de normas que regulan derechos en red', respuesta: 'Cibernética' },
  { letra: 'D', definicion: 'Documento que garantiza creación de invento', respuesta: 'Patente' },
  { letra: 'E', definicion: 'Empresa que registra y administra nombres web', respuesta: 'Registrar' },
  { letra: 'F', definicion: 'Forma de proteger datos de terceros', respuesta: 'Encriptación' },
  { letra: 'G', definicion: 'Gráfico o símbolo que identifica un producto', respuesta: 'Marca' },
  { letra: 'H', definicion: 'Hecho de copiar sin autorización', respuesta: 'Plagio' },
  { letra: 'I', definicion: 'Información confidencial de una empresa', respuesta: 'Secreto' },
  { letra: 'J', definicion: 'Juzgado que resuelve delitos digitales', respuesta: 'Cibernético' },
  { letra: 'K', definicion: 'Conocimiento original protegido legalmente', respuesta: 'Creación' },
  { letra: 'L', definicion: 'Ley que protege datos personales', respuesta: 'GDPR' },
  { letra: 'M', definicion: 'Medio de transmisión de información digital', respuesta: 'Internet' },
  { letra: 'N', definicion: 'Nombre exclusivo para un comercio online', respuesta: 'Dominio' },
  { letra: 'O', definicion: 'Obligación de respetar derechos ajenos', respuesta: 'Deber' },
  { letra: 'P', definicion: 'Protección de invento mediante tramitación', respuesta: 'Patente' },
  { letra: 'Q', definicion: 'Quebrantamiento de confidencialidad', respuesta: 'Violación' },
  { letra: 'R', definicion: 'Red global de comunicación protegida legalmente', respuesta: 'Internet' },
  { letra: 'S', definicion: 'Sistema de identificación exclusiva de marca', respuesta: 'Branding' },
  { letra: 'T', definicion: 'Traspaso de derechos a otra persona', respuesta: 'Cesión' },
  { letra: 'U', definicion: 'Uso no autorizado de obra protegida', respuesta: 'Infracción' },
  { letra: 'V', definicion: 'Vulneración de privacidad en línea', respuesta: 'Espionaje' },
  { letra: 'W', definicion: 'Sitio web con contenido protegido', respuesta: 'Página' },
  { letra: 'X', definicion: 'Xenofobia en redes sociales (delito digital)', respuesta: 'Odio' },
  { letra: 'Y', definicion: 'Zona de almacenamiento de datos nube', respuesta: 'Nube' },
  { letra: 'Z', definicion: 'Zona de libre comercio digital', respuesta: 'Comercio' },
]

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3B] via-[#1a2a47] to-[#0d1620] text-slate-900">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-600/5 blur-3xl" />
      </div>
      {children}
    </div>
  )
}

function Navbar({ activeSection, onNavigate, isMobileOpen, setIsMobileOpen }) {
  const sections = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'guiones', label: 'Guiones', icon: FileText },
    { id: 'presentacion', label: 'Presentación', icon: Presentation },
    { id: 'rosco', label: 'Actividad', icon: Gamepad2 },
    { id: 'qr', label: 'QR', icon: QrCode },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-400/20 bg-gradient-to-r from-[#0B1F3B]/95 to-[#1a2a47]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
                <Scale size={20} className="text-white font-bold" />
              </div>
              <div className="hidden sm:flex flex-col">
                <p className="text-xs font-bold text-amber-400 tracking-widest">UNIDAD 7</p>
                <p className="text-xs text-slate-300">Aspectos Legales</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => onNavigate(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{section.label}</span>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <div className="md:hidden border-t border-slate-400/20 bg-gradient-to-r from-[#0B1F3B] to-[#1a2a47] px-4 py-4">
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      onNavigate(section.id)
                      setIsMobileOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{section.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  )
}

function PdfViewerModal({ src, label, onClose }) {
  const isImage = src && (src.endsWith('.png') || src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.gif'))
  const [blobUrl, setBlobUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  React.useEffect(() => {
    let mounted = true
    let url = null
    setError(null)
    if (!isImage && src) {
      setLoading(true)
      fetch(src)
        .then((res) => res.blob())
        .then((blob) => {
          if (!mounted) return
          // Ensure the blob has the PDF MIME type so browsers render instead of saving as .tmp
          const pdfBlob = blob && blob.type && blob.type !== '' ? blob : new Blob([blob], { type: 'application/pdf' })
          url = URL.createObjectURL(pdfBlob)
          setBlobUrl(url)
        })
        .catch((err) => {
          if (!mounted) return
          setError('No se pudo cargar el documento')
        })
        .finally(() => mounted && setLoading(false))
    }

    return () => {
      mounted = false
      if (url) URL.revokeObjectURL(url)
      setBlobUrl(null)
    }
  }, [src])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current && containerRef.current.requestFullscreen) await containerRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.error('Fullscreen failed', err)
    }
  }

  React.useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    const onKey = (e) => {
      // 'f' toggles fullscreen
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      }
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen()
      }
    }

    document.addEventListener('fullscreenchange', onFsChange)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // prevent body scroll when fullscreen
  React.useEffect(() => {
    const prev = document.body.style.overflow
    if (isFullscreen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [isFullscreen])

  return (
    <div ref={containerRef} className={`fixed inset-0 z-50 ${isFullscreen ? 'bg-black' : 'flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'}`}>
      <div className={`${isFullscreen ? 'w-full h-full rounded-none bg-black' : 'w-full max-w-4xl rounded-2xl bg-slate-50 shadow-2xl overflow-hidden'}`}>
        <div className={`flex items-center justify-between px-6 py-4 ${isFullscreen ? 'absolute top-4 left-4 right-4 z-50' : 'border-b border-slate-300/30 bg-gradient-to-r from-slate-50 to-slate-100'}`}>
          <p className={`${isFullscreen ? 'text-white font-semibold' : 'font-serif font-bold text-slate-800'}`}>{label}</p>
          <div className="flex items-center gap-3">
            {!isFullscreen && (
              <button onClick={toggleFullscreen} className="text-sm px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">
                Pantalla completa
              </button>
            )}
            <button type="button" onClick={onClose} className={`${isFullscreen ? 'text-white/90' : 'text-slate-600 hover:text-slate-900 transition'}`}>
              <X size={24} />
            </button>
          </div>
        </div>
        {isImage ? (
          <div className={`${isFullscreen ? 'h-full flex items-center justify-center bg-black' : 'p-6 flex items-center justify-center bg-white w-full'}`}>
            <img
              src={src}
              alt={label}
              className={`${isFullscreen ? 'h-full' : 'max-h-[600px]'} w-full object-contain rounded-md`}
            />
          </div>
        ) : (
          <div className={`${isFullscreen ? 'h-full w-full bg-black flex items-center justify-center' : 'bg-white w-full'}`}>
            {loading && <div className="p-6 text-center text-sm text-slate-600">Cargando documento...</div>}
            {error && <div className="p-6 text-center text-sm text-rose-600">{error}</div>}
            {!loading && !error && (
              <iframe
                className={`${isFullscreen ? 'h-full' : 'h-96 sm:h-[600px]'} w-full`}
                src={blobUrl ? `${blobUrl}#view=FitH` : undefined}
                title={label}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function RoscoAuthModal({ onSubmit, onClose, error }) {
  const [password, setPassword] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Acceso protegido</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Ingresar contraseña</h2>
            <p className="mt-2 text-sm text-slate-600">Debes ingresar la contraseña para acceder a la actividad ROSCO.</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            <X size={22} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Ingresa la contraseña"
          />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            onClick={() => onSubmit(password)}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-cyan-500"
          >
            Acceder a la actividad
          </button>
        </div>
      </div>
    </div>
  )
}

function InicioScreen({ onNavigate }) {
  return (
    <div className="space-y-0">
      <div className="relative overflow-hidden border-b border-slate-400/20 hero-legal py-16 sm:py-24">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-50 px-4 py-2 mb-6"
            >
              <Scale size={16} className="text-blue-600" />
              <span className="text-xs font-bold tracking-widest text-blue-700 uppercase">{meta.unidad}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-amber-400 leading-tight"
            >
              Material de Exposición
            </motion.h1>

              <p className="mt-6 text-lg text-amber-400 leading-relaxed max-w-2xl">
                {meta.materia}
              </p>

            

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="button"
              onClick={() => onNavigate && onNavigate('presentacion')}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-6 sm:px-8 py-3 sm:py-4 font-serif font-bold text-slate-900 transition hover:from-amber-300 hover:to-amber-400 shadow-lg hover:shadow-xl"
            >
              Comenzar exposición
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-400/20 bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">Integrantes del Grupo 3</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrantes.map((persona, idx) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl border border-slate-300/50 bg-gradient-to-br from-white to-slate-50 p-6 hover:border-blue-400/50 transition-all shadow-sm hover:shadow-md"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${persona.color} shadow-md`}>
                  <span className="text-lg font-bold text-white">{persona.nombre.charAt(0)}</span>
                </div>
                <h3 className="mt-4 font-serif font-bold text-slate-900">{persona.nombre}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-600">{persona.tema}</p>
                <p className="mt-2 text-sm text-slate-600">{persona.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-400/20 bg-gradient-to-b from-[#0B1F3B] to-[#0d1620] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
          <p>{integrantes.map((p) => p.nombre).join(' · ')}</p>
          <p className="mt-2">{meta.materia}</p>
        </div>
      </footer>
    </div>
  )
}

function GuionesScreen() {
  const [pdfAbierto, setPdfAbierto] = useState(null)
  const [mapaManifest, setMapaManifest] = useState(null)

  React.useEffect(() => {
    let mounted = true
    fetch('/archivos/mapas-mentales/manifest.json')
      .then((r) => r.json())
      .then((data) => mounted && setMapaManifest(data))
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const resolveMapaUrl = async (id) => {
    if (mapaManifest && mapaManifest[String(id)]) return mapaManifest[String(id)]
    const candidates = [
      `/archivos/mapas-mentales/MapaMental.tema${id}.png`,
      `/archivos/mapas-mentales/Mapa${id}.png`,
      `/archivos/mapas-mentales/Mapa${id}.PNG`,
      `/archivos/mapas-mentales/mapa${id}.png`,
      `/archivos/mapas-mentales/Mapa${id}.jpg`,
      `/archivos/mapas-mentales/Mapa${id}.jpeg`,
    ]
    for (const url of candidates) {
      try {
        const res = await fetch(url, { method: 'HEAD' })
        if (res.ok) return url
      } catch (err) {
        // ignore
      }
    }
    return `/archivos/mapas-mentales/MapaMental.tema${id}.png`
  }

  return (
    <div className="space-y-0">
      <div className="border-b border-slate-400/20 bg-gradient-to-b from-slate-50 to-slate-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Contenido académico</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">Guiones de Exposición</h1>
          <p className="mt-4 text-lg text-slate-700">Descarga los guiones de cada integrante, mapas mentales y documentos asociados</p>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrantes.map((persona, idx) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl border border-slate-300/50 bg-gradient-to-br from-white to-slate-50 overflow-hidden hover:border-blue-400/50 transition-all shadow-md hover:shadow-lg"
              >
                <div className={`h-2 bg-gradient-to-r ${persona.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">{persona.nombre}</h3>
                      <p className="text-sm font-semibold text-blue-600 mt-1">{persona.tema}</p>
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${persona.color} shadow-md flex-shrink-0`}>
                      <span className="text-sm font-bold text-white">{persona.id}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">{persona.descripcion}</p>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e && e.preventDefault && e.preventDefault()
                        e && e.stopPropagation && e.stopPropagation()
                        setPdfAbierto({ tipo: 'guion', id: persona.id, nombre: persona.nombre })
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300/50 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2.5 font-semibold text-slate-900 transition hover:border-blue-400/50 hover:bg-blue-50"
                    >
                      <FileText size={16} />
                      Ver Guión
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e && e.preventDefault && e.preventDefault()
                        e && e.stopPropagation && e.stopPropagation()
                        descargarArchivo(rutas.guion(persona.id), `Guion.tema${persona.id}.pdf`)
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300/50 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2.5 font-semibold text-slate-900 transition hover:border-amber-400/50 hover:bg-amber-50"
                    >
                      <Download size={16} />
                      Descargar Guión
                    </button>
                    {/* Mapa mental: vista removida - ahora solo descarga */}
                    <button
                      type="button"
                      onClick={async (e) => {
                        e && e.preventDefault && e.preventDefault()
                        e && e.stopPropagation && e.stopPropagation()
                        const url = await resolveMapaUrl(persona.id)
                        descargarArchivo(url, `MapaMental.tema${persona.id}.png`)
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300/50 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2.5 font-semibold text-slate-900 transition hover:border-indigo-400/50 hover:bg-indigo-50"
                    >
                      <Download size={16} />
                      Descargar Mapa Mental
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e && e.preventDefault && e.preventDefault()
                        e && e.stopPropagation && e.stopPropagation()
                        setPdfAbierto({ tipo: 'presentacion', id: persona.id, nombre: persona.nombre })
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300/50 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2.5 font-semibold text-slate-900 transition hover:border-slate-400/50 hover:bg-slate-50"
                    >
                      <Presentation size={16} />
                      Ver Presentación
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e && e.preventDefault && e.preventDefault()
                        e && e.stopPropagation && e.stopPropagation()
                        descargarArchivo(rutas.presentacion(persona.id), `Presentacion.tema${persona.id}.pdf`)
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300/50 bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-2.5 font-semibold text-slate-900 transition hover:border-amber-400/50 hover:bg-amber-50"
                    >
                      <Download size={16} />
                      Descargar Presentación
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {pdfAbierto && (
        <PdfViewerModal
          src={
            pdfAbierto.src
              ? pdfAbierto.src
              : pdfAbierto.tipo === 'guion'
              ? rutas.guion(pdfAbierto.id)
              : pdfAbierto.tipo === 'mapa'
              ? rutas.mapa(pdfAbierto.id)
              : rutas.presentacion(pdfAbierto.id)
          }
          label={`${pdfAbierto.tipo === 'guion' ? 'Guión' : pdfAbierto.tipo === 'mapa' ? 'Mapa Mental' : 'Presentación'} - ${pdfAbierto.nombre}`}
          onClose={() => setPdfAbierto(null)}
        />
      )}

      <footer className="border-t border-slate-400/20 bg-gradient-to-b from-slate-100 to-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-600">
          <p>Todos los documentos están disponibles para descargar</p>
        </div>
      </footer>
    </div>
  )
}

function PresentacionScreen() {
  const [indicePresentacion, setIndicePresentacion] = useState(0)

  const presentacionActual = integrantes[indicePresentacion]

  const siguiente = () => {
    setIndicePresentacion((prev) => (prev + 1) % integrantes.length)
  }

  const anterior = () => {
    setIndicePresentacion((prev) => (prev - 1 + integrantes.length) % integrantes.length)
  }

  return (
    <div className="space-y-0">
      <div className="border-b border-slate-400/20 bg-gradient-to-b from-slate-50 to-slate-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Presentación Grupal</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">Experiencia Concatenada</h1>
          <p className="mt-4 text-lg text-slate-700">Visualiza todas las presentaciones en orden, una tras otra</p>
        </div>
      </div>

      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <span className="text-sm font-semibold text-slate-600">
              Presentación {indicePresentacion + 1} de {integrantes.length}
            </span>
          </div>

          <PresentacionViewer presentacionActual={presentacionActual} />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={anterior}
              className="flex items-center gap-2 rounded-lg border border-slate-300/50 bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-400/50 hover:bg-blue-50 shadow-sm hover:shadow-md"
            >
              <ChevronLeft size={18} />
              Anterior
            </button>

            <button
              onClick={siguiente}
              className="flex items-center gap-2 rounded-lg border border-slate-300/50 bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-400/50 hover:bg-blue-50 shadow-sm hover:shadow-md"
            >
              Siguiente
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            {integrantes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndicePresentacion(idx)}
                className={`h-2 rounded-full transition ${
                  idx === indicePresentacion
                    ? 'w-8 bg-amber-500'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir a presentación ${idx + 1}`}
              />
            ))}
          </div>

          {/* Presentaciones visualizables en orden; descargas deshabilitadas por pedido del usuario */}
        </div>
      </div>

      <footer className="border-t border-slate-400/20 bg-gradient-to-b from-slate-100 to-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-600">
          <p>Presentación concatenada · Grupo 3</p>
        </div>
      </footer>
    </div>
  )
}

function RoscoScreen() {
  const [estadoRosco, setEstadoRosco] = useState(
    Object.fromEntries(roscoDatos.map((dato) => [dato.letra, 'yellow']))
  )
  const [letraSeleccionada, setLetraSeleccionada] = useState(roscoDatos[0].letra)
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false)

  const cambiarEstado = (letra, estado) => {
    setEstadoRosco((prev) => ({ ...prev, [letra]: estado }))
    setMostrarRespuesta(false)
  }

  const reiniciarRosco = () => {
    setEstadoRosco(Object.fromEntries(roscoDatos.map((dato) => [dato.letra, 'yellow'])))
    setMostrarRespuesta(false)
  }

  const cuentaEstados = roscoDatos.reduce(
    (acc, dato) => {
      const estado = estadoRosco[dato.letra] || 'yellow'
      acc[estado] = (acc[estado] || 0) + 1
      return acc
    },
    { blue: 0, green: 0, red: 0, yellow: 0 }
  )

  const statusLabel = {
    green: 'Correcta verde',
    blue: 'Correcta azul',
    red: 'Incorrecta',
    yellow: 'No contestada',
  }

  const seleccion = roscoDatos.find((dato) => dato.letra === letraSeleccionada) || roscoDatos[0]

  const estadoColor = {
    green: 'bg-emerald-600 text-white',
    blue: 'bg-sky-600 text-white',
    red: 'bg-rose-600 text-white',
    yellow: 'bg-amber-400 text-slate-900',
  }

  return (
    <div className="space-y-0">
      <div className="border-b border-slate-400/20 bg-gradient-to-b from-slate-50 to-slate-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Juego interactivo</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">ROSCO Legal</h1>
          <p className="mt-4 text-lg text-slate-700">Marca las letras como correctas, incorrectas o no contestadas y revisa respuestas al instante.</p>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Estatus actual</p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
                  <span className="text-sm text-slate-700">Equipo verde</span>
                  <span className="font-semibold text-emerald-700">{cuentaEstados.green}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-sky-50 px-4 py-3">
                  <span className="text-sm text-slate-700">Equipo azul</span>
                  <span className="font-semibold text-sky-700">{cuentaEstados.blue}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-rose-50 px-4 py-3">
                  <span className="text-sm text-slate-700">Incorrectas</span>
                  <span className="font-semibold text-rose-700">{cuentaEstados.red}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3">
                  <span className="text-sm text-slate-700">No contestadas</span>
                  <span className="font-semibold text-amber-700">{cuentaEstados.yellow}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Instrucciones</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>Selecciona una letra para ver la definición y marca el resultado en el juego oral.</p>
                <p>Usa los botones para indicar si el Equipo Azul o Verde respondió correctamente, o si quedó sin respuesta.</p>
                <p>Haz clic en "Ver respuesta" cuando quieras confirmar la respuesta correcta.</p>
              </div>
              <button
                onClick={reiniciarRosco}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:from-slate-700 hover:to-slate-800"
              >
                Reiniciar Rosco
              </button>
            </div>
          </div>

          <div className="relative mx-auto mb-12 h-[520px] w-[520px] max-w-full rounded-full border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 shadow-inner">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-center shadow-lg">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">ROSCO</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">Legal</p>
                </div>
              </div>
            </div>

            {roscoDatos.map((dato, idx) => {
              const estado = estadoRosco[dato.letra]
              const angleRad = (idx / roscoDatos.length) * Math.PI * 2
              const radius = 220 // increased separation (px)
              const left = `calc(50% + ${Math.cos(angleRad) * radius}px)`
              const top = `calc(50% + ${Math.sin(angleRad) * radius}px)`

              return (
                <button
                  key={dato.letra}
                  type="button"
                  onClick={() => {
                    setLetraSeleccionada(dato.letra)
                    setMostrarRespuesta(false)
                  }}
                  style={{
                    position: 'absolute',
                    left,
                    top,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`flex items-center justify-center h-16 w-16 rounded-full border-2 border-white/40 shadow-lg transition-transform duration-200 focus:outline-none ${
                    estado === 'green'
                      ? 'bg-emerald-600 text-white'
                      : estado === 'blue'
                      ? 'bg-sky-600 text-white'
                      : estado === 'red'
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-400 text-slate-900'
                  } ${letraSeleccionada === dato.letra ? 'scale-125 ring-4 ring-white/30' : 'hover:scale-110'}`}
                >
                  <span className="font-serif font-bold text-xl select-none">{dato.letra}</span>
                </button>
              )
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Letra seleccionada</p>
                    <h2 className="mt-2 text-3xl font-serif font-bold text-slate-900">{seleccion.letra}</h2>
                  </div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${estadoColor[estadoRosco[seleccion.letra] || 'yellow']}`}>
                    {statusLabel[estadoRosco[seleccion.letra] || 'yellow']}
                  </span>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Definición</p>
                  <p className="mt-3 text-lg leading-8 text-slate-700">{seleccion.definicion}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => cambiarEstado(seleccion.letra, 'green')}
                    className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Correcta verde
                  </button>
                  <button
                    onClick={() => cambiarEstado(seleccion.letra, 'blue')}
                    className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                  >
                    Correcta azul
                  </button>
                  <button
                    onClick={() => cambiarEstado(seleccion.letra, 'red')}
                    className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                  >
                    Incorrecta
                  </button>
                  <button
                    onClick={() => cambiarEstado(seleccion.letra, 'yellow')}
                    className="rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
                  >
                    No contestada
                  </button>
                </div>

                <button
                  onClick={() => setMostrarRespuesta((prev) => !prev)}
                  className="rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  {mostrarRespuesta ? 'Ocultar respuesta' : 'Ver respuesta'}
                </button>

                {mostrarRespuesta && (
                  <div className="rounded-3xl border border-slate-200 bg-slate-100 p-5">
                    <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Respuesta</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">{seleccion.respuesta}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Leyenda</h3>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
                  <span className="inline-flex h-3 w-3 rounded-full bg-emerald-600" />
                  <span className="text-sm text-slate-700">Correcta verde: Equipo verde</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-sky-50 px-4 py-3">
                  <span className="inline-flex h-3 w-3 rounded-full bg-sky-600" />
                  <span className="text-sm text-slate-700">Correcta azul: Equipo azul</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-rose-50 px-4 py-3">
                  <span className="inline-flex h-3 w-3 rounded-full bg-rose-600" />
                  <span className="text-sm text-slate-700">Incorrecta</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3">
                  <span className="inline-flex h-3 w-3 rounded-full bg-amber-400" />
                  <span className="text-sm text-slate-700">No contestada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-400/20 bg-gradient-to-b from-slate-100 to-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-600">
          <p>Juego de preguntas y respuestas · ROSCO Jurídico</p>
        </div>
      </footer>
    </div>
  )
}

function QrScreen() {
  const [qrSrc, setQrSrc] = useState('/qr-code/qr-code.png')

  return (
    <div className="space-y-0">
      <div className="border-b border-slate-400/20 bg-gradient-to-b from-slate-50 to-slate-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Acceso Rápido</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900">Código QR</h1>
          <p className="mt-4 text-lg text-slate-700">Escanea este código QR para acceder a la página desde tu dispositivo móvil</p>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="rounded-2xl border border-slate-300/50 bg-gradient-to-br from-white to-slate-50 p-8 sm:p-12 shadow-lg hover:shadow-xl transition-all flex justify-center">
              <img
                src={qrSrc}
                onError={() => setQrSrc('/qr-code/site-qr.png')}
                alt="Código QR para acceder a la página"
                className="w-full max-w-md sm:max-w-lg rounded-xl shadow-md object-contain"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {[
                { paso: '1', titulo: 'Abre tu cámara', desc: 'Usa la aplicación de cámara o un lector QR de tu dispositivo móvil' },
                { paso: '2', titulo: 'Apunta al código', desc: 'Enfoca la cámara hacia el código QR mostrado arriba' },
                { paso: '3', titulo: 'Accede a la página', desc: 'Haz clic en el enlace que aparecerá para visitar la plataforma' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border border-slate-300/50 bg-gradient-to-br from-white to-slate-50 p-6 text-center hover:border-blue-400/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mb-4">
                    <span className="text-lg font-bold text-white">{item.paso}</span>
                  </div>
                  <h3 className="font-serif font-bold text-slate-900">{item.titulo}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-blue-300/50 bg-gradient-to-br from-blue-50 to-blue-100 p-6 w-full text-center">
              <p className="text-sm text-slate-700">
                💡 <span className="font-semibold">Consejo:</span> Puedes compartir este código con compañeros para que accedan a la plataforma desde sus dispositivos móviles de forma rápida y sencilla.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-slate-400/20 bg-gradient-to-b from-slate-100 to-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-600">
          <p>Código QR · Acceso rápido desde dispositivos móviles</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio')
  const [menuMobileAbierto, setMenuMobileAbierto] = useState(false)
  const [roscoAbierto, setRoscoAbierto] = useState(false)
  const [roscoAuthVisible, setRoscoAuthVisible] = useState(false)
  const [roscoAuthError, setRoscoAuthError] = useState('')

  const handleNavigate = (section) => {
    if (section === 'rosco' && !roscoAbierto) {
      setRoscoAuthError('')
      setRoscoAuthVisible(true)
      return
    }

    setSeccionActiva(section)
    setMenuMobileAbierto(false)
  }

  const handleRoscoAccess = (password) => {
    if (password.trim() === roscoPassword) {
      setRoscoAbierto(true)
      setSeccionActiva('rosco')
      setRoscoAuthVisible(false)
      setRoscoAuthError('')
      return
    }
    setRoscoAuthError('Contraseña incorrecta. Intenta nuevamente.')
  }

  return (
    <Shell>
      <Navbar
        activeSection={seccionActiva}
        onNavigate={handleNavigate}
        isMobileOpen={menuMobileAbierto}
        setIsMobileOpen={setMenuMobileAbierto}
      />

      {roscoAuthVisible && (
        <RoscoAuthModal
          onSubmit={handleRoscoAccess}
          onClose={() => setRoscoAuthVisible(false)}
          error={roscoAuthError}
        />
      )}

      <motion.div
        key={seccionActiva}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {seccionActiva === 'inicio' && <InicioScreen onNavigate={handleNavigate} />}
        {seccionActiva === 'guiones' && <GuionesScreen />}
        {seccionActiva === 'presentacion' && <PresentacionScreen />}
        {seccionActiva === 'rosco' && <RoscoScreen />}
        {seccionActiva === 'qr' && <QrScreen />}
      </motion.div>
    </Shell>
  )
}

export default App

function PresentacionViewer({ presentacionActual }) {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-slate-300/50 bg-gradient-to-br from-white to-slate-50 overflow-hidden shadow-lg p-6"
      >
        <div className={`h-1 rounded-t-md bg-gradient-to-r ${presentacionActual.color} mb-4`} />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${presentacionActual.color} shadow-md`}>
              <span className="text-lg font-bold text-white">{presentacionActual.id}</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">{presentacionActual.nombre}</h3>
              <p className="text-sm text-blue-600 font-semibold">{presentacionActual.tema}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => {
                e && e.preventDefault && e.preventDefault()
                e && e.stopPropagation && e.stopPropagation()
                setPreviewOpen(true)
              }}
              className="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
            >
              Ver Presentación
            </button>
            <button
              type="button"
              onClick={(e) => {
                e && e.preventDefault && e.preventDefault()
                e && e.stopPropagation && e.stopPropagation()
                descargarArchivo(rutas.presentacion(presentacionActual.id), `Presentacion.tema${presentacionActual.id}.pdf`)
              }}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 bg-slate-50"
            >
              Descargar
            </button>
          </div>
        </div>
      </motion.div>

      {previewOpen && (
        <PdfViewerModal
          src={rutas.presentacion(presentacionActual.id)}
          label={`Presentación - ${presentacionActual.nombre}`}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </>
  )
}
