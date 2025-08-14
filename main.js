window.addEventListener('DOMContentLoaded', () => {
  // ---------- metrics ----------
  const FONT_FAMILY = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";
  const FONT_SIZE = 28;
  const LETTER_SPACING = 1;
  const LINE_HEIGHT_FACTOR = 1.7;

  const CARET_COLOR = "#e2b714";
  const CARET_THICKNESS = 2;
  const CARET_TOP = 0.15;
  const CARET_HEIGHT = 0.78;

  // ---------- config ----------
  const TIMER_LEN = 30; // default 30s
  const WORD_GOAL_DEFAULT = 50;

<<<<<<< HEAD
  const THEMES = {
    dark: {
      bg: "#0d1623",
      ink: "#9bb0c9",
      correct: "#7cffc4",
      wrong: "#ff6b6b",
      caret: CARET_COLOR
    },
    light: {
      bg: "#ffffff",
      ink: "#243b53",
      correct: "#3ba776",
      wrong: "#ff6b6b",
      caret: CARET_COLOR
    }
  };

  let currentTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  let COLORS = { ...THEMES[currentTheme] };

  const SAMPLES = [
    "monkeys type better when coffee is near and bugs run away",
    "practice every day and tiny gains stack into big jumps",
    "focus on accuracy then the speed will arrive on its own",
    "clean code reads like prose and bends without breaking",
    "java and python both shine when tested with care",
    "consistency beats intensity so show up for ten minutes",
    "measure what matters wpm accuracy and calm breathing",
    "small hands big brain type practice never skips warmup",
    "arrays lists maps sets know your tools and use them well",
    "latency hides in loops profile before you optimize",
    "syntax errors vanish when compilers finally approve the build",
    "memory leaks fade once references release forgotten objects",
    "typing fast demands practice patience and quiet focus",
    "keyboards click and clack bringing rhythm to late night code",
    "developers debug tricky issues during silent sunrise mornings",
    "stack overflow jokes spread quickly among weary coders",
    "version control saves projects from chaotic copy paste wars",
    "ship features often but refactor pieces with deliberate care",
    "review pull requests kindly to grow teammates into experts",
    "good naming whispers intent and prevents future confusion"
  ];
=======
  const COLORS_DARK = {
    bg: "#0d1623",
    ink: "#9bb0c9",
    correct: "#7cffc4",
    wrong: "#ff6b6b",
    caret: CARET_COLOR
  };
  const COLORS_LIGHT = {
    bg: "#ffffff",
    ink: "#445161",
    correct: "#7cffc4",
    wrong: "#ff6b6b",
    caret: CARET_COLOR
  };
  let COLORS = COLORS_DARK;
  // sample text pools
  let SAMPLE_POOL = typeof B1_SAMPLES !== 'undefined' ? B1_SAMPLES : [];
  const SAMPLE_POOLS = {
    B1: typeof B1_SAMPLES !== 'undefined' ? B1_SAMPLES : [],
    B2: typeof B2_SAMPLES !== 'undefined' ? B2_SAMPLES : [],
    C1: typeof C1_SAMPLES !== 'undefined' ? C1_SAMPLES : [],
    C2: typeof C2_SAMPLES !== 'undefined' ? C2_SAMPLES : []
  };
>>>>>>> f67667d57fcb900d1a3f43bec92bcc0feba6523a

  // ---------- elements ----------
  const app = document.getElementById('app');
  const canvas = document.getElementById('stage');
  const ctx = canvas.getContext('2d');
  const resultsView = document.getElementById('results');
  const timerSeg = document.getElementById('timerSeg');
  const sampleSeg = document.getElementById('sampleSeg');
  const typingEls = [canvas, document.getElementById('controls'), document.getElementById('hud')];
  const els = {
    wpm: document.getElementById('wpm'),
    acc: document.getElementById('acc'),
    time: document.getElementById('time'),
    wordCount: document.getElementById('wordCount'),
    timerBadge: document.getElementById('timerBadge'),
    restart: document.getElementById('restart'),
    newText: document.getElementById('newText'),
    shorter: document.getElementById('shorter'),
    longer: document.getElementById('longer'),
    custom: document.getElementById('custom'),
    overlay: document.getElementById('overlay'),
    customArea: document.getElementById('customArea'),
    cancelCustom: document.getElementById('cancelCustom'),
    useCustom: document.getElementById('useCustom'),
    // results
    resWpm: document.getElementById('resWpm'),
    resAcc: document.getElementById('resAcc'),
    resType: document.getElementById('resType'),
    resRaw: document.getElementById('resRaw'),
    resChars: document.getElementById('resChars'),
    resCons: document.getElementById('resCons'),
    resTime: document.getElementById('resTime'),
    resOther: document.getElementById('resOther'),
    resChart: document.getElementById('resChart'),
    btnRepeat: document.getElementById('btnRepeat'),
    btnNext: document.getElementById('btnNext'),
    btnOwn: document.getElementById('btnOwn'),
    sink: document.getElementById('sink'),
    themeToggle: document.getElementById('themeToggle')
  };

  function updateColors(){
    COLORS = document.body.classList.contains('light') ? COLORS_LIGHT : COLORS_DARK;
  }

  // ---------- theme ----------
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.body.classList.add('light');
  }
  updateColors();
  els.themeToggle.textContent = document.body.classList.contains('light') ? 'dark mode' : 'light mode';
  els.themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    els.themeToggle.textContent = isLight ? 'dark mode' : 'light mode';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateColors();
    if (resultsView.classList.contains('show')) drawResultChart();
  });

  // ---------- state ----------
  const params = new URLSearchParams(location.search);
  let wordsTarget = clamp(parseInt(params.get('w')) || WORD_GOAL_DEFAULT, 5, 200);
  let timerSeconds = clamp(parseInt(params.get('t')) || TIMER_LEN, 15, 300);

  let state = {
    text: "",
    chars: [],
    marks: [],      // 0=pending, 1=correct, -1=wrong
    index: 0,
    errors: 0,      // total wrong keypresses, even if corrected
    started: false,
    startTimeMs: 0,       // first keystroke time
    remaining: timerSeconds,
    timerId: null,
    // layout
    dpr: 1, cols: 0, rows: 0, charW: 0, lineH: 0, viewRow: 0, pos: [],
    // series for graph and consistency
    samples: [], sampleSeconds: [], lastSampleSec: 0,
    lastTypeAt: 0, afkSeconds: 0
  };

  // ---------- helpers ----------
  function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
  function normalizeText(s){ return (s || "").replace(/\s+/g,' ').trim().replace(/\s{2,}/g,' '); }
  function pickText(wordGoal){
    const words = [];
    while(words.length < wordGoal){
      const w = SAMPLE_POOL[Math.floor(Math.random()*SAMPLE_POOL.length)].split(/\s+/);
      words.push(...w);
    }
    return words.slice(0, wordGoal).join(' ');
  }
  function setFont(){ ctx.font = `${FONT_SIZE * state.dpr}px ${FONT_FAMILY}`; ctx.textBaseline = "top"; }
  function measure(){
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    state.dpr = dpr;
    const cssW = canvas.clientWidth, cssH = canvas.clientHeight;
    canvas.width  = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    setFont();
    state.charW = Math.round(ctx.measureText("0").width) + Math.round(LETTER_SPACING * dpr);
    state.lineH = Math.round(FONT_SIZE * LINE_HEIGHT_FACTOR * dpr);
    const innerW = canvas.width  - 48 * dpr, innerH = canvas.height - 48 * dpr;
    state.cols = Math.max(8, Math.floor(innerW / state.charW));
    state.rows = Math.max(1, Math.floor(innerH / state.lineH));
  }

  // --------- FIXED: word-wrapped layout with no first-word indent
  function buildLayout(){
    state.pos = new Array(state.chars.length);
    let row = 0, col = 0, i = 0;
    const cols = state.cols;

    while (i < state.chars.length) {
      // find next word [i..j-1]
      let j = i;
      while (j < state.chars.length && state.chars[j] !== ' ') j++;
      const len = j - i;
      if (len === 0) { // safety
        i++;
        continue;
      }

      // wrap whole word if it doesn't fit (but allow at col 0)
      if (col > 0 && col + len > cols) { row++; col = 0; }

      // place the word characters
      for (let k = i; k < j; k++) { state.pos[k] = { row, col }; col++; }

      // handle trailing space WITHOUT indenting next line
      if (j < state.chars.length && state.chars[j] === ' ') {
        const spCol = col;
        const spRow = row;
        // store space at the same row; if it would overflow, put it "offscreen" at col==cols
        state.pos[j] = { row: spRow, col: Math.min(spCol, cols) };

        // advance: if space overflowed, go to new line at col 0, else increment col
        if (spCol >= cols) { row++; col = 0; } else { col++; }
        i = j + 1;
      } else {
        i = j;
      }
    }
  }

  function ensureCaretVisible(){
    const rc = state.pos[state.index] || {row:0,col:0};
    const row = rc.row, bottom = state.viewRow + state.rows - 1;
    if (row > bottom) state.viewRow = row - (state.rows - 1);
    if (row < state.viewRow) state.viewRow = row;
    state.viewRow = Math.max(0, state.viewRow);
  }

  // ---------- rendering ----------
  function clear(){ ctx.fillStyle = COLORS.bg; ctx.fillRect(0,0,canvas.width,canvas.height); }
  function drawText(){
    const dpr = state.dpr, pad = 24 * dpr, startX = pad, startY = pad;
    for (let i = 0; i < state.chars.length; i++) {
      const rc = state.pos[i]; if (!rc) continue;
      const vRow = rc.row - state.viewRow; if (vRow < 0 || vRow >= state.rows) continue;
      const x = startX + rc.col * state.charW, y = startY + vRow * state.lineH;
      const ch = state.chars[i], mark = state.marks[i] || 0;

      // don't render spaces that land at column 0 or that were placed "offscreen"
      if (ch === ' ' && (rc.col === 0 || rc.col >= state.cols)) continue;

      if (mark === 1) ctx.fillStyle = COLORS.correct;
      else if (mark === -1) ctx.fillStyle = COLORS.wrong;
      else ctx.fillStyle = COLORS.ink;
      ctx.fillText(ch, x, y);
    }
    // caret (blinking)
    if (Math.floor(Date.now()/500) % 2 === 0) {
      const rc = state.pos[state.index];
      if (rc){
        const vRow = rc.row - state.viewRow; if (vRow>=0 && vRow<state.rows){
          const dpr = state.dpr, pad = 24*dpr, x = pad + rc.col * state.charW, y = pad + vRow*state.lineH;
          ctx.fillStyle = CARET_COLOR;
          const top = Math.round(FONT_SIZE * dpr * CARET_TOP), h = Math.round(FONT_SIZE * dpr * CARET_HEIGHT);
          ctx.fillRect(x, y + top, Math.max(1, Math.round(CARET_THICKNESS * dpr)), h);
        }
      }
    }
  }
  function render(){ clear(); drawText(); requestAnimationFrame(render); }

  // ---------- stats ----------
  function elapsedMinutes(){
    if (!state.started) return 0;
    const ms = Math.max(1, performance.now() - state.startTimeMs);
    return ms / 60000;
  }
  function recomputeStats(){
    let correct=0, wrong=0;
    for (const m of state.marks){ if (m===1) correct++; else if (m===-1) wrong++; }
    const typed = correct + wrong;
    const total = correct + state.errors;
    const tmin = elapsedMinutes();
    const wpm = tmin>0 ? (correct/5) / tmin : 0;        // correct-only WPM
    const raw = tmin>0 ? (typed/5) / tmin : 0;          // gross WPM
    const acc = total>0 ? (correct/total)*100 : 100;
    els.wpm.textContent = Math.round(wpm);
    els.acc.textContent = `${Math.round(acc)}%`;
    return {correct, wrong, typed, wpm, raw, acc: Math.round(acc)};
  }

  // ---------- timer & sampling ----------
  function startTimer(){
    if (state.started) return;
    state.started = true;
    state.startTimeMs = performance.now();
    state.lastSampleSec = 0;
    state.samples = []; state.sampleSeconds = [];
    state.lastTypeAt = performance.now();
    state.afkSeconds = 0;
    state.timerId = setInterval(() => {
      state.remaining = Math.max(0, state.remaining - 0.1);
      els.time.textContent = state.remaining.toFixed(1);

      const now = performance.now();
      if (now - state.lastTypeAt > 2000) state.afkSeconds = Math.min(timerSeconds, state.afkSeconds + 0.1);

      const elapsedSec = Math.floor((now - state.startTimeMs)/1000);
      if (elapsedSec > state.lastSampleSec){
        state.lastSampleSec = elapsedSec;
        const {wpm} = recomputeStats();
        state.samples.push(wpm);
        state.sampleSeconds.push(elapsedSec);
      }
      if (state.remaining <= 0) finish();
    }, 100);
  }

  function finish(){
    clearInterval(state.timerId); state.timerId = null;
    showResultsPage();
  }

  // ---------- input / control ----------
  function reset(newText=true){
    clearInterval(state.timerId); state.timerId = null;
    state.started = false; state.index = 0; state.viewRow = 0; state.errors = 0;
    state.remaining = timerSeconds;
    els.time.textContent = state.remaining.toFixed(1);

    if (newText || !state.text) state.text = pickText(wordsTarget);
    state.text = normalizeText(state.text);
    state.chars = state.text.split('');
    buildLayout();
    state.marks = new Array(state.chars.length).fill(0);

    recomputeStats();
    focusSink();
    ensureCaretVisible();
    hideResultsPage();
  }

  function handleKeydown(e){
    const key = (e.key || ""), withMod = e.ctrlKey || e.metaKey || e.altKey;
    if (!els.overlay.classList.contains('show') && resultsView.classList.contains('show') === false) focusSink();

    if (key.toLowerCase() === 'r' && withMod){ e.preventDefault(); reset(false); return; }
    if (key.toLowerCase() === 'n' && withMod){ e.preventDefault(); reset(true);  return; }
    if (key === 'Escape'){
      if (els.overlay.classList.contains('show')) { hideOverlay(); return; }
      if (resultsView.classList.contains('show')) { hideResultsPage(); reset(false); return; }
      e.preventDefault(); reset(false); return;
    }
  }

  function handleInput(e){
    if (els.overlay.classList.contains('show') || resultsView.classList.contains('show')) return;

    const it = e.inputType || "", data = e.data;
    if (!state.started && (it === "insertText" || it === "insertCompositionText")) startTimer();

    if (it === "deleteContentBackward"){
      if (state.index > 0){
        state.index--; state.marks[state.index] = 0;
        ensureCaretVisible(); recomputeStats();
      }
      return;
    }

    if (it === "insertText" || it === "insertCompositionText"){
      if (state.index >= state.chars.length){ finish(); return; }
      const str = data ?? "";
      for (const c of str){
        const expected = state.chars[state.index];
        const ok = (c === expected);
        state.marks[state.index] = ok ? 1 : -1;
        if (!ok) state.errors++;
        state.index++; state.lastTypeAt = performance.now();
        ensureCaretVisible();
        if (state.index >= state.chars.length) break;
      }
      recomputeStats();
      if (state.index >= state.chars.length) finish();
      return;
    }

    if (it === "insertFromPaste" && e.data){
      for (const c of e.data){
        if (state.index >= state.chars.length) break;
        const expected = state.chars[state.index];
        const ok = (c === expected);
        state.marks[state.index] = ok ? 1 : -1;
        if (!ok) state.errors++;
        state.index++; state.lastTypeAt = performance.now();
      }
      ensureCaretVisible(); recomputeStats();
      if (state.index >= state.chars.length) finish();
    }
  }

  // ---------- custom text ----------
  function showOverlay(){ els.overlay.classList.add('show'); els.customArea.value = state.text; setTimeout(()=>els.customArea.focus(),0); }
  function hideOverlay(){ els.overlay.classList.remove('show'); focusSink(); }
  function useCustomText(){
    const txt = normalizeText(els.customArea.value);
    if (!txt){ hideOverlay(); return; }
    state.text = txt; reset(false); hideOverlay();
  }

  // ---------- RESULTS PAGE ----------
  function showResultsPage(){
    const {correct, wrong, typed, wpm, raw, acc} = recomputeStats();
    const missed = Math.max(0, state.chars.length - typed);

    // consistency from WPM samples
    let cons = "—";
    if (state.samples.length >= 2){
      const avg = state.samples.reduce((a,b)=>a+b,0)/state.samples.length;
      const sd = Math.sqrt(state.samples.map(v=>Math.pow(v-avg,2)).reduce((a,b)=>a+b,0)/(state.samples.length-1));
      const cv = avg>0 ? (sd/avg)*100 : 100;
      cons = `${Math.max(0, Math.min(100, Math.round(100 - cv))) }%`;
    }

    const afkPct = Math.round((state.afkSeconds / timerSeconds) * 100);

    els.resWpm.textContent = Math.round(wpm);
    els.resAcc.textContent = `${acc}%`;
    els.resType.textContent = `time ${timerSeconds} • english`;
    els.resRaw.textContent = Math.round(raw);
    els.resChars.textContent = `${correct}/${wrong}/0/${missed}`;
    els.resCons.textContent = cons;
    els.resTime.textContent = `${timerSeconds}s`;
    els.resOther.textContent = afkPct>0 ? `afk detected (${afkPct}%)` : "—";

    drawResultChart();

    // swap to results view
    for (const el of typingEls) el.style.display = 'none';
    resultsView.classList.add('show');
  }

  function hideResultsPage(){
    resultsView.classList.remove('show');
    for (const el of typingEls) el.style.display = '';
  }

  function drawResultChart(){
    const c = els.resChart, g = c.getContext('2d');
    const W = c.width, H = c.height;
    const light = document.body.classList.contains('light');
    g.clearRect(0,0,W,H);
    g.fillStyle = light ? "#ffffff" : "#0d1623"; g.fillRect(0,0,W,H);
    // grid
    g.strokeStyle = light ? "#d0d7e2" : "#223148"; g.lineWidth = 1;
    g.beginPath(); for (let x=40; x<W; x+=60){ g.moveTo(x,20); g.lineTo(x,H-30); } g.stroke();
    g.beginPath(); for (let y=20; y<H-30; y+=30){ g.moveTo(40,y); g.lineTo(W-10,y); } g.stroke();

    const xs = state.sampleSeconds, ys = state.samples;
    if (!xs.length) return;
    const maxWpm = Math.max(40, Math.max(...ys) * 1.2);
    const x0 = 40, y0 = H-30, x1 = W-10, y1 = 20;
    const xscale = (x1 - x0) / Math.max(1, xs[xs.length-1]);
    const yscale = (y0 - y1) / maxWpm;

    g.strokeStyle = "#e2b714"; g.lineWidth = 2;
    g.beginPath();
    for (let i=0;i<xs.length;i++){
      const x = x0 + xs[i]*xscale;
      const y = y0 - ys[i]*yscale;
      if (i===0) g.moveTo(x,y); else g.lineTo(x,y);
    }
    g.stroke();
  }

  // ---------- focus ----------
  function focusSink(){
    try { els.sink.focus({preventScroll:true}); } catch {}
    try { els.sink.setSelectionRange(els.sink.value.length, els.sink.value.length); } catch {}
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible'
        && !els.overlay.classList.contains('show')
        && !resultsView.classList.contains('show')) {
      focusSink();
    }
  });
  window.addEventListener('focus', () => {
    if (!els.overlay.classList.contains('show') && !resultsView.classList.contains('show')) focusSink();
  });
  canvas.addEventListener('pointerdown', () => {
    if (!els.overlay.classList.contains('show') && !resultsView.classList.contains('show')) focusSink();
  });
  app.addEventListener('pointerdown', () => {
    if (!els.overlay.classList.contains('show') && !resultsView.classList.contains('show')) focusSink();
  });

  // ---------- timer selector ----------
  timerSeg.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-t]');
    if (!b) return;
    const t = parseInt(b.dataset.t, 10);
    if (Number.isFinite(t)) {
      for (const x of timerSeg.querySelectorAll('button')) x.classList.remove('is-active');
      b.classList.add('is-active');
      timerSeconds = t;
      els.timerBadge.textContent = `${t}s`;
      reset(false);
      syncURL();
    }
  });

  // ---------- sample pool selector ----------
  sampleSeg.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-sample]');
    if (!b) return;
    const key = b.dataset.sample;
    const pool = SAMPLE_POOLS[key];
    if (pool && pool.length) {
      for (const x of sampleSeg.querySelectorAll('button')) x.classList.remove('is-active');
      b.classList.add('is-active');
      SAMPLE_POOL = pool;
      reset(true);
    }
  });

  // ---------- wire ----------
  function syncURL(){
    const url = new URL(location.href);
    url.searchParams.set('w', wordsTarget);
    url.searchParams.set('t', timerSeconds);
    history.replaceState({}, '', url);
  }

  function applyTheme(theme){
    document.documentElement.classList.toggle('light', theme === 'light');
    COLORS = { ...THEMES[theme] };
    localStorage.setItem('theme', theme);
    currentTheme = theme;
  }

  els.restart.addEventListener('click', () => reset(false));     // repeat
  els.newText.addEventListener('click', () => reset(true));       // next
  els.shorter.addEventListener('click', () => { wordsTarget = clamp(wordsTarget-5, 5, 200); els.wordCount.textContent = wordsTarget; reset(true); syncURL(); });
  els.longer.addEventListener('click', () => { wordsTarget = clamp(wordsTarget+5, 5, 200); els.wordCount.textContent = wordsTarget; reset(true); syncURL(); });

  els.custom.addEventListener('click', showOverlay);
  els.cancelCustom.addEventListener('click', hideOverlay);
  els.useCustom.addEventListener('click', useCustomText);

  els.btnRepeat.addEventListener('click', () => { hideResultsPage(); reset(false); });
  els.btnNext.addEventListener('click',   () => { hideResultsPage(); reset(true);  });
  els.btnOwn.addEventListener('click',    () => { hideResultsPage(); showOverlay(); });
  els.themeToggle.addEventListener('change', () => {
    applyTheme(els.themeToggle.checked ? 'light' : 'dark');
  });

  document.addEventListener('keydown', handleKeydown);
  els.sink.addEventListener('input', handleInput);
  window.addEventListener('resize', () => { measure(); buildLayout(); ensureCaretVisible(); });

  // ---------- init ----------
  els.wordCount.textContent = WORD_GOAL_DEFAULT;
  els.timerBadge.textContent = `${timerSeconds}s`;
  applyTheme(currentTheme);
  els.themeToggle.checked = currentTheme === 'light';

  measure();
  state.text = pickText(wordsTarget);
  reset(false);
  els.time.textContent = timerSeconds.toFixed(1);
  focusSink();

  requestAnimationFrame(render);
});
