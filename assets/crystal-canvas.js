/**
 * ============================================================================
 * 1:1 复刻 CMU Data Science Club (cmudsc.com) 原版 tsParticles 粒子连线背景
 * ============================================================================
 * 同时内置原生 Canvas 完美降级：即使在无外网环境下也能呈現完全一致的 #082b57 粒子网络！
 * ============================================================================
 */

(function () {
  const CMU_CONFIG = {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#082b57" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: false,
          speed: 40,
          minimumValue: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#082b57",
        opacity: 0.35,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.7 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  };

  function startParticles() {
    if (window.tsParticles && typeof window.tsParticles.load === "function") {
      window.tsParticles.load("tsparticles", CMU_CONFIG);
    } else {
      startFallbackParticles();
    }
  }

  // 离线兜底：当 CDN 未加载时，使用原生 Canvas 绘制与 tsParticles 完全一致的 #082b57 粒子连线
  function startFallbackParticles() {
    const container = document.getElementById("tsparticles");
    if (!container) return;
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.innerHTML = "";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", function () {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const mouse = { x: -9999, y: -9999 };
    window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const pts = Array.from({ length: 90 }, function () {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        r: 1.5 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.4
      };
    });

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = "rgba(8, 43, 87, " + p.alpha + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 150) {
            ctx.strokeStyle = "rgba(8, 43, 87, " + (1 - d / 150) * 0.35 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 160) {
          ctx.strokeStyle = "rgba(8, 43, 87, " + (1 - dm / 160) * 0.65 + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startParticles);
  } else {
    startParticles();
  }
})();
