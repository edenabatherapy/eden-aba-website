function initChildClock() {
  "use strict";

  const canvas = document.getElementById("scene");
  if (!canvas || canvas.dataset.clockReady === "true") return;

  canvas.dataset.clockReady = "true";

  const ctx = canvas.getContext("2d", { alpha: false });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const CDC_TOOLBOX_DATA = {
    prevalence: "1 in 31",
    percent: "3.2%",
    addmYear: "2022",
    ageGroup: "8-year-old children",
    developmentalScreening: ["9m", "18m", "30m"],
    autismScreening: ["18m", "24m"],
  };

  window.setCDCData = function setCDCData(data) {
    Object.assign(CDC_TOOLBOX_DATA, data || {});
  };

  const LOOP_SEC = 56;

  const STORY = [
    { at: 0, title: "BIRTH", short: "Birth", color: "#14b8a6", mood: "wonder" },
    { at: 8, title: "9 MONTH", short: "9m", color: "#06b6d4", mood: "safe" },
    { at: 16, title: "18 MONTH", short: "18m", color: "#22c55e", mood: "seen" },
    { at: 24, title: "24 MONTH", short: "24m", color: "#facc15", mood: "bright" },
    { at: 32, title: "CARE", short: "Care", color: "#ec4899", mood: "care" },
    { at: 40, title: "DIAGNOSIS", short: "Dx", color: "#8b5cf6", mood: "relief" },
    { at: 48, title: "ALERT", short: "Alert", color: "#f97316", mood: "worried" },
  ];

  const state = {
    dpr: 1,
    w: 0,
    h: 0,
    cx: 0,
    cy: 0,
    r: 0,
    start: performance.now(),
    activeIndex: -1,
    stars: [],
    particles: [],
    neural: [],
    statDots: [],
    secondTrail: [],
    running: true,
    hasPainted: false,
  };

  window.getClockActiveStageIndex = function getClockActiveStageIndex() {
    return state.activeIndex < 0 ? 0 : state.activeIndex;
  };

  document.addEventListener("visibilitychange", () => {
    state.running = !document.hidden;
    if (state.running) requestAnimationFrame(loop);
  });

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;

    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.w = parent.clientWidth;
    state.h = parent.clientHeight;
    state.cx = state.w / 2;
    state.cy = state.h / 2;

    state.r = Math.min(state.w, state.h) * (state.w < 700 ? 0.21 : 0.22);

    canvas.width = Math.floor(state.w * state.dpr);
    canvas.height = Math.floor(state.h * state.dpr);
    canvas.style.width = `${state.w}px`;
    canvas.style.height = `${state.h}px`;

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    state.stars = Array.from({ length: state.w < 700 ? 90 : 150 }, () => ({
      x: Math.random() * state.w,
      y: Math.random() * state.h,
      r: Math.random() * 1.4 + 0.2,
      speed: reducedMotion ? 0 : Math.random() * 0.16 + 0.02,
      alpha: Math.random() * 0.45 + 0.15,
    }));

    state.neural = Array.from({ length: state.w < 700 ? 14 : 22 }, () => ({
      x: (Math.random() - 0.5) * state.r * 0.9,
      y: (Math.random() - 0.5) * state.r * 0.58,
      vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.18,
      vy: reducedMotion ? 0 : (Math.random() - 0.5) * 0.18,
    }));

    state.statDots = Array.from({ length: 31 }, (_, i) => ({ i }));
  }

  window.addEventListener("resize", resize, { passive: true });

  if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
    new ResizeObserver(resize).observe(canvas.parentElement);
  }

  resize();

  function introProgress() {
    if (reducedMotion) return 1;
    return Math.min(1, (performance.now() - state.start) / 2400);
  }

  function activeStory() {
    const t = ((performance.now() - state.start) / 1000) % LOOP_SEC;
    let index = 0;

    for (let i = 0; i < STORY.length; i++) {
      if (t >= STORY[i].at) index = i;
    }

    if (index !== state.activeIndex) {
      state.activeIndex = index;
      createBurst(STORY[index].color);
    }

    return STORY[index];
  }

  function clear(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, state.w, state.h);
  }

  function drawBackground(s) {
    const g = ctx.createRadialGradient(
      state.cx,
      state.cy,
      20,
      state.cx,
      state.cy,
      Math.max(state.w, state.h),
    );

    g.addColorStop(0, `${s.color}42`);
    g.addColorStop(0.4, "#0f172a");
    g.addColorStop(1, "#020617");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, state.w, state.h);

    ctx.strokeStyle = `${s.color}10`;
    ctx.lineWidth = 1;

    const grid = 52;
    const drift = reducedMotion ? 0 : (performance.now() * 0.01) % grid;

    for (let x = -grid + drift; x < state.w + grid; x += grid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, state.h);
      ctx.stroke();
    }

    for (let y = -grid + drift; y < state.h + grid; y += grid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(state.w, y);
      ctx.stroke();
    }

    for (const star of state.stars) {
      star.y += star.speed;
      if (star.y > state.h) star.y = 0;

      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawGalaxy(s, alpha) {
    const orbit = state.r + Math.min(95, Math.max(70, state.r * 0.34));
    const spin = reducedMotion ? 0 : Math.sin(performance.now() / 5200) * 0.035;

    ctx.save();
    ctx.globalAlpha = alpha;

    ctx.strokeStyle = `${s.color}30`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();

    for (let i = 0; i <= STORY.length; i++) {
      const a = -Math.PI / 2 + (i % STORY.length) * ((Math.PI * 2) / STORY.length) + spin;
      const x = state.cx + Math.cos(a) * orbit;
      const y = state.cy + Math.sin(a) * orbit;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();

    STORY.forEach((m, i) => {
      const a = -Math.PI / 2 + i * ((Math.PI * 2) / STORY.length) + spin;
      const x = state.cx + Math.cos(a) * orbit;
      const y = state.cy + Math.sin(a) * orbit;
      const active = m.title === s.title;
      const size = active ? 36 : 20;

      ctx.shadowColor = m.color;
      ctx.shadowBlur = active ? 45 : 14;

      ctx.fillStyle = active ? m.color : "rgba(255,255,255,.13)";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = m.color;
      ctx.lineWidth = active ? 4 : 1.5;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = active ? "#020617" : "#ffffff";
      ctx.font = active ? "900 12px Arial" : "800 9px Arial";
      ctx.fillText(m.short, x, y + 1);
    });

    ctx.restore();
  }

  function drawClockShell(s, alpha) {
    ctx.save();
    ctx.translate(state.cx, state.cy);
    ctx.globalAlpha = alpha;

    const heartbeat =
      s.mood === "care" && !reducedMotion ? 1 + Math.sin(performance.now() / 115) * 0.018 : 1;

    ctx.scale(heartbeat, heartbeat);

    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = s.color + ["66", "44", "30", "22", "16", "10"][i];
      ctx.lineWidth = i === 0 ? 2 : 1.2;
      const pulse = reducedMotion ? 0 : Math.sin(performance.now() / 500) * 4;
      ctx.beginPath();
      ctx.arc(0, 0, state.r + i * 26 + pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.shadowColor = s.color;
    ctx.shadowBlur = 70;
    ctx.fillStyle = "rgba(255,255,255,.075)";
    ctx.beginPath();
    ctx.arc(0, 0, state.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.lineWidth = 15;
    ctx.strokeStyle = s.color;
    ctx.beginPath();
    ctx.arc(0, 0, state.r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,.22)";
    ctx.beginPath();
    ctx.arc(0, 0, state.r - 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawProgressRing(s, alpha) {
    const t = ((performance.now() - state.start) / 1000) % LOOP_SEC;
    const progress = reducedMotion ? state.activeIndex / STORY.length : t / LOOP_SEC;

    ctx.save();
    ctx.translate(state.cx, state.cy);
    ctx.globalAlpha = alpha;

    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(255,255,255,.10)";
    ctx.beginPath();
    ctx.arc(0, 0, state.r + 36, -Math.PI / 2, Math.PI * 1.5);
    ctx.stroke();

    ctx.strokeStyle = s.color;
    ctx.shadowColor = s.color;
    ctx.shadowBlur = 24;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(0, 0, state.r + 36, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.stroke();

    ctx.restore();
  }

  function drawTicks(alpha) {
    ctx.save();
    ctx.translate(state.cx, state.cy);
    ctx.globalAlpha = alpha;

    for (let i = 0; i < 60; i++) {
      const angle = (i * Math.PI) / 30;
      const big = i % 5 === 0;
      const inner = state.r - (big ? 41 : 24);
      const outer = state.r - 10;

      ctx.strokeStyle = big ? "rgba(255,255,255,.96)" : "rgba(255,255,255,.34)";
      ctx.lineWidth = big ? 4 : 1.2;

      ctx.beginPath();
      ctx.moveTo(Math.sin(angle) * inner, -Math.cos(angle) * inner);
      ctx.lineTo(Math.sin(angle) * outer, -Math.cos(angle) * outer);
      ctx.stroke();
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${state.r * 0.065}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let n = 1; n <= 12; n++) {
      const angle = (n * Math.PI) / 6;
      ctx.fillText(n, Math.sin(angle) * (state.r - 63), -Math.cos(angle) * (state.r - 63));
    }

    ctx.restore();
  }

  function drawNeuralNetwork(s, alpha) {
    ctx.save();
    ctx.translate(state.cx, state.cy - state.r * 0.05);
    ctx.globalAlpha = alpha * 0.63;

    for (const n of state.neural) {
      n.x += n.vx;
      n.y += n.vy;

      if (Math.abs(n.x) > state.r * 0.275) n.vx *= -1;
      if (Math.abs(n.y) > state.r * 0.19) n.vy *= -1;
    }

    for (let i = 0; i < state.neural.length; i++) {
      for (let j = i + 1; j < state.neural.length; j++) {
        const A = state.neural[i];
        const B = state.neural[j];
        const dx = A.x - B.x;
        const dy = A.y - B.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const max = state.r * 0.24;

        if (d < max) {
          const opacity = Math.floor((1 - d / max) * 85)
            .toString(16)
            .padStart(2, "0");
          ctx.strokeStyle = s.color + opacity;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(B.x, B.y);
          ctx.stroke();
        }
      }
    }

    for (const n of state.neural) {
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawStatDots(s, alpha) {
    ctx.save();
    ctx.translate(state.cx, state.cy);
    ctx.globalAlpha = alpha;

    const ring = state.r * 0.47;
    const spin = reducedMotion ? 0 : performance.now() * 0.00025;

    state.statDots.forEach((dot, i) => {
      const angle = (i * Math.PI * 2) / 31 + spin;
      const x = Math.cos(angle) * ring;
      const y = Math.sin(angle) * ring;
      const highlight = i === 0;
      const size = highlight
        ? 5.5 + (reducedMotion ? 0 : Math.sin(performance.now() / 220) * 1.4)
        : 2.4;

      ctx.shadowColor = highlight ? s.color : "transparent";
      ctx.shadowBlur = highlight ? 22 : 0;
      ctx.fillStyle = highlight ? s.color : "rgba(255,255,255,.32)";

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  function drawSecondTrail(alpha) {
    ctx.save();
    ctx.translate(state.cx, state.cy);
    ctx.globalAlpha = alpha;

    for (const t of state.secondTrail) {
      t.life -= 0.017;
      if (t.life <= 0) continue;

      const x = Math.sin(t.angle) * state.r * 0.76;
      const y = -Math.cos(t.angle) * state.r * 0.76;

      ctx.fillStyle = `rgba(251,113,133,${t.life * 0.5})`;
      ctx.beginPath();
      ctx.arc(x, y, 4.5 * t.life, 0, Math.PI * 2);
      ctx.fill();
    }

    state.secondTrail = state.secondTrail.filter((t) => t.life > 0);
    ctx.restore();
  }

  function drawHand(angle, length, width, color, alpha) {
    ctx.save();
    ctx.translate(state.cx, state.cy);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;

    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(0, 22);
    ctx.lineTo(0, -length);
    ctx.stroke();

    ctx.restore();
  }

  function drawHands(now, s, alpha) {
    const ms = now.getMilliseconds();
    const sec = now.getSeconds() + ms / 1000;
    const min = now.getMinutes() + sec / 60;
    const hr = (now.getHours() % 12) + min / 60;

    const secondAngle = (sec * Math.PI) / 30;

    if (!reducedMotion) {
      state.secondTrail.push({ angle: secondAngle, life: 1 });
      if (state.secondTrail.length > 55) state.secondTrail.shift();
    }

    drawSecondTrail(alpha);

    drawHand((hr * Math.PI) / 6, state.r * 0.39, 12, "#ffffff", alpha);
    drawHand((min * Math.PI) / 30, state.r * 0.61, 7, s.color, alpha);
    drawHand(secondAngle, state.r * 0.76, 3, "#fb7185", alpha);

    ctx.save();
    ctx.translate(state.cx, state.cy);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = s.color;
    ctx.shadowBlur = 28;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    return secondAngle;
  }

  function drawFace(s, secondAngle, alpha) {
    ctx.save();
    ctx.translate(state.cx, state.cy + state.r * 0.15);
    ctx.globalAlpha = alpha;

    const blink = reducedMotion ? 1 : Math.sin(performance.now() / 150) > 0.985 ? 0.18 : 1;
    const ex = Math.sin(secondAngle) * 3;
    const ey = -Math.cos(secondAngle) * 2.4;

    ctx.fillStyle = "rgba(255,255,255,.96)";
    ctx.beginPath();
    ctx.ellipse(-35, 0, 9, 9 * blink, 0, 0, Math.PI * 2);
    ctx.ellipse(35, 0, 9, 9 * blink, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.arc(-35 + ex, 1 + ey, 3, 0, Math.PI * 2);
    ctx.arc(35 + ex, 1 + ey, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();

    if (s.mood === "worried") {
      ctx.arc(0, 53, 27, Math.PI * 1.15, Math.PI * 1.85);
    } else if (s.mood === "care" || s.mood === "growth") {
      ctx.arc(0, 34, 34, 0.05, Math.PI - 0.05);
    } else {
      ctx.arc(0, 34, 29, 0.08, Math.PI - 0.08);
    }

    ctx.stroke();
    ctx.restore();
  }

  function drawCenterText(s, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.textAlign = "center";

    ctx.fillStyle = s.color;
    ctx.font = `900 ${state.r * 0.074}px Arial`;
    ctx.fillText(s.title, state.cx, state.cy - state.r * 0.43);

    ctx.restore();
  }

  function createBurst(color) {
    if (reducedMotion) return;

    for (let i = 0; i < 105; i++) {
      state.particles.push({
        x: state.cx,
        y: state.cy,
        vx: Math.cos(Math.random() * Math.PI * 2) * (1 + Math.random() * 8),
        vy: Math.sin(Math.random() * Math.PI * 2) * (1 + Math.random() * 8),
        life: 1,
        size: 2 + Math.random() * 4.5,
        color,
      });
    }
  }

  function drawParticles() {
    state.particles = state.particles.filter((p) => p.life > 0);

    for (const p of state.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.life -= 0.011;

      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
    }
  }

  function loop() {
    if (!state.running) return;

    const now = new Date();
    const s = activeStory();
    const a = introProgress();

    clear("#020617");
    drawBackground(s);
    drawGalaxy(s, a);
    drawClockShell(s, a);
    drawProgressRing(s, a);
    drawTicks(a);
    drawNeuralNetwork(s, a);
    drawStatDots(s, a);

    const secondAngle = drawHands(now, s, a);

    drawCenterText(s, a);
    drawFace(s, secondAngle, a);
    drawParticles();

    if (!state.hasPainted) {
      state.hasPainted = true;
      canvas.dataset.hasPainted = "true";
      canvas.dispatchEvent(new CustomEvent("eden-clock-painted", { bubbles: true }));
    }

    requestAnimationFrame(loop);
  }

  createBurst(STORY[0].color);
  loop();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChildClock);
} else {
  initChildClock();
}

window.initChildClock = initChildClock;
