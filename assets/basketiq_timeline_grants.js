/* =============================================================
 * BasketIQ — Ayudas, concursos y escaparates 2026
 * Datos resumidos, verificables públicamente.
 * Fuente principal: club/basketiq-landing-page/roadmap_ayudas_2026_detallado.md
 * =============================================================
 *
 * Convención:
 *  - type       : cloud | premio | subvencion | prestamo | grant-eu | escaparate | partnership
 *  - typeLabel  : etiqueta visible
 *  - priority   : 'Muy alta' | 'Alta' | 'Estratégica' | 'Media-alta'
 *  - window     : texto corto de ventana 2026
 *  - status     : now | spring | post-sl | autumn | year-end | continuous
 *  - amount     : texto corto de dotación (si existe)
 *  - teaser     : una sola frase que explique por qué nos interesa
 *  - bullets    : 2 bullets cortos (clave para la shortlist)
 *  - url        : fuente oficial principal (la primera del doc)
 */

const GRANTS_2026 = {
  updated: 'abril 2026',
  shortlist: [
    {
      id: 'google-cloud',
      name: 'Google for Startups Cloud Program',
      type: 'cloud',
      typeLabel: 'Créditos cloud',
      priority: 'Muy alta',
      window: 'Abr 2026 →',
      status: 'now',
      amount: 'Hasta 350k USD (IA)',
      teaser: 'Runway técnico sin dilución para una startup de IA.',
      bullets: [
        'Start 2k / Scale 100k + 100k · IA hasta 350k',
        'Créditos y soporte en GCP, Firebase y Vertex AI'
      ],
      url: 'https://startup.google.com/cloud/'
    },
    {
      id: 'madrid-impacta',
      name: 'Premio Madrid Impacta 2026',
      type: 'premio',
      typeLabel: 'Premio / concurso',
      priority: 'Muy alta',
      window: '7 abr – 20 may 2026',
      status: 'spring',
      amount: '50.000 € · 3º premio 4k + 11 accésits 2,5k',
      teaser: 'Premio municipal abierto con encaje directo en la narrativa de impacto social.',
      bullets: [
        'Ángulo: democratizar el baloncesto base y formativo',
        'Mentoría PwC para el primer premio'
      ],
      url: 'https://www.madridemprende.es/premio-madrid-impacta/'
    },
    {
      id: 'cheque-innovacion',
      name: 'Cheque Innovación Comunidad de Madrid',
      type: 'subvencion',
      typeLabel: 'Subvención regional',
      priority: 'Alta',
      window: 'Concesión directa · todo 2026',
      status: 'post-sl',
      amount: 'Hasta 60.000 € · 80% del gasto elegible',
      teaser: 'Vía regional sólida para I+D aplicada con universidad o centro tecnológico.',
      bullets: [
        'Requiere SL constituida y proveedor elegible',
        'Idea táctica: colaboración con UPM u otro centro'
      ],
      url: 'https://sede.comunidad.madrid/ayudas-becas-subvenciones/cheque-innovacion-pymes'
    },
    {
      id: 'enisa',
      name: 'ENISA — Jóvenes Emprendedores / Emprendedores',
      type: 'prestamo',
      typeLabel: 'Préstamo participativo',
      priority: 'Alta',
      window: 'Jun – oct 2026 (post-SL)',
      status: 'post-sl',
      amount: '25k – 75k € (Jóvenes) · hasta 1,5 M€ (Digitales)',
      teaser: 'Palanca nacional sin aval personal una vez exista SL y piloto.',
      bullets: [
        '7 años de vencimiento · carencia hasta 5 años',
        'Emprendedoras Digitales como fallback si encaja'
      ],
      url: 'https://www.enisa.es/'
    },
    {
      id: 'eic-accelerator',
      name: 'EIC Accelerator',
      type: 'grant-eu',
      typeLabel: 'Grant EU + inversión',
      priority: 'Estratégica',
      window: 'Submission objetivo: nov 2026',
      status: 'year-end',
      amount: 'Grant <2,5 M€ · Inversión 1–10 M€',
      teaser: 'Gran apuesta europea: 2026 como año de preparación seria.',
      bullets: [
        'Short proposal 12 pp · deck 10 slides · vídeo 3 min',
        'Cortes 2026: 7 ene · 4 mar · 6 may · 8 jul · 2 sep · 4 nov'
      ],
      url: 'https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en'
    },
    {
      id: 'vds',
      name: 'VDS Startup Competition · Valencia Digital Summit',
      type: 'escaparate',
      typeLabel: 'Escaparate / concurso',
      priority: 'Alta (showcase)',
      window: '21 – 22 oct 2026',
      status: 'autumn',
      amount: 'Visibilidad ante inversores y corporates',
      teaser: 'Escaparate principal de otoño, útil para inversores, corporates y partners.',
      bullets: [
        'Criterios: innovación · escalabilidad · impacto',
        'Ventana de aplicación suele salir meses antes'
      ],
      url: 'https://vds.tech/'
    }
  ],
  parallel: [
    {
      id: 'microsoft-startups',
      name: 'Microsoft for Startups / Azure',
      type: 'cloud',
      typeLabel: 'Créditos cloud',
      role: 'Bonus técnico paralelo',
      amount: '1k $ + 4k $ públicos · Investor Offer hasta ~150k $ con referral',
      note: 'Útil en paralelo a Google, no como pilar central del roadmap 2026.',
      url: 'https://learn.microsoft.com/en-us/startups/microsoft-for-startups/application'
    },
    {
      id: 'feb-federaciones',
      name: 'FEB · federaciones · endorsements',
      type: 'partnership',
      typeLabel: 'Partnership / legitimidad',
      role: 'Workstream institucional',
      amount: 'Sin dotación directa',
      note: 'Credibilidad, red sectorial, apoyo a pilotos y refuerzo para EIC / ENISA.',
      url: ''
    }
  ],
  watchlist: [
    {
      id: 'neotec',
      name: 'NEOTEC 2026',
      type: 'subvencion',
      typeLabel: 'Subvención competitiva',
      window: '14 abr – 14 may 2026',
      amount: '20,4 M€ totales · máx 250k€ (325k€ con doctor) · hasta 70% (85%)',
      teaser: 'Ruta CDTI potente pero exige foco y narrativa de empresa de base tecnológica ya sólida.',
      bullets: [
        'Pymes innovadoras ≤ 3 años · capital social ≥ 20k€',
        'Reserva de 5 M€ para proyectos liderados por mujeres'
      ],
      note: 'Solo con candidatura verdaderamente competitiva sin romper el resto del plan.',
      url: 'https://www.cdti.es/ayudas/ayudas-neotec-2026'
    },
    {
      id: 'emprendedoras',
      name: 'Premio Emprendedoras Madrid 2026',
      type: 'premio',
      typeLabel: 'Premio',
      window: 'Convocatoria anual 2026',
      amount: 'Emprendedora del año 10.000 € · 11 accésits de 5.000 €',
      teaser: 'Premio municipal vinculado a proyectos liderados por mujeres.',
      bullets: [
        'Encaje condicionado al criterio real de liderazgo femenino',
        'El plazo 2026 parece haber ido temprano en el año'
      ],
      note: 'Solo mantener si el encaje es real, no forzar narrativa.',
      url: 'https://www.madridemprende.es/premio-emprendedoras/'
    },
    {
      id: 'universo-mujer',
      name: 'Universo Mujer / CSD',
      type: 'partnership',
      typeLabel: 'Programa institucional',
      window: 'Programa continuo (Universo Mujer IV)',
      amount: 'Sin dotación directa verificada para startup B2B',
      teaser: 'Marco institucional para promover la participación femenina en el deporte.',
      bullets: [
        'Posible palanca para alianzas con federaciones o clubes',
        'Sin vía directa clara 2026 como fuente principal'
      ],
      note: 'Mantener como contexto institucional o puerta a alianzas, no como prioridad financiera.',
      url: 'https://www.csd.gob.es/es/promocion-del-deporte/universo-mujer-iv'
    },
    {
      id: 'south-summit',
      name: 'South Summit 2026',
      type: 'escaparate',
      typeLabel: 'Escaparate / concurso',
      window: 'Call 2026 pendiente de publicar',
      amount: 'Visibilidad y networking (sin premio fijo verificado)',
      teaser: 'Evento relevante del ecosistema, pero sin call 2026 al mismo nivel de claridad que VDS.',
      bullets: [
        'Útil para inversores y corporates si abre ventana real',
        'Coste de preparación alto: evaluar cuando salga call'
      ],
      note: 'Seguir, pero no darle prioridad operativa hasta ver plazos y condiciones reales.',
      url: ''
    },
    {
      id: 'santander-x',
      name: 'Santander X Spain Awards',
      type: 'premio',
      typeLabel: 'Premio / concurso',
      window: 'Call 2026 pendiente de verificar',
      amount: 'Dotación y red Santander X (según edición)',
      teaser: 'Interesante por marca, red y premios, pero sin call 2026 actualmente verificada.',
      bullets: [
        'Buen fit con narrativa de impacto y escalabilidad',
        'Evaluar cuando se abra convocatoria concreta 2026'
      ],
      note: 'Seguimiento activo, no foco operativo sin call abierta.',
      url: ''
    },
    {
      id: 'lanzadera',
      name: 'Lanzadera · inversión privada temprana',
      type: 'equity',
      typeLabel: 'Aceleración / equity',
      window: 'Convocatorias recurrentes a lo largo del año',
      amount: 'Inversión inicial + programa de aceleración en Valencia',
      teaser: 'Palanca privada potente, pero exige foco y dinámica de crecimiento con dilución.',
      bullets: [
        'Exige dedicación fuerte y estancia en Valencia',
        'No coherente con objetivo 2026 de minimizar dilución'
      ],
      note: 'No foco 2026 salvo cambio importante de situación.',
      url: ''
    }
  ]
};
