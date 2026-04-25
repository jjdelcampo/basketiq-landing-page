/* ================================================================
   BasketIQ timeline — APP (state + rendering)
   v2: scene carousel per milestone + WhatsApp typewriter
================================================================ */

const state = {
  idx: 0,
  diagramIdx: -1,         // índice "revelado" en el diagrama (lag hasta activación)
  sceneIdx: 0,
  prev: { weeks: 0, components: 0, capabilities: 0 },
  animTimers: [],
  animToken: 0,
  modalOpen: false,
  modalTimers: [],
  modalToken: 0,
  playing: false,         // arranque manual: nada se dispara hasta que el usuario pulse play
  seq: { token: 0, timers: [] }
};

/* ================================================================
   SEQUENCER — orquesta el timeline por fases dentro de cada hito
   M0 (23 abril · punto de partida) NO dispara modal ni secuencia: es
   un estado estático de inicio. La secuencia arranca siempre en M1.
   Fases por hito (M1 en adelante):
     1. Modal           — 5s con barra de progreso
     2. Post-modal      — 1s de respiro
     3. Activación      — se pintan los nuevos componentes (nodos nuevos
                          pulsan, aristas nuevas fluyen) + 5s de pausa
     4. Escenas         — cada escena se muestra, se espera a que termine
                          (chat) y 5s extra, luego la siguiente
     5. Transición      — goToMilestone(i+1), que reengancha la fase 1
   Al pulsar play por primera vez, se añade un delay inicial de 1s antes
   de la fase 1 del hito actual.
================================================================ */
const SEQ_TIMING = {
  initialDelay:  1000,
  modal:         5000,
  postModal:     1000,
  activation:    5000,
  scene:         5000   // espera tras completarse cada escena
};

function cancelSequence() {
  state.seq.token++;
  state.seq.timers.forEach(t => clearTimeout(t));
  state.seq.timers = [];
}
function seqTimer(fn, ms) {
  const t = setTimeout(fn, ms);
  state.seq.timers.push(t);
  return t;
}

function updatePlayButton() {
  const btn = document.getElementById('play-btn');
  if (!btn) return;
  btn.classList.toggle('is-playing', state.playing);
  btn.setAttribute('title', state.playing ? 'Pausar' : 'Reproducir');
  btn.setAttribute('aria-label', state.playing ? 'Pausar la secuencia' : 'Reproducir la secuencia');
}

function setPlaying(on) {
  const wasPlaying = state.playing;
  state.playing = !!on;
  updatePlayButton();
  if (!state.playing && wasPlaying) {
    cancelSequence();
    clearAnims();
    if (state.modalOpen) closeMilestoneModal();
    // Al pausar, sincronizamos el diagrama al estado completo del hito
    // actual para que el título, KPIs y diagrama queden consistentes.
    if (state.diagramIdx !== state.idx) {
      state.diagramIdx = state.idx;
      renderDiagram();
    }
  }
}

// Devuelve las escenas "reales" del hito i (descarta placeholders).
function scenesOf(i) {
  const arr = (typeof EXAMPLES !== 'undefined' && EXAMPLES[i]) || [];
  return arr.filter(s => s && s.label !== '—');
}

// ¿El hito i activa componentes nuevos en el diagrama?
function hasActivation(i) {
  return ((MILESTONES[i] && MILESTONES[i].new_nodes) || []).length > 0;
}

function runMilestoneSequence(i, opts) {
  cancelSequence();
  if (!state.playing) return;
  const myToken = state.seq.token;
  const isMine = () => myToken === state.seq.token && state.playing;
  const initialDelay = (opts && typeof opts.initialDelay === 'number') ? opts.initialDelay : 0;

  const scenes = scenesOf(i);
  const showActivation = hasActivation(i);

  // Paso 1: modal (precedido, si procede, por el delay inicial de 1s).
  // M0 no tiene modal: saltamos directamente al siguiente hito.
  seqTimer(() => {
    if (!isMine()) return;
    if (i === 0) { gotoNext(); return; }
    openMilestoneModal(i, () => {
      if (!isMine()) return;
      afterModal();
    });
  }, initialDelay);

  function afterModal() {
    // M0 (ni activación ni escenas) → pasamos directo al siguiente hito
    if (!showActivation && scenes.length === 0) { gotoNext(); return; }

    // Paso 2: post-modal wait (1s)
    seqTimer(() => {
      if (!isMine()) return;
      // Paso 3: activación de componentes
      if (showActivation) {
        state.diagramIdx = i;
        renderDiagram();
      }
      // Paso 3 (cont.): pausa de 5s antes de las escenas
      seqTimer(() => {
        if (!isMine()) return;
        runScenes(0);
      }, SEQ_TIMING.activation);
    }, SEQ_TIMING.postModal);
  }

  function runScenes(si) {
    if (!isMine()) return;
    if (si >= scenes.length) { gotoNext(); return; }
    state.sceneIdx = si;
    renderScene({ onComplete: () => {
      if (!isMine()) return;
      // Wait 5s tras completarse la escena antes de la siguiente
      seqTimer(() => runScenes(si + 1), SEQ_TIMING.scene);
    }});
  }

  function gotoNext() {
    if (!isMine()) return;
    if (i < MILESTONES.length - 1) {
      goToMilestone(i + 1);
    } else {
      // Fin del recorrido: pausamos y ponemos el botón en "play"
      setPlaying(false);
    }
  }
}

function togglePlay() {
  if (state.playing) {
    setPlaying(false);
    return;
  }
  // Pulsar play (re)arranca la secuencia desde el hito actual con el
  // delay inicial de 1s. Si estamos en M0, el propio sequencer lo salta
  // y hace transición a M1 sin mostrar modal.
  setPlaying(true);
  clearSceneArea();
  runMilestoneSequence(state.idx, { initialDelay: SEQ_TIMING.initialDelay });
}
const SVG_NS = 'http://www.w3.org/2000/svg';
const DIAGRAM_OFFSET_X = 150;
const nodeById = Object.fromEntries(NODES.map(n => [n.id, n]));

function activeNodes(idx) {
  const s = new Set();
  for (let i = 0; i <= idx; i++) (MILESTONES[i].new_nodes || []).forEach(n => s.add(n));
  return s;
}
function newNodes(idx) { return new Set(MILESTONES[idx].new_nodes || []); }
function allFeatures(idx) {
  const out = [];
  for (let i = 0; i <= idx; i++) {
    (MILESTONES[i].new_features || []).forEach(f => out.push({ text: f, milestone: i }));
  }
  return out;
}

/* ---------------- Timeline (left vertical rail) ---------------- */
function renderTimeline() {
  const stops = document.getElementById('stops');
  stops.innerHTML = '';
  MILESTONES.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'stop' + (i < state.idx ? ' done' : '') + (i === state.idx ? ' current' : '');
    div.style.top = (MILESTONES.length === 1 ? 50 : (i / (MILESTONES.length - 1)) * 100) + '%';
    div.innerHTML = `<div class="node"></div><div class="lab">${m.date}</div>`;
    div.onclick = () => { goToMilestone(i); };
    stops.appendChild(div);
  });
  const pct = MILESTONES.length === 1 ? 0 : (state.idx / (MILESTONES.length - 1)) * 100;
  document.getElementById('progress-line').style.height = pct + '%';
}

/* ---------------- Diagram ---------------- */
function renderCourtBg() {
  const g = document.getElementById('court-bg');
  if (g.childElementCount) return;
  const lines = [
    `M ${DIAGRAM_OFFSET_X + 40} 30 L ${DIAGRAM_OFFSET_X + 860} 30 L ${DIAGRAM_OFFSET_X + 860} 730 L ${DIAGRAM_OFFSET_X + 40} 730 Z`,
    `M ${DIAGRAM_OFFSET_X + 450} 30 L ${DIAGRAM_OFFSET_X + 450} 730`,
    `M ${DIAGRAM_OFFSET_X + 450} 380 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0`
  ];
  lines.forEach(d => {
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', 'court-bg');
    g.appendChild(p);
  });
}

function renderBands() {
  const g = document.getElementById('bands');
  if (g.childElementCount) return;
  // 5 bandas con gutter izquierdo para el label lateral de cada capa.
  // La banda ACTORES vive en Y negativa (viewBox extendido hacia arriba).
  const bands = [
    { y: -130, h: 105, label: ['ACTORES'],                       kind: 'actor'   },
    { y: 0,    h: 185, label: ['CANALES'],                       kind: 'channel' },
    { y: 195,  h: 210, label: ['IA Y AGENTES', 'ESPECIALIZADOS'], kind: 'agent'  },
    { y: 415,  h: 185, label: ['BASE DE', 'CONOCIMIENTOS'],      kind: 'memory' },
    { y: 610,  h: 150, label: ['PLATAFORMA', 'OPERATIVA'],       kind: 'tool'   }
  ];
  bands.forEach(b => {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'layer-bg' + (b.kind ? ' layer-bg--' + b.kind : ''));
    rect.setAttribute('x', DIAGRAM_OFFSET_X + 8); rect.setAttribute('y', b.y);
    rect.setAttribute('width', 884); rect.setAttribute('height', b.h);
    rect.setAttribute('rx', 14);
    g.appendChild(rect);
    const txt = document.createElementNS(SVG_NS, 'text');
    txt.setAttribute('class', 'layer-label' + (b.kind ? ' layer-label--' + b.kind : ''));
    txt.setAttribute('x', 18);
    txt.setAttribute('y', b.y + (b.h / 2) - ((b.label.length - 1) * 10));
    txt.setAttribute('text-anchor', 'start');
    b.label.forEach((line, idx) => {
      const tspan = document.createElementNS(SVG_NS, 'tspan');
      tspan.setAttribute('x', '18');
      tspan.setAttribute('dy', idx === 0 ? '0' : '20');
      tspan.textContent = line;
      txt.appendChild(tspan);
    });
    g.appendChild(txt);
  });
}

// Word-wrap a label to at most 2 lines given a width budget in characters.
function wrapLabelLines(text, maxChars) {
  if (text.length <= maxChars) return [text];
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const w of words) {
    const candidate = current ? current + ' ' + w : w;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  // Collapse into at most 2 lines
  if (lines.length > 2) {
    const rest = lines.slice(1).join(' ');
    return [lines[0], rest];
  }
  return lines;
}

function renderDiagram() {
  renderCourtBg();
  renderBands();

  const nodesG = document.getElementById('nodes');
  const edgesG = document.getElementById('edges');
  // El diagrama se pinta según state.diagramIdx (el sequencer lo actualiza
  // en la fase de "activación", 1s después de cerrarse el modal). Así los
  // componentes nuevos sólo aparecen cuando toca, no antes.
  // Si diagramIdx < 0 (arranque) mostramos un diagrama vacío.
  const dIdx = Math.max(-1, state.diagramIdx);
  const active = dIdx < 0 ? new Set() : activeNodes(dIdx);
  const fresh  = dIdx < 0 ? new Set() : newNodes(dIdx);

  nodesG.innerHTML = '';
  NODES.forEach(n => {
    const g = document.createElementNS(SVG_NS, 'g');
    const isActive = active.has(n.id);
    const isNew    = fresh.has(n.id);
    const isActor  = n.kind === 'actor';
    const isCompact = !n.scene && !isActor;
    g.setAttribute('class',
      'node-card' +
      (isCompact ? ' compact' : '') +
      (isActor ? ' actor' : '') +
      (isActive ? ' active' : ' inactive') +
      (isNew ? ' new' : '')
    );
    g.setAttribute('transform', `translate(${n.x + DIAGRAM_OFFSET_X},${n.y})`);
    if (isActor) {
      // Actor node: compact human card with silhouette + label + role note.
      const ico = `
        <g class="actor-glyph" transform="translate(12, ${(n.h - 36) / 2})">
          <circle cx="14" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <path d="M2 32 C2 23 9 19 14 19 C19 19 26 23 26 32 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
        </g>
      `;
      const textLeft = 44;
      const textW = n.w - textLeft - 8;
      const nameLines = wrapLabelLines(n.label, Math.max(10, Math.floor(textW / 6.5)));
      const lh = 13;
      const block = nameLines.length * lh + 12;
      const firstY = (n.h - block) / 2 + lh;
      const tspans = nameLines.map((line, i) =>
        `<tspan x="${textLeft}" dy="${i === 0 ? 0 : lh}">${line}</tspan>`
      ).join('');
      g.innerHTML =
        `<rect class="bg" width="${n.w}" height="${n.h}" rx="14"/>` +
        ico +
        `<text class="label" x="${textLeft}" y="${firstY}" text-anchor="start">${tspans}</text>` +
        `<text class="sublabel" x="${textLeft}" y="${firstY + nameLines.length * lh + 1}" text-anchor="start">${n.sub}</text>`;
    } else if (isCompact) {
      // Text-only card (platform layer): label centered vertically, sublabel underneath.
      g.innerHTML =
        `<rect class="bg" width="${n.w}" height="${n.h}" rx="14"/>` +
        `<text class="label" x="${n.w / 2}" y="${n.h / 2 - 2}">${n.label}</text>` +
        `<text class="sublabel" x="${n.w / 2}" y="${n.h / 2 + 18}">${n.sub}</text>`;
    } else {
      // Scene size scaled to the node width (narrower nodes → smaller illustrations)
      const sceneW = Math.min(95, n.w - 20);
      const sceneH = Math.round(sceneW * 60 / 80);
      const sx = (n.w - sceneW) / 2, sy = 14;
      // Label: wrap to 2 lines when the node is narrow (agents row)
      const charBudget = n.w < 135 ? 11 : 22;
      const lines = wrapLabelLines(n.label, charBudget);
      const lineHeight = 14;
      // Position: sublabel at h-14, label(s) block sits just above it.
      const labelFirstY = n.h - 32 - (lines.length - 1) * lineHeight;
      const tspans = lines.map((line, i) =>
        `<tspan x="${n.w / 2}" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`
      ).join('');
      g.innerHTML =
        `<rect class="bg" width="${n.w}" height="${n.h}" rx="16"/>` +
        `<svg class="scene" x="${sx}" y="${sy}" width="${sceneW}" height="${sceneH}" viewBox="0 0 80 60">${SCENES[n.scene] || ''}</svg>` +
        `<text class="label" x="${n.w / 2}" y="${labelFirstY}">${tspans}</text>` +
        `<text class="sublabel" x="${n.w / 2}" y="${n.h - 14}">${n.sub}</text>`;
    }
    nodesG.appendChild(g);
  });

  edgesG.innerHTML = '';
  EDGES.forEach(([fromId, toId]) => {
    const a = nodeById[fromId], b = nodeById[toId];
    if (!a || !b) return;
    const isActive = active.has(fromId) && active.has(toId);
    let ax = a.x + DIAGRAM_OFFSET_X + a.w / 2, ay, bx = b.x + DIAGRAM_OFFSET_X + b.w / 2, by;
    if (b.y > a.y)      { ay = a.y + a.h; by = b.y; }
    else if (b.y < a.y) { ay = a.y;       by = b.y + b.h; }
    else                { ay = a.y + a.h / 2; by = b.y + b.h / 2; }
    const midY = (ay + by) / 2;
    const path = `M${ax},${ay} C${ax},${midY} ${bx},${midY} ${bx},${by}`;
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', path);
    p.setAttribute('class', 'edge' + (isActive ? ' active' : ''));
    edgesG.appendChild(p);
  });
}

/* ---------------- Hero text (milestone title + quote) ---------------- */
function renderHero() {
  const m = MILESTONES[state.idx];
  const titleEl = document.getElementById('hero-title');
  const quoteEl = document.getElementById('hero-quote');
  if (titleEl) titleEl.textContent = m.title;
  if (quoteEl) quoteEl.textContent = m.actor_say;
}

/* ---------------- Summary below the board: capabilities per milestone ---------------- */
function renderSummary() {
  const grid = document.getElementById('summary-grid');
  if (!grid) return;
  grid.innerHTML = MILESTONES.map((m, i) => {
    const feats = (m.new_features || []);
    const items = feats.length
      ? feats.map(f => `<li><span class="sm-tick">+</span><span>${f}</span></li>`).join('')
      : '<li class="sm-empty">Consolidación sobre las capacidades del hito anterior.</li>';
    return `<article class="sm-card${i === state.idx ? ' current' : ''}" data-idx="${i}">
      <header class="sm-head">
        <span class="sm-chip">${m.phase} · ${m.date}</span>
        <h3 class="sm-title">${m.title}</h3>
      </header>
      <ul class="sm-feats">${items}</ul>
    </article>`;
  }).join('');
  // Clicking a card jumps to that milestone in the interactive section above
  grid.querySelectorAll('.sm-card').forEach(card => {
    card.addEventListener('click', () => {
      const i = parseInt(card.dataset.idx, 10);
      if (!isNaN(i)) {
        goToMilestone(i);
        const overview = document.getElementById('overview');
        if (overview) overview.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---------------- Top stats with pulse on increment ---------------- */
function renderStats() {
  const m = MILESTONES[state.idx];
  const features = allFeatures(state.idx);
  const comps = activeNodes(state.idx).size;
  const weeks = state.idx === 0 ? 0 : (parseInt((m.phase || '').replace(/\D/g, ''), 10) || state.idx * 2);
  const caps = features.length;

  const setStat = (id, newVal, prevVal) => {
    const el = document.getElementById(id);
    if (!el) return;
    const v = el.querySelector('.v');
    if (!v) return;
    v.textContent = newVal;
    el.classList.toggle('active', newVal > 0);
    el.classList.remove('pulse');
    if (newVal > prevVal) {
      void v.offsetWidth;
      el.classList.add('pulse');
    }
  };

  setStat('stat-weeks', weeks, state.prev.weeks);
  setStat('stat-components', comps, state.prev.components);
  setStat('stat-capabilities', caps, state.prev.capabilities);

  state.prev = { weeks, components: comps, capabilities: caps };
}

/* ================================================================
   SCENE CAROUSEL + TYPEWRITER
================================================================ */

function clearAnims() {
  state.animToken++;
  state.animTimers.forEach(t => clearTimeout(t));
  state.animTimers = [];
}
function addTimer(fn, ms) {
  const t = setTimeout(fn, ms);
  state.animTimers.push(t);
  return t;
}

/* ---------------- Build bubble row from message data ---------------- */
function buildRow(msg) {
  const row = document.createElement('div');
  row.className = 'bubble-row ' + (msg.side === 'out' ? 'out' : 'in') + ' reveal';
  const bubble = document.createElement('div');
  bubble.className = 'bubble ' + (msg.side === 'out' ? 'right' : 'left');

  const timeHtml = msg.time
    ? `<span class="time">${msg.time}${msg.side === 'out' ? ' <span class="checks">✓✓</span>' : ''}</span>`
    : '';
  const labelHtml = msg.label
    ? `<div class="bubble-label" style="font-weight:700;color:#53bdeb;font-size:11px;margin-bottom:4px;letter-spacing:0.3px;">${msg.label}</div>`
    : '';

  if (msg.audio) {
    const waves = msg.audio.waves.map(h => `<span style="height:${h}px"></span>`).join('');
    bubble.innerHTML =
      `<div class="audio"><span class="play">▶</span><div class="wave">${waves}</div><span class="dur">${msg.audio.dur}</span></div>` +
      timeHtml;
    bubble.style.minWidth = '200px';
  } else if (msg.html) {
    // html content goes into a wrapper we can type into char-by-char
    bubble.innerHTML = labelHtml + '<div class="bubble-html-body"></div>' + timeHtml;
    bubble.classList.add('card');
    bubble.style.maxWidth = '92%';
  } else if (msg.text !== undefined) {
    // typed char-by-char via .bubble-text span
    bubble.innerHTML = labelHtml + '<span class="bubble-text"></span>' + timeHtml;
  }

  row.appendChild(bubble);
  return row;
}

function buildTypingRow() {
  const row = document.createElement('div');
  row.className = 'bubble-row in typing-row reveal';
  row.innerHTML = '<div class="bubble left"><span class="typing"><span></span><span></span><span></span></span></div>';
  return row;
}

/* ---------------- Animate a chat sequentially ---------------- */
function animateChat(chatEl, messages, onComplete) {
  const body = chatEl.querySelector('.chat-body');
  if (!body) { onComplete && onComplete(); return; }
  const myToken = state.animToken;
  const isMine = () => myToken === state.animToken;
  let idx = 0;

  const scrollDown = () => { body.scrollTop = body.scrollHeight; };

  function next() {
    if (!isMine()) return;
    if (idx >= messages.length) { onComplete && onComplete(); return; }
    const msg = messages[idx];
    const isBot = msg.side === 'in';

    if (isBot && idx > 0) {
      const typing = buildTypingRow();
      body.appendChild(typing);
      scrollDown();
      addTimer(() => {
        if (!isMine()) return;
        typing.remove();
        reveal(msg);
      }, 650);
    } else {
      // user bubble or first bot bubble: short pause
      addTimer(() => reveal(msg), isBot ? 300 : 180);
    }
  }

  function reveal(msg) {
    if (!isMine()) return;
    const row = buildRow(msg);
    body.appendChild(row);
    scrollDown();
    if (msg.text !== undefined) {
      const span = row.querySelector('.bubble-text');
      addCaret(span);
      typeChars(span, msg.text, () => {
        removeCaret(span);
        idx++;
        addTimer(next, 200);
      });
    } else if (msg.html) {
      const target = row.querySelector('.bubble-html-body');
      typeHtml(target, msg.html, () => {
        idx++;
        addTimer(next, 260);
      });
    } else {
      // audio or other non-typed content
      idx++;
      addTimer(next, 450);
    }
  }

  // Character-by-character typing for plain text (into a <span>)
  function typeChars(span, text, done) {
    const speed = text.length > 120 ? 14 : 22;
    let ci = 0;
    function step() {
      if (!isMine()) return;
      if (ci >= text.length) { done(); return; }
      // Insert char before the caret, if any
      const caret = span.querySelector('.caret');
      const node = document.createTextNode(text[ci]);
      if (caret) span.insertBefore(node, caret);
      else span.appendChild(node);
      ci++;
      scrollDown();
      addTimer(step, speed);
    }
    step();
  }

  // Character-by-character typing through an HTML fragment preserving DOM structure
  function typeHtml(container, html, done) {
    // Parse html into a fragment
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    // Collect text nodes and remember their original text; clear them
    const textNodes = [];
    const walk = (n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        if (n.nodeValue && n.nodeValue.length) {
          textNodes.push({ node: n, text: n.nodeValue });
          n.nodeValue = '';
        }
      } else if (n.nodeType === Node.ELEMENT_NODE) {
        // Skip <br> etc. (no text), recurse into children
        for (const ch of Array.from(n.childNodes)) walk(ch);
      }
    };
    walk(tmp);
    // Move children into the live container
    while (tmp.firstChild) container.appendChild(tmp.firstChild);
    // Place a caret at the end of container
    addCaret(container);
    // Compute pace: fewer chars → slower, more chars → faster (so long cards finish sooner)
    const total = textNodes.reduce((s, t) => s + t.text.length, 0);
    const speed = total > 260 ? 11 : (total > 140 ? 16 : 22);
    let ni = 0, ci = 0;
    function step() {
      if (!isMine()) return;
      // Skip empty text nodes
      while (ni < textNodes.length && ci >= textNodes[ni].text.length) { ni++; ci = 0; }
      if (ni >= textNodes.length) {
        removeCaret(container);
        done();
        return;
      }
      const cur = textNodes[ni];
      cur.node.nodeValue += cur.text[ci];
      ci++;
      scrollDown();
      addTimer(step, speed);
    }
    step();
  }

  function addCaret(el) {
    if (!el) return;
    // If already has a caret, leave it
    if (el.querySelector && el.querySelector('.caret')) return;
    const c = document.createElement('span');
    c.className = 'caret';
    el.appendChild(c);
  }
  function removeCaret(el) {
    if (!el) return;
    const c = el.querySelector && el.querySelector('.caret');
    if (c) c.remove();
  }

  next();
}

/* ---------------- Render scene carousel bar ---------------- */
function buildSceneBar(scenes, sceneIdx) {
  const bar = document.createElement('div');
  bar.className = 'scene-bar';

  // Left spacer so the pills stay visually centered
  const spacer = document.createElement('span');
  spacer.className = 'scene-bar-spacer';
  bar.appendChild(spacer);

  const pills = document.createElement('div');
  pills.className = 'scene-pills';
  scenes.forEach((s, i) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'scene-pill' + (i === sceneIdx ? ' active' : '');
    pill.textContent = s.label;
    // Navegación manual: pausa la secuencia y muestra la escena elegida
    pill.onclick = () => { setPlaying(false); state.sceneIdx = i; renderScene(); };
    pills.appendChild(pill);
  });
  bar.appendChild(pills);

  // Replay button on the right — appears always once there's more than one scene
  const replay = document.createElement('button');
  replay.type = 'button';
  replay.className = 'scene-replay' + (sceneIdx === scenes.length - 1 ? ' ready' : '');
  replay.title = 'Volver a reproducir los ejemplos desde el principio';
  replay.innerHTML = '<span class="ico">↻</span><span class="lbl">Repetir</span>';
  replay.onclick = () => { setPlaying(false); state.sceneIdx = 0; renderScene(); };
  bar.appendChild(replay);

  return bar;
}

/* ---------------- Render the current scene for the current milestone ----
   opts.onComplete — callback invocado cuando la escena ha terminado de
   presentarse (static: tras los stagger-reveals; chat: tras el último
   mensaje). El sequencer usa esto para encadenar el avance. Si no se
   pasa, la escena simplemente se renderiza sin encadenar nada.
------------------------------------------------------------------------ */
function renderScene(opts) {
  clearAnims();
  const onComplete = opts && opts.onComplete;
  const root = document.getElementById('tab-example');
  if (!root) return;
  const scenes = (typeof EXAMPLES !== 'undefined' && EXAMPLES[state.idx]) || [];
  if (!scenes.length) { root.innerHTML = ''; if (onComplete) onComplete(); return; }

  if (state.sceneIdx >= scenes.length) state.sceneIdx = 0;
  const scene = scenes[state.sceneIdx];

  root.innerHTML = '';

  if (scenes.length > 1) {
    root.appendChild(buildSceneBar(scenes, state.sceneIdx));
  }

  const holder = document.createElement('div');
  holder.className = 'scene-holder';
  root.appendChild(holder);

  const myToken = state.animToken;
  const isMine = () => myToken === state.animToken;
  const fire = (cb) => { if (cb && isMine()) cb(); };

  if (typeof scene.render === 'function') {
    holder.innerHTML = scene.render();
    const staggerables = holder.querySelectorAll('.eg-check');
    if (staggerables.length) {
      staggerables.forEach(el => el.classList.add('stagger-hidden'));
      staggerables.forEach((el, i) => {
        addTimer(() => {
          if (!isMine()) return;
          el.classList.remove('stagger-hidden');
          el.classList.add('stagger-reveal');
        }, 120 + i * 420);
      });
      // Completamos cuando termina el último stagger
      addTimer(() => fire(onComplete), 120 + (staggerables.length - 1) * 420 + 450);
    } else {
      // Estático sin stagger: completado inmediatamente
      fire(onComplete);
    }
  } else if (Array.isArray(scene.messages)) {
    const chat = document.createElement('div');
    chat.className = 'chat animating';
    chat.innerHTML =
      `<div class="chat-head">
         <div class="av">🏀</div>
         <div><div class="nm">BasketIQ</div><div class="sb">${scene.sub || 'en línea'}</div></div>
       </div>
       <div class="chat-body"></div>`;
    holder.appendChild(chat);
    animateChat(chat, scene.messages, () => { fire(onComplete); });
  } else {
    fire(onComplete);
  }
}

// Limpia el panel lateral de escenas (usado en el arranque y al reset).
function clearSceneArea() {
  clearAnims();
  const root = document.getElementById('tab-example');
  if (root) root.innerHTML = '';
}

/* ---------------- Roadmap documentado (octubre 2026 en adelante) ---------------- */
function renderPlan() {
  const root = document.getElementById('plan-months');
  if (!root || typeof PLAN_MONTHS === 'undefined') return;
  root.innerHTML = PLAN_MONTHS.map(m => `
    <article class="plan-month ${m.kind}">
      <header class="pm-head">
        <div class="pm-nm">${m.month}</div>
        <span class="pm-badge">${m.badge}</span>
      </header>
      <h3 class="pm-headline">${m.headline}</h3>
      <p class="pm-desc">${m.desc}</p>
      <ul class="pm-items">
        ${m.items.map(it => `<li><span class="pm-dot"></span><span>${it}</span></li>`).join('')}
      </ul>
    </article>
  `).join('');
}

/* ---------------- Grants section ---------------- */
function renderGrants() {
  if (typeof GRANTS_2026 === 'undefined') return;

  const grid = document.getElementById('grants-grid');
  if (grid) {
    grid.innerHTML = GRANTS_2026.shortlist.map((g, i) => `
      <article class="grant-card grant-${g.type}" data-status="${g.status}">
        <header class="grant-head">
          <span class="grant-chip">${g.typeLabel}</span>
          <span class="grant-window">${g.window}</span>
        </header>
        <h3 class="grant-name">${i + 1}. ${g.name}</h3>
        <p class="grant-amount">${g.amount}</p>
        <p class="grant-teaser">${g.teaser}</p>
        <ul class="grant-bullets">
          ${g.bullets.map(b => `<li><span class="grant-dot"></span><span>${b}</span></li>`).join('')}
        </ul>
        <footer class="grant-foot">
          <span class="grant-priority">${g.priority}</span>
          ${g.url ? `<a class="grant-link" href="${g.url}" target="_blank" rel="noopener">fuente oficial ↗</a>` : ''}
        </footer>
      </article>
    `).join('');
  }

  const parallel = document.getElementById('grants-parallel');
  if (parallel) {
    parallel.innerHTML = GRANTS_2026.parallel.map(p => `
      <article class="grant-parallel grant-${p.type}">
        <header class="grant-head">
          <span class="grant-chip">${p.typeLabel}</span>
          <span class="grant-role">${p.role}</span>
        </header>
        <h4 class="grant-name-sm">${p.name}</h4>
        <p class="grant-amount-sm">${p.amount}</p>
        <p class="grant-note">${p.note}</p>
        ${p.url ? `<a class="grant-link" href="${p.url}" target="_blank" rel="noopener">fuente oficial ↗</a>` : ''}
      </article>
    `).join('');
  }

  const watch = document.getElementById('grants-watch');
  if (watch) {
    watch.innerHTML = GRANTS_2026.watchlist.map(w => `
      <article class="grant-card grant-card--watch grant-${w.type}">
        <header class="grant-head">
          <span class="grant-chip">${w.typeLabel}</span>
          <span class="grant-window">${w.window}</span>
        </header>
        <h3 class="grant-name">${w.name}</h3>
        <p class="grant-amount">${w.amount}</p>
        <p class="grant-teaser">${w.teaser}</p>
        <ul class="grant-bullets">
          ${w.bullets.map(b => `<li><span class="grant-dot"></span><span>${b}</span></li>`).join('')}
        </ul>
        <footer class="grant-foot">
          <span class="grant-priority grant-watch-tag">Watchlist</span>
          ${w.url ? `<a class="grant-link" href="${w.url}" target="_blank" rel="noopener">fuente oficial ↗</a>` : `<span class="grant-link-empty">${w.note}</span>`}
        </footer>
        ${w.url ? `<p class="grant-watch-note">${w.note}</p>` : ''}
      </article>
    `).join('');
  }
}

/* ================================================================
   ARCHITECTURE (target) — SVG diagram of the full functional platform
================================================================ */
function renderArchitecture() {
  const svg = document.getElementById('arch-diagram');
  if (!svg || typeof ARCHITECTURE === 'undefined') return;

  const A = ARCHITECTURE;
  svg.setAttribute('viewBox', `0 0 ${A.viewBox.w} ${A.viewBox.h}`);
  svg.innerHTML = '';

  // Group containers
  const gBands = document.createElementNS(SVG_NS, 'g'); gBands.setAttribute('class', 'arch-bands');
  const gEdges = document.createElementNS(SVG_NS, 'g'); gEdges.setAttribute('class', 'arch-edges');
  const gItems = document.createElementNS(SVG_NS, 'g'); gItems.setAttribute('class', 'arch-items');
  const gSide  = document.createElementNS(SVG_NS, 'g'); gSide.setAttribute('class',  'arch-sidebar');
  svg.appendChild(gBands);
  svg.appendChild(gEdges);
  svg.appendChild(gItems);
  svg.appendChild(gSide);

  // Layout helpers for the main column
  const labelGutter = 150;
  const innerPad = 12;
  const bandInnerX = A.main.x + labelGutter;
  const bandInnerW = A.main.x + A.main.w - bandInnerX - innerPad;

  const bandById = {};
  A.bands.forEach(b => { bandById[b.id] = b; });

  // Draw bands + labels
  A.bands.forEach(b => {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', `arch-band arch-band--${b.kind}`);
    rect.setAttribute('x', A.main.x);
    rect.setAttribute('y', b.y);
    rect.setAttribute('width', A.main.w);
    rect.setAttribute('height', b.h);
    rect.setAttribute('rx', 14);
    gBands.appendChild(rect);

    const labelG = document.createElementNS(SVG_NS, 'g');
    labelG.setAttribute('class', 'arch-band-label');
    labelG.setAttribute('transform', `translate(${A.main.x + 16}, ${b.y + b.h / 2})`);
    const title = document.createElementNS(SVG_NS, 'text');
    title.setAttribute('class', 'arch-band-title');
    title.setAttribute('y', -4);
    title.textContent = b.label;
    labelG.appendChild(title);
    if (b.hint) {
      const hint = document.createElementNS(SVG_NS, 'text');
      hint.setAttribute('class', 'arch-band-hint');
      hint.setAttribute('y', 14);
      hint.textContent = b.hint;
      labelG.appendChild(hint);
    }
    gBands.appendChild(labelG);
  });

  // Compute + store item rects for edge routing
  const itemRects = {};

  // Draw items
  A.items.forEach(it => {
    const band = bandById[it.band]; if (!band) return;
    const rows = band.rows || 1;
    const cols = band.cols || 1;
    const cellW = bandInnerW / cols;
    const cellH = (band.h - 30) / rows;

    const col = it.col || 0;
    const row = it.row || 0;
    let x = bandInnerX + col * cellW + 6;
    let w = cellW - 12;
    if (it.span === 'full') {
      x = bandInnerX;
      w = bandInnerW;
    }
    const y = band.y + 26 + row * cellH;
    const h = cellH - 6;

    const key = rows > 1 ? `${it.band}:${row}.${col}` : `${it.band}:${col}`;
    itemRects[key] = { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };

    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class',
      `arch-item arch-item--${band.kind}` +
      (it.highlight ? ' arch-item--highlight' : '') +
      (it.muted ? ' arch-item--muted' : '')
    );
    g.setAttribute('transform', `translate(${x},${y})`);

    const r = document.createElementNS(SVG_NS, 'rect');
    r.setAttribute('class', 'arch-item-bg');
    r.setAttribute('width', w);
    r.setAttribute('height', h);
    r.setAttribute('rx', 11);
    g.appendChild(r);

    // Label (can wrap)
    const labelBudget = Math.max(10, Math.floor(w / 7.2));
    const labelLines = wrapLabelLines(it.label, labelBudget);
    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('class', 'arch-item-label');
    label.setAttribute('x', w / 2);
    label.setAttribute('y', it.sub ? h / 2 - (labelLines.length - 1) * 6 - 4 : h / 2 + 4);
    labelLines.forEach((line, i) => {
      const ts = document.createElementNS(SVG_NS, 'tspan');
      ts.setAttribute('x', w / 2);
      ts.setAttribute('dy', i === 0 ? 0 : 13);
      ts.textContent = line;
      label.appendChild(ts);
    });
    g.appendChild(label);

    if (it.sub) {
      const sub = document.createElementNS(SVG_NS, 'text');
      sub.setAttribute('class', 'arch-item-sub');
      sub.setAttribute('x', w / 2);
      sub.setAttribute('y', h - 9);
      sub.textContent = it.sub;
      g.appendChild(sub);
    }

    if (it.badge) {
      const bg = document.createElementNS(SVG_NS, 'rect');
      bg.setAttribute('class', 'arch-item-badge-bg');
      bg.setAttribute('x', w - 46);
      bg.setAttribute('y', 6);
      bg.setAttribute('width', 40);
      bg.setAttribute('height', 14);
      bg.setAttribute('rx', 7);
      g.appendChild(bg);
      const bt = document.createElementNS(SVG_NS, 'text');
      bt.setAttribute('class', 'arch-item-badge');
      bt.setAttribute('x', w - 26);
      bt.setAttribute('y', 16);
      bt.textContent = it.badge;
      g.appendChild(bt);
    }

    gItems.appendChild(g);
  });

  // Draw edges (subtle curves)
  (A.edges || []).forEach(([fromKey, toKey]) => {
    const a = itemRects[fromKey], b = itemRects[toKey];
    if (!a || !b) return;
    const ax = a.cx, ay = a.y + a.h;
    const bx = b.cx, by = b.y;
    const midY = (ay + by) / 2;
    const d = `M${ax},${ay} C${ax},${midY} ${bx},${midY} ${bx},${by}`;
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', 'arch-edge');
    gEdges.appendChild(p);
  });

  // Sidebar (external entities)
  const side = A.sidebar;
  const sideBg = document.createElementNS(SVG_NS, 'rect');
  sideBg.setAttribute('class', 'arch-sidebar-bg');
  sideBg.setAttribute('x', side.x);
  sideBg.setAttribute('y', side.y);
  sideBg.setAttribute('width', side.w);
  sideBg.setAttribute('height', side.h);
  sideBg.setAttribute('rx', 14);
  gSide.appendChild(sideBg);

  const sideLabel = document.createElementNS(SVG_NS, 'text');
  sideLabel.setAttribute('class', 'arch-sidebar-label');
  sideLabel.setAttribute('x', side.x + 16);
  sideLabel.setAttribute('y', side.y + 26);
  sideLabel.textContent = side.label;
  gSide.appendChild(sideLabel);

  const count = A.externals.length;
  const topPad = 48;
  const bottomPad = 16;
  const gap = 8;
  const avail = side.h - topPad - bottomPad;
  const itemH = Math.min(70, Math.floor((avail - gap * (count - 1)) / count));
  A.externals.forEach((e, i) => {
    const x = side.x + 12;
    const y = side.y + topPad + i * (itemH + gap);
    const w = side.w - 24;
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class',
      'arch-external' +
      (e.highlight ? ' arch-external--highlight' : '') +
      (e.muted ? ' arch-external--muted' : '')
    );
    g.setAttribute('transform', `translate(${x},${y})`);
    const r = document.createElementNS(SVG_NS, 'rect');
    r.setAttribute('class', 'arch-external-bg');
    r.setAttribute('width', w); r.setAttribute('height', itemH); r.setAttribute('rx', 10);
    g.appendChild(r);
    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('class', 'arch-external-label');
    label.setAttribute('x', 14);
    label.setAttribute('y', 22);
    label.textContent = e.label;
    g.appendChild(label);
    if (e.sub) {
      const sub = document.createElementNS(SVG_NS, 'text');
      sub.setAttribute('class', 'arch-external-sub');
      sub.setAttribute('x', 14);
      sub.setAttribute('y', 40);
      sub.textContent = e.sub;
      g.appendChild(sub);
    }
    gSide.appendChild(g);
  });
}

/* ---------------- Section index navigation ---------------- */
const SECTION_LABELS = {
  overview: 'Prototipo',
  architecture: 'Arquitectura',
  summary: 'Capacidades',
  plan: 'Roadmap producto',
  tracks: 'Tracks',
  grants: 'Ayudas 2026'
};

function setActiveSectionLink(targetId) {
  document.querySelectorAll('.section-link[data-target]').forEach(link => {
    link.classList.toggle('active', link.dataset.target === targetId);
  });
  const kicker = document.getElementById('section-kicker');
  if (kicker && SECTION_LABELS[targetId]) kicker.textContent = SECTION_LABELS[targetId];
}

function initSectionIndex() {
  const links = Array.from(document.querySelectorAll('.section-link[data-target]'));
  const scrollLinks = Array.from(document.querySelectorAll('[data-target]'));

  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.dataset.target;
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;
      e.preventDefault();
      if (link.classList.contains('section-link')) setActiveSectionLink(targetId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Observe every known section (including those not in the menu, like #summary)
  // so the header kicker always reflects the current section while scrolling.
  const sections = Object.keys(SECTION_LABELS)
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) {
        setActiveSectionLink(visible.target.id);
      }
    }, {
      root: null,
      rootMargin: '-18% 0px -45% 0px',
      threshold: [0.2, 0.35, 0.5, 0.7]
    });

    sections.forEach(section => observer.observe(section));
  }
}

/* ================================================================
   MILESTONE MODAL
   Se abre en cada transición de etapa (incluido el arranque). Muestra
   título + body (≤250 chars, con <strong>/<em>) y una barra de
   progreso de 5s. Al cerrarse ejecuta onClose(), momento en el que
   las animaciones del resto (escena WhatsApp / checklist) arrancan.
================================================================ */
const MODAL_DURATION_MS = 5000;

function clearModalTimers() {
  state.modalTimers.forEach(t => clearTimeout(t));
  state.modalTimers = [];
}
function addModalTimer(fn, ms) {
  const t = setTimeout(fn, ms);
  state.modalTimers.push(t);
  return t;
}

function closeMilestoneModal() {
  const root = document.getElementById('milestone-modal');
  if (!root) return;
  clearModalTimers();
  state.modalToken++;
  root.classList.remove('mm-open');
  root.setAttribute('hidden', '');
  state.modalOpen = false;
}

function openMilestoneModal(i, onClose) {
  const root = document.getElementById('milestone-modal');
  const enablers = (typeof MILESTONE_ENABLERS !== 'undefined') ? MILESTONE_ENABLERS : null;
  const payload = enablers && enablers[i];
  const milestone = MILESTONES[i];

  // Si no hay datos de modal, saltamos directamente a las animaciones.
  if (!root || !payload || !milestone) { onClose && onClose(); return; }

  // Cancelamos cualquier modal previo en curso.
  clearModalTimers();
  state.modalToken++;
  const myToken = state.modalToken;
  state.modalOpen = true;

  // Rellenamos contenido
  const chip = document.getElementById('mm-chip');
  const title = document.getElementById('mm-title');
  const body = document.getElementById('mm-body');
  const bar = document.getElementById('mm-progress-bar');
  if (chip)  chip.textContent  = `${milestone.phase} · ${milestone.date}`;
  if (title) title.textContent = payload.title;
  if (body)  body.innerHTML    = payload.body; // permitimos <strong>/<em>
  if (bar) {
    // Reset barra a 100% (llena) instantáneamente, luego animamos a 0% en 5s
    bar.style.transition = 'none';
    bar.style.width = '100%';
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    bar.offsetWidth;
    bar.style.transition = `width ${MODAL_DURATION_MS}ms linear`;
    bar.style.width = '0%';
  }

  root.removeAttribute('hidden');
  // pequeño rAF para que aplique la transición de entrada
  requestAnimationFrame(() => root.classList.add('mm-open'));

  // Timer de cierre automático
  addModalTimer(() => {
    if (myToken !== state.modalToken) return;
    finish();
  }, MODAL_DURATION_MS);

  function finish() {
    if (myToken !== state.modalToken) return;
    closeMilestoneModal();
    onClose && onClose();
  }

  // Early dismiss → close + continue with animations
  const dismissHandlers = [];
  const bindDismiss = (el, evt) => {
    if (!el) return;
    const h = (e) => {
      if (evt === 'keydown' && e.key !== 'Escape') return;
      e.preventDefault && e.preventDefault();
      finish();
    };
    el.addEventListener(evt, h);
    dismissHandlers.push({ el, evt, h });
  };
  root.querySelectorAll('[data-mm-close]').forEach(el => bindDismiss(el, 'click'));
  bindDismiss(document, 'keydown');
  // Limpieza de listeners cuando el modal se cierra definitivamente
  const cleanup = () => {
    dismissHandlers.forEach(({ el, evt, h }) => el.removeEventListener(evt, h));
  };
  addModalTimer(cleanup, MODAL_DURATION_MS + 50);
}

/* ---------------- Main render ---------------- */
// Render estático del dashboard (timeline, diagrama, hero, stats, summary).
// No dispara animaciones de escena: eso corre por cuenta de renderScene().
function renderStatic() {
  renderTimeline();
  renderDiagram();
  renderHero();
  renderStats();
  renderSummary();
}

/* ---------------- Cambio de hito ----------------
   Reglas:
   - Siempre: reset de timers, update state.idx, redibujo de timeline/hero/
     stats/summary y redibujo del diagrama en estado "previo" (state
     .diagramIdx = i - 1, clamp a -1). El sequencer revelará el estado i
     en la fase de activación.
   - Si playing=true: arranca la secuencia del hito i (modal → activación
     → escenas). initialDelay sólo se aplica al primer play del usuario.
   - Si playing=false: deja visible el estado previo sin modal ni escena.
---------------------------------------------------------------- */
function goToMilestone(i, opts) {
  if (i < 0 || i >= MILESTONES.length) return;
  cancelSequence();
  clearAnims();
  if (state.modalOpen) closeMilestoneModal();

  state.idx = i;
  state.sceneIdx = 0;
  // Con play activo: diagrama lag a i-1 (el sequencer revelará i en la
  // fase de activación). Pausado: mostramos el estado completo del hito
  // para que el usuario pueda inspeccionarlo.
  state.diagramIdx = state.playing ? Math.max(-1, i - 1) : i;

  renderStatic();
  renderDiagram();
  clearSceneArea();

  if (state.playing) {
    runMilestoneSequence(i, opts);
  }
}

/* ---------------- Controls ---------------- */
document.getElementById('play-btn').onclick = () => togglePlay();
document.getElementById('reset-btn').onclick = () => {
  // Refresh: rebobina a M0 (estado estático de inicio) y arranca la
  // secuencia saltando directamente a M1 (el modal de M0 no existe).
  state.idx = 0;
  state.diagramIdx = -1;
  state.sceneIdx = 0;
  state.prev = { weeks: 0, components: 0, capabilities: 0 };
  cancelSequence();
  clearAnims();
  if (state.modalOpen) closeMilestoneModal();
  renderStatic();
  renderDiagram();
  clearSceneArea();
  setPlaying(true);
  goToMilestone(1, { initialDelay: SEQ_TIMING.initialDelay });
};

document.addEventListener('keydown', e => {
  if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if (e.key === 'Home')    document.getElementById('reset-btn').click();
});

// Render único (no cambia con el milestone)
renderPlan();
renderGrants();
renderArchitecture();
updatePlayButton();
// Arranque: todo estático, sin modal ni escena. diagramIdx = -1 para
// que el diagrama aparezca sin componentes activados: la secuencia
// arrancará sólo cuando el usuario pulse play.
renderStatic();
renderDiagram();
clearSceneArea();
initSectionIndex();
