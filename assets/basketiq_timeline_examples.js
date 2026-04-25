/* ================================================================
   BasketIQ timeline — EXAMPLE SCENES per milestone
   Data-driven: messages and portals as data, rendered by the app.
   Chat messages animate word-by-word (typewriter).
================================================================ */

// --- helpers for building waveforms ---
const W = (h) => h;
const WAVES = {
  short:  [4,8,10,6,12,8,4,10,14,8],
  mid:    [6,12,8,14,10,6,12,16,10,4,8,14,10,6,12,8,4,10,14,12],
  long:   [4,8,12,6,14,10,16,12,6,10,14,8,4,12,16,10,6,8,12,14,10,6,12,8,4]
};

// --- static scene renderers (re-used across milestones) ---

const staticPlaceholder = () => `
  <div class="eg-empty">
    <div class="big">🎬</div>
    <div class="msg">Aún no hay casos de uso que mostrar.<br>Avanza al siguiente hito para ver el <b>primer uso real</b>.</div>
  </div>`;

const staticFoundations = () => `
  <div class="eg-status">
    <h4>Entornos listos para construir</h4>
    <div class="eg-check"><div class="ok">✓</div><div><div class="txt">Cloud · Infra</div><span class="sub">Entornos reproducibles desplegados</span></div></div>
    <div class="eg-check"><div class="ok">✓</div><div><div class="txt">Seguridad</div><span class="sub">Secretos y claves gestionados</span></div></div>
    <div class="eg-check"><div class="ok">✓</div><div><div class="txt">Identidad</div><span class="sub">Accesos por rol configurados</span></div></div>
    <div class="eg-check"><div class="ok">✓</div><div><div class="txt">Observabilidad</div><span class="sub">Logs y métricas activas</span></div></div>
  </div>`;

const staticPortal = () => `
  <div class="eg-portal">
    <div class="eg-portal-head">
      <div class="lg">Basket<span>IQ</span> · Portal del club</div>
      <div class="nv">Equipos · Sesiones · Contexto</div>
    </div>
    <div class="eg-portal-body">
      <div class="eg-teams">
        <div class="eg-team">
          <div class="nm">Cadete B</div>
          <div class="mt">Coach Javi · 12 sesiones · 3 partidos</div>
          <div class="bar"><i style="width:68%"></i></div>
          <div class="lst">Última: <b>Defensa 25'</b>, Zigzag 15', 3v3 presión</div>
        </div>
        <div class="eg-team">
          <div class="nm">Infantil A</div>
          <div class="mt">Coach Alba · 10 sesiones · 2 partidos</div>
          <div class="bar"><i style="width:54%"></i></div>
          <div class="lst">Última: <b>Fundamentos</b> 30', 1v1 continuo</div>
        </div>
        <div class="eg-team">
          <div class="nm">Mini A</div>
          <div class="mt">Coach Nerea · 14 sesiones · 1 partido</div>
          <div class="bar"><i style="width:78%"></i></div>
          <div class="lst">Última: <b>Juego libre</b> 20', relevos</div>
        </div>
        <div class="eg-team">
          <div class="nm">Junior</div>
          <div class="mt">Coach Pau · 11 sesiones · 3 partidos</div>
          <div class="bar"><i style="width:62%"></i></div>
          <div class="lst">Última: <b>Táctica</b> ataque, tiro libre</div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top:12px; padding:10px 12px; background:rgba(255,122,26,0.08); border:1px solid rgba(255,122,26,0.25); border-radius:10px; font-size:12px; color:#d5dbe7;">
    🧩 <b>Ontología viva</b>: todo el staff habla el mismo idioma (fundamentos, fases, sistemas).
  </div>`;

const staticRecCard = () => `
  <div class="eg-rec">
    <h4>🎯 Recomendación personalizada · U18</h4>
    <div class="who">
      <div class="av-card">23</div>
      <div>
        <div class="who-nm">Marc Pascual</div>
        <div class="who-sub">Tras partido vs CB Olímpic</div>
      </div>
    </div>
    <div class="metrics">
      <div class="met"><div class="mv">28%</div><div class="ml">Tiro exterior bajo presión</div></div>
      <div class="met"><div class="mv">42%</div><div class="ml">Finalización mano izq.</div></div>
      <div class="met"><div class="mv">8/10</div><div class="ml">Intensidad defensiva</div></div>
    </div>
    <div class="plan">
      <div class="plan-t">📋 Plan propuesto · 2 semanas</div>
      <div class="plan-i">✓ Bloque <b>tiro exterior</b> (3x por sem.)</div>
      <div class="plan-i">✓ Ejercicio <b>mano no dominante</b> en cada sesión</div>
      <div class="plan-i">✓ Mantener carga defensiva actual</div>
    </div>
    <div style="margin-top:10px; font-size:11px; color:#8a93a6; text-align:center;">Incluir en plan del Cadete B · martes y jueves</div>
  </div>`;

const staticPhone = () => `
  <div class="eg-phone">
    <div class="eg-phone-screen">
      <div class="eg-phone-notch"></div>
      <div class="eg-phone-header">
        <div class="greet">Hola 👋</div>
        <div>Marc Pascual · #23</div>
      </div>
      <div class="eg-phone-body">
        <div class="eg-stat-row">
          <div class="eg-mini"><div class="v">3</div><div class="l">sesiones</div></div>
          <div class="eg-mini"><div class="v">90'</div><div class="l">trabajados</div></div>
          <div class="eg-mini"><div class="v">1</div><div class="l">partido</div></div>
        </div>
        <div class="eg-section">
          <h5>Tu semana</h5>
          <div class="it">• <b>Tiro exterior</b> · 3 bloques</div>
          <div class="it">• <b>Defensa en carrera</b> · 60'</div>
          <div class="it">• <b>Mano izquierda</b> · en cada sesión</div>
        </div>
        <div class="eg-section">
          <h5>¿Cómo te has sentido hoy?</h5>
          <div class="eg-feedback">
            <button>😊</button>
            <button class="sel">😐</button>
            <button>😞</button>
          </div>
          <div class="it" style="color:#ffb457; margin-top:6px;">«Piernas flojas, el tiro ha ido mejor»</div>
        </div>
      </div>
    </div>
  </div>`;

/* ================================================================
   EXAMPLES: per-milestone array of scenes
   Each scene is:
     { label, title, render: () => html }         // static
   or:
     { label, title, sub?, messages: [ ... ] }    // WhatsApp chat (animated)
   Each message:
     { side: 'out'|'in', time?, text?, audio?, html?, label? }
================================================================ */

const EXAMPLES = [

  // =================================================================
  // M0 — 23 abril · Lienzo en blanco
  // =================================================================
  [
    { label: '—', title: '', render: staticPlaceholder }
  ],

  // =================================================================
  // M1 — 30 abril · Fundamentos + primera crónica (prueba funcional)
  // =================================================================
  [
    // 1. Checklist de fundamentos listos
    { label: '1 · Fundamentos', title: 'Entornos listos', render: staticFoundations },

    // 2. Prueba funcional end-to-end: un feedback → crónica + memoria del club
    { label: '2 · Prueba funcional', title: 'Una crónica y, a la vez, memoria del club', sub: 'el agente entiende el partido y deja todo ordenado',
      messages: [
        { side:'out', audio:{ dur:'1:34', waves:WAVES.long }, time:'Sáb 21:45' },
        { side:'out', text:'Crónica Cadete B: Victoria 68-54 contra Las Rozas. Gran partido defensivo. Pablo #7 con 18 puntos y Marcos #12 con 8 asistencias. Muchas pérdidas en el tercer cuarto.', time:'21:45' },
        { side:'in',  label:'👂 Entendido',
          html:'He cogido lo principal del partido:<br>• <b>Cadete B 68-54 CB Las Rozas</b> (victoria)<br>• <b>Pablo #7</b> · 18 pts · <b>Marcos #12</b> · 8 ast<br>• Gran trabajo defensivo del equipo<br>• A vigilar: pérdidas en el 3er cuarto<br><br>Te preparo la crónica y lo dejo ordenado en la memoria del club.',
          time:'21:46' },
        { side:'in',  label:'📝 Crónica lista',
          html:'<b>Victoria del Cadete B ante CB Las Rozas (68-54)</b><br><br>Gran jornada para nuestro Cadete B, que suma su tercera victoria consecutiva. Solidez defensiva, control del rebote y limitación de las opciones del rival.<br><br><b>Destacados</b><br>🔥 Pablo #7 · 18 puntos (MVP)<br>🎯 Marcos #12 · 8 asistencias<br>🛡️ Trabajo defensivo colectivo<br><br><b>A mejorar</b><br>Tercer cuarto con pérdidas bajo presión. Trabajaremos cuidado del balón esta semana.',
          time:'21:47' },
        { side:'in',  label:'💾 Guardado en la memoria del club',
          html:'Partido, jugadores y señales registrados. Lo tendrás disponible para <b>retrospectivas</b>, para ver <b>cómo evoluciona el equipo</b> y para las próximas decisiones del cuerpo técnico.',
          time:'21:47' },
        { side:'out', text:'perfecto, gracias', time:'21:48' },
        { side:'in',  text:'�', time:'21:48' }
      ]
    }
  ],

  // =================================================================
  // M2 — 15 mayo · Captura operativa completa del coach (3 escenas)
  // =================================================================
  [
    // 1. Registro de sesión
    { label: '1 · Sesión', title: 'Registro de entrenamiento', sub: 'dicta y estructura',
      messages: [
        { side:'out', audio:{ dur:'0:22', waves:WAVES.mid }, time:'Mar 20:12' },
        { side:'out', text:'Entreno Cadete B: calentamiento 10, defensa individual 25, zigzag 15, 3v3 presión 20, tiros libres 10', time:'20:12' },
        { side:'in',  label:'📋 Sesión estructurada',
          html:'<b>Cadete B · Mar 12 may · 80 min</b><br>• <b>Calentamiento</b> · 10\'<br>• <b>Defensa individual</b> en carrera · 25\'<br>• <b>Zigzag</b> defensivo · 15\'<br>• <b>3v3 presión</b> alta · 20\'<br>• <b>Tiros libres</b> con carga · 10\'',
          time:'20:13' },
        { side:'out', text:'añade que Pablo tuvo molestia en el tobillo izquierdo', time:'20:14' },
        { side:'in',  text:'Anotado en el perfil de Pablo 🩹 · lo marco como carga a vigilar esta semana.', time:'20:14' }
      ]
    },

    // 2. Feedback post-sesión
    { label: '2 · Feedback', title: 'Feedback tras la sesión', sub: 'aprende de lo que funcionó',
      messages: [
        { side:'out', text:'el 3v3 de presión les costó mucho hoy, se perdían en la rotación', time:'Jue 20:20' },
        { side:'in',  label:'🧠 Feedback registrado',
          html:'Guardo: <b>3v3 presión caótico · rotación sin claridad</b>.<br>¿Ajusto la próxima?',
          time:'20:20' },
        { side:'out', text:'sí, algo más sencillo', time:'20:20' },
        { side:'in',  label:'✏️ Ajuste aplicado',
          html:'Regresión sugerida para martes:<br>• <b>2v2 con ventaja</b> · 15\'<br>• <b>3v3 sin presión</b> · 15\'<br>• Volver a <b>3v3 presión</b> cuando domines la rotación.',
          time:'20:21' }
      ]
    },

    // 3. Asistencia rápida
    { label: '3 · Asistencia', title: 'Asistencia y continuidad', sub: 'sin fricción',
      messages: [
        { side:'out', text:'hoy faltan Marc, Luis y Andrés', time:'Lun 19:28' },
        { side:'in',  label:'✅ Asistencia registrada',
          html:'<b>Cadete B · 11 may · 9/12 presentes</b><br>• Marc · 3ª falta en 2 semanas<br>• Luis · justificada (escuela)<br>• Andrés · 1ª falta',
          time:'19:28' },
        { side:'in',  label:'⚠️ Señal de continuidad',
          html:'<b>Marc</b> lleva 3 faltas seguidas. ¿Te aviso a la 4ª y avisamos a coordinación?',
          time:'19:28' },
        { side:'out', text:'sí, avísame', time:'19:29' },
        { side:'in',  text:'Hecho 👌 alerta configurada para ti y para coordinación.', time:'19:29' }
      ]
    }
  ],

  // =================================================================
  // M3 — 30 mayo · Ontología y Portal Staff (2 escenas)
  // =================================================================
  [
    // 1. Portal staff
    { label: '1 · Portal', title: 'Portal unificado del staff', render: staticPortal },

    // 2. Consulta con ontología
    { label: '2 · Contexto', title: 'Consulta con ontología del club', sub: 'mismo idioma para todos',
      messages: [
        { side:'out', text:'¿qué hemos trabajado en defensa en el Cadete B este mes?', time:'Vie 10:15' },
        { side:'in',  label:'📚 Contexto del club',
          html:'<b>Cadete B · Mayo 2026 · Defensa individual</b><br>• <b>Postura y desplazamientos</b> · 4 sesiones<br>• <b>1v1 cierre de líneas</b> · 3 sesiones<br>• <b>3v3 presión</b> · 2 sesiones <i style="color:#ffb457">(caótico)</i><br><br>Evaluación: <b>en progresión</b> · listos para conectar con transiciones.',
          time:'10:15' },
        { side:'in',  text:'La progresión lógica es conectar defensa con transición def→ataque. ¿Te lo propongo para martes?', time:'10:15' },
        { side:'out', text:'dale', time:'10:16' },
        { side:'in',  text:'Te lo preparo 👌 aviso cuando esté.', time:'10:16' }
      ]
    }
  ],

  // =================================================================
  // M4 — 22 junio · Ciclo con el coach (3 escenas)
  // =================================================================
  [
    // 1. Propuesta de próxima sesión
    { label: '1 · Propuesta', title: 'Propuesta de próxima sesión', sub: 'Planner listo',
      messages: [
        { side:'in',  text:'👋 Buenos días, Javi', time:'Lun 08:30' },
        { side:'in',  text:'¿Te preparo la sesión del martes?', time:'08:30' },
        { side:'out', text:'dale', time:'08:31' },
        { side:'in',  label:'📅 Sesión propuesta · Cadete B',
          html:'<b>Mar 23 jun · 80 min</b><br>• <b>Calentamiento</b> · 10\'<br>• <b>Defensa individual</b> en carrera · 20\' <i style="color:#ffb457">(venís flojos desde el sábado)</i><br>• <b>2v2 presión</b> · 20\'<br>• <b>3v3 táctico</b> · 15\'<br>• <b>Cierre</b> + tiros libres · 10\'',
          time:'08:31' },
        { side:'out', text:'ajusta el 2v2 a 15', time:'08:33' },
        { side:'in',  text:'Hecho. Sesión lista para mañana 👌', time:'08:33' }
      ]
    },

    // 2. Contexto de programación (adaptado del pitch #1)
    { label: '2 · Contexto', title: 'La IA conoce tu progresión', sub: 'memoria + ontología',
      messages: [
        { side:'out', text:'Necesito ejercicios para mañana · Cadete B · defensa y transiciones', time:'Mié 16:15' },
        { side:'in',  label:'📊 Contexto detectado',
          html:'<b>Cadete B · Miércoles 18:00</b><br>3 semanas en defensa individual.<br>Objetivo del mes: <b>transiciones def→ataque</b>.',
          time:'16:15' },
        { side:'in',  label:'BasketIQ · Progresión sugerida',
          html:'Perfecto momento para <b>conectar defensa con transición</b>:<br>• <b>Calentamiento</b> · desplazamientos + sprint · 10\'<br>• <b>Drill 1</b> · 1v1 → contraataque 1v0 · 15\'<br>• <b>Drill 2</b> · 2v2 → rebote def → transición 2v1 · 20\'<br>• <b>Drill 3</b> · 3v3 media pista con reglas transición · 15\'<br>• <b>Juego</b> · 5v5 con bonus en transición · 25\'',
          time:'16:16' }
      ]
    },

    // 3. Feedback y ajuste (adaptado del pitch #3)
    { label: '3 · Ajuste', title: 'Feedback del coach → plan ajustado', sub: 'mejora continua',
      messages: [
        { side:'out', text:'el drill 2v2 con transición de ayer fue caótico. No entendían cuándo empezaba la transición', time:'Jue 20:15' },
        { side:'in',  label:'BasketIQ · Registro y ajuste',
          html:'He registrado: <b>«2v2→transición caótico, falta claridad en el inicio»</b>.<br><br><b>Ajuste sugerido</b><br>• Señal clara: <b>rebote defensivo = START</b><br>• Simplificar: 2v2 media pista primero<br>• Regresión: hacer primero <b>2v1</b> (ventaja numérica)',
          time:'20:16' },
        { side:'out', text:'perfecto, ¿y para la semana que viene?', time:'20:17' },
        { side:'in',  label:'📅 Plan ajustado',
          html:'<b>Lun</b> · repetir 2v1 controlado<br><b>Mié</b> · 2v2 media pista con señal<br><b>Vie</b> · si funciona, pista completa<br><br><i>Progresión ajustada a tu feedback. No avanzamos hasta dominar el paso anterior.</i>',
          time:'20:17' }
      ]
    }
  ],

  // =================================================================
  // M5 — 7 julio · Recomendador U18 (2 escenas)
  // =================================================================
  [
    // 1. Recomendación personalizada por jugador
    { label: '1 · Recomendación', title: 'Recomendación personalizada · U18', render: staticRecCard },

    // 2. Preparación física U18 (adaptado del pitch #2)
    { label: '2 · Prep. física', title: 'Preparación física adaptada por edad', sub: 'OMS · NSCA · USA Basketball',
      messages: [
        { side:'out', text:'Necesito trabajo físico específico para U18 en pretemporada', time:'Lun 09:12' },
        { side:'in',  label:'BasketIQ · Prep. física U18',
          html:'Para U18 en pretemporada priorizamos <b>base aeróbica + fuerza funcional</b>:<br>• <b>Aeróbico</b> · intervalos 30"/30" x 8<br>• <b>Fuerza tren inferior</b> · sentadillas, lunges, saltos · 3x12<br>• <b>Core</b> · planks, russian twist · 3x30"<br>• <b>Agilidad</b> · escalera + cambios<br><br><i>⚠️ U18 ya pueden hacer fuerza supervisada. Ratio 60/30/10.</i>',
          time:'09:13' },
        { side:'out', text:'y para Cadete también?', time:'09:14' },
        { side:'in',  label:'BasketIQ · Cadete (Sub-16)',
          html:'Sub-16 es distinto — <b>base aeróbica + introducir fuerza ligera</b>:<br>• Aeróbico suave + coordinación<br>• Fuerza con peso corporal o muy ligera<br>• NO cargas máximas<br><br><i>✓ Fuentes: OMS actividad 5-17, NSCA Youth Resistance Training.</i>',
          time:'09:15' }
      ]
    }
  ],

  // =================================================================
  // M6 — 30 julio · Canal jugador y bucle cerrado (2 escenas)
  // =================================================================
  [
    // 1. Móvil del jugador
    { label: '1 · Jugador', title: 'Canal del jugador · lectura + feedback', render: staticPhone },

    // 2. Feedback del jugador llega al staff y cierra el bucle
    { label: '2 · Bucle cerrado', title: 'Feedback del jugador → ajuste del plan', sub: 'el ciclo se cierra',
      messages: [
        { side:'in',  label:'🔔 Nuevo feedback',
          html:'Marc Pascual #23 acaba de responder a la sesión de hoy.',
          time:'Jue 21:04' },
        { side:'in',  label:'💬 Marc · U18',
          html:'😐 <i>«Piernas flojas, el tiro ha ido mejor»</i>',
          time:'21:04' },
        { side:'in',  label:'🤖 BasketIQ aprende',
          html:'Ajusto para el próximo plan:<br>• Bajo <b>carga física</b> el jueves<br>• Mantengo <b>bloque de tiro</b> (funciona)<br><br>Señal enviada al Planner.',
          time:'21:04' },
        { side:'out', text:'perfecto, no le fuerces el jueves', time:'21:05' },
        { side:'in',  label:'📅 Plan de Marc · ajustado',
          html:'<b>Mar</b> · tiro exterior (mantener)<br><b>Jue</b> · descarga piernas + técnica<br><b>Vie</b> · reevaluar con Marc',
          time:'21:05' }
      ]
    }
  ]

];
