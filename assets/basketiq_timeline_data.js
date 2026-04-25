/* ================================================================
   BasketIQ timeline — DATA
   SVG scenes (illustrations) + nodes + edges + milestones
================================================================ */

const SCENES = {
  cloud: `<path d="M16 42 Q16 26 32 26 Q36 14 48 18 Q60 16 62 30 Q72 32 70 44 L70 46 Q70 48 68 48 L18 48 Q12 48 12 44 Z" fill="url(#g-cloud)"/><circle cx="24" cy="52" r="2" fill="#ffb457"/><circle cx="36" cy="55" r="2" fill="#ff7a1a"/><circle cx="48" cy="52" r="2" fill="#3da9fc"/><circle cx="60" cy="55" r="2" fill="#4ade80"/><line x1="24" y1="52" x2="36" y2="55" stroke="rgba(255,255,255,0.25)"/><line x1="36" y1="55" x2="48" y2="52" stroke="rgba(255,255,255,0.25)"/><line x1="48" y1="52" x2="60" y2="55" stroke="rgba(255,255,255,0.25)"/><circle cx="38" cy="34" r="2.5" fill="white" opacity="0.7"/><circle cx="46" cy="38" r="1.8" fill="white" opacity="0.5"/>`,

  shield: `<path d="M40 6 L60 14 L60 30 Q60 44 40 54 Q20 44 20 30 L20 14 Z" fill="url(#g-shield)"/><path d="M40 6 L60 14 L60 30 Q60 44 40 54 Q20 44 20 30 L20 14 Z" fill="none" stroke="white" stroke-width="1" opacity="0.3"/><path d="M28 28 L36 36 L52 22" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="40" cy="16" r="2" fill="white" opacity="0.6"/>`,

  key: `<rect x="14" y="12" width="34" height="40" rx="4" fill="url(#g-key)"/><rect x="14" y="12" width="34" height="40" rx="4" fill="none" stroke="white" stroke-width="1" opacity="0.25"/><circle cx="31" cy="24" r="6" fill="white"/><path d="M21 40 Q21 32 31 32 Q41 32 41 40 L41 44 L21 44 Z" fill="white"/><circle cx="62" cy="32" r="7" fill="none" stroke="#ffb457" stroke-width="3"/><rect x="55" y="31" width="10" height="3" fill="#ffb457"/><rect x="52" y="31" width="2" height="5" fill="#ffb457"/><rect x="56" y="31" width="2" height="5" fill="#ffb457"/>`,

  database: `<ellipse cx="40" cy="10" rx="22" ry="6" fill="url(#g-db)"/><path d="M18 10 L18 22 Q18 28 40 28 Q62 28 62 22 L62 10" fill="url(#g-db)"/><ellipse cx="40" cy="22" rx="22" ry="6" fill="rgba(255,255,255,0.12)"/><path d="M18 28 L18 40 Q18 46 40 46 Q62 46 62 40 L62 28" fill="url(#g-db)" opacity="0.85"/><ellipse cx="40" cy="40" rx="22" ry="6" fill="rgba(255,255,255,0.12)"/><path d="M18 46 L18 54 Q18 60 40 60 Q62 60 62 54 L62 46" fill="url(#g-db)" opacity="0.7"/><ellipse cx="40" cy="54" rx="22" ry="6" fill="rgba(255,255,255,0.12)"/><circle cx="32" cy="10" r="1.5" fill="white"/><circle cx="46" cy="10" r="1.5" fill="white" opacity="0.6"/>`,

  network: `<line x1="40" y1="30" x2="14" y2="12" stroke="rgba(255,255,255,0.3)"/><line x1="40" y1="30" x2="64" y2="12" stroke="rgba(255,255,255,0.3)"/><line x1="40" y1="30" x2="10" y2="42" stroke="rgba(255,255,255,0.3)"/><line x1="40" y1="30" x2="70" y2="44" stroke="rgba(255,255,255,0.3)"/><line x1="40" y1="30" x2="40" y2="56" stroke="rgba(255,255,255,0.3)"/><circle cx="40" cy="30" r="11" fill="url(#g-on)"/><path d="M29 30 h22 M40 19 v22 M30 22 Q40 32 50 22 M30 38 Q40 28 50 38" stroke="rgba(0,0,0,0.3)" stroke-width="0.8" fill="none"/><circle cx="14" cy="12" r="4" fill="#3da9fc"/><circle cx="64" cy="12" r="4" fill="#4ade80"/><circle cx="10" cy="42" r="4" fill="#ec4899"/><circle cx="70" cy="44" r="4" fill="#a78bfa"/><circle cx="40" cy="56" r="4" fill="#ffb457"/>`,

  brain: `<path d="M30 12 Q20 12 20 22 Q14 24 16 32 Q14 42 22 46 Q24 52 32 48 Q36 54 40 50 Q44 54 48 48 Q56 52 58 46 Q66 42 64 32 Q66 24 60 22 Q60 12 50 12 Q45 8 40 12 Q35 8 30 12 Z" fill="url(#g-mem)"/><path d="M28 20 Q32 26 28 32 Q32 38 28 44" stroke="rgba(255,255,255,0.45)" stroke-width="1.3" fill="none"/><path d="M40 16 Q40 30 40 48" stroke="rgba(255,255,255,0.45)" stroke-width="1.3" fill="none"/><path d="M52 20 Q48 26 52 32 Q48 38 52 44" stroke="rgba(255,255,255,0.45)" stroke-width="1.3" fill="none"/><circle cx="26" cy="28" r="1.8" fill="#ffb457"/><circle cx="54" cy="28" r="1.8" fill="#ffb457"/><circle cx="32" cy="38" r="1.8" fill="#ffb457"/><circle cx="48" cy="38" r="1.8" fill="#ffb457"/>`,

  whistle: `<ellipse cx="28" cy="32" rx="16" ry="12" fill="url(#g-coach)"/><rect x="42" y="26" width="10" height="6" rx="1" fill="url(#g-coach)"/><circle cx="28" cy="32" r="4" fill="#1a2030"/><circle cx="28" cy="32" r="1.5" fill="#ffb457"/><path d="M18 18 L22 12" stroke="#8a93a6" stroke-width="2" stroke-linecap="round"/><path d="M58 18 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill="#a78bfa" stroke="white" stroke-width="0.8"/><path d="M54 38 Q60 42 54 48" stroke="url(#g-coach)" stroke-width="2.2" fill="none" opacity="0.7" stroke-linecap="round"/><path d="M58 34 Q66 42 58 50" stroke="url(#g-coach)" stroke-width="2" fill="none" opacity="0.45" stroke-linecap="round"/>`,

  calendar: `<rect x="14" y="10" width="40" height="42" rx="4" fill="url(#g-plan)"/><rect x="14" y="10" width="40" height="10" fill="#1e3a5f"/><rect x="19" y="6" width="3" height="8" rx="1" fill="#1a2030"/><rect x="46" y="6" width="3" height="8" rx="1" fill="#1a2030"/><circle cx="22" cy="28" r="1.8" fill="white" opacity="0.5"/><circle cx="29" cy="28" r="1.8" fill="white" opacity="0.5"/><circle cx="36" cy="28" r="1.8" fill="white" opacity="0.5"/><circle cx="43" cy="28" r="1.8" fill="white" opacity="0.5"/><circle cx="22" cy="36" r="1.8" fill="white" opacity="0.5"/><circle cx="29" cy="36" r="3" fill="#ff7a1a"/><path d="M27.5 36 L28.5 37.5 L30.5 34.5" stroke="white" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="36" r="1.8" fill="white" opacity="0.5"/><circle cx="43" cy="36" r="1.8" fill="white" opacity="0.5"/><circle cx="22" cy="44" r="1.8" fill="white" opacity="0.5"/><circle cx="29" cy="44" r="1.8" fill="white" opacity="0.5"/><circle cx="36" cy="44" r="1.8" fill="white" opacity="0.5"/><circle cx="43" cy="44" r="1.8" fill="white" opacity="0.5"/><circle cx="62" cy="40" r="8" fill="#ff7a1a"/><path d="M54 40 h16 M62 32 v16 M55 33 Q62 40 69 33 M55 47 Q62 40 69 47" stroke="#1a1a1a" stroke-width="0.8" fill="none"/>`,

  sparkles: `<rect x="14" y="6" width="36" height="50" rx="4" fill="url(#g-rec)"/><rect x="14" y="6" width="36" height="50" rx="4" fill="none" stroke="white" stroke-width="1" opacity="0.25"/><circle cx="32" cy="20" r="6" fill="white"/><path d="M22 40 Q22 30 32 30 Q42 30 42 40 L42 46 L22 46 Z" fill="white"/><rect x="15" y="46" width="34" height="8" fill="rgba(0,0,0,0.28)"/><text x="32" y="52" font-size="5.5" font-weight="800" fill="white" text-anchor="middle" letter-spacing="1">U18 · TOP</text><path d="M60 16 l2.5 6 l6 1 l-5 4 l1.5 6 l-5 -3 l-5 3 l1.5 -6 l-5 -4 l6 -1 z" fill="#fde047" stroke="#f59e0b" stroke-width="1"/><circle cx="56" cy="38" r="2" fill="#fde047"/><circle cx="68" cy="44" r="2.5" fill="#fde047"/><circle cx="64" cy="52" r="1.5" fill="#fde047"/>`,

  reply: `<path d="M14 12 L62 12 Q68 12 68 18 L68 36 Q68 42 62 42 L32 42 L22 52 L24 42 L14 42 Q8 42 8 36 L8 18 Q8 12 14 12 Z" fill="url(#g-fb)"/><path d="M14 12 L62 12 Q68 12 68 18 L68 36 Q68 42 62 42 L32 42 L22 52 L24 42 L14 42 Q8 42 8 36 L8 18 Q8 12 14 12 Z" fill="none" stroke="white" stroke-width="1" opacity="0.3"/><path d="M38 22 Q34 18 30 22 Q26 26 30 30 L38 36 L46 30 Q50 26 46 22 Q42 18 38 22 Z" fill="white"/><path d="M72 32 Q78 32 78 26" stroke="#ffb457" stroke-width="2.5" fill="none" stroke-linecap="round"/><polygon points="78,24 75,26 78,28 81,26" fill="#ffb457"/>`,

  phone: `<rect x="28" y="6" width="26" height="48" rx="4" fill="#1a2030" stroke="rgba(255,255,255,0.25)" stroke-width="1"/><rect x="31" y="10" width="20" height="36" fill="#0b0e14"/><rect x="38" y="8" width="6" height="1" rx="0.5" fill="#2a3040"/><rect x="33" y="14" width="16" height="8" rx="3" fill="url(#g-wa)"/><rect x="36" y="17" width="1.2" height="3" fill="white"/><rect x="38" y="15" width="1.2" height="7" fill="white"/><rect x="40" y="14" width="1.2" height="9" fill="white"/><rect x="42" y="15" width="1.2" height="7" fill="white"/><rect x="44" y="16" width="1.2" height="5" fill="white"/><rect x="46" y="17" width="1.2" height="3" fill="white"/><rect x="34" y="26" width="12" height="4" rx="2" fill="#2a3040"/><path d="M38 28 l1 1 l2 -2" stroke="#25D366" stroke-width="0.8" fill="none"/><rect x="34" y="33" width="16" height="8" rx="3" fill="url(#g-wa)"/><rect x="36" y="36" width="1.2" height="3" fill="white"/><rect x="38" y="35" width="1.2" height="5" fill="white"/><rect x="40" y="34" width="1.2" height="7" fill="white"/><rect x="42" y="35" width="1.2" height="5" fill="white"/><rect x="44" y="36" width="1.2" height="3" fill="white"/><path d="M58 22 Q64 30 58 38" stroke="#25D366" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round"/><path d="M62 18 Q70 30 62 42" stroke="#25D366" stroke-width="2" fill="none" opacity="0.4" stroke-linecap="round"/>`,

  portal: `<rect x="10" y="8" width="60" height="38" rx="3" fill="#1a2030" stroke="rgba(255,255,255,0.25)"/><rect x="13" y="11" width="54" height="32" fill="#0b0e14"/><rect x="16" y="30" width="5" height="10" fill="url(#g-portal)"/><rect x="23" y="25" width="5" height="15" fill="url(#g-portal)"/><rect x="30" y="20" width="5" height="20" fill="url(#g-portal)"/><rect x="37" y="28" width="5" height="12" fill="url(#g-portal)"/><rect x="44" y="22" width="5" height="18" fill="url(#g-portal)"/><polyline points="16,22 24,18 32,14 40,16 48,10 56,12" stroke="#3da9fc" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24" cy="18" r="1.5" fill="#3da9fc"/><circle cx="40" cy="16" r="1.5" fill="#3da9fc"/><circle cx="48" cy="10" r="1.5" fill="#3da9fc"/><circle cx="60" cy="18" r="5" fill="#ff7a1a"/><path d="M55 18 h10 M60 13 v10 M56 14 Q60 18 64 14 M56 22 Q60 18 64 22" stroke="#1a1a1a" stroke-width="0.6" fill="none"/><rect x="26" y="46" width="28" height="3" fill="#2a3040"/><rect x="34" y="49" width="12" height="5" fill="#2a3040"/>`,

  activity: `<rect x="6" y="12" width="68" height="40" rx="3" fill="#142034" stroke="#3a4560" stroke-width="1"/><line x1="40" y1="12" x2="40" y2="52" stroke="#3a4560" stroke-width="1"/><circle cx="40" cy="32" r="6" fill="none" stroke="#3a4560" stroke-width="1"/><path d="M6 24 Q18 32 6 40" fill="none" stroke="#3a4560" stroke-width="1"/><path d="M74 24 Q62 32 74 40" fill="none" stroke="#3a4560" stroke-width="1"/><circle cx="18" cy="28" r="6" fill="url(#g-court)" opacity="0.55"/><circle cx="24" cy="38" r="5" fill="url(#g-court)" opacity="0.8"/><circle cx="32" cy="22" r="3.5" fill="url(#g-court)" opacity="0.5"/><circle cx="50" cy="40" r="3" fill="url(#g-court)" opacity="0.4"/><circle cx="60" cy="20" r="7" fill="#ff7a1a"/><path d="M53 20 h14 M60 13 v14 M54 14 Q60 21 66 14 M54 26 Q60 19 66 26" stroke="#1a1a1a" stroke-width="0.7" fill="none"/><path d="M30 44 Q44 42 54 24" stroke="#ffb457" stroke-width="1.8" fill="none" stroke-dasharray="3,2"/>`,

  user: `<path d="M18 12 L28 6 L38 10 L48 6 L58 12 L58 48 Q58 52 54 52 L22 52 Q18 52 18 48 Z" fill="url(#g-player)"/><path d="M18 12 L28 6 L38 10 L48 6 L58 12 L58 48 Q58 52 54 52 L22 52 Q18 52 18 48 Z" fill="none" stroke="white" stroke-width="1" opacity="0.25"/><path d="M28 6 Q38 16 48 6" stroke="white" stroke-width="1.3" fill="none" opacity="0.5"/><text x="38" y="36" font-size="16" font-weight="900" fill="white" text-anchor="middle">23</text><rect x="60" y="20" width="16" height="28" rx="2" fill="#1a2030" stroke="rgba(255,255,255,0.3)"/><rect x="62" y="23" width="12" height="20" fill="#0b0e14"/><circle cx="74" cy="22" r="4" fill="#ff7a1a"/><text x="74" y="24.8" font-size="5" font-weight="800" fill="white" text-anchor="middle">1</text><rect x="64" y="27" width="8" height="2" rx="1" fill="#3da9fc"/><rect x="64" y="31" width="6" height="2" rx="1" fill="rgba(255,255,255,0.35)"/><rect x="64" y="35" width="8" height="2" rx="1" fill="rgba(255,255,255,0.35)"/><rect x="64" y="39" width="5" height="2" rx="1" fill="rgba(255,255,255,0.35)"/>`,

  hub: `<circle cx="40" cy="30" r="22" fill="none" stroke="rgba(255,180,87,0.18)" stroke-width="1" stroke-dasharray="2 3"/><circle cx="40" cy="30" r="15" fill="none" stroke="rgba(255,180,87,0.35)" stroke-width="1" stroke-dasharray="2 3"/><circle cx="40" cy="30" r="10" fill="url(#g-on)"/><circle cx="40" cy="30" r="4" fill="#fff" opacity="0.85"/><path d="M30 22 L22 14" stroke="rgba(255,180,87,0.6)" stroke-width="1.3" fill="none"/><path d="M50 22 L58 14" stroke="rgba(255,180,87,0.6)" stroke-width="1.3" fill="none"/><path d="M30 38 L22 48" stroke="rgba(255,180,87,0.6)" stroke-width="1.3" fill="none"/><path d="M50 38 L58 48" stroke="rgba(255,180,87,0.6)" stroke-width="1.3" fill="none"/><path d="M30 30 L14 30" stroke="rgba(255,180,87,0.45)" stroke-width="1.1" fill="none"/><path d="M50 30 L66 30" stroke="rgba(255,180,87,0.45)" stroke-width="1.1" fill="none"/><circle cx="22" cy="14" r="2.2" fill="#3da9fc"/><circle cx="58" cy="14" r="2.2" fill="#ec4899"/><circle cx="22" cy="48" r="2.2" fill="#4ade80"/><circle cx="58" cy="48" r="2.2" fill="#a78bfa"/><circle cx="14" cy="30" r="2" fill="#ffb457"/><circle cx="66" cy="30" r="2" fill="#ffb457"/>`,

  lens: `<rect x="8" y="8" width="64" height="34" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" stroke-dasharray="2 3"/><path d="M10 36 Q22 24 40 28 Q58 32 72 20" stroke="url(#g-mem)" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="20" cy="30" r="2.5" fill="#3da9fc"/><circle cx="40" cy="28" r="2.8" fill="#ff7a1a"/><circle cx="58" cy="26" r="2.5" fill="#ec4899"/><circle cx="70" cy="21" r="2.2" fill="#a78bfa"/><ellipse cx="40" cy="50" rx="16" ry="6" fill="none" stroke="#ffb457" stroke-width="1.6"/><circle cx="40" cy="50" r="3.5" fill="#ffb457"/><circle cx="40" cy="50" r="1.3" fill="#0b0e14"/>`
};

const NODES = [
  // ACTORES — humanos que interactúan con el sistema a través de los canales.
  // Viven en Y negativa para no tocar las coordenadas del resto del diagrama.
  { id:'a-coach',  kind:'actor', label:'Entrenador',            sub:'voz + día a día',            x:180, y:-122, w:120, h:88 },
  { id:'a-expert', kind:'actor', label:'Entrenador del modelo', sub:'co-facilita la ontología',   x:320, y:-122, w:120, h:88 },
  { id:'a-staff',  kind:'actor', label:'Staff del club',        sub:'coordinador · DT · PF',      x:460, y:-122, w:120, h:88 },
  { id:'a-player', kind:'actor', label:'Jugador',               sub:'recibe plan + feedback',     x:600, y:-122, w:120, h:88 },

  // CANALES — 3 nodos, w=140, h=135 (alineados horizontalmente con conocimiento y plataforma)
  { id:'wa-coach',       label:'WhatsApp · Coach',   sub:'La voz del coach entra al sistema', x:170, y:30,  w:140, h:135, scene:'phone'    },
  { id:'staff-portal',   label:'Portal Staff',       sub:'Todo el club en un vistazo',         x:380, y:30,  w:140, h:135, scene:'portal'   },
  { id:'player-channel', label:'Canal Jugador',      sub:'El jugador, en el centro',           x:590, y:30,  w:140, h:135, scene:'user'     },

  // IA Y AGENTES ESPECIALIZADOS — 7 nodos, w=115, h=160 (un poco más altos para alojar label a 2 líneas)
  { id:'orchestrator',   label:'Orquestador',        sub:'Despacha eventos',                   x:20,  y:225, w:115, h:160, scene:'hub'      },
  { id:'coach-agent',    label:'Agente del entrenador', sub:'Comprende e interpreta',          x:145, y:225, w:115, h:160, scene:'whistle'  },
  { id:'context',        label:'Contexto de equipo', sub:'Lee memoria + BD',                   x:270, y:225, w:115, h:160, scene:'lens'     },
  { id:'planner',        label:'Planner',            sub:'Propone sesiones',                   x:395, y:225, w:115, h:160, scene:'calendar' },
  { id:'match-agent',    label:'Partido y señal',    sub:'Señales post-partido',               x:520, y:225, w:115, h:160, scene:'activity' },
  { id:'recommender',    label:'Recomendador U18',   sub:'Propuestas por jugador',             x:645, y:225, w:115, h:160, scene:'sparkles' },
  { id:'feedback',       label:'Feedback Agent',     sub:'Recoge feedback',                    x:770, y:225, w:115, h:160, scene:'reply'    },

  // BASE DE CONOCIMIENTOS — 3 nodos, w=140, h=135
  { id:'database',       label:'Base de datos',      sub:'Historia viva del club',             x:170, y:445, w:140, h:135, scene:'database' },
  { id:'ontology',       label:'Ontología',          sub:'El lenguaje del club',               x:380, y:445, w:140, h:135, scene:'network'  },
  { id:'memory',         label:'Memoria de equipo',  sub:'Recuerda cada entreno',              x:590, y:445, w:140, h:135, scene:'brain'    },

  // PLATAFORMA OPERATIVA — text-only, compact (scene: null)
  { id:'cloud',          label:'Cloud · Infra',      sub:'Cimientos digitales del club',       x:170, y:645, w:140, h:70,  scene:null       },
  { id:'security',       label:'Seguridad',          sub:'Protección por diseño',              x:380, y:645, w:140, h:70,  scene:null       },
  { id:'identity',       label:'Identidad',          sub:'Cada persona, su acceso',            x:590, y:645, w:140, h:70,  scene:null       }
];

const EDGES = [
  // Actores → canales (humanos que interactúan con el sistema)
  ['a-coach','wa-coach'],
  ['a-expert','staff-portal'],
  ['a-staff','staff-portal'],
  ['a-player','player-channel'],
  // Canal → captura
  ['wa-coach','coach-agent'],
  // Outputs de captura
  ['coach-agent','database'],
  ['coach-agent','ontology'],
  ['coach-agent','staff-portal'],
  ['coach-agent','orchestrator'],
  // Orquestador despacha
  ['orchestrator','context'],
  ['orchestrator','planner'],
  ['orchestrator','match-agent'],
  // Contexto lee del knowledge layer
  ['database','context'],
  ['ontology','context'],
  ['memory','context'],
  // Contexto alimenta al Planner y al Recomendador
  ['context','planner'],
  ['context','recommender'],
  // Planner apoyado en memoria + ontología
  ['ontology','planner'],
  ['memory','planner'],
  ['planner','staff-portal'],
  ['planner','recommender'],
  // Partido → Recomendador
  ['match-agent','recommender'],
  ['database','recommender'],
  // Salidas del Recomendador
  ['recommender','staff-portal'],
  ['recommender','player-channel'],
  // Bucle jugador
  ['player-channel','feedback'],
  ['feedback','memory']
];

const MILESTONES = [
  { date:'23 abril', phase:'T–0', title:'Punto de partida con rumbo claro',
    actor_say:'No partimos de cero: tenemos arquitectura propuesta, pruebas de concepto hechas, un backlog priorizado y una meta clara. Toca ejecutar.',
    new_nodes:[], new_features:[] },

  { date:'30 abril', phase:'Semana 1', title:'Fundamentos + primera crónica',
    actor_say:'Los fundamentos están listos y los validamos con una prueba funcional real: el entrenador dicta su feedback del partido por WhatsApp y el agente del entrenador lo comprende e interpreta (no es pass-through). De esa comprensión salen dos artefactos — la crónica publicable y el feedback estructurado que alimenta la base de conocimiento del club.',
    new_nodes:['a-coach','cloud','security','identity','wa-coach','coach-agent','database'],
    new_features:[
      'Infraestructura cloud segura y reproducible',
      'Identidad y control de acceso del club',
      'Marco de seguridad y gestión de secretos',
      'WhatsApp conectado al sistema',
      'Agente del entrenador · comprende e interpreta el feedback (no es pass-through)',
      'Salida 1 · Crónica publicable lista para comunicación del club',
      'Salida 2 · Feedback estructurado en la base de conocimiento (consulta posterior, evolución, retrospectivas)',
      'Base preparada para que ese feedback refine la ontología del club cuando llegue',
      'Prueba funcional end-to-end que valida todos los fundamentos'
    ] },

  { date:'15 mayo', phase:'Semana 3', title:'Captura operativa completa del coach',
    actor_say:'El coach ya tiene todo su día a día capturado por WhatsApp — el Orquestador se encarga de enrutar cada evento (crónica, sesión, feedback, asistencia) al agente correcto.',
    new_nodes:['orchestrator'],
    new_features:[
      'Registro estructurado de sesión (calentamiento / parte principal / cierre)',
      'Feedback post-sesión del coach (qué funcionó, qué no)',
      'Asistencia y continuidad del grupo',
      'Alertas de continuidad (faltas repetidas)',
      'Histórico de sesiones, feedback y asistencia consultable',
      'Orquestador: escucha el bus de eventos y despacha al agente correcto'
    ] },

  { date:'30 mayo', phase:'Semana 5', title:'Ontología y Portal Staff',
    actor_say:'El staff ya navega un portal unificado y el club habla un único idioma gracias a la ontología compartida.',
    new_nodes:['a-staff','a-expert','staff-portal','ontology'],
    new_features:[
      'Portal unificado para el staff',
      'Ontología / contexto v0 del club',
      'Vista integrada de los equipos en un mismo lugar',
      'Setup listo para arrancar el ciclo con el coach'
    ] },

  { date:'22 junio', phase:'Semana 9', title:'Ciclo con el coach',
    actor_say:'El agente Contexto construye una lectura viva del equipo a partir de la memoria, la BD y la ontología; sobre esa lectura el Planner propone la próxima sesión y el coach la ratifica.',
    new_nodes:['memory','planner','context'],
    new_features:[
      'Memoria de equipo a lo largo del tiempo',
      'Agente Contexto: arma `ContextBrief` con memoria + BD + ontología',
      'Agente Planner propone la próxima sesión sobre el contexto',
      'Ciclo voz → crónica → contexto → plan, ratificado con el coach',
      'Propuestas contextualizadas y explicables'
    ] },

  { date:'7 julio', phase:'Semana 11', title:'Recomendador U18',
    actor_say:'Tras cada partido, el agente Partido y señal convierte los eventos (cierre, resultado, estadísticas) en señales accionables; el Recomendador U18 las usa para proponer al coach qué trabajar con cada jugador.',
    new_nodes:['recommender','match-agent'],
    new_features:[
      'Agente Partido y señal: procesa eventos del partido (`game_closed`, resultado, stats)',
      'Generación de `Signal` / `PostGameInsight` a partir de cada partido',
      'Recomendador U18 con propuesta por jugador',
      'Enlace partido → señal → recomendación → próxima sesión'
    ] },

  { date:'30 julio', phase:'Semana 14', title:'Canal jugador y bucle cerrado',
    actor_say:'Cada jugador ya tiene su canal con su plan personalizado; su feedback entra al sistema y ajusta las próximas sesiones. Últimas funcionalidades antes del parón de verano.',
    new_nodes:['a-player','player-channel','feedback'],
    new_features:[
      'Canal del jugador (lectura + feedback)',
      'Resumen personalizado por jugador',
      'Feedback del jugador retroalimenta al Planner',
      'Bucle cerrado: voz del coach → jugador → ajuste',
      'Últimas funcionalidades antes del parón de verano'
    ] }
];

/* ================================================================
   MILESTONE ENABLERS — texto del modal que aparece al entrar en cada
   etapa del timeline. Reglas:
   - body ≤ 250 caracteres (texto plano, contando <strong>/<em> como 0)
   - <strong> para destacar sujeto y acción clave
   - <em> para vocabulario de flujo (voz-coach → jugador → ajuste)
   - duración fija 5 s con barra de progreso
================================================================ */
const MILESTONE_ENABLERS = [
  {
    title: 'Punto de partida con rumbo claro',
    body:  'No es un lienzo en blanco. Tenemos <strong>arquitectura propuesta</strong>, <strong>pruebas de concepto</strong> hechas, <strong>backlog priorizado</strong> y <strong>meta clara</strong>. Toca ejecutar.'
  },
  {
    title: 'La voz del entrenador ya entra',
    body:  'El <strong>entrenador</strong> dicta el feedback por <strong>WhatsApp</strong>. El <strong>agente</strong> lo <strong>interpreta</strong> (no es pass-through) y produce dos salidas: <strong>crónica publicable</strong> y <strong>feedback estructurado</strong> en la base de conocimiento.'
  },
  {
    title: 'Captura completa del día a día',
    body:  'Todo el día a día del <strong>entrenador</strong> entra por <strong>WhatsApp</strong>: crónicas, sesiones, feedback, asistencia. El <strong>Orquestador</strong> enruta cada evento al agente correcto.'
  },
  {
    title: 'Portal staff + ontología compartida',
    body:  'El <strong>staff</strong> navega un <strong>portal unificado</strong> y el club habla un <strong>único idioma</strong> con la ontología. El <strong>entrenador del modelo</strong> valida los conceptos.'
  },
  {
    title: 'Ciclo completo con el entrenador',
    body:  '<strong>Contexto</strong> lee memoria + BD + ontología. <strong>Planner</strong> propone la próxima sesión. El <strong>entrenador</strong> la ratifica antes de usarla: <em>voz → contexto → plan</em>.'
  },
  {
    title: 'Partido → señal → recomendación',
    body:  'Cada partido se convierte en <strong>señales accionables</strong>. El <strong>Recomendador U18</strong> propone al entrenador qué trabajar con cada jugador tras cada encuentro.'
  },
  {
    title: 'Bucle cerrado con el jugador',
    body:  'El <strong>jugador</strong> recibe su <strong>plan personalizado</strong> y da feedback. Su respuesta ajusta las siguientes sesiones: <em>coach → jugador → ajuste</em> cerrado.'
  }
];

/* ================================================================
   PLAN MENSUAL — agosto 2026 en adelante
   Base: ~5 épicas/mes observadas hasta 30 jul (17 épicas en 3.2 meses)
   Épicas formales restantes (por prioridad):
     EP-18 P0 · EP-16 P1 · EP-13 P1 · EP-17 P2
   Después → iteración v2 / extensiones / escalado multi-club.
================================================================ */

const PLAN_MONTHS = [
  {
    month: 'Agosto 2026',
    kind: 'paron',
    badge: 'Parón',
    headline: 'Rest, estabilización, preparación',
    desc: 'No hay entregas nuevas. Monitorización del piloto activo y consolidación de todo lo entregado antes del 30 de julio.',
    items: [
      'Monitorización continua del piloto (coach + jugador)',
      'Estabilización de lo entregado a 30 de julio',
      'Preparación del guion y la demo de septiembre'
    ]
  },
  {
    month: 'Septiembre 2026',
    kind: 'demo',
    badge: 'Demo + piloto',
    headline: 'Demo fuerte y arranque del piloto ampliado',
    desc: 'Mes apoyado 100 % en lo ya entregado. Pulido final, ensayos y narrativa end-to-end para socios y patrocinadores.',
    items: [
      'Demo end-to-end: voz del coach → crónica → plan → jugador → feedback',
      'Piloto multi-equipo dentro del club piloto',
      'Métricas iniciales de adopción y adherencia',
      'Onboarding narrativo a socios y patrocinadores'
    ]
  },
  {
    month: 'Octubre 2026',
    kind: 'delivery',
    badge: '1 categoría / mes',
    headline: 'Implantación controlada y desarrollo individual',
    desc: 'Empieza la cadencia mensual de implantación: entra una nueva categoría priorizada por Director Técnico y coordinación deportiva mientras el track jugador pasa de demo a uso real en temporada.',
    items: [
      'Cadencia club · implantación de 1 nueva categoría en el sistema',
      'Track jugador · EP-22 para desarrollo individual y seguimiento real del jugador',
      'Foco DT / club · revisión mensual de focos, coherencia y expansión en la nueva categoría'
    ]
  },
  {
    month: 'Noviembre 2026',
    kind: 'delivery',
    badge: '1 categoría / mes',
    headline: 'Temporada, familias y match cycle v2',
    desc: 'La plataforma deja de ser solo piloto: sostiene temporada, conecta mejor partido y seguimiento individual, y añade comunicación operativa con familias sin perder el gobierno por categoría.',
    items: [
      'Cadencia club · implantación de 1 nueva categoría en el sistema',
      'Temporada · EP-23 comunicación con familias + EP-28 match cycle v2',
      'Preparación física · EP-29 y soporte del DT a categorías ya activas'
    ]
  },
  {
    month: 'Diciembre 2026',
    kind: 'delivery',
    badge: '1 categoría / mes',
    headline: 'Cierre de trimestre con gobierno y reporting',
    desc: 'El foco pasa a gobierno de club, reporting y decisión de expansión: el Director Técnico y la junta reciben una lectura útil de qué se consolida, qué se corrige y qué se expande.',
    items: [
      'Cadencia club · implantación de 1 nueva categoría en el sistema',
      'Gobierno club · EP-25 reporting institucional + EP-26 permisos y acceso',
      'Conocimiento · EP-27 + EP-31 para consolidar, iterar o pausar líneas activas'
    ]
  },
  {
    month: 'Enero 2027',
    kind: 'extension',
    badge: 'Track E',
    headline: 'Arranque de contenidos desde actividad real',
    desc: 'Se abre 2027 por contenidos, no por engagement: primero se estructura mejor la actividad real del club para poder reutilizarla después en comunicación.',
    items: [
      'Cadencia club · nueva categoría implantada o siguiente categoría consolidada',
      'Track E · EP-E1 captura estructurada de eventos e hitos del club',
      'Foco DT / club · definir qué hitos deportivos e institucionales requieren validación'
    ]
  },
  {
    month: 'Febrero 2027',
    kind: 'extension',
    badge: 'Track E',
    headline: 'Piezas de comunicación desde crónicas y eventos',
    desc: 'La capa de contenido reutiliza crónicas, resultados e hitos reales del club para generar borradores útiles sin depender de redacción manual desde cero.',
    items: [
      'Cadencia club · nueva categoría implantada o siguiente categoría consolidada',
      'Track E · EP-E2 generación de piezas desde crónicas, eventos e hitos',
      'Cobertura · revisión del DT sobre equipos y categorías bien representados o invisibles'
    ]
  },
  {
    month: 'Marzo 2027',
    kind: 'extension',
    badge: 'Track E',
    headline: 'Flujo editorial gobernado por rol',
    desc: 'El contenido deja de ser solo generación automática y pasa a flujo editorial con estados, validación y criterio de revisión por rol para piezas deportivas o institucionales.',
    items: [
      'Cadencia club · nueva categoría implantada o siguiente categoría consolidada',
      'Track E · EP-E3 flujo editorial y validación antes de publicar',
      'Foco DT / club · reglas de aprobación por rol en piezas deportivas e institucionales'
    ]
  },
  {
    month: 'Abril 2027',
    kind: 'extension',
    badge: 'Track E',
    headline: 'Calendario editorial del club',
    desc: 'La comunicación del club se ordena en el tiempo y por categoría, evitando semanas vacías o saturadas y dando visibilidad a qué partes del club están siendo contadas.',
    items: [
      'Cadencia club · nueva categoría implantada o siguiente categoría consolidada',
      'Track E · EP-E4 calendario editorial del club',
      'Foco DT / club · equilibrio entre categorías, programas y semanas de comunicación'
    ]
  },
  {
    month: 'Mayo 2027',
    kind: 'scale',
    badge: 'Track E + F',
    headline: 'Biblioteca viva y primeras campañas',
    desc: 'Con la base editorial ya estable, BasketIQ empieza a reutilizar formatos y abre una primera capa de campañas y retos simples conectados con la realidad del club.',
    items: [
      'Cadencia club · nueva categoría implantada o siguiente categoría consolidada',
      'Track E · EP-E5 biblioteca viva de contenidos reutilizables',
      'Track F · EP-F1 motor de campañas y retos con criterio real de club'
    ]
  },
  {
    month: 'Junio 2027',
    kind: 'scale',
    badge: 'Track F',
    headline: 'Participación simple de jugadores y familias',
    desc: 'El engagement arranca de forma controlada: primero participación sencilla y medible de jugadores y familias, con especial cuidado en gobierno del canal y pertinencia por categoría.',
    items: [
      'Cadencia club · nueva categoría implantada o siguiente categoría consolidada',
      'Track F · EP-F2 participación de jugadores y familias',
      'Foco DT / gobierno · canal con menores, pertinencia por categoría y señal útil'
    ]
  }
];
