const NEPTUNE_URL = "https://internal.subtleoptions.com";
const CONTACT_WORKER = "https://contact-form-api.fernandezadrian23.workers.dev";

function solView() {
  return `
  <div class="page-shell">
    <a class="skip-link" href="#main">Skip to mission map</a>

    <header class="cosmos-header">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>SEC_NODE // SOL_STATION</span>
          <span class="status-pill">UPLINK: ENCRYPTED</span>
        </div>
        <div class="hud-body">
          <p class="glitch-wrap">
            <span class="glitch" data-text="ORBITAL RELAY ONLINE">ORBITAL RELAY ONLINE</span>
          </p>
          <p class="lede">
            Pick a world to route through. This shell is a <strong>client-rendered SPA</strong> (Vite +
            history routing)—still edge-cached as static files, but the experience is one living console.
            Cloudflare stays in front doing the real guard duty.
          </p>
        </div>
      </div>
    </header>

    <main id="main" class="cosmos-main">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>SECTOR_MAP // HELIOCENTRIC</span>
          <span class="status-pill"> POINTER: PLANETARY_LINKS</span>
        </div>
        <div class="hud-body">
          <div class="solar-stage">
            <div class="orbit-field" id="orbitField">
              <div class="sun-core" aria-hidden="true"></div>
              <nav aria-label="Choose destination by planet">
                <ul class="planet-list">
                  <li class="planet-slot node-chaos" style="--angle: 0deg; --orbit-r: min(38vw, 210px)">
                    <a href="/about" class="planet-hit" data-spa aria-label="Mars — About this site">
                      <span class="planet-visual skin-mars"></span>
                      <span class="planet-label">Mars<br />Intel / About</span>
                    </a>
                  </li>
                  <li class="planet-slot node-chaos" style="--angle: 90deg; --orbit-r: min(38vw, 210px)">
                    <a href="/contact" class="planet-hit" data-spa aria-label="Earth — Contact">
                      <span class="planet-visual skin-earth"></span>
                      <span class="planet-label">Earth<br />Comms / Contact</span>
                    </a>
                  </li>
                  <li class="planet-slot node-chaos" style="--angle: 180deg; --orbit-r: min(38vw, 210px)">
                    <a href="/internal" class="planet-hit" data-spa aria-label="Neptune — Internal redirect">
                      <span class="planet-visual skin-neptune"></span>
                      <span class="planet-label">Neptune<br />Classified / Internal</span>
                    </a>
                  </li>
                  <li class="planet-slot node-chaos" style="--angle: 270deg; --orbit-r: min(38vw, 210px)">
                    <a href="/lost" class="planet-hit" data-spa aria-label="Deep space — Demo void sector">
                      <span class="planet-visual skin-void"></span>
                      <span class="planet-label">The Void<br />404 / Lost signal</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <p class="telemetry" aria-label="Stack telemetry">
            <code>WAF_ARMED:</code> edge rules hot ·
            <code>TLS_RING:</code> pinned handshakes ·
            <code>RLIMIT:</code> token buckets live ·
            <code>ZT_GATE:</code> Neptune route via Access proxy ·
            <code>ORIGIN:</code> Vite bundle + GitHub Pages (asset host)
          </p>
        </div>
      </div>
    </main>

    <footer class="cosmos-footer">
      Demo maintained by Adrian F · motion respects <code>prefers-reduced-motion</code>
    </footer>
  </div>`;
}

function marsView() {
  return `
  <div class="page-shell">
    <a class="skip-link" href="#main">Skip to transmission</a>

    <header class="cosmos-header">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>MARS_SECTOR // PUBLIC_INTEL</span>
          <span class="status-pill">THREAT_TIER: LOW</span>
        </div>
      </div>
    </header>

    <main id="main" class="cosmos-main">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>SURFACE_LOG</span>
          <span class="status-pill">CACHE: COLD_TO_WARM</span>
        </div>
        <div class="hud-body">
          <div class="hero-orbit">
            <div class="planet-badge node-chaos" aria-hidden="true">
              <span class="planet-visual skin-mars"></span>
            </div>
            <div class="hero-copy">
              <h1><span class="glitch" data-text="ABOUT THIS OUTPOST">ABOUT THIS OUTPOST</span></h1>
              <p class="lede">
                This is Adrian’s personal sandbox for learning Cloudflare and GitHub Pages—now shipped as a
                small Vite SPA so routes can change without full reloads, while the stack story stays the same.
              </p>
            </div>
          </div>

          <nav class="subpage-nav" aria-label="Navigation">
            <a href="/" data-spa>◀ Sol map</a>
            <a href="/contact" data-spa>Earth relay</a>
          </nav>
        </div>
      </div>
    </main>

    <footer class="cosmos-footer">MARS // unclassified band · PRACTICE_RANGE</footer>
  </div>`;
}

function earthView() {
  return `
  <div class="page-shell">
    <a class="skip-link" href="#main">Skip to uplink form</a>

    <header class="cosmos-header">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>EARTH_RELAY // UPLINK_FORM</span>
          <span class="status-pill">BOT_SHIELD: ACTIVE</span>
        </div>
      </div>
    </header>

    <main id="main" class="cosmos-main">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>PACKET_ASSEMBLER</span>
          <span class="status-pill">WORKER endpoint</span>
        </div>
        <div class="hud-body">
          <div class="hero-orbit">
            <div class="planet-badge node-chaos" aria-hidden="true">
              <span class="planet-visual skin-earth"></span>
            </div>
            <div class="hero-copy">
              <h1><span class="glitch" data-text="OPEN A CHANNEL">OPEN A CHANNEL</span></h1>
              <p class="lede">
                Fields route to a Cloudflare Worker—same stack that loves to block junk before it ever
                reaches your logic.
              </p>
            </div>
          </div>

          <form class="form-stack" action="${CONTACT_WORKER}" method="POST">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required autocomplete="name" />

            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" required autocomplete="email" />

            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" autocomplete="off" />

            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" cols="40" required></textarea>

            <input type="text" name="hiddenField" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true" />

            <button type="submit" class="chaos-send">
              <span class="btn-ghost" aria-hidden="true"></span>
              <span class="btn-chassis">Transmit packet</span>
            </button>
          </form>

          <nav class="subpage-nav" aria-label="Navigation">
            <a href="/" data-spa>◀ Sol map</a>
            <a href="/about" data-spa>Mars intel</a>
          </nav>
        </div>
      </div>
    </main>

    <footer class="cosmos-footer">EARTH // noise floor acceptable · forms are still serious business</footer>
  </div>`;
}

function neptuneView() {
  return `
  <div class="page-shell">
    <a class="skip-link" href="#main">Skip to egress link</a>

    <header class="cosmos-header">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>NEPTUNE_AIRLOCK</span>
          <span class="status-pill">ACCESS_DELEGATED</span>
        </div>
      </div>
    </header>

    <main id="main" class="cosmos-main">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>HANDOFF_SEQUENCE</span>
          <span class="status-pill"> egress_lock </span>
        </div>
        <div class="hud-body">
          <div class="hero-orbit">
            <div class="planet-badge" aria-hidden="true">
              <span class="planet-visual skin-neptune"></span>
            </div>
            <div class="hero-copy">
              <p class="lede lede-tight">
                Diverting through Cloudflare Access. Rotation should fire instantly—if not,
                <a href="${NEPTUNE_URL}">use the wet dock link manually</a>.
              </p>
            </div>
          </div>
          <nav class="subpage-nav" aria-label="Navigation">
            <a href="/" data-spa>◀ Abort to Sol map</a>
          </nav>
        </div>
      </div>
    </main>

    <footer class="cosmos-footer">NEPTUNE · eyes-only transit lane</footer>
  </div>`;
}

function voidView() {
  return `
  <div class="page-shell">
    <a class="skip-link" href="#main">Skip to recovery link</a>

    <header class="cosmos-header">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>DEEP_VOID // NO_ROUTE</span>
          <span class="status-pill">HTTP_404</span>
        </div>
      </div>
    </header>

    <main id="main" class="cosmos-main">
      <div class="hud-panel">
        <div class="hud-titlebar">
          <span>TRACE_FAILED</span>
          <span class="status-pill">checksum mismatch</span>
        </div>
        <div class="hud-body">
          <div class="hero-orbit">
            <div class="planet-badge node-chaos" aria-hidden="true">
              <span class="planet-visual skin-void"></span>
            </div>
            <div class="hero-copy">
              <h1 class="signal-lost">NO FIXED POINT IN VECTOR SPACE</h1>
              <p class="lede">
                Whatever you punched in—it isn’t anchored in this constellation. Warp back to Sol before
                the WAF thinks you’re scanning ports for fun.
              </p>
            </div>
          </div>

          <nav class="subpage-nav" aria-label="Navigation">
            <a href="/" data-spa>Rewind to Sol map</a>
          </nav>
        </div>
      </div>
    </main>

    <footer class="cosmos-footer">THE VOID · coordinates undefined</footer>
  </div>`;
}

export const ROUTES = [
  {
    path: "/",
    planet: "sol",
    title: "SOL STATION // Orbital Relay",
    description:
      "Client-rendered solar-system command UI: Vite SPA with cosmic navigation and Cloudflare-hardened edge.",
    view: solView,
    afterMount: () => {},
  },
  {
    path: "/about",
    planet: "mars",
    title: "MARS // Site Intel",
    description: "Mars sector — origin story of this Cloudflare-forward demo.",
    view: marsView,
    afterMount: () => {},
  },
  {
    path: "/contact",
    planet: "earth",
    title: "EARTH // Comms Relay",
    description: "Earth relay — contact the maintainer via a Cloudflare Worker.",
    view: earthView,
    afterMount: () => {},
  },
  {
    path: "/internal",
    planet: "neptune",
    title: "NEPTUNE // Classified Corridor",
    description: "Neptune corridor — handoff to internal Access-protected space.",
    view: neptuneView,
    afterMount: () => {
      Promise.resolve().then(() => {
        window.location.href = NEPTUNE_URL;
      });
    },
  },
  {
    path: "/lost",
    planet: "void",
    title: "VOID // Signal Lost",
    description: "Signal lost — return to Sol station.",
    view: voidView,
    afterMount: () => {},
  },
];

export const ROUTE_PATH_SET = new Set(ROUTES.map((r) => r.path));

export function normalizePath(fullPath) {
  const pathname = fullPath.split("?")[0].split("#")[0];
  let p = pathname;
  try {
    p = decodeURI(pathname);
  } catch {
    p = pathname;
  }
  if (!p || p === "/") return "/";
  return p.endsWith("/") ? p.slice(0, -1) || "/" : p;
}

export function resolveRoute(pathOnly) {
  const p = normalizePath(pathOnly);
  const hit = ROUTES.find((r) => r.path === p);
  if (hit) return hit;
  return ROUTES.find((r) => r.path === "/lost");
}
