/* ================================================================
   BasketIQ — DATA
   - ARCHITECTURE   → diagrama completo de arquitectura funcional target
     (Prototipo septiembre = una rebanada validada de esta arquitectura)
================================================================ */

/* ---------------- Architecture target diagram ----------------
   Vista WoW: la plataforma completa por capas + entidades externas.
   Se renderiza en SVG con un viewBox fijo. Las posiciones se calculan
   por columna (col) y fila (row) dentro de la banda a partir de su y/h.
------------------------------------------------------------- */
const ARCHITECTURE = {
  viewBox: { w: 1360, h: 980 },
  // columna principal (stack vertical de bandas)
  main: { x: 40, w: 980 },
  // columna lateral con entidades externas
  sidebar: { x: 1050, w: 290, y: 20, h: 940, label: 'ENTIDADES EXTERNAS' },

  bands: [
    {
      id: 'actors',
      label: 'ACTORES · HUMANOS',
      hint: 'Quiénes están al otro lado del sistema',
      kind: 'actor',
      y: 20,  h: 110,
      cols: 8
    },
    {
      id: 'channels',
      label: 'CANALES DE INTERACCIÓN',
      hint: 'Dónde entra y sale el valor',
      kind: 'channel',
      y: 150, h: 110,
      cols: 6
    },
    {
      id: 'orchestration',
      label: 'ORQUESTACIÓN DE CASOS',
      hint: 'Eventos, estados, gates humanos',
      kind: 'orchestration',
      y: 280, h: 90,
      cols: 1
    },
    {
      id: 'agents',
      label: 'AGENTES DE DOMINIO',
      hint: '12 agentes con contratos claros',
      kind: 'agent',
      y: 390, h: 200,
      cols: 6,
      rows: 2
    },
    {
      id: 'memory',
      label: 'CONTEXTO COMPARTIDO · MEMORIAS',
      hint: 'Base de verdad común a todos los agentes',
      kind: 'memory',
      y: 610, h: 100,
      cols: 4
    },
    {
      id: 'tools',
      label: 'HERRAMIENTAS DE PLATAFORMA',
      hint: 'Servicios reutilizables, no agentes',
      kind: 'tool',
      y: 730, h: 100,
      cols: 8
    },
    {
      id: 'governance',
      label: 'GOBIERNO Y OBSERVABILIDAD',
      hint: 'Human-in-the-loop trazable',
      kind: 'governance',
      y: 850, h: 100,
      cols: 6
    }
  ],

  items: [
    /* Actores — alineados con su canal principal (col) */
    { band: 'actors', col: 0, label: 'Director técnico',            sub: 'estructura del club',        highlight: true },
    { band: 'actors', col: 1, label: 'Coordinación deportiva',      sub: 'línea metodológica' },
    { band: 'actors', col: 2, label: 'Coordinador categoría',       sub: 'bajada por edad' },
    { band: 'actors', col: 3, label: '1er / 2º entrenador',         sub: 'día a día del equipo' },
    { band: 'actors', col: 4, label: 'Preparador físico',           sub: 'físico por edad' },
    { band: 'actors', col: 5, label: 'Entrenador experto · modelo', sub: 'co-facilita la ontología',   highlight: true, badge: 'nuevo' },
    { band: 'actors', col: 6, label: 'Jugador',                     sub: 'intervención + feedback' },
    { band: 'actors', col: 7, label: 'Familia',                     sub: 'watch · 2027',               muted: true },

    /* Canales */
    { band: 'channels', col: 0, label: 'WhatsApp staff',            sub: 'voz, crónicas, notas' },
    { band: 'channels', col: 1, label: 'Portal staff',              sub: 'vista integrada' },
    { band: 'channels', col: 2, label: 'Portal DT · gobierno',      sub: 'foco por categoría' },
    { band: 'channels', col: 3, label: 'Panel interno',             sub: 'ops y soporte' },
    { band: 'channels', col: 4, label: 'WhatsApp jugador',          sub: 'intervenciones gobernadas' },
    { band: 'channels', col: 5, label: 'Exportes · reporting',      sub: 'dirección y socios' },

    /* Orquestación de casos */
    { band: 'orchestration', col: 0, span: 'full',
      label: 'Magic · Orquestador de casos',
      sub: 'event bus · máquinas de estado (sesión · partido · intervención · ontología) · approval requests · gates humanos' },

    /* Agentes de dominio — 12 piezas (Magic ya vive en orquestación) */
    { band: 'agents', row: 0, col: 0, label: 'Rodman',    sub: 'Captura y estructuración' },
    { band: 'agents', row: 0, col: 1, label: 'LeBron',    sub: 'Contexto de equipo' },
    { band: 'agents', row: 0, col: 2, label: 'Bird',      sub: 'Planificación y aterrizaje' },
    { band: 'agents', row: 0, col: 3, label: 'Stockton',  sub: 'Preparación inteligente' },
    { band: 'agents', row: 0, col: 4, label: 'Jordan',    sub: 'Partido y señal' },
    { band: 'agents', row: 0, col: 5, label: 'Kobe',      sub: 'Intervención al jugador' },
    { band: 'agents', row: 1, col: 0, label: 'Curry',     sub: 'Feedback y adherencia' },
    { band: 'agents', row: 1, col: 1, label: 'Duncan',    sub: 'Coordinación y ops' },
    { band: 'agents', row: 1, col: 2, label: 'Olajuwon',  sub: 'Modelado · ontología',      highlight: true },
    { band: 'agents', row: 1, col: 3, label: 'Kareem',    sub: 'Gobierno del conocimiento' },
    { band: 'agents', row: 1, col: 4, label: 'Russell',   sub: 'Policy y compliance' },
    { band: 'agents', row: 1, col: 5, label: 'Jokic',     sub: 'Evaluación y rollout' },

    /* Memorias */
    { band: 'memory', col: 0, label: 'Operacional',            sub: 'estado vivo del club' },
    { band: 'memory', col: 1, label: 'Semántica · ontología',  sub: 'conceptos y metodología' },
    { band: 'memory', col: 2, label: 'Episódica',              sub: 'decisiones y secuencias' },
    { band: 'memory', col: 3, label: 'Gobierno · auditoría',   sub: 'consentimiento y trazas' },

    /* Herramientas */
    { band: 'tools', col: 0, label: 'BD operacional' },
    { band: 'tools', col: 1, label: 'Event bus' },
    { band: 'tools', col: 2, label: 'Policy engine' },
    { band: 'tools', col: 3, label: 'Búsqueda' },
    { band: 'tools', col: 4, label: 'Messaging' },
    { band: 'tools', col: 5, label: 'Recursos' },
    { band: 'tools', col: 6, label: 'Identity' },
    { band: 'tools', col: 7, label: 'Audit log' },

    /* Gobierno y observabilidad */
    { band: 'governance', col: 0, label: 'Consentimiento menores' },
    { band: 'governance', col: 1, label: 'Permisos por rol' },
    { band: 'governance', col: 2, label: 'Aprobaciones humanas' },
    { band: 'governance', col: 3, label: 'Métricas de calidad' },
    { band: 'governance', col: 4, label: 'Rollout review' },
    { band: 'governance', col: 5, label: 'Incident log' }
  ],

  /* Edges inter-banda para insinuar flujo (se dibujan finos y discretos) */
  edges: [
    ['actors:0', 'channels:2'], ['actors:1', 'channels:1'], ['actors:2', 'channels:1'],
    ['actors:3', 'channels:0'], ['actors:4', 'channels:0'], ['actors:5', 'channels:3'],
    ['actors:6', 'channels:4'], ['actors:7', 'channels:4'],

    ['channels:0', 'orchestration:0'], ['channels:1', 'orchestration:0'],
    ['channels:2', 'orchestration:0'], ['channels:3', 'orchestration:0'],
    ['channels:4', 'orchestration:0'], ['channels:5', 'orchestration:0'],

    ['orchestration:0', 'agents:0.0'], ['orchestration:0', 'agents:0.3'],
    ['orchestration:0', 'agents:0.5'], ['orchestration:0', 'agents:1.2'],

    ['agents:0.1', 'memory:0'], ['agents:1.2', 'memory:1'],
    ['agents:1.3', 'memory:1'], ['agents:0.5', 'memory:2'],
    ['agents:1.4', 'memory:3']
  ],

  /* Entidades externas: columna lateral derecha */
  externals: [
    { label: 'WhatsApp Business · Meta',         sub: 'canales conversacionales', icon: 'wa'    },
    { label: 'LLM · Vertex AI · Gemini',         sub: 'modelos de lenguaje',       icon: 'llm'   },
    { label: 'Google Workspace · identidad',     sub: 'SSO del club',              icon: 'id'    },
    { label: 'Cloud · GCP',                      sub: 'infra operativa',           icon: 'cloud' },
    { label: 'YouTube · canales formación',      sub: 'vídeos recomendados',       icon: 'yt',   highlight: true },
    { label: 'Fuentes vídeo y stats',            sub: 'Synergy · InStat · cámaras', icon: 'video' },
    { label: 'FEB · federaciones · comp.',       sub: 'calendario y resultados',   icon: 'feb'   },
    { label: 'Repositorios del club',            sub: 'documentos metodológicos',  icon: 'docs'  },
    { label: 'Partners · sponsors',              sub: 'engagement · 2027',         icon: 'spon', muted: true },
    { label: 'Boletines oficiales · ayudas',     sub: 'NEOTEC · EIC · CDTI...',    icon: 'grant' }
  ]
};
