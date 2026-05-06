import "./styles.css";
import "./cosmos.css";

import { createRouter } from "./router.js";
import { initCosmos } from "./cosmos-app.js";

const mount = document.getElementById("spa-mount");
if (!mount) throw new Error("Missing #spa-mount");

/** @type {ReturnType<typeof createRouter> | null} */
let router = null;

const cosmic = initCosmos({
  navigate: (href, opts) => router?.navigate(href, opts),
});

router = createRouter(mount, {
  refreshEffects: () => cosmic.refreshEffects(),
});

try {
  const recovered = sessionStorage.getItem("__spa_recovery");
  if (recovered) {
    sessionStorage.removeItem("__spa_recovery");
    history.replaceState(null, "", recovered);
  }
} catch {
  /* storage blocked */
}

router.bootFromUrl();
