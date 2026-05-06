(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WARP_STORAGE_KEY = "cosmos-warp-hop";

  function ensureWarpOverlay() {
    let el = document.getElementById("warp-overlay");
    if (!el) {
      el = document.createElement("div");
      el.id = "warp-overlay";
      el.setAttribute("aria-hidden", "true");
      document.body.insertBefore(el, document.body.firstChild);
    }
    return el;
  }

  /**
   * Entry animation: first visit = soft settle; after an in-site jump = burst “drop out of warp”.
   * Next pass: optional sound + haptics behind a user toggle (e.g. window.cosmosSensory).
   */
  function initWarpEntry() {
    if (reduceMotion) return;

    ensureWarpOverlay();
    const hop = sessionStorage.getItem(WARP_STORAGE_KEY);
    sessionStorage.removeItem(WARP_STORAGE_KEY);
    document.body.dataset.warpEntry = hop === "hop" ? "burst" : "soft";

    window.requestAnimationFrame(() => {
      document.body.classList.add("nav-warping-in");
      const dur = hop === "hop" ? 720 : 520;
      window.setTimeout(() => {
        document.body.classList.remove("nav-warping-in");
        delete document.body.dataset.warpEntry;
      }, dur);
    });
  }

  function initWarpNavigation() {
    if (reduceMotion) return;

    ensureWarpOverlay();

    let navigating = false;

    window.addEventListener("pageshow", (event) => {
      navigating = false;
      /* Leaving the page resets nav-warping-out when the unload finishes; only strip it here
         if navigation was aborted. ALWAYS stripping nav-warping-in broke entry: pageshow fires
         after load, which raced our initWarpEntry rAF animation. */
      document.body.classList.remove("nav-warping-out");
      if (event.persisted) {
        document.body.classList.remove("nav-warping-in");
        delete document.body.dataset.warpEntry;
      }
    });

    document.body.addEventListener(
      "click",
      (event) => {
        if (navigating) return;

        const anchor = event.target.closest("a[href]");
        if (!anchor) return;
        if (event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.button !== 0) return;

        const rawHref = (anchor.getAttribute("href") || "").trim();
        if (!rawHref || rawHref.startsWith("#")) return;
        if (/^javascript:/i.test(rawHref)) return;

        let targetUrl;
        try {
          targetUrl = new URL(anchor.href);
        } catch {
          return;
        }

        if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") return;
        if (targetUrl.origin !== location.origin) return;
        if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

        const normalized = targetUrl.href.replace(/#.*$/, "");
        const normalizedHere = location.href.replace(/#.*$/, "");
        if (normalized === normalizedHere) return;

        const pathname = targetUrl.pathname;
        const file = pathname.endsWith("/") ? "index.html" : pathname.split("/").pop() || "";
        const isHtmlish = /\.html?$/i.test(file) || pathname.endsWith("/") || file === "";

        if (!isHtmlish) return;

        event.preventDefault();
        navigating = true;
        sessionStorage.setItem(WARP_STORAGE_KEY, "hop");
        document.body.classList.add("nav-warping-out");

        window.setTimeout(() => {
          window.location.assign(anchor.href);
        }, 580);
      },
      false,
    );
  }

  function resizeCanvas(canvas, ctx) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w, h };
  }

  function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = reduceMotion ? 160 : 360;
    const stars = [];

    function fillStars(w, h) {
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random(),
          tw: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random(),
        });
      }
    }

    let size = resizeCanvas(canvas, ctx);
    fillStars(size.w, size.h);

    function frame(tMs) {
      const t = tMs / 1000;
      ctx.clearRect(0, 0, size.w, size.h);
      stars.forEach((s) => {
        const pulse = reduceMotion ? 1 : 0.55 + Math.sin(t * s.speed + s.tw) * 0.45;
        ctx.globalAlpha = pulse * (0.12 + s.z * 0.78);
        const dim = s.z * 2 + 0.35;
        ctx.fillStyle = s.z > 0.65 ? "#d7faff" : "#ffffff";
        ctx.fillRect(s.x, s.y, dim, dim);
      });
      ctx.globalAlpha = 1;
      if (!reduceMotion) window.requestAnimationFrame(frame);
    }

    if (reduceMotion) frame(0);
    else window.requestAnimationFrame(frame);

    window.addEventListener(
      "resize",
      debounce(() => {
        size = resizeCanvas(canvas, ctx);
        fillStars(size.w, size.h);
        if (reduceMotion) frame(0);
      }, 140),
    );
  }

  function debounce(fn, ms) {
    let id;
    return function () {
      clearTimeout(id);
      id = setTimeout(fn, ms);
    };
  }

  function initOrbitParallax() {
    const field = document.getElementById("orbitField");
    if (!field || reduceMotion) return;

    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        field.style.transform = `rotateX(${6 + ny * -14}deg) rotateY(${nx * 22}deg)`;
      });
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", () => {
      field.style.transform = "rotateX(6deg) rotateY(0deg)";
    });
  }

  function initNodeChaos() {
    document.documentElement.classList.toggle("css-chaos-move", !reduceMotion);

    if (reduceMotion) return;

    document.querySelectorAll(".node-chaos").forEach((el) => {
      const dz = Math.round(Math.random() * 50 - 25);
      const mx = `${(Math.random() * 18 + 6).toFixed(1)}px`;
      const my = `${(Math.random() * -14 - 4).toFixed(1)}px`;
      el.style.setProperty("--dz", `${dz}px`);
      el.style.setProperty("--mx", mx);
      el.style.setProperty("--my", my);
      el.style.setProperty("--dur", `${9 + Math.random() * 12}s`);
    });
  }

  initWarpEntry();
  initStarfield();
  initOrbitParallax();
  initNodeChaos();
  initWarpNavigation();
})();
